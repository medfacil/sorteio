'use server'

import * as jose from 'jose';
import { cookies } from "next/headers";
import { prisma } from './lib';
import { redirect } from 'next/navigation';

// Função para gerar o token JWT
const generateToken = async (userId: number, userName: string) => {
  const jwtKey = jose.base64url.decode(process.env.SECRET_KEY!);

  const token = await new jose.SignJWT({ userId, userName })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(jwtKey);

  return token;
};

export async function handleLogin(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')

  if (!username || !password) {
    return
  }

  try {
    const findAdmin = await prisma.admin.findFirst({
      where: {
        username: username as string,
        password: password as string
      }
    })

    if (!findAdmin) {
      console.log('Usuário ou senha inválidos')
      return
    }

    // Gera o token JWT
    const token = await generateToken(findAdmin.id, findAdmin.username);

    // Seta o cookie com o token
    const cookieStore = cookies();
    cookieStore.set({
      name: 'tokenSorteio',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  } catch (error) {
    console.log(error)
  }
  redirect('/listRegisters')
}