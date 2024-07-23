import SignUp from '../components/SignUp';

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 pb-3 w-full max-w-md">
                <h1 className="text-3xl text-center font-bold mb-8">Sign Up</h1>
                <SignUp />
            </div>
        </div>
    );
}

export default SignUpPage;
