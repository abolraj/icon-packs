import * as HeroIcons from "@heroicons/react/24/solid";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadHeroIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(HeroIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}