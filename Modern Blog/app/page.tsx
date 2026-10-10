import { Suspense } from "react";
import PostCard from "./components/PostCard";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const posts: Post[] = await res.json();
  return posts.slice(0, 5);
}

async function PostsGrid() {
  const posts = await getPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {featuredPost && (
        <PostCard post={featuredPost} featured index={0} />
      )}

      {/* Other Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {restPosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-6 animate-pulse h-80" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse h-96">
            <div className="h-48 bg-slate-200" />
            <div className="p-5 space-y-3">
              <div className="h-3 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded" />
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-tight animate-fade-in-up-delay-1">
            Stories that
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mx-2">
              inspire
            </span>
            you
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed animate-fade-in-up-delay-2">
            Read the best articles and stories here. We prepare new content for you every day.
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Latest Articles</h2>
            <p className="text-slate-500 mt-1">5 selected posts today</p>
          </div>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <PostsGrid />
        </Suspense>
      </section>
    </>
  );
}