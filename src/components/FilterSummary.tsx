import { useFilter } from '../context/FilterContext';

export function FilterSummary() {
    const { filters, clearAllFilters, removeFilter } = useFilter();
    const { status, priority, sortField, sortOrder, limit } = filters;

    const getFilterDisplayName = (key: string, value: string) => {
        const displayNames: Record<string, Record<string, string>> = {
            status: {
                'pending': 'Pending',
                'in-progress': 'In Progress',
                'completed': 'Completed'
            },
            priority: {
                'low': 'Low',
                'medium': 'Medium',
                'high': 'High'
            },
            sortField: {
                'dueDate': 'Due Date',
                'priority': 'Priority',
                'createdAt': 'Created At'
            }
        };

        return displayNames[key]?.[value] || value;
    };



    // Don't show anything if no filters are active
    const hasActiveFilters = status || priority || sortField !== 'dueDate' || sortOrder !== 'asc' || limit !== 10;

    if (!hasActiveFilters) {
        return null;
    }

    const activeFilters = [
        ...(status ? [{ key: 'status', label: getFilterDisplayName('status', status), value: status }] : []),
        ...(priority ? [{ key: 'priority', label: getFilterDisplayName('priority', priority), value: priority }] : []),
        ...(sortField !== 'dueDate' || sortOrder !== 'asc' ? [{
            key: 'sortField',
            label: `${getFilterDisplayName('sortField', sortField)} (${sortOrder})`,
            value: `${sortField}-${sortOrder}`
        }] : []),
        ...(limit !== 10 ? [{ key: 'limit', label: `Limit: ${limit}`, value: limit.toString() }] : [])
    ];

    return (
        <div className="mb-4 p-3 theme-surface rounded-lg border theme-border">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium theme-text-primary">Active Filters</h3>
                <button
                    onClick={clearAllFilters}
                    className="text-xs theme-text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                    <div
                        key={filter.key}
                        className="flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs"
                    >
                        <span>{filter.label}</span>
                        <button
                            onClick={() => removeFilter(filter.key)}
                            className="ml-1 hover:text-primary-900 dark:hover:text-primary-100 transition-colors"
                            aria-label={`Remove ${filter.label} filter`}
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
