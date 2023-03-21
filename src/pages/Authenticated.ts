import { lazy } from 'react'

export const Chat = lazy(() => import('$features/Chat'))
export const Dashboard = lazy(() => import('$features/Dashboard'))
export const ChatMain = lazy(() => import('$features/Chat/Main'))
export const Contacts = lazy(() => import('$features/Contacts'))
export const Settings = lazy(() => import('$features/Settings'))
export const Profile = lazy(() => import('$features/Profile'))
