export const useFormat = () => {
    const format = (value: number): string => {
        return value.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };
    return { format };
};