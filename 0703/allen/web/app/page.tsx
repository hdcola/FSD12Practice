import { AddButton } from "./ui/addBtn";
import { Card } from "@/app/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center mt-5 text-2xl font-black text-gray-950">
        Menu mangement system
      </div>
      <AddButton />
      <div className="divider"></div>
      <div className="flex justify-center items-center pt-3 gap-5">
        <Card />
      </div>
    </>
  );
}
