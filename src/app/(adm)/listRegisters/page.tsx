import { prisma } from '@/app/lib'
import s from './listRegisters.module.css'
import { formatedDate } from '@/utils/date'

export default async function ListRegisters() {
  const users = await prisma.user.findMany()

  return (
    <div className={s.page}>
      <h1>Lista de Registros</h1>
      <div className={s.list}>
        {users.map((user) => (
          <div className={s.card} key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.number}</p>
            <p>{user.adress}</p>
            <p>{user.birth.toLocaleDateString('pt-BR')}</p>
            <p>{formatedDate(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}