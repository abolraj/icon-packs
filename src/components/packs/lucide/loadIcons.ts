// packs/lucide/loadIcons.ts
import { icons } from 'lucide-react';


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadLucideIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(icons)) {
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}