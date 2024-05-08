import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { CreateDoctor } from "./pages/doctors/create";

export default function Create(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      <CreateDoctor />
    </Refine>
  );
}
