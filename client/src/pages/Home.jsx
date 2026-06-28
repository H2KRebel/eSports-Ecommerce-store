import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-dark to-accent-cyan/5" />
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
    </div>
  );
}
