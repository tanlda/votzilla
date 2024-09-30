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
