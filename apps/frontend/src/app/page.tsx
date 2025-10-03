import Hero from "../components/Hero";
import MovieGrid from "../components/MovieGrid";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section>
        <div className="pb-40">
          <MovieGrid title="Popular on Netflix" />
        </div>
      </section>
    </main>
  );
}
