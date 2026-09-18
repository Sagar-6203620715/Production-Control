"use client";

import { useState } from "react";
import { SummaryCards } from "@/components/ui/summary-cards";
import { JobsTable } from "@/components/jobs-table";
import { JobDetailPanel } from "@/components/job-detail-panel";
import { mockJobs } from "@/lib/mock-data";
import { Job, JobStatus } from "@/lib/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  function handleStatusChange(jobId: string, newStatus: JobStatus) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, status: newStatus } : prev
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Production Control Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of active jobs and machine status
        </p>
      </div>

      <SummaryCards jobs={jobs} />

      <JobsTable jobs={jobs} onJobClick={setSelectedJob} />

      <JobDetailPanel
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}