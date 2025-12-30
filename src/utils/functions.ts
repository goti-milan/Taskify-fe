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
