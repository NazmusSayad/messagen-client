export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? null : JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  value == null
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value))
}

type FormType = { [key: string]: string | File | File[] | FileList | Date }
export const parseFormToObj = <T = FormType>(form) => {
  const inputs = [
    ...form.querySelectorAll('input[name]:not([type="radio"])'),
    ...form.querySelectorAll('input[name][type="radio"]:checked'),
    ...form.querySelectorAll('textarea[name]'),
  ]
  const values = {}

  inputs.forEach((input) => {
    const name = input.name
    if (!name) return
    const value =
      input.type === 'file'
        ? input.multiple
          ? input.files
          : input.files[0]
        : input.type === 'date'
        ? input.value && new Date(input.value)
        : input.value

    values[name] = value
  })

  return values as T
}

export const createTempObjectId = () => {
  const dateString = Date.now().toString(36)
  const randomness = Math.random().toString(36).substr(2)
  return ('ID' + dateString + randomness).toUpperCase()

  const hex = 16
  const magic = (s) => Math.floor(s).toString(hex)
  const str =
    magic(Date.now() / 1000) +
    ' '.repeat(hex).replace(/./g, () => magic(Math.random() * hex))

  return '_' + str
}

export const parseFilesToURL = (files: File[]) => {
  return files.map((file) => URL.createObjectURL(file))
}

export const convertToFormData = (object) => {
  const formData = new FormData()
  for (let key in object) {
    const value = object[key]

    if (Array.isArray(value)) {
      for (let singleValue of value) {
        formData.append(key, singleValue)
      }
    } else {
      formData.append(key, value)
    }
  }

  return formData
}
