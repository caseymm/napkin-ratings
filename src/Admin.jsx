import React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import s3Provider from "./s3DataProvider";

function AdminPanel() {
  return (
    <Admin dataProvider={s3Provider} basename="/admin">
      <Resource name="napkins" list={ListGuesser} />
    </Admin>
  );
}

export default AdminPanel;
