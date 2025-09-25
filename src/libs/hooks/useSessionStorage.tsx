// libs/hooks/useSessionStorage.ts
interface UseSessionStorage {
    set: (name: string, value: string) => void;
    get: (name: string) => string | null;
    remove: (name: string) => void;
  }
  
  export const useSessionStorage: UseSessionStorage = {
    set: (name, value) => {
      sessionStorage.setItem(name, value);
    },
    get: (name) => {
      return sessionStorage.getItem(name);
    },
    remove: (name) => {
      sessionStorage.removeItem(name);
    },
  };
  