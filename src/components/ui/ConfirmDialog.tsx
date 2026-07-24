import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLogout, HiX } from 'react-icons/hi';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', icon, onConfirm, onCancel }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-espresso/60 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm bg-cream p-8 shadow-2xl"
          >
            <button
              onClick={onCancel}
              aria-label="Close"
              className="absolute top-4 right-4 text-espresso/25 hover:text-espresso transition-colors"
            >
              <HiX size={18} />
            </button>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-espresso/[0.04] flex items-center justify-center mx-auto mb-5">
                {icon || <HiOutlineLogout size={24} className="text-espresso/40" />}
              </div>
              <h2 className="font-heading text-xl text-espresso mb-2">{title}</h2>
              <p className="text-espresso/45 text-sm font-light leading-relaxed">{message}</p>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={onCancel}
                className="flex-1 py-3 border border-espresso/10 text-espresso/45 text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:border-espresso/25 hover:text-espresso/70 transition-all duration-500"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-3 bg-espresso text-cream text-[9px] tracking-[0.3em] uppercase font-body rounded-full hover:bg-bronze transition-all duration-500 shadow-sm"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
