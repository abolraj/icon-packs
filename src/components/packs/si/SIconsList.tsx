/* eslint-disable react-hooks/refs */
// packs/lucide/LucideIconsList.tsx
import { useState, useEffect, useRef, createElement, useCallback } from 'react';
import { loadSIcons, type IconComponent } from './loadIcons';
import { renderToStaticMarkup } from 'react-dom/server';
import { useCopyToClipboard } from '../../../shared/useCopyToClipboard';
import VirtualList from '../../VirtualList';

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
  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(
    async (e: React.MouseEvent, id: string) => {
      // e.stopPropagation(); // Prevent opening detail dialog
      const iconComponent = componentMapRef.current.get(id);
      if (!iconComponent) return;

      const copyEl = e.currentTarget?.querySelector('.copy-wrapper') as HTMLElement;
      // Generate SVG markup for the specific icon
      const svg = getIconSvg(iconComponent).replaceAll('>', ">\n");
      await copy(svg);
      console.log(copyEl, e.currentTarget?.querySelector('& .copy-wrapper'))
      copyEl.setAttribute('data-copied', 1);
      setTimeout(() => {
        copyEl.removeAttribute('data-copied');
      }, 500);
    },
    [copy]
  );

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
    <div className='size-full'>
            <VirtualList
                items={filteredIds}
                overRowsNo={0}
                className="w-full h-full border-r grid grid-cols-4 max-sm:text-[10px] max-md:text-sm  md:grid-cols-6 lg:grid-cols-8"
            >
                {(id) => {
                    const IconComponent = componentMapRef.current.get(id);
                    if (!IconComponent) return null;

                    return (
                        <div
                            key={id}
                            className='size-full relative btn-ghost p-2 relative border-l border-b last:border-r aspect-square flex flex-col items-stretch'
                            onClick={(e) => {
                                handleCopy(e, id);
                            }}
                        >
                            <div className='h-1 grow'>
                                <IconComponent className="h-full w-full" style={{ color: color ?? '' }} />
                            </div>

                            <div className='copy-wrapper cursor-pointer absolute top-2 right-2 group'>
                                <div className='group-data-[copied=1]:hidden absolute right-0 top-1 w-4 h-6 border'>
                                </div>
                                <div className='group-data-[copied=1]:hidden absolute bg-background right-1 top-0 w-4 h-6 border'>
                                </div>
                                <div className='hidden group-data-[copied=1]:block absolute right-1 -top-1 w-2 h-6 border-b border-r rotate-45 border-success'>
                                </div>
                            </div>

                            {/* <span className='text-center'>{id}</span> */}
                            <p className='h-10 left-0 bottom-0 w-full text-center wrap-break-word'>{id.replace(/([A-Z])/g, ' $1').trim()}</p>
                        </div>
                    );
                }}
            </VirtualList>
    </div>
  );
}

function getIconSvg(Component: React.ComponentType<any>, props?: Record<string, any>): string {
  const element = createElement(Component, props);
  return renderToStaticMarkup(element);
}