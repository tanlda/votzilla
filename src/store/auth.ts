import {StateCreator} from 'zustand'

type Account = {
  id: string
}

type Credentials = {
  email: string
  password: string
}

interface AuthSlice {
  account: Account | undefined
  login: (credential: Credentials) => void
  signup: (credential: Credentials) => void
  logout: () => void
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  account: {id: ''},
  login: () => {
    set({account: {id: '1'}})
  },
  signup: () => {
    set({account: {id: '1'}})
  },
  logout: () => {
  },
})
