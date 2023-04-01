import { Button, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styles from "./CreateNumber.module.css";

const CreateNumber = ({
  setList,
}: {
  setList: Dispatch<
    SetStateAction<{ firstName: string; lastName: string; number: string }[]>
  >;
}) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setList((prev) => [
      ...prev,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        number: values.number,
      },
    ]);
    setValues({
      firstName: "",
      lastName: "",
      number: "",
    });
  };

  return (
    <>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <h2>Create new Phone</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-content"]}>
          <TextField
            label="First name"
            name="firstName"
            value={values.firstName}
            classes={{
              root: styles["root"],
            }}
            onChange={handleChange}
            inputProps={{ style: { color: "white" } }}
          />
          <TextField
            classes={{
              root: styles["root"],
            }}
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            label="Last name"
            color="primary"
            inputProps={{ style: { color: "white" } }}
          />
        </div>
        <br />
        <div className={styles["input-content"]}>
          <TextField
            classes={{
              root: styles["root"],
            }}
            name="number"
            value={values.number}
            onChange={handleChange}
            label="Number phone"
            type={"number"}
            color="primary"
            inputProps={{ style: { color: "white" } }}
          />
          <Button
            color="secondary"
            variant="contained"
            style={{ minWidth: "192px" }}
            className={styles["button"]}
            type="submit"
            disabled={
              values.firstName === "" ||
              values.lastName === "" ||
              values.number === ""
            }
          >
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateNumber;
