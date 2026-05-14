import { useState, useCallback, type ChangeEvent, type HTMLAttributes } from 'react';

interface SearchProps extends HTMLAttributes<HTMLInputElement> {
    onSearch: (query: string) => void;
    placeholder: string;
    className?: string;
}

export default function Search({
    onSearch,
    placeholder,
    className = '',
    ...props
}: SearchProps) {
    const [value, setValue] = useState('');
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);

            if (timer) clearTimeout(timer);

            const newTimer = setTimeout(() => {
                onSearch(newValue);
            }, 300);

            setTimer(newTimer);
        },
        [onSearch, timer]
    );

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={'border-b min-w-10 h-10 focus-within:outline-none focus-visible:outline-none px-2 ' + className}
            {...props}
        />
    );
}