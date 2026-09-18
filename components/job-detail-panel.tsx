"use client";


import { Job, JobStatus } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobDetailPanelProps {
  job: Job | null;
  onClose: () => void;
  onStatusChange: (jobId: string, newStatus: JobStatus) => void;
}

const statuses: JobStatus[] = ["Pending", "In Progress", "Delayed", "Completed"];

export function JobDetailPanel({ job, onClose, onStatusChange }: JobDetailPanelProps) {
  return (
    <Sheet open={!!job} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md">
        {job && (
          <>
            <SheetHeader>
              <SheetTitle>{job.id}</SheetTitle>
            </SheetHeader>

            <div className="px-4 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Product</p>
                <p className="font-medium">{job.productName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="font-medium">{job.customer}</p>
              </div>

              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{job.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{job.dueDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Assigned Machine</p>
                <p className="font-medium">{job.assignedMachine}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Notes</p>
                <p className="text-sm">
                  {job.notes || "No notes for this job."}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <Select
                  value={job.status}
                  onValueChange={(value) => onStatusChange(job.id, value as JobStatus)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}