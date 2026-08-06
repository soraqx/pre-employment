import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type PopupInfoProps = {
  buttonLabel?: string;
  title: string;
  children: ReactNode;
};

export default function PopupInfo({
  buttonLabel = 'Show me a helpful tip',
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
        whileTap={{ scale: 0.96 }}
        className="rounded-full bg-cocoa-600 px-5 py-3 font-extrabold text-cream-50 shadow-soft transition-colors hover:bg-cocoa-700"
      >
        {buttonLabel} <span aria-hidden="true">💡</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-cocoa-800/35 p-5 backdrop-blur-sm"
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
              initial={{ opacity: 0, scale: 0.65, y: 50, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 24 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className="relative w-full max-w-md rounded-[2rem] border border-beige-200 bg-cream-50 p-7 shadow-soft"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close tip"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-beige-100 font-bold text-cocoa-700 hover:bg-beige-200"
              >
                ×
              </button>
              <div aria-hidden="true" className="mb-3 text-4xl">🌼</div>
              <h2 id={titleId} className="pr-8 text-2xl font-extrabold text-cocoa-700">{title}</h2>
              <div className="mt-3 leading-7 text-cocoa-600">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
