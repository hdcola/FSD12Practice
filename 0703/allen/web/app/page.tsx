import { AddButton } from "./ui/addBtn";
import { Card } from "@/app/ui/card";


export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-5">Menu mangement system</div>
        <AddButton />
      <div className="flex justify-center items-center h-screen gap-5">
        <Card />
      </div>
    </>
  );
}
