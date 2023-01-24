import { lazy } from 'react'

export const Home = lazy(() => import('$features/LandingPage'))
export const Login = lazy(() => import('$features/Auth/Login'))
export const Signup = lazy(() => import('$features/Auth/Signup'))
