'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus, Trash2, Send, Users, AlertCircle } from 'lucide-react';
import type { TeamMember, TeamRegistrationFormData } from '../model/types';

interface RegistrationFormProps {
  onSubmit: (data: TeamRegistrationFormData) => void | Promise<void>;
}

const MAX_TEAM_MEMBERS = 4;

export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<TeamRegistrationFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      teamMembers: [],
      consent: false,
    },
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const addTeamMember = () => {
    if (teamMembers.length < MAX_TEAM_MEMBERS) {
      setTeamMembers([...teamMembers, { fullName: '', group: '', role: '' }]);
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const onFormSubmit = async (data: TeamRegistrationFormData) => {
    setSubmitError(null);
    try {
      await onSubmit({ ...data, teamMembers });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Произошла ошибка при отправке');
    }
  };

  return (
    <section id="registration" className="relative px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="animate-reveal-up mb-12 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Регистрация команды</h2>
          <p className="text-xl text-slate-300">
            Заполните форму, чтобы зарегистрировать свою команду на хакатон
          </p>
        </div>

        <div className="animate-reveal-up">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <label className="mb-2 block font-semibold text-white">
                Название команды <span className="text-red-400">*</span>
              </label>
              <input
                {...register('teamName', { required: 'Обязательное поле' })}
                type="text"
                className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                placeholder="Введите название команды"
              />
              {errors.teamName && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {errors.teamName.message}
                </p>
              )}
            </div>

            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
                <Users className="h-6 w-6 text-purple-400" />
                Информация о капитане
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-white">
                    ФИО капитана <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('captainName', { required: 'Обязательное поле' })}
                    type="text"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                    placeholder="Иванов Иван Иванович"
                  />
                  {errors.captainName && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {errors.captainName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block font-semibold text-white">
                    Группа капитана <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('captainGroup', { required: 'Обязательное поле' })}
                    type="text"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                    placeholder="ПКС-301"
                  />
                  {errors.captainGroup && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {errors.captainGroup.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-white">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Обязательное поле',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Некорректный email',
                      },
                    })}
                    type="email"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                    placeholder="example@mail.com"
                  />
                  {errors.email && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block font-semibold text-white">
                    Телефон <span className="text-red-400">*</span>
                  </label>
                  <input
                    {...register('phone', { required: 'Обязательное поле' })}
                    type="tel"
                    className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                    placeholder="+7 (999) 123-45-67"
                  />
                  {errors.phone && (
                    <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
                  <UserPlus className="h-6 w-6 text-blue-400" />
                  Участники команды
                </h3>
                <span className="text-sm text-slate-400">
                  {teamMembers.length} / {MAX_TEAM_MEMBERS}
                </span>
              </div>

              <div className="mb-4 space-y-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="animate-member-row rounded-xl border border-slate-700/50 bg-slate-800/30 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-semibold text-white">Участник {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="p-1 text-red-400 transition-colors hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <input
                        type="text"
                        value={member.fullName}
                        onChange={(e) => updateTeamMember(index, 'fullName', e.target.value)}
                        className="rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                        placeholder="ФИО"
                      />
                      <input
                        type="text"
                        value={member.group}
                        onChange={(e) => updateTeamMember(index, 'group', e.target.value)}
                        className="rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                        placeholder="Группа"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        className="rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-400 transition-colors focus:border-purple-500 focus:outline-none"
                        placeholder="Роль"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {teamMembers.length < MAX_TEAM_MEMBERS ? (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-600 py-3 text-slate-400 transition-colors hover:border-purple-500 hover:text-purple-400"
                >
                  <UserPlus className="h-5 w-5" />
                  Добавить участника
                </button>
              ) : (
                <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 py-3 text-slate-500">
                  <AlertCircle className="h-5 w-5" />
                  Достигнуто максимальное количество участников (4)
                </div>
              )}
            </div>

            <div className="mb-8">
              <label className="group flex cursor-pointer items-start gap-3">
                <input
                  {...register('consent', { required: true })}
                  type="checkbox"
                  className="mt-1 h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                />
                <span className="text-slate-300 transition-colors group-hover:text-white">
                  Я согласен на обработку персональных данных и ознакомлен с правилами хакатона{' '}
                  <span className="text-red-400">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  Необходимо согласие на обработку данных
                </p>
              )}
            </div>

            {submitError && (
              <p className="mb-4 flex items-center gap-1 text-sm text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-[1.02] hover:from-purple-500 hover:to-blue-500 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            >
              <Send className="h-5 w-5" />
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
