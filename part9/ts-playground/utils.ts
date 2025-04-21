export const isNumber = (item: unknown): item is number => typeof item === 'number';

export const areNumbers = (item: unknown[]): item is number[] => item.every(element => typeof element === 'number');

export const hasNaNs = (item: number[]): boolean => item.some(isNaN);

export const hasProps = <T extends object, K extends keyof T> (
    obj: T,
    props: K | K[]
): obj is T & Record<K, unknown> => {
    const keys = Array.isArray(props) ? props : [props];

    return (
        typeof obj === "object"
        && obj !== null
        && keys.every((key) => key in obj)
    );
};

export const isArray = (variable: unknown): variable is unknown[] => Array.isArray(variable);
