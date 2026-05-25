import * as MaterialIcons from "react-icons/md";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadMaterialIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(MaterialIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}