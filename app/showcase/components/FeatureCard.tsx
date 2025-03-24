export function FeatureCardA({
  title,
  description,
  titleColor,
}: {
  title: string;
  description: string;
  titleColor: string;
}) {
  return (
    <div
      className={` p-3 rounded-lg transition-all border-2 border-transparent hover:border-2 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]`}
    >
      <h4 className={`text-md font-medium ${titleColor} mb-1`}>{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
}

interface FeatureCardIconProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor: string;
}

export function FeatureCardB({
  icon,
  title,
  description,
  iconColor,
}: FeatureCardIconProps) {
  return (
    <div className=" p-5 bg-neutral-800 rounded-lg flex flex-col h-full border-2 border-transparent transition-all hover:border-2 hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
      <div className="flex items-center mb-3">
        <div className={`${iconColor} mr-3`}>{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
}

interface FeatureCardC {
    icon: React.ReactNode;
    iconColor: string;
    title: string;
    description: string;
    borderColor: string;
  }

export function FeatureCardC({ icon, iconColor, title, description, borderColor }: FeatureCardC) {
    return (
      <div className={` p-5 rounded-lg border-t-4 ${borderColor} transition-all hover:border-2 hover:${borderColor} hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]`}>
        <div className="flex justify-center mb-4">
          <div className={iconColor}>{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">{title}</h3>
        <p className="text-center text-sm">{description}</p>
      </div>
    );
  }
