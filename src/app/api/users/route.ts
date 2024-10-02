import { prisma } from "@/app/lib";
import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Método não permitido' }, { status: 405 })
  }
  const { name, nascimento, whatsapp, endereço, cpf } = await req.json();

  if (!name || !nascimento || !whatsapp || !endereço || !cpf) {
    throw new Error('Todos os campos devem ser preenchidos');
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        birth: new Date(nascimento),
        number: whatsapp,
        adress: endereço,
        cpf: cpf
      }
    })

    return NextResponse.json({ data: user}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Ocorreu um erro ao criar o usuário' }, { status: 500 })
  }
}

export const POST = handler