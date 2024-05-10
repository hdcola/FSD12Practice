import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { iDoctor } from "./types";

interface DoctorRowProps {
  doctor: iDoctor;
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
}

const DoctorRow: React.FC<DoctorRowProps> = ({
  doctor,
  onChange,
  onDelete,
}) => {
  const [editedDoctor, setEditedDoctor] = useState({ ...doctor });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
    onChange(editedDoctor.id); // 触发 onChange 回调
  };

  return (
    <tr key={doctor.id}>
      <td>{doctor.id}</td>
      <td>
        <input
          type="text"
          name="name"
          value={editedDoctor.name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="date"
          name="dateOfBirth"
          value={editedDoctor.dateOfBirth}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          value={editedDoctor.address}
          onChange={handleChange}
        />
      </td>
      {/* Add other editable fields here */}
      <td>
        <Button variant="danger" onClick={() => onDelete(doctor.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </td>
    </tr>
  );
};

export default DoctorRow;
