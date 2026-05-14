import { Moon, Sun } from "lucide-react";
import { useEffect, type HTMLAttributes } from "react";

interface ThemePickerProps extends HTMLAttributes<HTMLDivElement> {
    dark: boolean;
    onChangeDark: (dark: boolean) => void;
}

export default function ThemePicker({
    dark,
    onChangeDark,
}: ThemePickerProps) {

    useEffect(() => {
        if(dark && !document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.add('dark');
        }
        if(!dark && document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    return (
        <div className='relative '>
            {/* trigger */}
            <button
                className="btn size-10 flex items-center justify-center border-b border-l border-foreground"
                onClick={() => onChangeDark(!dark)}
                dir="rtl"
            >
                {dark ? (
                    <Sun className="size-4" />
                ) : (
                    <Moon className="size-4" />
                )}
            </button>

        </div>
    );
}