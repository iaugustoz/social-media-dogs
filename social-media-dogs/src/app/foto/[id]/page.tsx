export default function FotoIdPage({ params }: { params: { id: number } }) {
  return (
    <main>
      <h1>Fotos Id: {params.id}</h1>
    </main>
  );
}
