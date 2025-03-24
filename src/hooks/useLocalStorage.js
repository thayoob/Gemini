import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
    const [storedValue, SetStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log("Error reading form local storage ", error);
            return initialValue
        }
    })

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            SetStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error writing to local storage:", error);
        }
    }
    return [storedValue, setValue];
}

export default useLocalStorage