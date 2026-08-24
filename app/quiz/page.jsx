import QuizGame from "@/components/QuizGame";
import FloatingHearts from "@/components/FloatingHearts";
import LogoutLink from "@/components/LogoutLink";
import SiteNav from "@/components/SiteNav";
import questions from "@/data/questions.json";

export default function QuizPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <LogoutLink />
      <div className="relative z-10 mb-8">
        <SiteNav />
      </div>
      <QuizGame bank={questions} />
    </main>
  );
}
