export function useDownloadSVG() {
    const downloadSVG = (svgText: string, filename: string): boolean => {
        try {
            const blob = new Blob([svgText], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();

            URL.revokeObjectURL(url);
            return true;
        } catch {
            return false;
        }
    };

    return { downloadSVG };
}