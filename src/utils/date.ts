export const getDateFromDateString = (datestring: string) => {
  const date = new Date(datestring);

  const year = date.getFullYear()
  const month = `${date.getMonth()}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")

  return `${day}-${month}-${year}`
}