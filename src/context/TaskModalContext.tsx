import React, { createContext, useContext, useState, useCallback } from 'react';

interface TaskModalContextType {
    isOpen: string;
    openModal: (data: string) => void;
    closeModal: () => void;
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
    const [isOpen, setIsOpen] = useState<string>("");

    const openModal = useCallback((data: string) => {
        setIsOpen(data);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen("");
    }, []);

    const value = {
        isOpen,
        openModal,
        closeModal,
    };

    return (
        <TaskModalContext.Provider value={value}>
            {children}
        </TaskModalContext.Provider>
    );
};
