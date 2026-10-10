import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl text-white">Modern Blog</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A collection of the best articles and stories for those seeking inspiration.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Articles</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-3">Get the latest articles delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 Modern Blog - Alireza Fallah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}