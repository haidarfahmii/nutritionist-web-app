import Hero from "@/features/home/components/Hero";
import Features from "@/features/home/components/Features";
import Blog from "@/features/home/components/Blog";
import Testimonials from "@/features/home/components/Testimonial";
import Pricing from "@/features/home/components/Pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Blog />
      <Testimonials />
      <Pricing />
    </main>
  );
}
