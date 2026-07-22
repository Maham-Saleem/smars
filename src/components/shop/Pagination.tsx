import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Props {
  current: number;
  total: number;
  onPage: (page: number) => void;
}

export default function Pagination({ current, total, onPage }: Props) {
  if (total <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPage(current - 1)}
        disabled={current === 1}
        className="w-10 h-10 rounded-full border border-dark-brown/20 flex items-center justify-center text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <HiChevronLeft size={18} />
      </button>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPage(i + 1)}
          className={`w-10 h-10 rounded-full font-body text-sm transition-all ${
            current === i + 1
              ? 'bg-dark-brown text-cream'
              : 'border border-dark-brown/20 text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPage(current + 1)}
        disabled={current === total}
        className="w-10 h-10 rounded-full border border-dark-brown/20 flex items-center justify-center text-dark-brown/50 hover:border-dark-brown hover:text-dark-brown disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <HiChevronRight size={18} />
      </button>
    </div>
  );
}
