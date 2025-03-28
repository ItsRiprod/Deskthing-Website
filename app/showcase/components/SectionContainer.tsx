import { AppWindow } from "lucide-react"

interface SectionContainerProps {
    title: string;
    description: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    iconBgColor?: string;
    titleColor?: string;
  }
  
  export const SectionContainer = ({
    title,
    description,
    children,
    icon = <AppWindow className="w-5 h-5" />,
    iconBgColor = "bg-transparent",
    titleColor = "text-white",
  }: SectionContainerProps) => {
    return (
      <div className="border border-neutral-700 rounded-lg p-4">
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