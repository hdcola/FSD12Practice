import { useList } from "@refinedev/core";

export const ListDoctors = () => {
  const { data, isLoading } = useList({
    resource: "doctors",
    pagination: { current: 1, pageSize: 10 },
    sorters: [{ field: "name", order: "asc" }],
    // filters: [{ field: "material", operator: "eq", value: "Aluminum" }],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctors</h1>
      <ul>
        {data?.data?.map((doctor) => (
          <li key={doctor.id}>
            <p>
              {doctor.name}
              <br />
              Data of Birth: {doctor.dateOfBirth}
              <br />
              Address: {doctor.address}
              <br />
              Postal Code: {doctor.postalCode}
              <br />
              City: {doctor.city}
              <br />
              Province: {doctor.province}
              <br />
              Country: {doctor.country}
              <br />
              Phone Number: {doctor.phoneNumber}
              <br />
              Specialty: {doctor.specialty}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
