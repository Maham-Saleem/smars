import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Props {
  current: number;
  total: number;
  onPage: (page: number) => void;
}

export default function Pagination({ current, total, onPage }: Props) {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-16">
      <button
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 flex items-center justify-center text-espresso/20 hover:text-espresso/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronLeft size={16} />
      </button>
      {Array.from({ length: total }).map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPage(page)}
            className={`w-10 h-10 text-xs tracking-[0.2em] font-body transition-all duration-500 ${
              current === page
                ? 'text-espresso border-b border-bronze/60'
                : 'text-espresso/20 hover:text-espresso/50'
            }`}
          >
            {String(page).padStart(2, '0')}
          </button>
        );
      })}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current === total}
        className="w-10 h-10 flex items-center justify-center text-espresso/20 hover:text-espresso/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight size={16} />
      </button>
    </div>
  );
}
