import { lazy, Suspense, useState } from "react";
import ColorPicker from "./components/ColorPicker";
import PackSelect from "./components/PackSelect";
import Search from "./components/Search";
import { Heart } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ThemePicker from "./components/ThemePicker";
import Loader from "./components/Loader";

const LucideIconsList = lazy(() => import("./components/packs/lucide/LucideIconsList"));
const HeroIconsList = lazy(() => import("./components/packs/heroicon/HeroIconsList"));
const SIconsList = lazy(() => import("./components/packs/si/SIconsList"));
const BootstrapIconsList = lazy(() => import("./components/packs/bootstrap/BootstrapIconsList"));
const FontAwesomeIconsList = lazy(() => import("./components/packs/fontawesome/FontAwesomeIconsList"));
const MaterialIconsList = lazy(() => import("./components/packs/material/MaterialIconsList"));
const PhosphorIconsList = lazy(() => import("./components/packs/phosphor/PhosphorIconsList"));
const AntDesignIconsList = lazy(() => import("./components/packs/antdesign/AntDesignIconsList"));

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
  'Phosphor',
  'Heroicon',
  'SI React',
  'Bootstrap',
  'FontAwesome',
  'Material',
  'Ant Design',
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
        <Suspense fallback={<Loader />}>
          {pack === 'Lucide' && <LucideIconsList query={query} color={color} />}
          {pack === 'Heroicon' && <HeroIconsList query={query} color={color} />}
          {pack === 'SI React' && <SIconsList query={query} color={color} />}
          {pack === 'Bootstrap' && <BootstrapIconsList query={query} color={color} />}
          {pack === 'FontAwesome' && <FontAwesomeIconsList query={query} color={color} />}
          {pack === 'Material' && <MaterialIconsList query={query} color={color} />}
          {pack === 'Phosphor' && <PhosphorIconsList query={query} color={color} />}
          {pack === 'Ant Design' && <AntDesignIconsList query={query} color={color} />}
        </Suspense>
      </main>


      <footer className="font-[NFPixel] shrink-0 text-lg flex gap-1 items-center h-10 px-2 border-t">
        Made with
        <Heart className="size-4 fill-red-500 stroke-none" />
        by
        <a href="https://abolfazlrajaee.ir" target="blank" className="text-primary hover:underline">
          Abolfazl
        </a>
        <a className="grow text-right" href="https://hamgit.ir/abolraj/icon-packs">
          <SiGithub className="size-6 ml-auto" />
        </a>
      </footer>
    </div>
  );
}