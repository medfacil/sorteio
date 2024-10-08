import { prisma } from '@/app/lib'
import s from './listRegisters.module.css'
import { notFound } from 'next/navigation'
import ButtonExcel from '@/componentes/buttonExcel'
import ListUsers from '@/componentes/listUsers'
import { Suspense } from 'react'

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
        <Suspense fallback={<p>Buscando registros...</p>}>
          <ListUsers users={users} />
        </Suspense>
      </div>
    </div>
  )
}