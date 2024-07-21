import CreatePost from '../components/CreatePost';

const CreatePostPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center my-16">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full h-screen">
                <h1 className="text-3xl text-center font-bold mb-12">Create a new post</h1>
                <CreatePost />
            </div>
        </div>
    );
}

export default CreatePostPage;
