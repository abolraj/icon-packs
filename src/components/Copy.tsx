interface CopyProps {
    copied?: boolean | null;
    item?: any;
    onCopy?: ((item: any) => void) | null;
}

export default function Copy({
    copied = null,
    item = null,
    onCopy = null,
}: CopyProps) {

    return (
        <div className='copy-wrapper cursor-pointer absolute top-2 right-2 group' onClick={onCopy && (() => onCopy(item))} data-copied={copied || false}>
            <div className='group-data-[copied=1]:hidden absolute right-0 top-1 w-4 h-6 border'>
            </div>
            <div className='group-data-[copied=1]:hidden absolute bg-background right-1 top-0 w-4 h-6 border'>
            </div>
            <div className='hidden group-data-[copied=1]:block absolute right-1 -top-1 w-2 h-6 border-b border-r rotate-45 border-success'>
            </div>
        </div>
    );
}