import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useInView } from "../../hooks/useInView";
import { useState } from "react";
interface CodeComponentProps {
  code: string;
}
export const CodeComponent = ({ code }: CodeComponentProps) => {
  return (
    <SyntaxHighlighter
      showLineNumbers
      language="typescript"
      style={atomOneDarkReasonable}
      wrapLines={true}
      customStyle={{
        background: "transparent",
        padding: "0",
        margin: "0",
        fontSize: "0.9rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

interface CodeBoxProps {
  code: string;
  forceOpen?: boolean;
}

export const CodeBox = ({ code, forceOpen = false }: CodeBoxProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => setIsExpanded(!isExpanded)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
            bg-neutral-800/50 
            border border-neutral-700 
            p-3 rounded-lg 
            max-w-screen
            transition-all duration-300 
            transform cursor-pointer
            ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
            ${
              isExpanded || forceOpen
                ? "h-auto max-w-screen overflow-x-auto"
                : "max-h-[300px] overflow-hidden"
            }
            ${
              isHovered
                ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                : ""
            }
            hover:scale-[1.02]
            relative
          `}
    >
      {!forceOpen && (
        <div className="absolute top-1 right-1 text-xs text-neutral-300">
          {isExpanded ? "Click to collapse" : "Click to expand"}
        </div>
      )}
      <div
        className={`transition-opacity duration-300 ${
          isExpanded || forceOpen ? "opacity-100" : "opacity-80"
        }`}
      >
        {isInView ? <CodeComponent code={code} /> : <div className="h-64">Loading...</div>}
      </div>
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-800/50 to-transparent" />
      )}
    </div>
  );
};
