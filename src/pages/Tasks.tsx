import { useCallback, useEffect, useState } from 'react'
import { TaskCard } from '../components/TaskCard'
import { CreateTaskForm } from '../components/TaskForm'
import { TaskFilters } from '../components/TaskFilter'
import { FilterSummary } from '../components/FilterSummary'
import Pagination from '../components/Pagination'
import { useTaskModal } from '../context/TaskModalContext'
import { useFilter } from '../context/FilterContext'
import { deleteTask, fetchTasks, type Task, type TaskFilters as ApiTaskFilters, updateTask, type TaskStatus } from '../api/task.api'
import { TaskCardSkeleton } from '../layouts/TaskCardSkeleton'

const TaskBoard: React.FC = () => {
    const { isOpen, openModal, closeModal } = useTaskModal()
    const { filters: filterState, onFilterChange } = useFilter()

    const [taskList, setTaskList] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)

    const getAllTasks = useCallback(async (filters?: ApiTaskFilters) => {
        setLoading(true)
        try {
            const res = await fetchTasks(filters)
            if (res?.success) {
                setTaskList(res.data as Task[])
                const { page, limit, total, totalPages } = res.meta;
                onFilterChange('page', page);
                onFilterChange('limit', limit);
                onFilterChange('total', total);
                onFilterChange('totalPages', totalPages);
            }
        } finally {
            setLoading(false)
        }
    }, [])

    // Initial fetch
    useEffect(() => {
        getAllTasks()
    }, [getAllTasks])

    // Handle apply filters
    useEffect(() => {
        const apiFilters: ApiTaskFilters = {};

        if (filterState.status) {
            apiFilters.status = filterState.status as import('../api/task.api').TaskStatus;
        }

        if (filterState.priority) {
            apiFilters.priority = filterState.priority as import('../api/task.api').TaskPriority;
        }

        if (filterState.sortField && filterState.sortField !== 'priority') {
            apiFilters.sort = filterState.sortField as 'createdAt' | 'dueDate';
        }

        if (filterState.sortOrder) {
            apiFilters.order = filterState.sortOrder;
        }

        apiFilters.limit = filterState.limit;
        apiFilters.page = filterState.page;

        getAllTasks(apiFilters);
    }, [
        filterState.page,
        filterState.limit,
        filterState.status,
        filterState.priority,
        filterState.sortField,
        filterState.sortOrder,
        getAllTasks,
    ]);

    const handleCreateTask = useCallback(() => {
        openModal("create")
    }, [openModal])

    const handleDeleteTask = useCallback(
        async (taskId: string) => {
            try {
                const res = await deleteTask(taskId)
                if (res?.success) {
                    setTaskList(prev => prev.filter(task => task.id !== taskId))
                }
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const handleEditTask = useCallback(
        (taskId: string) => {
            openModal(taskId)
        },
        [openModal]
    )

    const handleCloseModal = useCallback(() => {
        closeModal()
    }, [closeModal])

    const handleMarkComplete = async (data: string) => {
        const form = { status: "completed" as TaskStatus }
        await updateTask(data, form);
        getAllTasks()
    }

    return (
        <div className="flex flex-col">
            {/* Desktop filters */}
            <div className="hidden md:block mb-4">
                <TaskFilters />
            </div>

            {/* Mobile filter summary */}
            <div className="md:hidden mb-4">
                <FilterSummary />
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Add Task Card (desktop only) */}
                <button
                    onClick={handleCreateTask}
                    className="
            hidden md:flex h-52.5 rounded-2xl
            border-2 border-dashed theme-border
            theme-surface
            flex-col items-center justify-center
            theme-text-muted
            transition-all duration-200
            hover:border-primary-500 hover:text-primary-600
            hover:bg-primary-50/40
          "
                >
                    <div className="h-12 w-12 rounded-full border theme-border flex items-center justify-center text-2xl">
                        +
                    </div>
                    <span className="mt-3 text-sm font-medium">Add new task</span>
                </button>

                {/* Loading */}
                {loading && (
                    <TaskCardSkeleton />
                )}

                {/* Empty state */}
                {!loading && taskList.length === 0 && (
                    <div className="col-span-full text-center theme-text-muted">
                        No tasks found
                    </div>
                )}

                {/* Task cards */}
                {!loading && taskList.length > 0 && (
                    taskList.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => handleEditTask(task.id)}
                            onDelete={() => handleDeleteTask(task.id)}
                            onComplete={() => handleMarkComplete(task?.id)}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {(filterState?.total && filterState?.limit < filterState?.total) &&
                <Pagination
                    totalPages={filterState?.totalPages as number}
                    currentPage={filterState?.page}
                    onPageChange={(page) => {
                        onFilterChange('page', page);
                    }}
                />}

            {/* Create / Edit Modal */}
            <CreateTaskForm
                open={isOpen !== ""}
                data={isOpen}
                close={handleCloseModal}
                onSubmit={() => {
                    getAllTasks()
                }}
            />
        </div>
    )
}

export default TaskBoard
