import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { PAGINATION } from '../utils/constant';

export type Filters = {
    status: string;
    priority: string;
    sortField: string;
    sortOrder: 'asc' | 'desc';
    limit: number;
    page: number;
    total?: number;
    totalPages?: number;
};

interface FilterContextType {
    filters: Filters;
    onFilterChange: <K extends keyof Filters>(
        name: K,
        value: Filters[K]
    ) => void;
    clearAllFilters: () => void;
    removeFilter: (filterKey: keyof Filters) => void;
}

const defaultFilters: Filters = {
    status: '',
    priority: '',
    sortField: 'dueDate',
    sortOrder: 'asc',
    limit: PAGINATION?.limit,
    page: PAGINATION?.page,
    total: 0,
    totalPages: 0,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<Filters>(defaultFilters);

    const onFilterChange = useCallback(
        <K extends keyof Filters>(name: K, value: Filters[K]) => {
            setFilters(prev => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const clearAllFilters = useCallback(() => {
        setFilters(defaultFilters);
    }, []);

    const removeFilter = useCallback((filterKey: keyof Filters) => {
        setFilters(prev => {
            const updates: Partial<Filters> = {};

            if (filterKey === 'sortField' || filterKey === 'sortOrder') {
                // Reset both sort fields together
                updates.sortField = 'dueDate';
                updates.sortOrder = 'asc';
            } else if (filterKey === 'limit') {
                updates.limit = PAGINATION?.limit;
            } else if (filterKey === 'status' || filterKey === 'priority') {
                // Reset status or priority to empty strings
                updates[filterKey] = '';
            }

            return { ...prev, ...updates };
        });
    }, []);

    return (
        <FilterContext.Provider
            value={{ filters, onFilterChange, clearAllFilters, removeFilter }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
