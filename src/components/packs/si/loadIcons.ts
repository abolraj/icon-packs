// packs/lucide/loadIcons.ts

import * as SIcons from "@icons-pack/react-simple-icons";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadSIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();
    for (const [name, component] of Object.entries(SIcons)) {
        if (typeof component === 'string') continue;
        // console.log(name, component, component instanceof IconComponent )
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}