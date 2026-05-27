interface NoteSingleProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoteSingle({
  title,
  content,
  createdAt,
}: NoteSingleProps) {
  return (
    <article
      className="
        w-[300px] rounded-2xl border border-border
        bg-card/80 p-5 transition-all duration-200
        hover:-translate-y-1 hover:border-accent/40
        hover:bg-card cursor-pointer  flex flex-col justify-between
      "
    >
      <div>
        <h2 className="line-clamp-2 text-lg font-semibold text-foreground">
          {title}
        </h2>

        <p
          className="
            mt-3 line-clamp-5 text-sm leading-7
            text-secondary
          "
        >
          {content}
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-3">
        <p className="text-xs text-secondary/70">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}
