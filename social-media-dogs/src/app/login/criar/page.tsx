import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crie sua conta',
  description: 'Crie sua conta no site Dogs.',
};

export default function CriarPage() {
  return (
    <main>
      <h1 className="title">Criar</h1>
    </main>
  );
}
