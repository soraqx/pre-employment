import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-3 rounded-full border border-[#8F6B4F]/20 bg-[#E8D6BE] px-5 py-3 font-extrabold text-[#2B2521] shadow-[0_10px_24px_rgba(75,55,42,0.14)] transition-colors hover:bg-[#DCC4A7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6F4933]"
      >
        <span className="grid size-8 place-items-center rounded-full bg-[#2B2521] text-[#FFF8EE]" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h8l4 4v14H6z" />
            <path d="M14 3v5h5M9 13h6M9 17h4" />
          </svg>
        </span>
        View My Resume
        <span aria-hidden="true">🐾</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, scale: 0.75, y: 45 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: 'spring', stiffness: 340, damping: 25 }}
              className="flex max-h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#FFF8EE] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:max-h-[92dvh] sm:rounded-[2rem] sm:p-5"
            >
              <header className="flex items-center justify-between gap-4 px-1 pb-3 sm:px-2 sm:pb-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-black/50">Dochi's resume</p>
                  <h2 id={titleId} className="mt-1 text-lg font-extrabold text-[#242424] sm:text-2xl">My ATS-friendly resume</h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeModal}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#242424] px-4 py-2 text-sm font-extrabold text-[#FFF8EE] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#242424]"
                >
                  Close <span aria-hidden="true">&times;</span>
                </button>
              </header>

              <iframe
                src="/resume.pdf"
                title="Dochi's resume PDF"
                width="100%"
                height="500"
                className="h-[72dvh] min-h-[360px] w-full rounded-xl border border-black/10 bg-white sm:h-[70dvh] sm:rounded-2xl"
              />

              <p className="px-2 pt-3 text-center text-xs text-[#5A514B]">
                PDF not showing?{' '}
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="font-extrabold underline underline-offset-2">
                  Open it in a new tab
                </a>
                .
              </p>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
