import { Suspense } from "react";
import LettersSection from "@/components/LettersSection";
import letters from "@/data/letters.json";
import driveRoot from "@/data/driveRoot.json";

export default function LettersPage() {
  return (
    <Suspense fallback={null}>
      <LettersSection letters={letters} lettersFolderUrl={driveRoot.letters} />
    </Suspense>
  );
}
