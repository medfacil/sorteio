import s from "./login.module.css";
import { Lock, UserCircle } from "lucide-react";
import { handleLogin } from "../actions";

export default async function Login() {
  return (
    <div className={s.page}>
      <form action={handleLogin} className={s.form}>
        <div className={s.contentInput}>
          <label htmlFor="username" className={s.label}>
            <UserCircle size={20} color="var(--primary)" />
            Usuário
          </label>
          <input type="text" placeholder="Seu login de usuario" id="username" name="username" className={s.input} required />
        </div>
        <div className={s.contentInput}>
          <label htmlFor="password" className={s.label}>
            <Lock size={20} color="var(--primary)" />
            Senha
          </label>
          <input type="password" placeholder="Sua senha" id="password" name="password" className={s.input} required />
        </div>
        <button type="submit" className={s.button}>Entrar</button>
      </form>
    </div>
  );
}
