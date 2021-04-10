import Link from "next/link";

export default function Links() {
  return (
    <div className="flex justify-center my-16 w-screen">
      <Link href="/search">
        <a className="px-4 text-green-500 underline text-2xl">Busqueda de usuarios</a>
      </Link>
      <Link href="/register">
        <a className="px-4 text-green-500 underline text-2xl">Registro de usuarios</a>
      </Link>
    </div>
  );
}
