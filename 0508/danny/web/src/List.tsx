import { Refine } from "@refinedev/core";

import { dataProvider } from "./providers/data-provider";

import { ListDoctors } from "./pages/doctors/list";

export default function List(): JSX.Element {
  return (
    <Refine dataProvider={dataProvider}>
      <ListDoctors />
    </Refine>
  );
}
