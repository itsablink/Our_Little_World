"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import DiaryEntryCard from "./DiaryEntryCard";
import DiaryEntryForm from "./DiaryEntryForm";
import DiaryEntryView from "./DiaryEntryView";
import ConfirmDialog from "./ConfirmDialog";
import GlassButton from "./GlassButton";
import FloatingHearts from "./FloatingHearts";
import LogoutLink from "./LogoutLink";
import SiteNav from "./SiteNav";
import {
  getEntries,
  fetchEntriesFromApi,
  addEntry,
  addEntryApi,
  updateEntry,
  updateEntryApi,
  deleteEntry,
  deleteEntryApi,
  sortByDateDesc
} from "@/lib/diaryStore";

export default function DiarySection({ seedEntries }) {
  const [entries, setEntries] = useState([]);
  const [stage, setStage] = useState("list"); // list | create | edit | view
  const [activeEntry, setActiveEntry] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const initial = getEntries(seedEntries);
      setEntries(sortByDateDesc(initial));
      setLoaded(true);
      const remote = await fetchEntriesFromApi();
      if (remote && remote.length > 0) {
        setEntries(sortByDateDesc(remote));
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCreate(entry) {
    const created = await addEntryApi(entry);
    const updated = addEntry(entries, created);
    setEntries(sortByDateDesc(updated));
    setStage("list");
  }

  async function handleEditSave(patch) {
    await updateEntryApi(activeEntry.id, patch);
    const updated = updateEntry(entries, activeEntry.id, patch);
    setEntries(sortByDateDesc(updated));
    setActiveEntry({ ...activeEntry, ...patch });
    setStage("view");
  }

  async function confirmDelete() {
    await deleteEntryApi(pendingDeleteId);
    const updated = deleteEntry(entries, pendingDeleteId);
    setEntries(sortByDateDesc(updated));
    setPendingDeleteId(null);
    setStage("list");
  }

  function openEntry(entry) {
    setActiveEntry(entry);
    setStage("view");
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center px-6 py-16 overflow-hidden">
      <FloatingHearts />
      <LogoutLink />
      <div className="relative z-10 mb-6">
        <SiteNav />
      </div>
      <p className="text-3xl mb-2 relative z-10">📖</p>
      <h1 className="font-display italic text-3xl text-wine mb-2 relative z-10">Her Diary</h1>
      <p className="text-inkrose/60 text-sm mb-8 relative z-10">A few pages, just for us.</p>

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!loaded ? null : stage === "create" ? (
            <DiaryEntryForm key="form" onSave={handleCreate} onCancel={() => setStage("list")} />
          ) : stage === "edit" && activeEntry ? (
            <DiaryEntryForm key="edit" initialEntry={activeEntry} onSave={handleEditSave} onCancel={() => setStage("view")} />
          ) : stage === "view" && activeEntry ? (
            <DiaryEntryView
              key="view"
              entry={activeEntry}
              onBack={() => setStage("list")}
              onEdit={() => setStage("edit")}
              onDelete={() => setPendingDeleteId(activeEntry.id)}
            />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg flex flex-col items-center gap-4">
              {entries.length === 0 ? (
                <>
                  <p className="text-inkrose/50 text-sm text-center mb-2">No diary entries yet.</p>
                  <GlassButton onClick={() => setStage("create")}>+ Write your first entry</GlassButton>
                </>
              ) : (
                <>
                  <GlassButton onClick={() => setStage("create")} className="mb-2">+ New Entry</GlassButton>
                  <div className="w-full flex flex-col gap-3">
                    {entries.map((entry) => (
                      <DiaryEntryCard key={entry.id} entry={entry} onOpen={openEntry} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/home" className="text-xs text-inkrose/50 uppercase tracking-widest mt-10 hover:text-inkrose relative z-10">
        ← Back home
      </Link>

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="Delete this diary entry permanently?"
        message="This can't be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </main>
  );
}
