import { useState, type HTMLAttributes } from "react";

interface ColorPickerProps extends HTMLAttributes<HTMLDivElement> {
    color: string;
    colors: Array<string>;
    onChangeColor: (color: string) => void;
    className?: string;
}

export default function ColorPicker({
    color,
    colors,
    onChangeColor,
    className = '',
    ...props
}: ColorPickerProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={'relative ' + className} {...props}>
            {/* trigger */}
            <button
                className="size-10 border-r border-b border-foreground text-primary-foreground "
                style={{ backgroundColor: color }}
                onClick={() => setOpen(o => !o)}
            >
                C
            </button>

            {/* overlay */}
            {open &&
                <button className="fixed w-screen h-screen bg-background/50 left-0 top-0 z-40" onClick={() => setOpen(false)}>
                </button>
            }

            {/* list */}
            {colors && open &&
                <ul className="absolute top-[100%] left-0 z-50">
                    {colors.map((color, i) => (
                        <li className='border-b border-r size-10' key={i}>
                            <button
                                className="size-full"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    setOpen(false);
                                    onChangeColor(color)
                                }}
                            >

                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}