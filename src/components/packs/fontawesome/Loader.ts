import * as FontAwesomeIcons from "react-icons/fa";


export type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: object; }>;

export function loadFontAwesomeIcons() {
    const metaArray: Array<string> = [];
    const componentMap = new Map<string, IconComponent>();

    for (const [name, component] of Object.entries(FontAwesomeIcons)) {
        //console.log(name, component)
        metaArray.push(name);
        componentMap.set(name, component as IconComponent);
    }

    return { metaArray, componentMap };
}