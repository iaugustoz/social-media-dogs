export default function PerfilUserPage({
  params,
}: {
  params: { user: string };
}) {
  return (
    <main>
      <h1>Usuário: {params.user}</h1>
    </main>
  );
}
