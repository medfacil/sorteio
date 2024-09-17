import s from './header.module.css'
import Image from 'next/image'
import raspouImage from '../../../public/raspou_selo.png'
import { RectangleEllipsis } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={s.header}>
      <Image src={raspouImage} alt="Logo Sorteio Medfelps" width={100} height={50} placeholder="blur" quality={100} className={s.logo} />
      <Link className={s.link} href="/login" ><RectangleEllipsis size={25} color="var(--primary)" /></Link>
    </header>
  )
}