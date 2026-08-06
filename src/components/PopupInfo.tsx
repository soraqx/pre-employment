import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type PopupInfoProps = {
  buttonLabel?: string;
  title: string;
  children: ReactNode;
};

function CatIcon({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13 25 9 8l16 9a30 30 0 0 1 14 0l16-9-4 17a25 25 0 0 1 5 15c0 13-11 22-24 22S8 53 8 40c0-6 2-11 5-15Z" />
      <circle cx="23" cy="38" r="2.5" fill="#FFF8DC" />
      <circle cx="41" cy="38" r="2.5" fill="#FFF8DC" />
      <path d="M28 47c3 3 5 3 8 0" fill="none" stroke="#FFF8DC" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function PopupInfo({
  buttonLabel = 'Tap the paw for a tip',
  title,
  children,
}: PopupInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.04, rotate: -1 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 font-extrabold text-[#FFF8DC] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <span className="grid size-8 place-items-center rounded-full bg-[#FFF8DC] text-black">
          <span className="text-lg leading-none" aria-hidden="true">&#x1F43E;</span>
        </span>
        {buttonLabel}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.65, y: 48, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 24, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-black/10 bg-[#FFF8DC] p-7 text-[#242424] shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
            >
              <span className="absolute -bottom-5 -right-3 rotate-[-18deg] text-7xl opacity-[0.06]" aria-hidden="true">&#x1F43E;</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close tip"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black font-bold text-[#FFF8DC] transition-transform hover:rotate-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <div className="mb-5 flex items-end gap-3">
                <div className="grid size-16 place-items-center rounded-2xl bg-black text-[#FFF8DC]">
                  <CatIcon className="size-11" />
                </div>
                <span className="pb-1 text-xs font-extrabold uppercase tracking-[0.2em] text-black/50">dochi's note</span>
              </div>

              <h2 id={titleId} className="pr-8 text-2xl font-extrabold text-[#1f1f1f]">{title}</h2>
              <div className="mt-3 leading-7 text-[#454545]">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
