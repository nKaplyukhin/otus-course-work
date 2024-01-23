import axios from "axios"
import { useCallback, useState } from "react"
import { ILoginForm } from "types/form"

function getCookie(name: string) {
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

export const useToken = () => {
  const [token, setToken] = useState<string | undefined>(getCookie("token"))
  const [error, setError] = useState<string | undefined>(undefined)

  const signin = useCallback((body: ILoginForm) => {
    axios.post(`${process.env.API}signin`, body).then((response) => {
      const tokenResponse = response.data.token

      let date: string | Date = new Date(Date.now() + 86400e3);
      date = date.toUTCString();
      document.cookie = `token=${tokenResponse}; 'max-age=${date}`;

      setToken(response.data.token)
    }).catch(({ response }) => {
      const error = response.data.errors

      setError(error[0].message)
    })
  }, [])


  const logout = useCallback(() => {
    setToken(undefined)
    deleteCookie("token")
  }, [setToken])

  console.log(token);


  return { token, tokenError: error, signin, logout }
}