import type { ReactNode } from "react";
import { useEffect } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
    // Handle body scroll lock when modal is open
    useEffect(() => {
        if (open) {
            // Store current scroll position
            const scrollY = window.scrollY;
            
            // Lock body scroll
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
            
            return () => {
                // Restore scroll position when modal closes
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [open]);

    // Prevent modal from closing when clicking inside modal content
    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay - blocks interaction with background */}
            <div
                className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="
                    relative z-[101]
                    w-full max-w-md
                    rounded-2xl theme-surface shadow-2xl
                    max-h-[calc(100dvh-2rem)]
                    flex flex-col
                    overflow-hidden
                "
                onClick={handleModalContentClick}
            >
                {/* Modal Header */}
                <div className={`flex items-center ${title ? 'justify-between' : 'justify-end'} p-4 md:p-6 ${title ? 'border-b theme-border' : ''}`}>
                    {title && (
                        <h2 className="text-lg font-semibold theme-text-primary">
                            {title}
                        </h2>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg theme-surface-hover theme-text-muted hover:theme-text-primary transition-colors"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
