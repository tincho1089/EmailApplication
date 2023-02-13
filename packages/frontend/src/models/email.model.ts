export interface Email {
  id: string
  from: string
  to: string
  subject: string
  body: string
  date: string
  state: string
}

export interface newEmail {
  from: string
  to: string
  subject: string
  body: string
}

export interface ApiEmail {
  _id: string
  from: string
  to: string
  subject: string
  body: string
  date: Date
  state: string
}
