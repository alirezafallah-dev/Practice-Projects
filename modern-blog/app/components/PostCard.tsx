import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
  index: number;
}

export default function PostCard({ post, featured = false, index }: PostCardProps) {
  // Different images based on post id
  const images = [
    "https://picsum.photos/seed/blog1/800/600",
    "https://picsum.photos/seed/blog2/800/600",
    "https://picsum.photos/seed/blog3/800/600",
    "https://picsum.photos/seed/blog4/800/600",
    "https://picsum.photos/seed/blog5/800/600",
  ];
  const image = images[(post.id - 1) % images.length];

  if (featured) {
    return (
      <Link href={`/posts/${post.id}`} className="group block h-full animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 group-hover:-translate-y-1">
          <div className="grid md:grid-cols-2 h-full">
            {/* Image */}
            <div className="relative h-64 md:h-full overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500">
              <Image
                src={image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                Featured Post
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-semibold">
                    #{post.id}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 5 min read
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed line-clamp-4">
                  {post.body}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {post.userId}
                  </div>
                  <span>Author #{post.userId}</span>
                </div>
                <span className="flex items-center gap-1 text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                  Read more <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.id}`} className="group block h-full animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group-hover:-translate-y-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-500">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-indigo-600">
            #{post.id}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> 5 min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> #{post.userId}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed flex-grow">
            {post.body}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {post.userId}
              </div>
              <span className="text-xs text-slate-600 font-medium">Author</span>
            </div>
            <ArrowLeft className="w-4 h-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}