import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Scenarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
        <Card
          title="Noteworthy technology acquisitions 2021"
          description="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
        />
      </div>
      <p className="text-lg">Welecome to talk with AI in a lot of scenarios.</p>
    </main>
  );
}
