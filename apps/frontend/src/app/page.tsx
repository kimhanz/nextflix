import Hero from "../components/Hero";
import MovieGrid from "../components/MovieGrid";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="bg-black overflow-hidden z-0">
        <div className="pb-40">
          <MovieGrid title="Popular on Netflix" />
          <MovieGrid title="New on Netflix" />
          <MovieGrid title="We Think You'll Love These" />
          <MovieGrid title="You Next Watch" />
          <MovieGrid title="Family Sci-Fi & Fantasy Movies" />
        </div>
      </section>
    </main>
  );
}
