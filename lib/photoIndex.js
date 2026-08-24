// The Photos section has ONE source of truth: data/events.json, a tree of
// categories -> (optional nested groups) -> dated leaf events, each with its
// own Google Drive link. Both the Category view and the Year Wise view read
// from this same tree; neither stores its own copy of the photo/event data.

export function getCategoryById(events, id) {
  return events.find((c) => c.id === id) || null;
}

// Recursively finds every leaf event (one with a `year` and `driveUrl`, and
// no nested `events`) under a category, tracking the chain of group labels
// above it (e.g. ["Neha's bday"] for a birthday nested under that group).
function collectLeaves(node, path = []) {
  const leaves = [];
  for (const item of node.events || []) {
    if (item.events) {
      leaves.push(...collectLeaves(item, [...path, item.label]));
    } else {
      leaves.push({ ...item, path });
    }
  }
  return leaves;
}

// Builds { [year]: [{ categoryId, categoryLabel, categoryEmoji, path, label, year, driveUrl }] }
export function buildYearIndex(events) {
  const index = {};
  for (const category of events) {
    const leaves = collectLeaves(category);
    for (const leaf of leaves) {
      if (!index[leaf.year]) index[leaf.year] = [];
      index[leaf.year].push({
        categoryId: category.id,
        categoryLabel: category.label,
        categoryEmoji: category.emoji,
        path: leaf.path,
        label: leaf.label,
        year: leaf.year,
        driveUrl: leaf.driveUrl
      });
    }
  }
  return index;
}

// Flat list of every leaf event across every category — used by "Today in
// Our Story" to pick a random photo memory without caring about structure.
export function getAllLeafEvents(events) {
  const all = [];
  for (const category of events) {
    for (const leaf of collectLeaves(category)) {
      all.push({
        categoryId: category.id,
        categoryLabel: category.label,
        categoryEmoji: category.emoji,
        path: leaf.path,
        label: leaf.label,
        year: leaf.year,
        driveUrl: leaf.driveUrl
      });
    }
  }
  return all;
}

export function groupLeavesByCategory(leaves) {
  const grouped = {};
  for (const leaf of leaves) {
    if (!grouped[leaf.categoryLabel]) grouped[leaf.categoryLabel] = [];
    grouped[leaf.categoryLabel].push(leaf);
  }
  return grouped;
}
