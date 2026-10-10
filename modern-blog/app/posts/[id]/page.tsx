import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Clock, User, Heart, Bookmark, Share2, Calendar } from "lucide-react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

async function PostContent({ id }: { id: string }) {
  const post = await getPost(id);
  const image = `https://picsum.photos/seed/post${post.id}/1200/600`;

  return (
    <article className="animate-fade-in-up">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 mb-8 group"
      >
        <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to home
      </Link>

      {/* Hero Image */}
      <div className="relative h-80 sm:h-[500px] w-full rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-indigo-400 to-purple-500 shadow-xl">
        <Image
          src={image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Meta on Image */}
        <div className="absolute bottom-6 right-6 left-6 text-white">
          <div className="flex items-center gap-3 text-sm mb-3 flex-wrap">
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              {new Date().toLocaleDateString("en-US")}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              5 min read
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <User className="w-3 h-3" />
              Author #{post.userId}
            </span>
          </div>
          <span className="inline-block px-3 py-1 bg-white/90 text-indigo-700 rounded-full text-xs font-bold">
            Post #{post.id}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
        {post.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-4 pb-8 mb-8 border-b border-slate-200">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
          {post.userId}
        </div>
        <div>
          <div className="font-bold text-slate-900">Author #{post.userId}</div>
          <div className="text-sm text-slate-500">Published on {new Date().toLocaleDateString("en-US")}</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-slate-800 font-medium leading-loose mb-6">
          {post.body.charAt(0).toUpperCase() + post.body.slice(1)}
        </p>

        <p className="text-lg text-slate-700 leading-loose mb-6">
          This is sample content for demonstration purposes. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>

        <blockquote className="border-l-4 border-indigo-600 pl-6 my-8 py-4 bg-indigo-50/50 rounded-lg">
          <p className="text-lg italic text-slate-800 leading-relaxed">
            "Every story deserves to be heard. This post is a sample of educational content for learning Next.js."
          </p>
        </blockquote>

        <h2 className="text-2xl font-bold mt-10 mb-4">Continue Reading</h2>
        <p className="text-lg text-slate-700 leading-loose">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition">
            <Heart className="w-4 h-4" /> Like
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition">
            <Bookmark className="w-4 h-4" /> Save
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
    </article>
  );
}

function PostLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-slate-200 rounded mb-8" />
      <div className="h-96 bg-slate-200 rounded-3xl mb-8" />
      <div className="h-10 bg-slate-200 rounded w-3/4 mb-6" />
      <div className="flex items-center gap-4 mb-8 pb-8 border-b">
        <div className="w-14 h-14 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
      </div>
    </div>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<PostLoading />}>
        <PostContent id={id} />
      </Suspense>
    </div>
  );
}