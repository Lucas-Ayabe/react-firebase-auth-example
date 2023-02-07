export const StorageService = {
  get(key: string): string | null {
    return localStorage.getItem(key);
  },
  save(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
