// packs/lucide/LucideIconsList.tsx
import { useState, useEffect, useRef } from 'react';
import { loadSIcons, type IconComponent } from './loadIcons';

interface Props {
  query: string;
  color?: string;
}

export default function SIconsList({
  query,
  color = '',
}: Props) {
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const componentMapRef = useRef<Map<string, IconComponent>>(new Map());

  useEffect(() => {
    // 1. Load icons and metadata (only once)
    const { metaArray, componentMap } = loadSIcons();
    componentMapRef.current = componentMap;

    // 2. Create worker and initialise it
    const worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
    });
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent) => {
      if (e.data.type === 'READY') {
        setFilteredIds(e.data.payload);
        setReady(true);
      }
      if (e.data.type === 'RESULTS') {
        setFilteredIds(e.data.payload);
      }
    };

    worker.onerror = (err) => console.error('Worker error:', err);

    worker.postMessage({ type: 'INIT', payload: { icons: metaArray } });

    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (!ready || !workerRef.current) return;
    workerRef.current.postMessage({ type: 'SEARCH', payload: { query } });
  }, [query, ready]);

  if (!ready) return <div>Loading icons…</div>;
  if (filteredIds.length === 0) return <div>No icons found</div>;

  return (
    <div className='border-r grid grid-cols-4 max-sm:text-[10px] max-md:text-sm  md:grid-cols-6 lg:grid-cols-8'>
      {filteredIds.map((id) => {
        const IconComponent = componentMapRef.current.get(id);
        if (!IconComponent) return null;

        return (
          <div
            key={id}
            className='p-2 relative border-l border-b last:border-r aspect-square flex flex-col items-stretch'
          >
            <div className='h-1 grow'>
              <IconComponent className="h-full w-full" style={{ color: color ?? '' }} />
            </div>
            {/* <span className='text-center'>{id}</span> */}
            <p className='h-10 left-0 bottom-0 w-full text-center wrap-break-word'>{id.replace(/([A-Z])/g, ' $1').trim()}</p>
          </div>
        );
      })}
    </div>
  );
}