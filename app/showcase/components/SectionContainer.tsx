import { AppWindow } from "lucide-react";
import { useInView } from "../../hooks/useInView"

interface SectionContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string
  iconBgColor?: string;
  titleColor?: string;
  index?: number;
}
export const SectionContainer = ({
  title,
  description,
  children,
  className,
  icon = <AppWindow className="w-5 h-5" />,
  iconBgColor = "bg-transparent",
  titleColor = "text-white",
  index = 0
}: SectionContainerProps) => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`${className} border border-neutral-700 rounded-lg p-4 transition-all duration-500 transform ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
      style={{ 
        transitionDelay: `${index * 150}ms` 
      }}
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center">
        <div
          className={`w-8 h-8 rounded-full ${iconBgColor} flex items-center justify-center mr-2`}
        >
          {icon}
        </div>
        <span className={titleColor}>{title}</span>
      </h3>
      <p className="mb-3">{description}</p>
      {children}
    </div>
  );
};
