import LoginCard from "@/components/LoginCard";
import FloatingHearts from "@/components/FloatingHearts";
import MotionBackground from "@/components/MotionBackground";
import CatIllustration from "@/components/CatIllustration";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
      <MotionBackground />
      <FloatingHearts />
      <CatIllustration className="hidden sm:block absolute bottom-[4%] right-[6%] w-44 md:w-56 pointer-events-none" />
      <LoginCard />
    </main>
  );
}
