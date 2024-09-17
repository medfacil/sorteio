'use client';
import { toastConfig } from "@/utils/toast";
import s from "./page.module.css";
import { CalendarDays, MapPinned, Smartphone, UserCircle } from "lucide-react";
import Image from 'next/image'
import { useState } from "react";
import { toast } from "react-toastify";
import imagefundo from "../../public/fundo.png"
import Termos from "@/componentes/terms";

export default function Home() {
  const [name, setName] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [endereço, setEndereço] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, nascimento, whatsapp, endereço }),
      })

      if (!response.ok) {
        const erroResponse = await response.json();
        toast.error(erroResponse.message, toastConfig);
        setLoading(false)
        return
      }

      const data = await response.json();
      console.log(data)
      toast.success(`${data.data.name} registrado com sucesso, boa sorte!`, toastConfig);
      setLoading(false)
      setName('')
      setNascimento('')
      setWhatsapp('')
      setEndereço('')
    } catch (error) {
      console.error(error);
      setLoading(false)
      toast.error('Erro ao cadastrar o usuário', toastConfig);
      setEndereço('')
      setNascimento('')
      setWhatsapp('')
      setName('')
    }
  }

  return (
    <div className={s.page}>
      <Image src={imagefundo} alt="Raspou, achou, ganhou!" className={s.image} placeholder="blur" quality={100} />
      <form onSubmit={submit} className={s.form}>
        <div className={s.contentInput}>
          <label htmlFor="name" className={s.label}>
            <UserCircle size={20} color="var(--primary)" />
            Nome Completo
          </label>
          <input
            type="text"
            placeholder="Seu Nome"
            id="name"
            name="name"
            className={s.input}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="nascimento" className={s.label}>
            <CalendarDays size={20} color="var(--primary)" />
            Data de Nascimento
          </label>
          <input
            type="date"
            id="nascimento"
            name="nascimento"
            placeholder="DD-MM-AAAA"
            className={s.input}
            required
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="whatsapp" className={s.label}>
            <Smartphone size={20} color="var(--primary)" />
            Numero WhatsApp
          </label>
          <input
            type="tel"
            placeholder="Seu Whatsapp"
            id="whatsapp"
            name="whatsapp"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={12}
            className={s.input}
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="address" className={s.label}>
            <MapPinned size={20} color="var(--primary)" />
            Endereço
          </label>
          <input
            type="text"
            placeholder="Seu Endereço"
            id="address"
            name="address"
            className={s.input}
            value={endereço}
            onChange={(e) => setEndereço(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={s.button} disabled={loading}>{loading ? 'Enviando...' : 'Cadastrar'}</button>
        <Termos description="Válida de 07 a 31 de outubro de 2024, ou enquanto durarem os estoques. Em compras acima de R$100,00, o cliente ganha 1 raspadinha por CPF. A entrega dos brindes será feita em até 5 dias úteis e é responsabilidade do ganhador recebê-los, Brindes sujeito a disponibilidade." />
      </form>
    </div>
  );
}
