import { NextResponse } from 'next/server';
import { resend } from '@/shared/lib/resend';
import { allowRegistrationSubmit, clientIpFromRequest } from '@/shared/lib/registration-rate-limit';
import {
  LIMITS,
  isValidEmail,
  isValidPhone,
  isValidProjectLink,
  parseJsonBody,
} from '@/shared/lib/registration-validate';

interface TeamMember {
  fullName: string;
  group: string;
  role: string;
}

interface TeamRegistrationFormData {
  teamName: string;
  captainName: string;
  captainGroup: string;
  email: string;
  phone: string;
  projectLink: string;
  consent: boolean;
  teamMembers: TeamMember[];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function secureJson(data: object, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store, no-transform',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function assertAllowedOrigin(request: Request): boolean {
  const allowed = process.env.REGISTRATION_ALLOWED_ORIGIN?.trim();
  if (!allowed) return true;

  const origin = request.headers.get('origin');
  if (origin === allowed) return true;

  const referer = request.headers.get('referer');
  if (referer && (referer === allowed || referer.startsWith(`${allowed}/`))) return true;

  if (!origin && !referer) return true;

  return false;
}

function normalizeMembers(raw: unknown): TeamMember[] {
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, LIMITS.maxMembers).map((m): TeamMember => {
    const o = m && typeof m === 'object' ? (m as Record<string, unknown>) : {};
    const fullName = typeof o.fullName === 'string' ? o.fullName : '';
    const group = typeof o.group === 'string' ? o.group : '';
    const role = typeof o.role === 'string' ? o.role : '';
    return {
      fullName: fullName.slice(0, LIMITS.memberField.fullName),
      group: group.slice(0, LIMITS.memberField.group),
      role: role.slice(0, LIMITS.memberField.role),
    };
  });
}

export async function POST(request: Request) {
  try {
    if (!assertAllowedOrigin(request)) {
      return secureJson({ success: false, message: 'Отклонено' }, 403);
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return secureJson({ success: false, message: 'Сервер не настроен для отправки почты' }, 500);
    }

    const recipient = process.env.REGISTRATION_EMAIL?.trim();
    if (!recipient) {
      console.error('Missing REGISTRATION_EMAIL');
      return secureJson({ success: false, message: 'Сервер не настроен для отправки почты' }, 500);
    }

    const ip = clientIpFromRequest(request);
    const rateMax = Math.min(50, Math.max(3, Number(process.env.REGISTRATION_RATE_MAX ?? 10) || 10));
    const rateWindow = Math.min(
      3_600_000,
      Math.max(60_000, Number(process.env.REGISTRATION_RATE_WINDOW_MS ?? 900_000) || 900_000)
    );

    if (ip !== 'unknown' && !allowRegistrationSubmit(ip, rateMax, rateWindow)) {
      return secureJson(
        { success: false, message: 'Слишком много заявок. Попробуйте позже.' },
        429
      );
    }

    const raw = await request.text();
    const parsed = parseJsonBody(raw);
    if (!parsed.ok) {
      return secureJson({ success: false, message: parsed.message }, 400);
    }

    const body = parsed.value as Partial<TeamRegistrationFormData>;

    const teamName = typeof body.teamName === 'string' ? body.teamName.trim().slice(0, LIMITS.teamName) : '';
    const captainName =
      typeof body.captainName === 'string' ? body.captainName.trim().slice(0, LIMITS.captainName) : '';
    const captainGroup =
      typeof body.captainGroup === 'string'
        ? body.captainGroup.trim().slice(0, LIMITS.captainGroup)
        : '';
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, LIMITS.email) : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, LIMITS.phone) : '';
    const projectLink =
      typeof body.projectLink === 'string' ? body.projectLink.trim().slice(0, LIMITS.projectLink) : '';
    const consent = body.consent === true;
    const teamMembers = normalizeMembers(body.teamMembers);

    if (!teamName || !captainName || !captainGroup || !email || !phone || !projectLink || !consent) {
      return secureJson({ success: false, message: 'Заполнены не все обязательные поля' }, 400);
    }

    if (!isValidEmail(email)) {
      return secureJson({ success: false, message: 'Некорректный email' }, 400);
    }

    if (!isValidPhone(phone)) {
      return secureJson({ success: false, message: 'Некорректный телефон' }, 400);
    }

    if (!isValidProjectLink(projectLink)) {
      return secureJson({ success: false, message: 'Некорректная ссылка на проект' }, 400);
    }

    const membersHtml =
      teamMembers.length > 0
        ? teamMembers
            .map(
              (member, index) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(member.fullName || '—')}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(member.group || '—')}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(member.role || '—')}</td>
                </tr>
              `
            )
            .join('')
        : `
          <tr>
            <td colspan="4" style="padding: 8px; border: 1px solid #ddd; text-align: center;">
              Дополнительные участники не указаны
            </td>
          </tr>
        `;

    const from =
      process.env.RESEND_FROM_EMAIL?.trim() || 'Hackathon Registration <onboarding@resend.dev>';

    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      subject: `Новая заявка: ${teamName}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2>Новая заявка на хакатон</h2>

          <p><strong>Название команды:</strong> ${escapeHtml(teamName)}</p>
          <p><strong>Капитан:</strong> ${escapeHtml(captainName)}</p>
          <p><strong>Группа капитана:</strong> ${escapeHtml(captainGroup)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Ссылка на репозиторий/Яндекс.Диск:</strong> ${escapeHtml(projectLink)}</p>
          <p><strong>Согласие:</strong> ${consent ? 'Да' : 'Нет'}</p>

          <h3>Участники команды</h3>
          <table style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th style="padding: 8px; border: 1px solid #ddd;">#</th>
                <th style="padding: 8px; border: 1px solid #ddd;">ФИО</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Группа</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Роль</th>
              </tr>
            </thead>
            <tbody>
              ${membersHtml}
            </tbody>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error');

      return secureJson({ success: false, message: 'Не удалось отправить заявку' }, 500);
    }

    return secureJson({
      success: true,
      message: 'Заявка успешно отправлена',
    });
  } catch {
    return secureJson({ success: false, message: 'Ошибка обработки формы' }, 400);
  }
}
