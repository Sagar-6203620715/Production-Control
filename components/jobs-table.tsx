"use client";

import { Job, JobStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface JobsTableProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

const statusStyles: Record<JobStatus, string> = {
  Pending: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  "In Progress": "bg-blue-100 text-blue-700 hover:bg-blue-100",
  Delayed: "bg-red-100 text-red-700 hover:bg-red-100",
  Completed: "bg-green-100 text-green-700 hover:bg-green-100",
};

export function JobsTable({ jobs, onJobClick }: JobsTableProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No jobs match your filters.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Machine</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id}
              className="cursor-pointer"
              onClick={() => onJobClick(job)}
            >
              <TableCell className="font-medium">{job.id}</TableCell>
              <TableCell>{job.productName}</TableCell>
              <TableCell>{job.customer}</TableCell>
              <TableCell className="text-right">{job.quantity}</TableCell>
              <TableCell>{job.dueDate}</TableCell>
              <TableCell>
                <Badge className={statusStyles[job.status]} variant="secondary">
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{job.assignedMachine}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}