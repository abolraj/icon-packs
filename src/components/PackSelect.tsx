import { useState, type HTMLAttributes } from "react";

interface PackSelectProps extends HTMLAttributes<HTMLDivElement> {
    pack: string;
    packs: Array<string>;
    onChangePack: (pack: string) => void;
    className?: string;
}

export default function PackSelect({
    pack,
    packs,
    onChangePack,
    className = '',
    ...props
}: PackSelectProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={'relative ' + className} {...props}>
            {/* trigger */}
            <button
                className="btn size-10 border-b border-l border-foreground"
                onClick={() => setOpen(o => !o)}
                dir="rtl"
            >
                {pack[0].toUpperCase()}
            </button>

            {/* overlay */}
            {open &&
                <button className="fixed w-screen h-screen bg-gray-900/50 right-0 top-0 z-40" onClick={() => setOpen(false)}>
                </button>
            }

            {/* list */}
            {packs && open &&
                <ul className="z-50 absolute top-[100%] right-0 w-40 box-content">
                    {packs.map((pack, i) => (
                        <li className='btn w-full border-foreground border-b border-l px-2' key={i}>
                            <button 
                            className="w-full text-left h-10"
                            onClick={() => {
                                setOpen(false);
                                onChangePack(pack);
                            }}
                            >
                                {pack}
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}