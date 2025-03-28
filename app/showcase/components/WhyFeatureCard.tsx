interface WhyFeatureCardProps {
  icon: React.ElementType;
  title: string;
  color: string;
  children: React.ReactNode;
}

export function WhyFeatureCard({ icon: Icon, title, color, children }: WhyFeatureCardProps) {
    return (
      <div className="p-5 rounded-lg">
        <div className="flex items-center mb-3">
          <Icon className={`text-${color}-400 mr-3`} size={40} />
          <h3 className="text-3xl font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    );
  }