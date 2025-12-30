import React, { createContext, useContext, useState, useCallback } from 'react';

interface TaskModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    openCreateTask: () => void;
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(undefined);

export const useTaskModal = () => {
    const context = useContext(TaskModalContext);
    if (context === undefined) {
        throw new Error('useTaskModal must be used within a TaskModalProvider');
    }
    return context;
};

interface TaskModalProviderProps {
    children: React.ReactNode;
}

export const TaskModalProvider: React.FC<TaskModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const openCreateTask = useCallback(() => {
        setIsOpen(true);
    }, []);

    const value = {
        isOpen,
        openModal,
        closeModal,
        openCreateTask,
    };

    return (
        <TaskModalContext.Provider value={value}>
            {children}
        </TaskModalContext.Provider>
    );
};
