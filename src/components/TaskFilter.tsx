import CenterButton from "./CenterButton";
import { useFilter } from "../context/FilterContext";
import type { Filters } from "../context/FilterContext";

interface TaskFiltersProps {
  onApply?: (filters: Filters) => void;
  onClear?: () => void;
  onFilterChange?: <K extends keyof Filters>(name: K, value: Filters[K]) => void;
}

export function TaskFilters({ onApply, onClear, onFilterChange }: TaskFiltersProps) {
  const { filters: contextFilters, onFilterChange: contextOnFilterChange, clearAllFilters } = useFilter();
  const handleFilterChange = onFilterChange || contextOnFilterChange;

  const handleApply = () => {
    if (onApply) {
      onApply(contextFilters);
    }
  };

  const handleClear = () => {
    clearAllFilters();
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 theme-surface rounded-2xl shadow-sm transition-theme">

      {/* Status */}
      <select
        value={contextFilters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={contextFilters.priority}
        onChange={(e) => handleFilterChange("priority", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Sort Field */}
      <select
        value={contextFilters.sortField}
        onChange={(e) => handleFilterChange("sortField", e.target.value)}
        className="rounded-lg theme-border px-3 py-2 text-sm"
      >
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="createdAt">Created At</option>
      </select>

      {/* Sort Order */}
      <select
        value={contextFilters.sortOrder}
        onChange={(e) =>
          handleFilterChange("sortOrder", e.target.value as "asc" | "desc")
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
        value={contextFilters.limit}
        onChange={(e) => handleFilterChange("limit", Number(e.target.value))}
        className="w-16 rounded-lg theme-border px-3 py-2 text-sm"
      />

      <CenterButton
        onClick={handleClear}
        variant="secondary"
        size="sm"
      >
        Clear
      </CenterButton>

      <CenterButton
        onClick={handleApply}
        variant="primary"
        size="sm"
      >
        Apply
      </CenterButton>
    </div>
  );
}
