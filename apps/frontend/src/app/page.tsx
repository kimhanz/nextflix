import Hero from "../components/Hero";
import MovieGrid from "../components/MovieGrid";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section>
        <h2>Popular movies</h2>
        <MovieGrid />
      </section>
    </main>
  );
}
