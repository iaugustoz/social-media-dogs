'use server';

import { cookies } from 'next/headers';

export default async function login(formData: FormData) {
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;

  // Obtém o token da API Back-End e valida informações de login
  const response = await fetch(
    'https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
    {
      method: 'POST',
      body: formData,
    }
  );
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

  console.log(data);
}
