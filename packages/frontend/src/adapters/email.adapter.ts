import { ApiEmail, Email } from '@/models'

export const getEmailsAdapter = (emails: ApiEmail[]): Email[] => {
  return emails.map((email: ApiEmail) => ({
    id: email._id,
    from: email.from,
    to: email.to,
    subject: email.subject,
    body: email.body,
    date: email.date,
    state: email.state,
  }))
}
