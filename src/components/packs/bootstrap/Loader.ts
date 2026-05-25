// packs/lucide/loadIcons.ts

import * as BootstrapIcons from "react-icons/bs";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadBootstrapIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(BootstrapIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}