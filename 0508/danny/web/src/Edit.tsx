import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { EditDoctor } from "./pages/doctors/edit";

export default function Edit(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      <EditDoctor />
    </Refine>
  );
}
