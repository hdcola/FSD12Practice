import React from "react";
import { Form } from "react-bootstrap";

interface DoctorCellProps {
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DoctorCell: React.FC<DoctorCellProps> = ({
  name,
  value,
  isEditing,
  onChange,
}) => {
  return (
    <td>
      {isEditing ? (
        <>
          <Form.Control
            type="text"
            size="sm"
            name={name}
            value={value}
            onChange={onChange}
          />
        </>
      ) : (
        value
      )}
    </td>
  );
};

export default DoctorCell;
