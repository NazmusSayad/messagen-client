export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key)
  return value === null ? null : JSON.parse(value)
}

export const setLocalStorage = (key, value) => {
  value === null
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(value))
}

export const parseFormInputs = <T = any>(form) => {
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

export const parseFileListToBASE64 = async (files: FileList) => {
  const promises: Promise<string>[] = []

  for (let i = 0; i < files.length; i++) {
    promises.push(
      new Promise((res) => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = () => res(reader.result as string)
        reader.readAsDataURL(file)
      })
    )
  }

  return await Promise.all(promises)
}

export const parseFileListToURL = (files: FileList): string[] => {
  const images: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const url = URL.createObjectURL(file)
    images.push(url)
  }

  return images
}

export const convertToFormData = (object) => {
  const formData = new FormData()
  for (let key in object) formData.append(key, object[key])
  return formData
}
