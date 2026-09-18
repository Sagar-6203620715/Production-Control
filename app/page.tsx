"use client";

import { useState } from "react";
import { SummaryCards } from "@/components/ui/summary-cards";
import { JobsTable } from "@/components/jobs-table";
import { JobDetailPanel } from "@/components/job-detail-panel";
import { JobFilters, SortOption } from "@/components/job-filters";
import { mockJobs } from "@/lib/mock-data";
import { Job, JobStatus } from "@/lib/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("none");

  function handleStatusChange(jobId: string, newStatus: JobStatus) {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    setSelectedJob((prev) =>
      prev && prev.id === jobId ? { ...prev, status: newStatus } : prev
    );
  }

  let visibleJobs = jobs.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(search.toLowerCase()) ||
      job.productName.toLowerCase().includes(search.toLowerCase()) ||
      job.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (sortBy === "dueDate") {
    visibleJobs = [...visibleJobs].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  } else if (sortBy === "quantity") {
    visibleJobs = [...visibleJobs].sort((a, b) => b.quantity - a.quantity);
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

      <JobFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <JobsTable jobs={visibleJobs} onJobClick={setSelectedJob} />

      <JobDetailPanel
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onStatusChange={handleStatusChange}
      />
    </main>
  );
}