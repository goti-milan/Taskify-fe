import { useState } from "react";
import { Modal } from "./Modal";
import CenterButton from "./CenterButton";

export type TaskStatus = "pending" | "in-progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export type CreateTaskInput = {
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
};


export function CreateTaskForm({
    open,
    close,
    onSubmit,
}: {
    open: boolean;
    close: () => void;
    onSubmit: (data: CreateTaskInput) => void;
}) {
    const [form, setForm] = useState<CreateTaskInput>({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <Modal open={open} onClose={close} title="Create Task">

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium theme-text-primary mb-1">
                        Title
                    </label>
                    <input
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Task title"
                        className="mt-1 w-full rounded-lg theme-border theme-surface theme-text-primary px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium theme-text-primary mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Optional description"
                        className="mt-1 w-full rounded-lg theme-border theme-surface theme-text-primary px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                    />
                </div>

                {/* Status + Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium theme-text-primary mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg theme-border theme-surface theme-text-primary px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium theme-text-primary mb-1">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg theme-border theme-surface theme-text-primary px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <label className="block text-sm font-medium theme-text-primary mb-1">
                        Due Date
                    </label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg theme-border theme-surface theme-text-primary px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t theme-border">
                    <CenterButton
                        type="button"
                        onClick={close}
                        variant="ghost"
                        size="sm"
                    >
                        Cancel
                    </CenterButton>
                    <CenterButton
                        type="submit"
                        variant="primary"
                        size="sm"
                    >
                        Create Task
                    </CenterButton>
                </div>
            </form>
        </Modal>
    );
}
