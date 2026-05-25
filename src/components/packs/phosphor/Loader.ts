import * as PhosphorIcons from "react-icons/pi";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadPhosphorIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(PhosphorIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}