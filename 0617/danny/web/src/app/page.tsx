import CurrentWeather from "./components/CurrentWeather";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CurrentWeather lat={45.509194531492966} lon={-73.59832566263219} />
    </main>
  );
}
