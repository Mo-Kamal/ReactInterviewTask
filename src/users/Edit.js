import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Button } from "@mui/material";

const EditPatient = () => {
  let { id } = useParams();
  const [initialUserValues, setInitialUserValues] = useState({
    initialFirstName: "",
    initialLastName: "",
    initialAddress: "",
    initialCity: "",
  });

  useEffect(() => {
    api.get(`${id}`).then(({ data: userData }) => {
      let { createdAt, id, ...requiredUserData } = userData;
      setInitialUserValues(requiredUserData);
    });
  }, []);
  let history = useNavigate();
  const initialValues = initialUserValues;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required(),
    lastName: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required(),
    address: Yup.string().min(2, "Too Short!").max(40, "Too Long!").required(),
    city: Yup.string().min(2, "Too Short!").max(40, "Too Long!").required(),
  });

  const onSubmit = (data) => {
    try {
      api.put(`/${id}`, data).then(() => {});
      history("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pageContainer">
      <div className="formWrapper">
        <Button
          variant="contained"
          onClick={() => {
            history("/");
          }}
          className="button"
          sx={{ mb: 2 }}
        >
          Back to User List
        </Button>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainerCrud">
            <div className="formHeader">Edit User</div>
            <label className="crudLabel">Firstname</label>
            <ErrorMessage className="error" name="firstName" component="span" />
            <Field
              autoComplete="off"
              id="formInput"
              name="firstName"
              placeholder="(Your Firstname...)"
            />
            <label className="crudLabel">Lastname</label>
            <ErrorMessage className="error" name="lastName" component="span" />
            <Field
              autoComplete="off"
              id="formInput"
              name="lastName"
              placeholder="(Your Lastname...)"
            />

            <label className="crudLabel">Address</label>
            <ErrorMessage className="error" name="address" component="span" />
            <Field
              autoComplete="off"
              type="string"
              id="formInput"
              name="address"
              placeholder="Your address..."
            />
            <label className="crudLabel">City</label>
            <ErrorMessage className="error" name="city" component="span" />
            <Field
              autoComplete="off"
              type="string"
              id="formInput"
              name="city"
              placeholder="Your city..."
            />

            <button type="submit" className="button">
              Edit Patient
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPatient;
