import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./CreateNumber.module.css";

const List = ({
  list,
}: {
  list: { firstName: string; lastName: string; number: string }[];
}) => {
  const [listFiltered, setListFiltered] = useState(list);
  const [search, setSearch] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setListFiltered(
      list.filter(
        (item) =>
          item.firstName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item.lastName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          item.number.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setListFiltered(list);
  }, [list]);

  return (
    <>
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <h2>Phone book</h2>
        <TextField
          classes={{
            root: styles["root"],
          }}
          placeholder="Search"
          value={search}
          onChange={handleChange}
          inputProps={{ style: { color: "white" } }}
        />
      </div>

      {listFiltered.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h3>No results</h3>
        </div>
      )}

      {listFiltered.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First name</TableCell>
                <TableCell align="center">Last name</TableCell>
                <TableCell align="center">Number phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listFiltered.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default List;
