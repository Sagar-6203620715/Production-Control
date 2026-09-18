import { SummaryCards } from "@/components/ui/summary-cards";
import { mockJobs } from "@/lib/mock-data";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Production Control Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of active jobs and machine status
        </p>
      </div>

      <SummaryCards jobs={mockJobs} />
    </main>
  );
}