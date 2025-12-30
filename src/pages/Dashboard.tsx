import CenterButton from "../components/CenterButton"


export const Dashboard = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-4xl tracking-tight font-extrabold theme-text-primary sm:text-5xl md:text-6xl">
                <span className="block">Welcome to</span>
                <span className="block text-primary-600">Taskify</span>
            </h1>

            <p className="mt-3 max-w-md mx-auto text-base theme-text-muted sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Organize your tasks efficiently and boost your productivity.
                Create, manage, and track your tasks with ease.
            </p>

            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                    <CenterButton
                        as="link"
                        to="/register"
                        variant="outline"
                        size="lg"
                        fullWidth
                        className="md:py-4 md:text-lg md:px-10"
                    >
                        Get started
                    </CenterButton>
                </div>

                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <CenterButton
                        as="link"
                        to="/login"
                        variant="outline"
                        size="lg"
                        fullWidth
                        className="md:py-4 md:text-lg md:px-10"
                    >
                        Sign in
                    </CenterButton>
                </div>
            </div>
        </div>
    )
}