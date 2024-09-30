import { LRUCache } from 'lru-cache'
import { AuthOptions, NextAuthOptions } from 'next-auth'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import type { Http } from '@/lib/http'
import type { User } from '@/types/user'

export type ISODateString = string

export interface Session {
  user?: Record<string, unknown>
  expires: ISODateString
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  providers: [],
  callbacks: {
    async jwt({ token }) {
      return token
    },

    async session({ token, session }) {
      const local: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.uid as number,
        },
      }

      return local
    },
  },
}

const cache = new LRUCache<string, Session>({ max: 1000 })

export async function getServerSession(
  http: Http,
  options: {
    req: NextApiRequest | GetServerSidePropsContext['req']
    res?: NextApiResponse | GetServerSidePropsContext['res']
    authOptions?: AuthOptions
  },
) {
  const { req, authOptions: { secret } = {} } = options
  const token = await getToken({ req, secret })

  if (!token) {
    return null
  }

  const cached = cache.get(JSON.stringify(token))
  if (cached) {
    return cached
  }

  const user = await http.post<User>('/users/data', { body: { id: token.uid } })

  const session: Session = {
    expires: new Date(typeof token.exp === 'number' ? token.exp * 1000 : Date.now()).toISOString(),
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  }

  cache.set(JSON.stringify(token), session)

  return session
}
