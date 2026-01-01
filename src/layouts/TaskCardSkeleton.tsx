export const TaskCardSkeleton = () => {
    return (
        <div
            className="
        relative flex flex-col justify-between
        h-52.5 rounded-2xl p-5
        border theme-border theme-surface
        animate-pulse
      "
        >
            {/* Top */}
            <div>
                <div className="flex justify-between mb-3">
                    <div className="flex gap-2">
                        <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>

                    <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

                <div className="mt-2 space-y-1">
                    <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>

            {/* Bottom */}
            <div className="pt-4 border-t theme-border">
                <div className="flex justify-between mb-3">
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-3 w-14 rounded bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
        </div>
    );
};
