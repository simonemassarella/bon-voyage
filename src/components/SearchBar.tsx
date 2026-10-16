interface SearchBarProps {
  destinationPlaceholder?: string;
  dateLabel?: string;
}

export default function SearchBar({
  destinationPlaceholder = "Dove vuoi andare?",
  dateLabel = "Quando?",
}: SearchBarProps) {
  return (
    <form
      role="search"
      className="flex w-full max-w-xl items-center gap-2 rounded-button bg-light p-2 font-sans shadow-lg"
    >
      <input
        type="text"
        name="destination"
        placeholder={destinationPlaceholder}
        aria-label="Destinazione"
        className="min-w-0 flex-1 bg-transparent px-4 text-base text-dark outline-none placeholder:text-muted"
      />

      <div className="h-6 w-px shrink-0 bg-muted/30" aria-hidden="true" />

      <label className="flex shrink-0 items-center gap-2 px-3">
        <span className="text-badge font-semibold uppercase tracking-wide text-muted">
          {dateLabel}
        </span>
        <input
          type="date"
          name="date"
          aria-label={dateLabel}
          className="bg-transparent text-base text-dark outline-none"
        />
      </label>

      <button
        type="submit"
        aria-label="Cerca"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button bg-brand text-light transition-opacity hover:opacity-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}
