import { Users, Briefcase, Award, Network } from 'lucide-react';

export function BenefitsSection() {
  const benefits = [
    {
      icon: Users,
      title: 'Командная работа',
      description: 'Научитесь работать в команде и развивайте soft skills',
      color: 'purple' as const,
    },
    {
      icon: Briefcase,
      title: 'Опыт для резюме',
      description: 'Реальный проект, который можно добавить в портфолио',
      color: 'blue' as const,
    },
    {
      icon: Award,
      title: 'Призы и награды',
      description: 'Зачёт работы от преподавателя',
      color: 'purple' as const,
    },
    {
      icon: Network,
      title: 'Обмен опытом',
      description: 'Учитесь друг у друга, делитесь идеями и находите новые подходы к решению задач',
      color: 'blue' as const,
    },
  ];

  return (
    <section className="relative px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="animate-reveal-up mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Почему стоит участвовать?</h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            CodeBattle — это больше, чем просто соревнование. Это инвестиция в ваше профессиональное
            будущее.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            const colorClasses =
              benefit.color === 'purple'
                ? 'border-purple-500/50 bg-purple-500/20 text-purple-400'
                : 'border-blue-500/50 bg-blue-500/20 text-blue-400';

            return (
              <div
                key={benefit.title}
                className="animate-reveal-up group rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-600/50"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100 ${colorClasses}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
                <p className="text-slate-400">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
