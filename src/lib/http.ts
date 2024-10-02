import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import merge from 'lodash/merge'
import trim from 'lodash/trim'

export interface BaseResponse<T = unknown> {
  ok: boolean
  data: T
}

export type ExchangeTokenResponse = {
  access_token: string
  refresh_token: string
}

export enum ApiVersion {
  BASE = '/',
  V1 = 'v1/',
  V2 = 'v2/',
}

export type Endpoint = string

type HttpOptions<T = unknown> = {
  body: T
  config?: AxiosRequestConfig<unknown>
  version?: ApiVersion
}

export class Http {
  private awaitingRefresh = false

  private requestQueue: Array<() => void> = []

  constructor(
    private readonly client: AxiosInstance,
    private readonly secrets: Secrets,
  ) {
    this.setupInterceptors()
  }

  private async retryQueuedRequests() {
    while (this.requestQueue.length > 0) {
      const retryRequest = this.requestQueue.shift()
      if (retryRequest) {
        retryRequest()
      }
    }
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(async (config) => {
      if (this.awaitingRefresh) {
        // Return a new promise that resolves when the refresh is complete
        // and then retries the request.
        return new Promise((resolve) => {
          this.requestQueue.push(() => resolve(config))
        })
      }
      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 498) {
          if (!this.awaitingRefresh) {
            this.awaitingRefresh = true

            try {
              await this.refreshAccessToken()
              await this.retryQueuedRequests()
            } catch (refreshError) {
              console.error('Failed to refresh token:', refreshError)
              // Optionally, clear the queue on failure to prevent hanging requests
              this.requestQueue = []
            } finally {
              this.awaitingRefresh = false
            }
          }

          // Re-queue the failed request for retry after refresh
          return new Promise((resolve, reject) => {
            this.requestQueue.push(() => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              this.client.request(error.config!).then(resolve).catch(reject)
            })
          })
        }

        if (error.response) {
          throw new Error(error.response.statusText)
        } else if (error.request) {
          throw new Error('The request was made but no response was received')
        } else {
          throw new Error('An error occurred during the request setup')
        }
      },
    )
  }

  async post<T>(endpoint: Endpoint, options: HttpOptions): Promise<T> {
    const { data } = await this.client.post<T>(
      this.createCallUrl(endpoint, options.version),
      options.body,
      this.authorizeConfig(options.config),
    )
    return data
  }

  async get<T>(endpoint: Endpoint, options?: HttpOptions): Promise<T> {
    const { data } = await this.client.get<T>(
      this.createCallUrl(endpoint, options?.version),
      this.authorizeConfig(options?.config),
    )
    return data
  }

  async delete<T>(endpoint: Endpoint, options?: HttpOptions): Promise<T> {
    const { data } = await this.client.delete<T>(
      this.createCallUrl(endpoint, options?.version),
      this.authorizeConfig(options?.config),
    )
    return data
  }

  async patch<T>(endpoint: Endpoint, options: HttpOptions): Promise<T> {
    const { data } = await this.client.patch<T>(
      this.createCallUrl(endpoint, options.version),
      options.body,
      this.authorizeConfig(options.config),
    )
    return data
  }

  private async refreshAccessToken() {
    const url = this.createCallUrl('/auth/refresh')
    const { data } = await this.post<BaseResponse<ExchangeTokenResponse>>(url, {
      body: { refresh_token: this.secrets.getRefreshedAt() },
    })
    this.secrets.refreshTokens(data.access_token, data.refresh_token)
  }

  private createCallUrl(endpoint: Endpoint, version: ApiVersion = ApiVersion.V1): string {
    return `${version}${trim(endpoint, '/')}` // TODO: Add support for dynamic endpoints
  }

  private authorizeConfig(config?: AxiosRequestConfig<unknown>): AxiosRequestConfig<unknown> {
    const headers: Record<string, unknown> = {}
    const params: Record<string, unknown> = {}

    if (this.secrets?.getAccessToken()) {
      headers['Authorization'] = `Bearer ${this.secrets.getAccessToken()}`
    }

    return merge(config, {
      headers,
      params,
    })
  }
}

export class Secrets {
  private refreshedAt: Date | null

  constructor(
    private accessToken: string,
    private refreshToken: string,
  ) {
    this.refreshedAt = null
  }

  updateTokens(accessToken: string, refreshToken?: string) {
    this.accessToken = accessToken
    if (refreshToken) {
      this.refreshToken = refreshToken
    }
  }

  public refreshTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.refreshedAt = new Date()
  }

  public getAccessToken(): Readonly<string> {
    return this.accessToken
  }

  public getRefreshedAt(): Date | null {
    return this.refreshedAt
  }

  public isAccessTokenSet(): boolean {
    return !!this.accessToken
  }
}
