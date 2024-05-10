import React from "react";

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
        <input type="text" name={name} value={value} onChange={onChange} />
      ) : (
        <>{value}</>
      )}
    </td>
  );
};

export default DoctorCell;
