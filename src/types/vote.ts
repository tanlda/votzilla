export enum VoteType {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type VoteResponse = {
  ok: boolean
  uuid: string
  timestamp: number
}
