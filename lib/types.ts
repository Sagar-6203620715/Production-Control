export type JobStatus = "Pending" | "In Progress" | "Delayed" | "Completed";

export interface Job {
  id: string;
  productName: string;
  customer: string;
  quantity: number;
  dueDate: string; // ISO date string
  status: JobStatus;
  assignedMachine: string;
  notes?: string;
}