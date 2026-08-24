"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LetterCard from "./LetterCard";
import LetterViewer from "./LetterViewer";
import MessageMemoryCard from "./MessageMemoryCard";
import MessageUpload from "./MessageUpload";
import MessageViewer from "./MessageViewer";
import ConfirmDialog from "./ConfirmDialog";
import GlassButton from "./GlassButton";
import FloatingHearts from "./FloatingHearts";
import LogoutLink from "./LogoutLink";
import SiteNav from "./SiteNav";
import {
  getMemories,
  fetchMemoriesFromApi,
  addMemory,
  addMemoryApi,
  deleteMemory,
  deleteMemoryApi,
  sortByDateDesc
} from "@/lib/messageStore";

export default function LettersSection({ letters, lettersFolderUrl }) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") === "messages" ? "messages" : "letters");
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);

  const [memories, setMemories] = useState([]);
  const [memoryStage, setMemoryStage] = useState("list"); // list | upload
  const [activeMemory, setActiveMemory] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    async function load() {
      const initial = getMemories([]);
      setMemories(sortByDateDesc(initial));
      const remote = await fetchMemoriesFromApi();
      if (remote && remote.length > 0) {
        setMemories(sortByDateDesc(remote));
      }
    }
    load();
  }, []);

  const activeLetter = activeLetterIndex === null ? null : letters[activeLetterIndex];

  function openLetter(letter) {
    setActiveLetterIndex(letters.findIndex((l) => l.id === letter.id));
  }

  async function handleSaveMemory(memory) {
    const saved = await addMemoryApi(memory);
    const { ok, memories: updated } = addMemory(memories, saved);
    if (!ok) {
      setUploadError("Couldn't save — your browser's storage is full. Try fewer or smaller screenshots.");
      return;
    }
    setMemories(sortByDateDesc(updated));
    setMemoryStage("list");
  }

  async function confirmDeleteMemory() {
    await deleteMemoryApi(pendingDeleteId);
    const updated = deleteMemory(memories, pendingDeleteId);
    setMemories(sortByDateDesc(updated));
    setPendingDeleteId(null);
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <LogoutLink />
      <div className="relative z-10 mb-6">
        <SiteNav />
      </div>
      <p className="text-3xl mb-2 relative z-10">💌</p>
      <h1 className="font-display italic text-3xl text-wine mb-6 relative z-10">Letters</h1>

      <div className="flex gap-2 mb-10 relative z-10">
        <button
          onClick={() => setTab("letters")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "letters" ? "bg-rose text-white" : "glass text-wine"
          }`}
        >
          Handwritten Letters
        </button>
        <button
          onClick={() => setTab("messages")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "messages" ? "bg-rose text-white" : "glass text-wine"
          }`}
        >
          Messages
        </button>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {tab === "letters" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8">
            {letters.length > 0 && (
              <div className="w-full flex flex-wrap gap-6 justify-center max-w-4xl">
                {letters.map((letter) => (
                  <LetterCard key={letter.id} letter={letter} onOpen={openLetter} />
                ))}
              </div>
            )}

            {lettersFolderUrl && (
              <a
                href={lettersFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass shadow-glass rounded-2xl px-8 py-6 text-center max-w-sm hover:bg-white/70 transition-colors"
              >
                <p className="text-2xl mb-2">💌</p>
                <p className="font-display text-lg text-wine mb-1">Open the Letters folder</p>
                <p className="text-xs text-inkrose/60">All the handwritten letters, on Google Drive</p>
              </a>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-5">
            <GlassButton onClick={() => setMemoryStage(memoryStage === "upload" ? "list" : "upload")}>
              {memoryStage === "upload" ? "Cancel" : "+ Save a Memory"}
            </GlassButton>

            {memoryStage === "upload" ? (
              <>
                <MessageUpload onSave={handleSaveMemory} onCancel={() => setMemoryStage("list")} />
                {uploadError && <p className="text-xs text-rose text-center max-w-sm">{uploadError}</p>}
              </>
            ) : memories.length === 0 ? (
              <p className="text-inkrose/50 text-sm text-center">
                No saved memories yet — save a heartfelt message, a birthday text, anything worth keeping.
              </p>
            ) : (
              <div className="w-full flex flex-wrap gap-4 justify-center max-w-3xl">
                {memories.map((memory) => (
                  <MessageMemoryCard
                    key={memory.id}
                    memory={memory}
                    onOpen={setActiveMemory}
                    onDelete={(id) => setPendingDeleteId(id)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Link href="/home" className="text-xs text-inkrose/50 uppercase tracking-widest mt-10 hover:text-inkrose relative z-10">
        ← Back home
      </Link>

      {activeLetter && (
        <LetterViewer
          letter={activeLetter}
          onClose={() => setActiveLetterIndex(null)}
          onPrev={() => setActiveLetterIndex((i) => Math.max(0, i - 1))}
          onNext={() => setActiveLetterIndex((i) => Math.min(letters.length - 1, i + 1))}
          hasPrev={activeLetterIndex > 0}
          hasNext={activeLetterIndex < letters.length - 1}
        />
      )}

      {activeMemory && <MessageViewer memory={activeMemory} onClose={() => setActiveMemory(null)} />}

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete this memory permanently?"
        message="The screenshot(s) will be removed from this browser."
        confirmLabel="Delete"
        onConfirm={confirmDeleteMemory}
        onCancel={() => setPendingDeleteId(null)}
      />
    </main>
  );
}
