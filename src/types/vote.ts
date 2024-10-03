export enum VoteType {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export type VoteResponse = {
  ok: boolean
  uuid: string
  timestamp: number
}

export type VoteOption = {
  id: string
  value: number
}

export type VoteMessage = {
  poll_id: string
  uuid: string
  name: string
  type: string
  timestamp: number
  options: VoteOption[]
  previous_options?: VoteOption[]
}
