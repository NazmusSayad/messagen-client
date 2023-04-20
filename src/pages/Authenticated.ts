import { lazy } from 'react'

export { default as Dashboard } from '$features/Dashboard'
export { default as ChatMain } from '$features/Chat/Content'
export { default as Chat } from '$features/Chat'

export const Contacts = lazy(() => import('$features/Contacts'))
export const Settings = lazy(() => import('$features/Settings'))
export const Profile = lazy(() => import('$features/Profile'))
