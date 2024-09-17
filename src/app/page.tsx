import { prisma } from "./lib";
import s from "./page.module.css";
import { CalendarDays, MapPinned, Smartphone, UserCircle } from "lucide-react";
import Image from 'next/image'
import raspouImage from '../../public/raspou_selo.png'

export default async function Home() {
  async function submit(formData: FormData) {
    'use server'

    const name = formData.get('name')
    const nascimento = formData.get('nascimento')
    const whatsapp = formData.get('whatsapp')
    const address = formData.get('address')

    if (!name || !nascimento || !whatsapp || !address) {
      return
    }

    try {
      const newRegister = await prisma.user.create({
        data: {
          name: name as string,
          birth: new Date(nascimento.toString()) as Date,
          number: parseInt(whatsapp.toString()) as number,
          adress: address as string,
          createdAt: new Date(),
        }
      })

      console.log(newRegister)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={s.page}>
      <Image src={raspouImage} alt="Raspou Selo" className={s.image} placeholder="blur" quality={100} />
      <form action={submit} className={s.form}>
        <div className={s.contentInput}>
          <label htmlFor="name" className={s.label}>
            <UserCircle size={20} color="var(--primary)" />  Nome Completo
          </label>
          <input type="text" placeholder="Seu Nome" id="name" name="name" className={s.input} required />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="nascimento" className={s.label}>
            <CalendarDays size={20} color="var(--primary)" />
            Data de Nascimento
          </label>
          <input type="date" id="nascimento" name="nascimento" placeholder="DD-MM-AAAA" className={s.input} required />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="whatsapp" className={s.label}>
            <Smartphone size={20} color="var(--primary)" />
            Numero WhatsApp
          </label>
          <input type="tel" placeholder="Seu Whatsapp" id="whatsapp" name="whatsapp" className={s.input} required />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="address" className={s.label}>
            <MapPinned size={20} color="var(--primary)" />
            Endereço
          </label>
          <input type="text" placeholder="Seu Endereço" id="address" name="address" className={s.input} required />
        </div>
        <button type="submit" className={s.button}>Cadastrar</button>
      </form>
    </div>
  );
}
