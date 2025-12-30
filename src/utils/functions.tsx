import type { TaskPriority, TaskStatus } from "../api/task.api";

export function getProgress(createdAt: string, dueDate: string) {
  const created = new Date(createdAt).getTime();
  const due = new Date(dueDate).getTime();
  const now = Date.now();

  if (now >= due) {
    return { percent: 100, overdue: true };
  }

  const total = due - created;
  const elapsed = now - created;

  const percent = Math.min(100, Math.max(0, (elapsed / total) * 100));

  return { percent, overdue: false };
}

// Global error handling function
export function handleGlobalError(error: any, context?: string): { success: false, message: string } {
  console.error(`Error in ${context || 'unknown'}:`, error);
  return { success: false, message: error.message || 'An error occurred' };
}

// utils/cookies.ts
export const cookies = {
  get(name: string) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  },

  set(name: string, value: string, days = 7) {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();

    document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; SameSite=Strict`;
  },

  remove(name: string) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  },
};


export function buildQueryString(params: Record<string, unknown>): string {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // ignore null/undefined
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join('&');
}



interface StatusBadgeProps {
  status: TaskStatus
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Map status to Tailwind classes
  const statusClasses: Record<TaskStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-600',
    completed: 'bg-emerald-100 text-emerald-600',
  }

  const displayText: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  }

  return (
    <span
      className={`inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses[status]}`}
    >
      {displayText[status]}
    </span>
  )
}

interface PriorityBadgeProps {
  priority: TaskPriority
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityClasses: Record<TaskPriority, string> = {
    low: 'bg-emerald-100 text-emerald-600',
    medium: 'bg-orange-100 text-orange-600',
    high: 'bg-red-100 text-red-600',
  }

  const displayText: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }

  return (
    <span
      className={`inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium capitalize ${priorityClasses[priority]}`}
    >
      {displayText[priority]}
    </span>
  )
}