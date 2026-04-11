import { Calendar, Users, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hero-blob-a absolute left-10 top-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-blob-slow"
          aria-hidden
        />
        <div
          className="hero-blob-b absolute bottom-20 right-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-blob-slower"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-sm text-purple-300 backdrop-blur-sm">
            <Zap className="h-4 w-4" />
            <span>Регистрация открыта</span>
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl">
            Hackathon 2026
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-300 md:text-2xl">
            Внутренний хакатон колледжа для студентов всех направлений. Создай проект мечты в команде до 5
            человек!
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-6 text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              <span>15-16 апреля 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span>До 5 человек в команде</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <span>48 часов разработки</span>
            </div>
          </div>

          <a
            href="#registration"
            className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:from-purple-500 hover:to-blue-500 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          >
            Зарегистрировать команду
          </a>
        </div>

        <div className="mt-20 animate-fade-up-delayed">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
            <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">100+</div>
                  <div className="text-sm text-slate-400">Участников</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">25+</div>
                  <div className="text-sm text-slate-400">Команд</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">4</div>
                  <div className="text-sm text-slate-400">Направлений</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-white md:text-4xl">48ч</div>
                  <div className="text-sm text-slate-400">Разработки</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
