import { useCallback } from 'react'
import { TaskCard } from '../components/TaskCard'
import { tasks } from '../utils/data'
import { CreateTaskForm } from '../components/TaskForm'
import { TaskFilters } from '../components/TaskFilter'
import { FilterSummary } from '../components/FilterSummary'
import Pagination from '../components/Pagination'
import { useTaskModal } from '../context/TaskModalContext'
import { useFilter } from '../context/FilterContext'

const TaskBoard: React.FC = () => {
    const { isOpen, closeModal, openCreateTask } = useTaskModal();
    const { onFilterChange } = useFilter();

    // Only show the add task button on desktop (not mobile since mobile has bottom bar)
    const showAddTaskButton = typeof window !== 'undefined' && window.innerWidth >= 768

    // Check if we're on mobile (this would be better handled by context or props, but for simplicity)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const handleCreateTask = useCallback(() => {
        openCreateTask();
    }, [openCreateTask]);

    const handleEditTask = useCallback((_taskId: string) => {
        openCreateTask();
    }, [openCreateTask]);

    const handleCloseModal = useCallback(() => {
        closeModal();
    }, [closeModal]);

    return (
        <div className="p-4">
            <h1 className="text-2xl md:text-3xl font-bold theme-text-primary mb-4">Task Board</h1>

            {/* Desktop: Show filters inline, Mobile: Show filter summary */}
            {isMobile ? (
                <div className="mb-4">
                    <FilterSummary />
                </div>
            ) : (
                <div className="mb-4">
                    <TaskFilters onFilterChange={onFilterChange} />
                </div>
            )}

            <div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4'>
                {showAddTaskButton && (
                    <button
                        onClick={handleCreateTask}
                        className="h-[270px] rounded-2xl
            border-2 border-dashed theme-border
            theme-surface
            flex flex-col items-center justify-center
            theme-text-muted
            transition-all duration-200
            hover:border-primary-500 hover:text-primary-600
            hover:bg-primary-50/40"
                    >
                        {/* Plus icon */}
                        <div className="h-12 w-12 rounded-full border theme-border
                flex items-center justify-center text-2xl font-light">
                            +
                        </div>

                        <span className="mt-3 text-sm font-medium">
                            Add new task
                        </span>
                    </button>
                )}
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={() => handleEditTask(task.id)} />
                ))}
                <Pagination />
            </div>
            <CreateTaskForm
                open={isOpen}
                close={handleCloseModal}
                onSubmit={(data) => {
                    console.log(data);
                    handleCloseModal();
                }}
            />
        </div>
    )
}

export default TaskBoard
