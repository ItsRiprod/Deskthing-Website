interface VisionCardProps {
  title: string;
  description: string;
  color: string;
}

export function VisionCard({ title, description, color }: VisionCardProps) {
    return (
      <div className="bg-neutral-800 p-3 rounded-lg">
        <h4 className={`font-medium text-${color}-400 mb-1`}>{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    );
  }
  