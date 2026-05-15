import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import PackSelect from "./components/PackSelect";
import Search from "./components/Search";
import { Heart } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import LucideIconsList from "./components/packs/lucide/LucideIconsList";
import HeroIconsList from "./components/packs/heroicon/HeroIconsList";
import SIconsList from "./components/packs/si/SIconsList";
import ThemePicker from "./components/ThemePicker";

const colors = [
  '#2196F3',
  '#F44336',
  '#4CAF50',
  '#9C27B0',
  '#00BCD4',
  '#FFEB3B',
  '#FEFEFE',
  '#151515',
];

const packs = [
  'Lucide',
  'Heroicon',
  'SI React',
];

export default function App() {
  const [color, setColor] = useState<string>(colors[0]);
  const [pack, setPack] = useState<string>(packs[0]);
  const [query, setQuery] = useState<string>('');
  const [dark, setDark] = useState<boolean>(true);

  return (
    <div className="h-full w-full flex flex-col">
      <header className="shrink-0 flex h-10 w-full">
        <ColorPicker
          colors={colors}
          color={color}
          onChangeColor={c => setColor(c)}
        />
        <Search
          onSearch={s => setQuery(s)}
          className="grow"
          placeholder={`Search ${pack} icons...`}
        />
        <ThemePicker
          dark={dark}
          onChangeDark={dark => setDark(dark)}
        />
        <PackSelect
          packs={packs}
          pack={pack}
          onChangePack={p => setPack(p)}
        />
      </header>


      <main className="grow overflow-x-auto">
        {pack === 'Lucide' && <LucideIconsList query={query} color={color} />}
        {pack === 'Heroicon' && <HeroIconsList query={query} color={color} />}
        {pack === 'SI React' && <SIconsList query={query} color={color} />}
      </main>


      <footer className="font-[NFPixel] shrink-0 text-lg flex gap-1 items-center h-10 px-2 border-t">
        Made with
        <Heart className="size-4 fill-red-500 stroke-none" />
        by
        <a href="https://abolfazlrajaee.ir" target="blank" className="text-primary hover:underline">
          Abolfazl
        </a>
        <div className="grow text-right">
          <SiGithub className="size-6 ml-auto" />
        </div>
      </footer>
    </div>
  );
}