import CenterButton from "./CenterButton";
import { useFilter } from "../context/FilterContext";

export function TaskFilters() {
  const { filters, onFilterChange } = useFilter();

  const handleApply = () => {
    // Use filters to call API
    // Example:
    // fetchTasks(filters)
    console.log("Applying filters:", filters);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 theme-surface rounded-2xl shadow-sm transition-theme">

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={filters.priority}
        onChange={(e) => onFilterChange("priority", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort Field */}
      <select
        value={filters.sortField}
        onChange={(e) => onFilterChange("sortField", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created At</option>
      </select>

      {/* Sort Order */}
      <select
        value={filters.sortOrder}
        onChange={(e) =>
          onFilterChange("sortOrder", e.target.value as "asc" | "desc")
        }
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {/* Limit */}
      <input
        type="number"
        min={1}
        value={filters.limit}
        onChange={(e) => onFilterChange("limit", Number(e.target.value))}
        className="w-16 rounded-lg theme-border px-3 py-2 text-sm"
      />

      <CenterButton
        onClick={handleApply}
        variant="primary"
        size="sm"
        className="ml-auto"
      >
        Apply
      </CenterButton>
    </div>
  );
}
