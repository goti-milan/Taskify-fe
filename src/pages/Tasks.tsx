import { useCallback, useEffect, useState } from 'react'
import { TaskCard } from '../components/TaskCard'
import { CreateTaskForm } from '../components/TaskForm'
import { TaskFilters } from '../components/TaskFilter'
import { FilterSummary } from '../components/FilterSummary'
import Pagination from '../components/Pagination'
import { useTaskModal } from '../context/TaskModalContext'
import { fetchTasks, type Task } from '../api/task.api'

const TaskBoard: React.FC = () => {
    const { isOpen, closeModal, openCreateTask } = useTaskModal()

    const [taskList, setTaskList] = useState<Task[]>([])
    const [loading, setLoading] = useState(false)

    const getAllTasks = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetchTasks()
            if (res?.success) {
                setTaskList(res.data as Task[])
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getAllTasks()
    }, [getAllTasks])

    const handleCreateTask = useCallback(() => {
        openCreateTask()
    }, [openCreateTask])

    const handleEditTask = useCallback(
        (_taskId: string) => {
            openCreateTask()
        },
        [openCreateTask]
    )

    const handleCloseModal = useCallback(() => {
        closeModal()
    }, [closeModal])

    return (
        <div className="flex flex-col">
            <h1 className="mb-4 text-2xl md:text-3xl font-bold theme-text-primary">
                Task Board
            </h1>

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
                    <div className="col-span-full text-center theme-text-muted">
                        Loading tasks...
                    </div>
                )}

                {/* Empty state */}
                {!loading && taskList.length === 0 && (
                    <div className="col-span-full text-center theme-text-muted">
                        No tasks found
                    </div>
                )}

                {/* Task cards */}
                {taskList.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => handleEditTask(task.id)}
                    />
                ))}
            </div>

            {/* Pagination */}
            <Pagination />

            {/* Create / Edit Modal */}
            <CreateTaskForm
                open={isOpen}
                close={handleCloseModal}
                onSubmit={(data) => {
                    console.log(data)
                    handleCloseModal()
                    getAllTasks()
                }}
            />
        </div>
    )
}

export default TaskBoard
