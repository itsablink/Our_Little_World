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
  fetchEntriesFromApi,
  addEntryApi,
  updateEntryApi,
  deleteEntryApi,
  sortByDateDesc
} from "@/lib/diaryStore";

export default function DiarySection() {
  const [entries, setEntries] = useState([]);
  const [stage, setStage] = useState("list"); // list | create | edit | view
  const [activeEntry, setActiveEntry] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const remote = await fetchEntriesFromApi();
        setEntries(sortByDateDesc(remote));
      } catch (err) {
        console.error("Failed to load diary entries:", err);
        setErrorMessage(err.message || "Failed to load diary entries from server.");
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  async function handleCreate(entry) {
    try {
      setErrorMessage("");
      const created = await addEntryApi(entry);
      setEntries((prev) => sortByDateDesc([created, ...prev.filter((e) => e.id !== created.id)]));
      setStage("list");
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Failed to save entry: " + (err.message || "Database connection error"));
    }
  }

  async function handleEditSave(patch) {
    try {
      setErrorMessage("");
      const updated = await updateEntryApi(activeEntry.id, patch);
      setEntries((prev) => sortByDateDesc(prev.map((e) => (e.id === activeEntry.id ? updated : e))));
      setActiveEntry(updated);
      setStage("view");
    } catch (err) {
      console.error("Error updating entry:", err);
      alert("Failed to update entry: " + (err.message || "Database connection error"));
    }
  }

  async function confirmDelete() {
    try {
      setErrorMessage("");
      await deleteEntryApi(pendingDeleteId);
      setEntries((prev) => prev.filter((e) => e.id !== pendingDeleteId));
      setPendingDeleteId(null);
      setStage("list");
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Failed to delete entry: " + (err.message || "Database connection error"));
    }
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

      {errorMessage && (
        <div className="relative z-10 mb-6 bg-red-100/80 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-xs max-w-md text-center">
          {errorMessage}
        </div>
      )}

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
