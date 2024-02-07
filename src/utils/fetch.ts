export const uploadImage = async (files: FileList, token: string) => {
  const body = new FormData();
  // важно использовать название file append('file', ...) иначе работать не будет
  body.append('file', files[0]);
  return fetch('http://19429ba06ff2.vps.myjino.ru/api/upload', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body,
  })
    .then(res => res.json())
    .catch((err) => {
      console.error(err);
      throw new Error("Не удалось загрузить файл")
    })
}