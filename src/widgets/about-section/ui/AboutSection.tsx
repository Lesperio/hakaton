import { Code, Lightbulb, Users } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="animate-reveal-up mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">О хакатоне</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            CodeBattle Hackathon — это уникальная возможность для студентов проявить свои навыки, получить
            опыт командной работы и создать проект, который может изменить будущее.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="animate-reveal-up rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-purple-500/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20">
              <Code className="h-7 w-7 text-purple-400" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Формат</h3>
            <p className="leading-relaxed text-slate-300">
              48 часов интенсивной разработки. Команды работают над своими проектами, получают консультации
              от менторов и соревнуются за призовые места.
            </p>
          </div>

          <div className="animate-reveal-up rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20">
              <Lightbulb className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Направления</h3>
            <ul className="space-y-2 leading-relaxed text-slate-300">
              <li>• Web-разработка</li>
              <li>• Mobile-разработка</li>
              <li>• UI/UX дизайн</li>
              <li>• backend разработка</li>
            </ul>
          </div>

          <div className="animate-reveal-up rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/50 md:col-span-2">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20">
              <Users className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Участники</h3>
            <p className="leading-relaxed text-slate-300">
              К участию приглашаются студенты колледжа, которые интересуются разработкой, технологиями и
              созданием собственных проектов. Можно участвовать как с готовой командой, так и собрать её
              перед началом хакатона.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
