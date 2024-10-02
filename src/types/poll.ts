export enum PollStatus {
  Open = 'open',
  Closed = 'closed',
}

export type Option = {
  id: string
  title: string
}

export type PollMetadata = {
  location: string
  language: string
}

export type PollSettings = {
  multiple_choice: boolean
}

export type Tag = string

export type Poll = {
  id: string
  title: string
  description: string
  status: PollStatus
  metadata: PollMetadata
  settings: PollSettings

  options: Option[]
  tags: Tag[]
}

export type PollResultsOption = {
  id: string
  vote_count: number
}

export type PollResultsTag = {
  name: string
  vote_count: number
}

export type PollResults = {
  id: string
  key: string
  version: string
  vote_count: number
  participant_count: number
  created_at: number
  updated_at: number
  options: PollResultsOption[]
  tags: PollResultsTag[]
}

export type PollSelfOption = {
  id: string
  value: number
}

export type PollSelf = {
  id: string
  options: PollSelfOption[]
}
