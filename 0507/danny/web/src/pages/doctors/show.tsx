import { useOne } from "@refinedev/core";

export const ShowDoctor = () => {
  const { data, isLoading } = useOne({ resource: "doctors", id: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Doctor name: {data?.data.name}</div>;
};
