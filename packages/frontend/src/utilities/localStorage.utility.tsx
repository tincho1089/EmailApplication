export const persistLocalStorage = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify({ ...value }))
}

export enum LocalStorageKeys {
  REFRESH_TOKEN = 'refreshToken',
  TOKEN = 'jwtToken',
  USER = 'user',
  USER_TOKEN = 'user.jwtToken',
}

export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

export const getInLocalStorage = (key: string) => {
  const result = localStorage.getItem(key)
  return !!result && JSON.parse(result)
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
