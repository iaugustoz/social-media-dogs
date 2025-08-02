'use server';

import { PHOTO_GET } from '@/functions/api';
import apiError from '@/functions/api-error';
import { Photo } from './photos-get';

export type Comment = {
  comment_ID: string;
  comment_post_ID: string;
  comment_author: string;
  comment_content: string;
};

export type PhotoData = {
  photo: Photo;
  comments: Comment[];
};

export default async function photoGet(id: string) {
  try {
    const { url } = await PHOTO_GET(id);

    // Obtém JSON da API Dogs. Esse JSON possui os dados mockados p/ o Front-End
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    });
    if (!response.ok) {
      throw new Error('API PhotosGet: Erro ao pegar foto por Id');
    }

    const data = (await response.json()) as PhotoData;
    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
