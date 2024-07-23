import BlogList from '../components/BlogList';

const HomePage = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-orange-700">Blog posts</h1>
            <BlogList />
        </div>
    );
}

export default HomePage;
