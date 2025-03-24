import { MessageSquareQuote } from "lucide-react"

interface TestimonialCardProps {
  quote: string;
  author: string;
  link: string;
  linkText: string;
  color: string;
  avatar: {
    type: 'image';
    src: string;
    srcSet: string;
  } | {
    type: 'initials';
    initials: string;
  }
}

export function TestimonialCard({ quote, author, link, linkText, color, avatar }: TestimonialCardProps) {

    return (
      <div className="p-5 bg-neutral-800 rounded-lg relative">
        <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-${color}-900 flex items-center justify-center`}>
          <MessageSquareQuote size={16} className={`text-${color}-400`} />
        </div>
        <p className="italic text-gray-300">{quote}</p>
        <div className="mt-4 flex items-center">
          {avatar.type === 'image' ? (
            <img 
              src={avatar.src}
              srcSet={avatar.srcSet}
              alt={author}
              className="w-8 h-8 rounded-full mr-3"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center mr-3">
              <span className="text-sm font-bold">{avatar.initials}</span>
            </div>
          )}
          <div>
            <p className="font-medium">{author}</p>
            <a href={link} className="text-sm text-blue-400 hover:underline">
              {linkText}
            </a>
          </div>
        </div>
      </div>
    );
  }