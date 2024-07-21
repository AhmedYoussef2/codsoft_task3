import LogIn from '../components/LogIn';

const LogInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-3xl text-center font-bold mb-8">Log In</h1>
                <LogIn />
            </div>
        </div>
    );
}

export default LogInPage;
