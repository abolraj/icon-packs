// packs/lucide/worker.ts

let icons: Array<string> = [];

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    icons = payload.icons;
    // Send back all IDs initially
    self.postMessage({ type: 'READY', payload: icons });
  }

  if (type === 'SEARCH') {
    const query = payload.query.trim().toLowerCase();

    if (!query) {
      self.postMessage({ type: 'RESULTS', payload: icons });
      return;
    }

    const matchedIds: string[] = [];

    for (const icon of icons) {
      // Search in name and tags
      if (icon.toLowerCase().includes(query)) {
        matchedIds.push(icon);
      }
    }

    self.postMessage({ type: 'RESULTS', payload: matchedIds });
  }
};