import * as AntDesignIcons from "react-icons/ai";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadAntDesignIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(AntDesignIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}