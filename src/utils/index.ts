export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? null : JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  value === null
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value))
}

export const parseFormToObj = <
  T = { [key: string]: string | File | File[] | FileList | Date }
>(
  form
) => {
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
  const hex = 16
  const magic = (s) => Math.floor(s).toString(hex)
  const str =
    magic(Date.now() / 1000) +
    ' '.repeat(hex).replace(/./g, () => magic(Math.random() * hex))

  return '#' + str
}

export const parseFilesToBASE64 = (files: File[]): Promise<string[]> => {
  const promises = files.map(parseFileToBASE64)
  return Promise.all(promises)
}

export const parseFileToBASE64 = (file: File): Promise<string> => {
  return new Promise((res) => {
    const reader = new FileReader()
    reader.onload = () => res(reader.result as string)
    reader.readAsDataURL(file)
  })
}

export const parseFilesToURL = (files: File[]) => {
  return files.map((file) => URL.createObjectURL(file))
}

export const convertToFormData = (object) => {
  const formData = new FormData()
  for (let key in object) formData.append(key, object[key])
  return formData
}
