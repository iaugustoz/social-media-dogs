import Image from 'next/image';
import styles from './page.module.css';
import Feed from '@/components/feed/feed';
import photosGet from '@/actions/photos-get';

export default async function Home() {
  const data = await photosGet();

  return (
    <section className="container mainContainer">
      <h1 className="title">Dogs Next</h1>

      <Feed photos={data} />
    </section>
  );
}
