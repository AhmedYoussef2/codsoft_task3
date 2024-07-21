import DeletePost from '../components/DeletePost';

const DeletePostPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center my-16">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full h-screen">
                <h1 className="text-3xl text-center font-bold mb-12">Delete the post</h1>
                <DeletePost />
            </div>
        </div>
    );
}

export default DeletePostPage;
