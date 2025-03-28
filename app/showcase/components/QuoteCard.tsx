interface QuoteCardProps {
    quote: string;
    link?: {
      text: string;
      url: string;
    };
    background?: string;
  }
  
  export function QuoteCard({ quote, link, background = 'bg-neutral-800' }: QuoteCardProps) {
    return (
      <div className={`mt-4 ${background} p-3 rounded-lg`}>
        <p className="text-sm italic text-neutral-300">
          {quote}
          {link && (
            <>
              {" "}
              <a href={link.url} className="text-blue-400 hover:underline">
                {link.text}
              </a>
              .
            </>
          )}
        </p>
      </div>
    );
  }