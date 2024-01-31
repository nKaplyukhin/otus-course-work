export const addDefaults = (e: React.SyntheticEvent<HTMLElement>) => {
  e.preventDefault()
  e.stopPropagation();
}

export const getTokenAuth = (token: string) => `Bearer ${token}`


export const getHeadersWithAuthToken = (token: string | undefined) => {

  if (token) {
    return {
      headers: {
        authorization: getTokenAuth(token)
      }
    }
  }
  return {}
}