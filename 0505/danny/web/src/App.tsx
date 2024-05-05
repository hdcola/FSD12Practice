import React, { useState } from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ConfigProvider, App as AntdApp } from "antd";
import { DoctorTable } from "./doctor-table";

const DEFAULT_API_URL =
  "https://hdcola.github.io/FSD12Practice/0505/danny/web/dist/";

export default function App() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);

  return (
    <ConfigProvider>
      <AntdApp>
        <div>
          <label>API URL:</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>
        <Refine key={apiUrl} dataProvider={dataProvider(apiUrl)}>
          <DoctorTable />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
