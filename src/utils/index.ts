export const getCookies = () => {
  return Object.fromEntries(
    document.cookie.split('; ').map((item) => {
      const firstEqual = item.indexOf('=')
      return [item.slice(0, firstEqual), item.slice(firstEqual + 1, Infinity)]
    })
  )
}
