import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

function App() {
  const DEFAULT_URL = "http://localhost:8080/api/doctors";
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchData() {
    console.log("Fetching data...");
    setIsLoading(true);
    try {
      setData(null);
      const response = await fetch(DEFAULT_URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // [{"id":10,"name":"Dr. White","dateOfBirth":"1976-07-08","address":"765 Fir St","postalCode":"G7G 7G7","city":"Victoria","province":"BC","country":"Canada","phoneNumber":"890-123-4567","specialty":"Rheumatology"}]
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
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
            {data &&
              data.map((doctor: iDoctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
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
        </Table>
      )}
      <Button variant="primary" onClick={fetchData}>
        Fetch Data
      </Button>
    </>
  );
}

interface iDoctor {
  id: number;
  name: string;
  dateOfBirth: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  phoneNumber: string;
  specialty: string;
}

export default App;
