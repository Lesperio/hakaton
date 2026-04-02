'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXIT_MS = 260;

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLeaving(false);
      setMounted(true);
    } else if (mounted) {
      setLeaving(true);
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => {
      setMounted(false);
      setLeaving(false);
    }, EXIT_MS);
    return () => window.clearTimeout(id);
  }, [leaving]);

  if (!mounted) return null;

  const show = isOpen && !leaving;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
      <button
        type="button"
        onClick={onClose}
        className={
          show
            ? 'absolute inset-0 animate-modal-backdrop-in bg-black/70 backdrop-blur-sm'
            : 'absolute inset-0 animate-modal-backdrop-out bg-black/70 backdrop-blur-sm'
        }
        aria-label="Закрыть"
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
        <div
          className={
            show
              ? 'pointer-events-auto relative w-full max-w-md animate-modal-panel-in rounded-2xl border border-slate-700 bg-slate-900 p-8'
              : 'pointer-events-auto relative w-full max-w-md animate-modal-panel-out rounded-2xl border border-slate-700 bg-slate-900 p-8'
          }
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 animate-success-icon items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>

            <h2 id="success-modal-title" className="mb-4 text-3xl font-bold text-white">
              Заявка отправлена!
            </h2>

            <p className="mb-6 text-slate-300">
              Спасибо за регистрацию! Мы получили вашу заявку и свяжемся с вами в ближайшее время для
              подтверждения участия в хакатоне.
            </p>

            <p className="mb-8 text-sm text-slate-400">
              Организаторы свяжутся с вами по указанным контактам для подтверждения участия.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-500 hover:to-blue-500"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
