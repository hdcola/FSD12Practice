import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowDoctor } from "./pages/doctors/show";
import { EditDoctor } from "./pages/doctors/edit";
import { ListDoctors } from "./pages/doctors/list";
import { CreateDoctor } from "./pages/doctors/create";

export default function App(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      {/* <ShowDoctor /> */}
      {/* <EditDoctor /> */}
      <ListDoctors />
      {/* <CreateDoctor /> */}
    </Refine>
  );
}
