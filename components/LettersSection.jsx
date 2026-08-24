"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
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
  updateMemory,
  updateMemoryApi,
  deleteMemory,
  deleteMemoryApi,
  sortByDateDesc
} from "@/lib/messageStore";

export default function LettersSection({ letters, lettersFolderUrl }) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") === "messages" ? "messages" : "letters");
  const [activeLetterIndex, setActiveLetterIndex] = useState(null);

  const [memories, setMemories] = useState([]);
  const [memoryStage, setMemoryStage] = useState("list"); // list | create | edit | view
  const [activeMemory, setActiveMemory] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const initial = getMemories([]);
      setMemories(sortByDateDesc(initial));
      setLoaded(true);
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

  async function handleSaveMemory(memoryData) {
    if (memoryStage === "edit" && activeMemory) {
      const updatedRecord = await updateMemoryApi(activeMemory.id, memoryData);
      const updatedList = updateMemory(memories, activeMemory.id, memoryData);
      setMemories(sortByDateDesc(updatedList));
      setActiveMemory({ ...activeMemory, ...updatedRecord });
      setMemoryStage("view");
    } else {
      const saved = await addMemoryApi(memoryData);
      const { memories: updatedList } = addMemory(memories, saved);
      setMemories(sortByDateDesc(updatedList));
      setMemoryStage("list");
    }
  }

  async function confirmDeleteMemory() {
    const idToDelete = pendingDeleteId || activeMemory?.id;
    if (!idToDelete) return;

    await deleteMemoryApi(idToDelete);
    const updatedList = deleteMemory(memories, idToDelete);
    setMemories(sortByDateDesc(updatedList));
    setPendingDeleteId(null);
    if (activeMemory && activeMemory.id === idToDelete) {
      setActiveMemory(null);
    }
    setMemoryStage("list");
  }

  function openMemory(memory) {
    setActiveMemory(memory);
    setMemoryStage("view");
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
          onClick={() => {
            setTab("letters");
            setMemoryStage("list");
          }}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "letters" ? "bg-rose text-white" : "glass text-wine"
          }`}
        >
          Handwritten Letters
        </button>
        <button
          onClick={() => {
            setTab("messages");
            setMemoryStage("list");
          }}
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
          <div className="w-full max-w-lg flex flex-col items-center">
            <AnimatePresence mode="wait">
              {!loaded ? null : memoryStage === "create" ? (
                <MessageUpload
                  key="create"
                  onSave={handleSaveMemory}
                  onCancel={() => setMemoryStage("list")}
                />
              ) : memoryStage === "edit" && activeMemory ? (
                <MessageUpload
                  key="edit"
                  initialMemory={activeMemory}
                  onSave={handleSaveMemory}
                  onCancel={() => setMemoryStage("view")}
                />
              ) : memoryStage === "view" && activeMemory ? (
                <MessageViewer
                  key="view"
                  memory={activeMemory}
                  onBack={() => setMemoryStage("list")}
                  onEdit={() => setMemoryStage("edit")}
                  onDelete={() => setPendingDeleteId(activeMemory.id)}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full flex flex-col items-center gap-5"
                >
                  <GlassButton onClick={() => setMemoryStage("create")}>
                    + Save a Memory
                  </GlassButton>

                  {memories.length === 0 ? (
                    <div className="glass rounded-2xl px-8 py-10 text-center max-w-sm shadow-glass mt-2">
                      <p className="text-3xl mb-2">💬</p>
                      <p className="font-display italic text-lg text-wine mb-1">Special Messages</p>
                      <p className="text-inkrose/60 text-xs leading-relaxed">
                        No special messages have been saved yet. Save a heartfelt text, a birthday message, or a romantic paragraph.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full flex flex-wrap gap-4 justify-center max-w-3xl mt-2">
                      {memories.map((memory) => (
                        <MessageMemoryCard
                          key={memory.id}
                          memory={memory}
                          onOpen={openMemory}
                          onDelete={(id) => setPendingDeleteId(id)}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete this special message memory permanently?"
        message="This memory will be permanently removed from your archive."
        confirmLabel="Delete"
        onConfirm={confirmDeleteMemory}
        onCancel={() => setPendingDeleteId(null)}
      />
    </main>
  );
}
