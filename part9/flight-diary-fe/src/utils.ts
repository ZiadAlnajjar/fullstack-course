export const getEnumArr =
    <T extends Record<string, string | number>>(enumObj: T): (T[keyof T])[] => {
    return Object.keys(enumObj)
        .filter(key => isNaN(Number(key)))
        .map(key => enumObj[key as keyof T]);
}
