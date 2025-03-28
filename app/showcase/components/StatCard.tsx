interface StatCardProps {
  value: string | number;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
    return (
      <div className="bg-neutral-700 p-3 rounded-lg text-center">
        <h4 className="text-blue-400 font-medium text-lg">{value}</h4>
        <p className="text-sm">{label}</p>
      </div>
    );
  }