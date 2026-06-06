import Head from "next/head";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>UI Errors - Beautiful Error Page Templates</title>
        <meta
          name="description"
          content="Discover, share and download beautiful error page templates for developers."
        />
      </Head>

      <div className="min-h-screen bg-[#0b0f19] text-white">

        {/* Header */}
        <Header />

        {/* Hero Section */}
        <main className="max-w-5xl mx-auto px-6 pt-32">

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Beautiful Error Page Templates
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Discover 404, 500, Maintenance and Coming Soon templates built by designers worldwide.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href="/templates"
                className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 transition font-medium"
              >
                Browse Templates
              </a>

              <a
                href="/submit"
                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                Submit Template
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-gray-400 text-sm">Templates</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-bold text-white">120+</p>
              <p className="text-gray-400 text-sm">Contributors</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-gray-400 text-sm">Downloads</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-md border border-white/10">
              <p className="text-2xl font-bold text-white">1</p>
              <p className="text-gray-400 text-sm">Crown Winner</p>
            </div>
          </div>

          {/* Featured Section */}
          <section className="mt-20">

            <h2 className="text-2xl font-semibold mb-6">
              Trending Templates
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Template Card */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition"
                >
                  <div className="h-40 bg-gradient-to-br from-red-500/20 to-purple-500/20"></div>

                  <div className="p-4">
                    <h3 className="font-semibold">Cyberpunk 404</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Dark neon styled error page template
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                      <span>⬇ 12.4k</span>
                      <span>⭐ 4.8</span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>

        </main>

        {/* Footer */}
        <footer />
      </div>
    </>
  );
}
