import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface FilterContextType {
    filters: {
        status: string;
        priority: string;
        sortField: string;
        sortOrder: 'asc' | 'desc';
        limit: number;
    };
    onFilterChange: (query: Record<string, any>) => void;
    clearAllFilters: () => void;
    removeFilter: (filterKey: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        sortField: 'dueDate',
        sortOrder: 'asc' as 'asc' | 'desc',
        limit: 10
    });

    const onFilterChange = useCallback((query: Record<string, any>) => {
        console.log('Filters changed:', query);

        setFilters(prev => ({
            ...prev,
            status: query.status || '',
            priority: query.priority || '',
            sortField: query.sort || 'dueDate',
            sortOrder: query.order || 'asc',
            limit: query.limit || 10
        }));
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters({
            status: '',
            priority: '',
            sortField: 'dueDate',
            sortOrder: 'asc',
            limit: 10
        });

        // Also call the onFilterChange with default values
        onFilterChange({
            status: undefined,
            priority: undefined,
            sort: 'dueDate',
            order: 'asc',
            limit: 10,
        });
    }, [onFilterChange]);

    const removeFilter = useCallback((filterKey: string) => {
        const newFilters = { ...filters };

        if (filterKey === 'status') {
            newFilters.status = '';
        } else if (filterKey === 'priority') {
            newFilters.priority = '';
        } else if (filterKey === 'sortField') {
            newFilters.sortField = 'dueDate';
            newFilters.sortOrder = 'asc';
        } else if (filterKey === 'limit') {
            newFilters.limit = 10;
        }

        setFilters(newFilters);

        // Also call the onFilterChange with updated values
        onFilterChange({
            status: newFilters.status || undefined,
            priority: newFilters.priority || undefined,
            sort: newFilters.sortField,
            order: newFilters.sortOrder,
            limit: newFilters.limit,
        });
    }, [filters, onFilterChange]);

    return (
        <FilterContext.Provider value={{ filters, onFilterChange, clearAllFilters, removeFilter }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
