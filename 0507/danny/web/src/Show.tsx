import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ShowDoctor } from "./pages/doctors/show";

export default function Show(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      <ShowDoctor />
    </Refine>
  );
}
