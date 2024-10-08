'use client'
import { formatedDate } from '@/utils/date'
import s from './listUsers.module.css'

interface Props {
  users: Iusers[]
}

interface Iusers {
  id: number
  name: string
  number: string
  adress: string
  birth: Date
  cpf: string | null
  createdAt: Date
}

export default function ListUsers({ users }: Props) {
  return (
    users.map((user) => (
      <div className={s.card} key={user.id}>
        <div className={s.info}>
          <p className={s.label}>nome</p>
          <p className={s.value}>{user.name}</p>
        </div>
        <div className={s.info}>
          <p className={s.label}>whatsapp</p>
          <p>{user.number}</p>
        </div>
        <div className={s.info}>
          <p className={s.label}>criado em</p>
          <p>{formatedDate(user.createdAt)}</p>
        </div>
      </div>
    ))
  )
}