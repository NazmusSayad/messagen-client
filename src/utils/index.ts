export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? null : JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  value === null
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value))
}

export const parseFormInputs = (form) => {
  const inputs = [
    ...form.querySelectorAll('input[name]:not([type="radio"])'),
    ...form.querySelectorAll('input[name][type="radio"]:checked'),
    ...form.querySelectorAll('textarea[name]'),
  ]
  const values = {}
  const elements = {}

  inputs.forEach((input) => {
    const name = input.name
    if (!name) return
    const value =
      input.type === 'file'
        ? input.files
        : input.type === 'date'
        ? input.value && new Date(input.value)
        : input.value

    values[name] = value
    elements[name] = input
  })

  return [values, elements, form]
}
