export enum RoomStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type Room = {
  id: string
  name: string
  status: RoomStatus
  description: string
  display_name: string
  icon?: string
  image?: string
  banner?: string
}
