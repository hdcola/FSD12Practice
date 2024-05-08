import { useForm } from "@refinedev/core";

export const EditDoctor = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    action: "edit",
    resource: "doctors",
    id: "1",
  });

  const record = queryResult?.data?.data;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(form).entries());
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" defaultValue={record?.name} />

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        defaultValue={record?.dateOfBirth}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        defaultValue={record?.address}
      />

      <label htmlFor="postalCode">Postal Code</label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        defaultValue={record?.postalCode}
      />

      <label htmlFor="city">City</label>
      <input type="text" id="city" name="city" defaultValue={record?.city} />

      <label htmlFor="province">Province</label>
      <input
        type="text"
        id="province"
        name="province"
        defaultValue={record?.province}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        defaultValue={record?.country}
      />

      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="text"
        id="phoneNumber"
        name="phoneNumber"
        defaultValue={record?.phoneNumber}
      />

      <label htmlFor="specialty">Specialty</label>
      <input
        type="text"
        id="specialty"
        name="specialty"
        defaultValue={record?.specialty}
      />

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
