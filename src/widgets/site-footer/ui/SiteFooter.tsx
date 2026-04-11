import { Mail, Phone, MapPin } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Адрес</h3>
            <div className="space-y-3">
            
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="h-5 w-5" />
                <span>г. Москва, ул. Генерала Белова, д. 4</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Социальные сети</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://vk.com/hackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-slate-700/80 bg-slate-900/40 px-4 py-3 transition-colors hover:border-[#0077FF]/50 hover:bg-slate-800/60"
              >
                <span
                  className="flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-lg bg-[#0077FF] text-[0.8125rem] font-bold leading-none tracking-tight text-white"
                  aria-hidden
                >
                  VK
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-white">ВКонтакте</p>
                
                </div>
              </a>
              <a
                href="https://max.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-slate-700/80 bg-slate-900/40 px-4 py-3 transition-colors hover:border-violet-500/50 hover:bg-slate-800/60"
              >
                <span
                  className="flex h-12 w-12 shrink-0 select-none items-center justify-center rounded-lg bg-violet-600 text-[0.6875rem] font-bold leading-none tracking-wide text-white"
                  aria-hidden
                >
                  MAX
                </span>
                <div className="min-w-0 text-left">
                  <p className="font-semibold text-white">Max</p>
                  
                </div>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-white">Важная информация</h3>
            <p className="mb-2 text-slate-400">Дата: 15-16 апреля 2026</p>
            <p className="mb-2 text-slate-400">Место: отделение ОПИТ</p>
            <p className="text-slate-400">Заявки до: 20 апреля 2026</p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500">© 2026 Hackathon. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
