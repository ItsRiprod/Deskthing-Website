// AppFeatureCard.tsx
interface AppFeatureCardProps {
  title: string;
  description: string;
  color?: string;
}

export function AppFeatureCard({
  title,
  description,
  color = "pink",
}: AppFeatureCardProps) {
  return (
    <div className="bg-neutral-700 p-3 rounded-lg">
      <h4 className={`font-medium text-${color}-400`}>{title}</h4>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
}
