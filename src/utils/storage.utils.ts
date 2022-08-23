export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
}

export const getParsedLocalStorageItem = (key: string) => {
  const item = getLocalStorageItem(key);
  return item ? JSON.parse(item) : null;
}

export const setLocalStorageItem = (key: string, data: any) => {
  if (!data || !key) {
    return;
  }

  const dataString = parse(data);
  localStorage.setItem(key, dataString);
}

function parse(data: any): string {
  try {
    return JSON.stringify(data);
  } catch {
    return '';
  }
}
