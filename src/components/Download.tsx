import type { MouseEventHandler } from "react";

interface DownloadProps {
    onDownload?: MouseEventHandler | null;
}

export default function Download({
    onDownload = null,
}: DownloadProps) {

    return (
        <div className='download-wrapper cursor-pointer absolute top-2 left-2 w-4 h-8 group' onClick={onDownload}>
            <div className='group-data-[copied=1]:hidden absolute left-[7.5px] top-1 group-hover:top-0 w-[1px] h-6 border-l'>
            </div>
            <div className='group-data-[copied=1]:hidden absolute left-[2px] top-[14px] group-hover:top-[10px] size-3 border-b border-r rotate-45'>
            </div>
            <div className='group-data-[copied=1]:hidden absolute left-[0px] top-7 w-4 h-[1px] border-b'>
            </div>
        </div>
    );
}