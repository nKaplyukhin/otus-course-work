export const setCookie = (name: string, data: string) => {
  let date: string | Date = new Date(Date.now() + 86400e3);
  date = date.toUTCString();
  document.cookie = `${name}=${data}; secure expires=${date}`;
}

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name: string) => {
  if (getCookie(name)) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
}