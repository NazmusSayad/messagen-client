export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? null : JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  value === null
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value))
}
