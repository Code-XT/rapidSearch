import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "rapidSearch",
  description: "Wait Less, Search More",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen isolate overflow-hidden border-b border-gray-200 bg-gradient-to-r from-gray-600 to-gray-900">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            />
          </svg>

          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8 lg:py-24">
            <div className="w-full h-full flex flex-col items-center gap-4">
              <h1 className="tracking-tight font-extrabold text-5xl lg:text-7xl text-white">
                <span className="text-red-500">rapid</span>Search
              </h1>
              <p className="max-w-lg text-center text-xl text-slate-400">
                Your gateway to FAST search results with symantic querying
              </p>
              <div className="mx-auto mt-16 max-w-2xl w-full flex flex-col">
                <SearchBar />
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
