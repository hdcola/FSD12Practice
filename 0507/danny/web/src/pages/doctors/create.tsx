import { useForm } from "@refinedev/core";

export const CreateDoctor = () => {
  const { onFinish, mutationResult } = useForm({
    action: "create",
    resource: "doctors",
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(
      new FormData(event.target as HTMLFormElement).entries()
    );
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="dateOfBirth">Date of Birth</label>
      <input type="date" id="dateOfBirth" name="dateOfBirth" />

      <label htmlFor="address">Address</label>
      <input type="text" id="address" name="address" />

      <label htmlFor="postalCode">Postal Code</label>
      <input type="text" id="postalCode" name="postalCode" />

      <label htmlFor="city">City</label>
      <input type="text" id="city" name="city" />

      <label htmlFor="province">Province</label>
      <input type="text" id="province" name="province" />

      <label htmlFor="country">Country</label>
      <input type="text" id="country" name="country" />

      <label htmlFor="phoneNumber">Phone Number</label>
      <input type="text" id="phoneNumber" name="phoneNumber" />

      <label htmlFor="specialty">Specialty</label>
      <input type="text" id="specialty" name="specialty" />

      {mutationResult.isSuccess && <span>successfully submitted!</span>}
      <button type="submit">Submit</button>
    </form>
  );
};
