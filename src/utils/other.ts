export const addDefaults = (e: React.SyntheticEvent<HTMLElement>) => {
  e.preventDefault()
  e.stopPropagation();
}

export const getTokenAuth = (token: string) => `Bearer ${token}`

