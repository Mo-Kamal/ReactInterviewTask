import React, { Fragment, useEffect, useState } from "react";
import "../styles/CreateEdit.scss";
import { useNavigate } from "react-router-dom";
import TableList from "../components/Table";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import api from "../api/api";

const UsersList = () => {
  const [listOfUsers, setListOfUsers] = useState();
  const history = useNavigate();
  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setListOfUsers(response?.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [listOfUsers]);

  const displayData = (
    <Fragment>
      <Button
        variant="contained"
        onClick={() => {
          history("./adduser");
        }}
        className="button"
        sx={{ mb: 2 }}
      >
        Add a User
      </Button>
      <TableList data={listOfUsers} />
    </Fragment>
  );

  const loadingSpinner = (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!listOfUsers}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <div className="pageContainer">
      <div className="formWrapper">
        {listOfUsers ? displayData : loadingSpinner}
      </div>
    </div>
  );
};

export default UsersList;
