import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import CenterButton from "./CenterButton";
import { FormField } from "./FormField";
import { createTask, fetchTaskById, updateTask, type TaskPriority, type TaskStatus } from "../api/task.api";

const EMPTY_FORM = {
    title: "",
    description: "",
    status: "pending" as TaskStatus,
    priority: "medium" as TaskPriority,
    dueDate: "",
};

type FormData = typeof EMPTY_FORM;

interface ValidationErrors {
    title?: string;
    status?: string;
    priority?: string;
}

function validateForm(form: FormData): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!form.title.trim()) {
        errors.title = "Title is required";
    }

    if (!form.status) {
        errors.status = "Status is required";
    }

    if (!form.priority) {
        errors.priority = "Priority is required";
    }

    return errors;
}

export function     CreateTaskForm({ open, data, close, onSubmit }: any) {
    const isEdit = data !== "create";

    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        if (!isEdit) {
            setForm(EMPTY_FORM);
            setErrors({});
            return;
        }

        const loadTask = async () => {
            setLoading(true);
            const res = await fetchTaskById(data);
            if (res?.success) {
                const task = res.data;
                setForm({
                    title: task.title,
                    description: task.description || "",
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate
                        ? new Date(task.dueDate).toISOString().split("T")[0]
                        : "",
                });
            }
            setLoading(false);
        };

        loadTask();
    }, [data, isEdit, open]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            isEdit
                ? await updateTask(data, form)
                : await createTask(form);

            onSubmit(form);
            close();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal open={open} onClose={close} title={isEdit ? "Edit Task" : "Create Task"}>
            {loading ? (
                <p className="text-center py-10">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormField
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        error={errors.title}
                        required
                    />

                    <FormField
                        label="Description"
                        name="description"
                        type="textarea"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            label="Status"
                            name="status"
                            type="select"
                            value={form.status}
                            onChange={handleChange}
                            error={errors.status}
                            options={[
                                { label: "Pending", value: "pending" },
                                { label: "In Progress", value: "in_progress" },
                                { label: "Completed", value: "completed" },
                            ]}
                            required
                        />

                        <FormField
                            label="Priority"
                            name="priority"
                            type="select"
                            value={form.priority}
                            onChange={handleChange}
                            error={errors.priority}
                            options={[
                                { label: "Low", value: "low" },
                                { label: "Medium", value: "medium" },
                                { label: "High", value: "high" },
                            ]}
                            required
                        />
                    </div>

                    <FormField
                        label="Due Date"
                        name="dueDate"
                        type="date"
                        value={form.dueDate}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t theme-border">
                        <CenterButton type="button" onClick={close} variant="ghost">
                            Cancel
                        </CenterButton>
                        <CenterButton
                            type="submit"
                            variant="primary"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Saving..."
                                : isEdit
                                    ? "Update Task"
                                    : "Create Task"}
                        </CenterButton>
                    </div>
                </form>
            )}
        </Modal>
    );
}
