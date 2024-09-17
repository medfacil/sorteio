import s from './header.module.css'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import { RectangleEllipsis } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={s.header}>
      <Link className={s.linklogo} href="/">
        <Image src={logo} alt="Logo Sorteio Medfelps" width={100} height={50} placeholder="blur" quality={100} className={s.logo} />
      </Link>
      <Link className={s.link} href="/listRegisters" ><RectangleEllipsis size={23} color="var(--primary)" /></Link>
    </header>
  )
}