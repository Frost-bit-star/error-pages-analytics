export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left - Brand */}
        <div className="flex flex-col">
          <h2 className="text-white font-semibold text-lg">
            UI Errors
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Beautiful error page templates for developers and designers
          </p>
        </div>

        {/* Middle - Links */}
        <div className="flex items-center gap-6 text-gray-400 text-sm">
          <a href="/templates" className="hover:text-white transition">
            Templates
          </a>
          <a href="/leaderboard" className="hover:text-white transition">
            Leaderboard
          </a>
          <a href="/crown" className="hover:text-white transition">
            Crown
          </a>
          <a href="/submit" className="hover:text-white transition">
            Submit
          </a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex items-center gap-3">

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-300"
            >
              <path d="M12 .5C5.73.5.75 5.6.75 12c0 5.1 3.29 9.4 7.86 10.93.58.1.79-.26.79-.57v-2.2c-3.2.7-3.88-1.4-3.88-1.4-.53-1.4-1.3-1.8-1.3-1.8-1.06-.8.08-.8.08-.8 1.17.1 1.8 1.2 1.8 1.2 1.05 1.8 2.76 1.3 3.44 1 .1-.8.4-1.3.7-1.6-2.56-.3-5.24-1.3-5.24-5.8 0-1.3.45-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2.95-.3 1.95-.4 2.95-.4s2 .1 2.95.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.75.8 1.2 1.9 1.2 3.2 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1 .8 2v3c0 .3.2.7.8.6A11.5 11.5 0 0023.25 12C23.25 5.6 18.27.5 12 .5z" />
            </svg>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-300"
            >
              <path d="M22.46 6c-.77.35-1.5.6-2.3.7a4.1 4.1 0 001.8-2.2c-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.6 0-1.2-.2-1.7-.5v.1a4.1 4.1 0 003.3 4c-.5.1-1 .2-1.5.1a4.1 4.1 0 003.8 2.8A8.3 8.3 0 012 18.5 11.6 11.6 0 008.3 20c7.6 0 11.8-6.3 11.8-11.8v-.5c.8-.5 1.5-1.2 2.1-2z" />
            </svg>
          </a>

          {/* More */}
          <a
            href="/"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5 text-gray-300"
            >
              <path
                d="M12 5v.01M12 12v.01M12 19v.01"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-xs py-4 border-t border-white/5">
        © {new Date().getFullYear()} UI Errors. All rights reserved.
      </div>
    </footer>
  );
}
