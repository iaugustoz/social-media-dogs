'use server';

import { PHOTOS_GET } from '@/functions/api';
import apiError from '@/functions/api-error';

export type Photo = {
  id: number;
  author: string;
  title: string;
  date: string;
  src: string;
  peso: string;
  idade: string;
  acessos: string;
  total_comments: string;
};

type PhotosGetParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export default async function photosGet({
  page = 1,
  total = 6,
  user = 0,
}: PhotosGetParams = {}) {
  try {
    const { url } = await PHOTOS_GET({ page, total, user });

    // Obtém JSON da API Dogs. Esse JSON possui os dados mockados p/ o Front-End
    const response = await fetch(url, {
      next: {
        revalidate: 10,
        tags: ['photos'],
      },
    });
    if (!response.ok) {
      throw new Error('API PhotosGet: Erro ao obter fotos');
    }

    const data = (await response.json()) as Photo[];
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
