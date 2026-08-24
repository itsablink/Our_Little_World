import ChallengeFlow from "@/components/ChallengeFlow";
import FloatingHearts from "@/components/FloatingHearts";
import questions from "@/data/questions.json";

export const dynamic = "force-dynamic";

function pickRandom(pool, count) {
  const copy = [...pool];
  const picked = [];
  while (picked.length < count && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(i, 1)[0]);
  }
  return picked;
}

export default function ChallengePage() {
  const selected = pickRandom(questions, 3);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <ChallengeFlow questions={selected} />
    </main>
  );
}
