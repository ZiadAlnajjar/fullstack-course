export const wait = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000));

export const waitSync = (callback, sec) => setTimeout(callback, sec * 1000);
