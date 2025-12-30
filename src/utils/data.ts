export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate: string; // ISO
  createdAt: string;
  assignee: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
}

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design landing pagecvfgdfg dfgdfgdfgdfg dfgdfgdgdfg dfgdfgdfgdfgdfg dfgdfgfdg",
    description: "Create responsive UI for marketing landing pagedfsdfsdfsf sdfsdfsdfsfs dfsdfsdfsdfsdfs dfsdfsdfgedrtghrtgdfgv rtg rtghrtgrtgrth rtyhtyjhtryjhrtyjhtr fdgrfghrthgrthgrt ghrgrtgrtgrh d fgedrfgertere fgdfgbdfhyt sdfewrtferfgdsv sdferfgerfgerf erferferfe",
    status: "todo",
    priority: "high",
    dueDate: "2025-12-31",
    createdAt: "2025-12-20",
    assignee: {
      id: "u1",
      name: "Milan Goti",
    },
    tags: ["design", "ui"],
  },
  {
    id: "2",
    title: "API integration",
    description: "Integrate product listing API with frontend dfgdfgdfgdfg dfgdfgdgdfg dfgdfgdfgdfgdfg dfgd",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-01-02",
    createdAt: "2024-12-18",
    assignee: {
      id: "u2",
      name: "Rahul Sharma",
    },
    tags: ["backend", "api"],
  },
  {
    id: "3",
    title: "Fix checkout bug",
    description: "Resolve price mismatch issue on checkout page",
    status: "review",
    priority: "high",
    dueDate: "2024-12-30",
    createdAt: "2024-12-22",
    assignee: {
      id: "u3",
      name: "Anita Patel",
    },
    tags: ["bug", "checkout"],
  },
  {
    id: "4",
    title: "Write unit tests",
    description: "Add unit tests for auth flow",
    status: "done",
    priority: "low",
    dueDate: "2024-12-28",
    createdAt: "2024-12-15",
    assignee: {
      id: "u4",
      name: "Kunal Mehta",
    },
    tags: ["testing"],
  },
  {
    id: "5",
    title: "Optimize images",
    description: "Compress and lazy-load product images",
    status: "in-progress",
    priority: "medium",
    dueDate: "2025-01-08",
    createdAt: "2024-12-23",
    assignee: {
      id: "u1",
      name: "Milan Goti",
    },
    tags: ["performance"],
  },
];
