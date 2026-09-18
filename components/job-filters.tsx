"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/lib/types";
import { Search } from "lucide-react";

export type SortOption = "dueDate" | "quantity" | "none";

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: JobStatus | "All";
  onStatusFilterChange: (value: JobStatus | "All") => void;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
}

const statuses: (JobStatus | "All")[] = [
  "All",
  "Pending",
  "In Progress",
  "Delayed",
  "Completed",
];

export function JobFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}: JobFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by job ID, product, or customer..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusFilterChange(v as JobStatus | "All")}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={(v) => onSortByChange(v as SortOption)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No sorting</SelectItem>
          <SelectItem value="dueDate">Due date</SelectItem>
          <SelectItem value="quantity">Quantity</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}