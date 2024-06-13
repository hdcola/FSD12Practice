import Link from "next/link";

export const getItems = async () => {
  const rest = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  const data = await rest.json();
  return data;
};

export default async function Home() {
  const users = await getItems();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center justify-between p-24"
        >
          <h1 className="text-4xl font-bold">
            <Link href={{ pathname: "/user", query: { id: user.id } }}>
              {user.name}
            </Link>
          </h1>
          <p className="text-lg">{user.email}</p>
        </div>
      ))}
    </main>
  );
}
