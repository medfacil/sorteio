import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">Pagina ou dados não encontrados</h1>
      <Link href="/" className="not-found__link">Voltar</Link>
    </div>
  )
}