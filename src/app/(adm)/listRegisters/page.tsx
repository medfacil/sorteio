import { prisma } from '@/app/lib'
import s from './listRegisters.module.css'
import { formatedDate } from '@/utils/date'
import { notFound } from 'next/navigation'
import ButtonExcel from '@/componentes/buttonExcel'
import { UserCircle } from 'lucide-react'

export default async function ListRegisters() {
  const users = await prisma.user.findMany()

  if (!users) {
    notFound()
  }

  return (
    <div className={s.page}>
      <h1 className={s.title}>Lista de Registros</h1>
      <ButtonExcel users={users} />
      <div className={s.list}>
        {users.map((user) => (
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
        ))}
      </div>
    </div>
  )
}