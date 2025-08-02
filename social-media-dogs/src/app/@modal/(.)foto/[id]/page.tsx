import photoGet from '@/actions/photo-get';
import FeedModal from '@/components/feed/feed-modal';
import { notFound } from 'next/navigation';

type PhotoIdParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PhotoIdParams) {
  const { data } = await photoGet(params.id);

  if (!data) return { title: 'Fotos' };

  return {
    title: `Dogs | ${data.photo.title}`,
  };
}

export default async function FotoIdPage({ params }: PhotoIdParams) {
  const { data } = await photoGet(params.id);

  if (!data) return notFound();
  return (
    <section className="container mainContainer">
      <FeedModal photo={data} />
    </section>
  );
}
