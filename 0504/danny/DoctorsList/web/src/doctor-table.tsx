import React from "react";
import { useTable } from "@refinedev/antd";
import { Table } from "antd";

export const DoctorTable: React.FC = () => {
  const { tableProps } = useTable<IDoctor>({
    resource: "doctors",
  });

  return (
    <div>
      <h2>Doctors</h2>
      <Table {...tableProps} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Date of Birth" dataIndex="dateOfBirth" />
        <Table.Column title="Address" dataIndex="address" />
        <Table.Column title="Postal Code" dataIndex="postalCode" />
      </Table>
    </div>
  );
};

interface IDoctor {
  id: number;
  name: string;
  dateOfBirth: Date;
  address: string;
  postalCode: string;
}
