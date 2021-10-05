import customTheme from "../theme";

export const roundTo = (num: number, decimal: number): number => {
    return Number(num.toFixed(decimal))
}

export const extractData = (data: any) => (data.series[0].fields[0].values.buffer[0].data);

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
]

export const getMonthLabel = (index: number) => (months[index]);

const colors: Record<string, string> = {
    democratic: customTheme.customColor.blue,
    republican: customTheme.customColor.red,
    other: customTheme.customColor.yellow,
    female: customTheme.customColor.purple,
    male: customTheme.customColor.brown,
    unknown: customTheme.customColor.pink,
};
export const getColor = (bar: any) => {
    return colors[bar.id];
}
