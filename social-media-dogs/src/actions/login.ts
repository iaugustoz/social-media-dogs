'use server';

import { TOKEN_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { cookies } from 'next/headers';

export default async function login(state: {}, formData: FormData) {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if (!username || !password) {
      throw new Error('Preencha os campos de login e senha.');
    }

    const { url } = TOKEN_POST();

    // Obtém o token da API Back-End e valida informações de login
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Senha ou usuário inválido.');
    }

    const data = await response.json();

    /*
     * Define um cookie para o token. Desse modo, a responsabilidade
     * sai do Front-End e passa p/ o navegador
     */
    cookies().set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
