import type { ReactNode } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
};

export function Modal({ open, onClose, title, children }: ModalProps) {
    // Handle body scroll lock on mobile
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const isMobile = window.innerWidth < 768;

    //         if (open && isMobile) {
    //             // Store current scroll position
    //             const scrollY = window.scrollY;
    //             document.body.style.position = 'fixed';
    //             document.body.style.top = `-${scrollY}px`;
    //             document.body.style.left = '0';
    //             document.body.style.right = '0';
    //             document.body.style.width = '100%';
    //             document.body.style.overflow = 'hidden';
    //         } else if (!open) {
    //             // Restore scroll position
    //             const scrollY = document.body.style.top;
    //             document.body.style.position = '';
    //             document.body.style.top = '';
    //             document.body.style.left = '';
    //             document.body.style.right = '';
    //             document.body.style.width = '';
    //             document.body.style.overflow = '';
    //             window.scrollTo(0, parseInt(scrollY || '0') * -1);
    //         }
    //     }
    // }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className="
          relative z-60
          mx-auto my-auto
          w-full max-w-md
          rounded-2xl bg-white shadow-xl
          max-h-[calc(100dvh-6rem)]
          p-4 md:p-6
          pb-8
        "
                style={{
                    marginBottom: 'env(safe-area-inset-bottom, 0px)'
                }}
            >
                {title && (
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                )}

                {children}

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close modal"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
