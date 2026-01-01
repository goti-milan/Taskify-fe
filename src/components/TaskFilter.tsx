import { useFilter } from "../context/FilterContext";
import type { Filters } from "../context/FilterContext";

interface TaskFiltersProps {
  onApply?: (filters: Filters) => void;
  onClear?: () => void;
  onFilterChange?: <K extends keyof Filters>(name: K, value: Filters[K]) => void;
}

export function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const { filters: contextFilters, onFilterChange: contextOnFilterChange } = useFilter();
  const handleFilterChange = onFilterChange || contextOnFilterChange;

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 theme-surface rounded-2xl shadow-sm transition-theme">

      {/* Status */}
      <select
        value={contextFilters.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="
    rounded-lg
    px-3 py-2 text-sm
    theme-border
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-primary
  "
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
        className="
    rounded-lg
    px-3 py-2 text-sm
    theme-border
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-primary
  "
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
        className="
    rounded-lg
    px-3 py-2 text-sm
    theme-border
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-primary
  "
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
        className="
    rounded-lg
    px-3 py-2 text-sm
    theme-border
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-primary
  "
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
        className="
    w-16
    rounded-lg
    px-3 py-2 text-sm
    theme-border
    bg-white text-gray-900
    dark:bg-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-primary
  "
      />
    </div>
  );
}
