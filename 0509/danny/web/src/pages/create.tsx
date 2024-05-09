import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (data: object) => void;
}

const CreateModal: React.FC<CustomModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    dateOfBirth: "",
    address: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
    phoneNumber: "",
    specialty: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title>Create a doctor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPostalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicProvince">
            <Form.Label>Province</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter province"
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSpecialty">
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
