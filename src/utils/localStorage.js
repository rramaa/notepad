export function readLocalStorage (key, defaultValue = []) {
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value) || defaultValue
  } catch (e) {
    value = defaultValue
  }
  return value
}

export function writeLocalStorage (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function clearLocalStorage (key) {
  window.localStorage.removeItem(key)
}
