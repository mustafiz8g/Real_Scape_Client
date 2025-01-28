

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
            <a
                href="/"
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition"
            >
                Go Back Home
            </a>
        </div>
    );
};

export default ErrorPage;
