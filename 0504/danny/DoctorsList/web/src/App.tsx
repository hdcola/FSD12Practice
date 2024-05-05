import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ConfigProvider, App as AntdApp } from "antd";
import { DoctorTable } from "./doctor-table";

const API_URL = "http://localhost:8080/api";

export default function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <Refine dataProvider={dataProvider(API_URL)}>
          <DoctorTable />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
