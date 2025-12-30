import { useState, useRef, useEffect } from "react";
import { getProgress, PriorityBadge, StatusBadge } from "../utils/functions";
import { CiMenuKebab } from "react-icons/ci";
import type { Task } from "../api/task.api";

type Props = {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (task: Task) => void;
    onComplete?: (task: Task) => void;
};

export function TaskCard({ task, onEdit, onDelete, onComplete }: Props) {
    const { percent, overdue } = getProgress(task.createdAt, task.dueDate as string);
    const isNearDue = percent >= 90 && !overdue;

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className={`relative flex flex-col justify-between
        h-52.5 rounded-2xl p-5
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
        border
        ${overdue
                    ? "border-red-500 bg-red-50/40 dark:bg-red-900/20"
                    : isNearDue
                        ? "border-yellow-400 bg-yellow-50/40 dark:bg-yellow-900/20"
                        : "theme-border theme-surface"
                }`}
        >
            {/* Top */}
            <div>
                <div className="flex justify-between relative">
                    <span className="flex gap-2">
                        <PriorityBadge priority={task.priority} />
                        <StatusBadge status={task.status} />
                    </span>

                    <div className="relative" ref={menuRef}>
                        <CiMenuKebab
                            className="cursor-pointer"
                            size={20}
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 rounded-lg theme-surface shadow-lg theme-border border z-10">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onEdit?.(task);
                                    }}
                                    className="w-full text-left px-4 py-2 theme-text-primary theme-surface-hover transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onComplete?.(task);
                                    }}
                                    className="w-full text-left px-4 py-2 theme-text-primary theme-surface-hover transition-colors"
                                >
                                    Mark Complete
                                </button>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        onDelete?.(task);
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <h3 className="text-[15px] font-semibold theme-text-primary line-clamp-1">
                    {task.title}
                </h3>

                <p className="mt-1 text-sm theme-text-secondary line-clamp-2">
                    {task.description}
                </p>
            </div>

            {/* Bottom */}
            <div className="pt-4 border-t theme-border">
                <div className="flex items-center justify-between text-xs theme-text-muted">
                    <span>Due {new Date(task?.dueDate as string).toLocaleDateString()}</span>
                    <span
                        className={`font-medium ${overdue
                            ? "text-red-600"
                            : isNearDue
                                ? "text-yellow-600"
                                : "theme-text-muted"
                            }`}
                    >
                        {overdue ? "Overdue" : `${Math.round(100 - percent)}% left`}
                    </span>
                </div>

                {!overdue && (
                    <div className="mt-3 h-1 w-full rounded-full theme-border overflow-hidden">
                        <div
                            className={`h-full transition-all
                ${isNearDue
                                    ? "bg-yellow-400"
                                    : "bg-primary-500"
                                }`}
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
