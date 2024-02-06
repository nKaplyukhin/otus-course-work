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


export const getRandomCOlor = (alpha: number = 1) => {
  const R = Math.floor(Math.random() * (255 + 1));
  const G = Math.floor(Math.random() * (255 + 1));
  const B = Math.floor(Math.random() * (255 + 1));

  return `rgba(${R}, ${G}, ${B}, ${alpha})`
}
