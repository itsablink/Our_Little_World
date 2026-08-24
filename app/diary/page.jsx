import DiarySection from "@/components/DiarySection";
import diaryEntries from "@/data/diary.json";

export default function DiaryPage() {
  return <DiarySection seedEntries={diaryEntries} />;
}
