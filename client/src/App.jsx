import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
