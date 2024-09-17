'use client'
import { formatedDate } from '@/utils/date'
import s from './buttonExcel.module.css'
import { exportToExcel } from '@/utils/toExcel'
import { Sheet } from 'lucide-react'

interface Props {
  users: Iusers[]
}

interface Iusers {
  name: string
  number: string
  adress: string
  birth: Date
  createdAt: Date
}

export default function ButtonExcel({ users }: Props) {
  const handleExport = () => {
    const data = users.map((user) => ({
      Nome: user.name,
      WhatsApp: user.number,
      Endereço: user.adress,
      'Data de Nascimento': user.birth.toLocaleDateString('pt-BR'),
      'Criado em': formatedDate(user.createdAt),
    }));
    exportToExcel(data, 'registros.xlsx');
  };

  return (
    <button className={s.button}>
      <Sheet size={20} color='#ffff' />
      <span onClick={handleExport}>Gerar Excel</span>
    </button>
  )
}