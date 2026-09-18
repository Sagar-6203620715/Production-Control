import { Job } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface SummaryCardsProps {
  jobs: Job[];
}

export function SummaryCards({ jobs }: SummaryCardsProps) {
  const total = jobs.length;
  const delayed = jobs.filter((j) => j.status === "Delayed").length;
  const completed = jobs.filter((j) => j.status === "Completed").length;

  const today = new Date();
  const in3Days = new Date();
  in3Days.setDate(today.getDate() + 3);

  const dueSoon = jobs.filter((j) => {
    const due = new Date(j.dueDate);
    return due >= today && due <= in3Days && j.status !== "Completed";
  }).length;

  const stats = [
    { label: "Total Jobs", value: total },
    { label: "Delayed", value: delayed },
    { label: "Due Soon", value: dueSoon },
    { label: "Completed", value: completed },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-semibold">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}