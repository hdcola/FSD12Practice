import { useTable } from "@refinedev/core";

export const ListDoctors = () => {
  const {
    tableQueryResult: { data, isLoading },
  } = useTable({
    resource: "doctors",
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: "name", order: "asc" }] },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Doctors</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>City</th>
            <th>Province</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Specialty</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.dateOfBirth}</td>
              <td>{doctor.address}</td>
              <td>{doctor.postalCode}</td>
              <td>{doctor.city}</td>
              <td>{doctor.province}</td>
              <td>{doctor.country}</td>
              <td>{doctor.phoneNumber}</td>
              <td>{doctor.specialty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
