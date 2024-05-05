import React, { useState } from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { ConfigProvider, App as AntdApp, Button } from "antd";
import { DoctorTable } from "./doctor-table";

const DEFAULT_API_URL =
  "https://hdcola.github.io/FSD12Practice/0505/danny/web/dist/";

export default function App() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <ConfigProvider>
      <AntdApp>
        <div>
          <label>API URL:</label>
          <input
            style={{ width: "50%" }}
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
          <Button onClick={handleRefresh}>Refresh</Button>
        </div>
        <Refine key={refreshKey} dataProvider={dataProvider(apiUrl)}>
          <DoctorTable />
        </Refine>
      </AntdApp>
    </ConfigProvider>
  );
}
