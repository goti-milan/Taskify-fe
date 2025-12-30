import { useState } from "react";

type Props = {
  onFilterChange: (query: Record<string, any>) => void;
};

export function TaskFilters({ onFilterChange }: Props) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortField, setSortField] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit, setLimit] = useState(10);

  const handleApply = () => {
    onFilterChange({
      status: status || undefined,
      priority: priority || undefined,
      sort: sortField,
      order: sortOrder,
      limit,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 theme-surface rounded-2xl shadow-sm transition-theme">
      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm theme-surface theme-text-primary transition-colors"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm theme-surface theme-text-primary transition-colors"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort Field */}
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm theme-surface theme-text-primary transition-colors"
      >
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created At</option>
      </select>

      {/* Sort Order */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="rounded-lg theme-border px-3 py-2 text-sm theme-surface theme-text-primary transition-colors"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {/* Limit */}
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        min={1}
        className="w-16 rounded-lg theme-border px-3 py-2 text-sm theme-surface theme-text-primary transition-colors"
        placeholder="Limit"
      />

      {/* Apply */}
      <button
        onClick={handleApply}
        className="ml-auto rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
