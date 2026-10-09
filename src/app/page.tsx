import HeroSection from '@/components/home/HeroSection';
import WhyCodeKidsSection from '@/components/home/WhyCodeKidsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#F6F8FC]">
      <HeroSection />
      <WhyCodeKidsSection />
      <HowItWorksSection />
    </main>
  );
}
