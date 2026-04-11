import type { Metadata } from 'next';
import '@/shared/styles/globals.css';

export const metadata: Metadata = {
  title: 'CodeBattle Hackathon 2026',
  description:
    'Внутренний хакатон колледжа для студентов всех направлений. Создай проект мечты в команде до 4 человек!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
