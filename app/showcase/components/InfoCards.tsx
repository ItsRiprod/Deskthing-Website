import { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

interface StatCardProps {
  value?: ReactNode;
  label?: ReactNode;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 p-3 rounded-lg text-center hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
      <h4 className={`font-medium text-3xl`}>{value}</h4>
      <p className="text">{label}</p>
    </div>
  );
}

interface InfoCardProps {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
}

export function InfoCard({ title, description, icon }: InfoCardProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div
      ref={ref}
      className={`bg-neutral-800/50 border border-neutral-700 p-3 rounded-lg flex items-center gap-4 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 ${
        isInView ? "animate-dropIn" : "opacity-0"
      }`}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className={`font-medium text-3xl`}>{title}</div>
        <div className="text">{description}</div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-neutral-800/50 border border-neutral-700 p-3 rounded-lg hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
      <div>
        <div className={`font-medium text-3xl flex gap-2 items-center`}>
          {icon}
          {title}
        </div>
        <div className="text">{description}</div>
      </div>
    </div>
  );
}

interface InfoComponentProps {
  icon: ReactNode;
  title: ReactNode;
  description: string;
  className?: string;
  children?: ReactNode;
}

export function InfoComponent({
  title,
  className,
  description,
  icon,
  children,
}: InfoComponentProps) {
  return (
    <div
      className={` p-5 rounded-lg border-t-4 ${className} transition-all hover:border-2  hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] duration-300`}
    >
      <div className="flex justify-center mb-4">
        <div className={""}>{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
      <p className="text-center text-sm">{description}</p>
      {children}
    </div>
  );
}
