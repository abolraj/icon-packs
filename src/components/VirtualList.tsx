import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

interface VirtualListProps<T> {
    items: Array<T>;
    rowHeightPX?: number | null;
    colsNumber?: number | null;
    overRowsNo: number;
    className?: string;
    children?: (item: T) => React.ReactNode;
};

export default function VirtualList<T>({
    items,
    rowHeightPX = null,
    colsNumber = null,
    overRowsNo,
    className = '',
    children,
}: VirtualListProps<T>) {

    const [startIdx, setStartIdx] = useState<number | null>(0);
    const [endIdx, setEndIdx] = useState<number | null>(10);
    const [boxHeight, setBoxHeight] = useState<number | null>(null);
    const [boxWidth, setBoxWidth] = useState<number | null>(null);
    const [itemWidth, setItemWidth] = useState<number | null>(null);
    const [itemHeight, setItemHeight] = useState<number | null>(null);
    const [colsNo, setColsNo] = useState<number | null>(colsNumber);
    const [rowHeight, setRowHeight] = useState<number | null>(rowHeightPX);
    const boxEl = useRef<HTMLDivElement>(null);
    const scrollTop = useRef<number>(0);
    const startRow = useRef<number>(0);
    const endRow = useRef<number>(0);

    // Calculate the important values for using in virtual list
    const calcRange = () => {
        const rowsPerBox = Math.ceil(boxHeight / rowHeight);
        const _startRow = Math.max(0, Math.floor(scrollTop.current / rowHeight) - overRowsNo);
        const _endRow = Math.ceil(scrollTop.current / rowHeight) + rowsPerBox + overRowsNo;
        const newStartIdx = _startRow * colsNo;
        const newEndIdx = _endRow * colsNo + colsNo - 1;

        startRow.current = _startRow;
        endRow.current = _endRow;

        setStartIdx(newStartIdx);
        setEndIdx(newEndIdx);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        scrollTop.current = e.currentTarget.scrollTop;
        calcRange();
    }

    const totalRows = useMemo(() => {
        return Math.ceil(items.length / colsNo);
    }, [items, colsNo]);

    const totalRowsHeight = useMemo(() => {
        return totalRows * rowHeight;
    }, [totalRows, rowHeight]);

    const getPrevSpacerHeight = () => {
        return Math.max(startRow.current * (rowHeight), 0);
    }
    const getNextSpacerHeight = () => {
        return Math.max(totalRowsHeight - (endRow.current) * rowHeight, 0);
    }

    const slicedItems = useMemo(() => {
        return items.slice(startIdx, endIdx + 1);
    }, [items, startIdx, endIdx]);

    useEffect(() => {
        const newBoxHeight = boxEl.current?.getBoundingClientRect().height;
        const newBoxWidth = boxEl.current?.getBoundingClientRect().width;
        const newItemHeight = boxEl.current?.querySelector('.vl-item').getBoundingClientRect().height;
        const newItemWidth = boxEl.current?.querySelector('.vl-item').getBoundingClientRect().width;
        const newColsNo = colsNo || Math.floor(newBoxWidth / newItemWidth);
        const newRowHeight = newItemHeight;

        if (colsNo !== newColsNo) {
            setColsNo(newColsNo);
        }
        if (rowHeight !== newRowHeight) {
            setRowHeight(newRowHeight);
        }
        if (boxWidth !== newBoxWidth) {
            setBoxWidth(newBoxWidth);
        }
        if (itemWidth !== newItemWidth) {
            setItemWidth(newItemWidth);
        }
        if (itemHeight !== newItemHeight) {
            setItemHeight(newItemHeight);
        }
        if (boxHeight !== newBoxHeight) {
            setBoxHeight(newBoxHeight);
        } else {
            calcRange();
        }

    }, [
        boxHeight,
        boxWidth,
        itemWidth,
        itemHeight,
        colsNo,
        rowHeight,
    ]);


    return (
        <div
            className={'h-20 w-full grid gap-0 overflow-auto scrollbar-track-transparent scrollbar-thumb-foreground content-start ' + className}
            ref={boxEl}
            style={{ gridTemplateColumns: colsNumber ? `repeat(${colsNo}, minmax(0, 1fr))` : undefined }}
            onScroll={handleScroll}
        >
            {/* prev spacer */}
            <div className='col-span-full' style={{ width: '100%', height: getPrevSpacerHeight() }}>

            </div>
            {slicedItems.map((item, i) => (
                <div className='vl-item' key={'' + item + i}>
                    {(children(item))}
                </div>
            ))}
            {/* next spacer */}
            <div className='col-span-full' style={{ width: '100%', height: getNextSpacerHeight() }}>

            </div>
        </div>
    );
}