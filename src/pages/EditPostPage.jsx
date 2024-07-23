import EditPost from '../components/EditPost';

const EditPostPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center my-16">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full h-screen">
                <h1 className="text-3xl text-center font-bold mb-12">Edit the post</h1>
                <EditPost />
            </div>
        </div>
    );
}

export default EditPostPage;
