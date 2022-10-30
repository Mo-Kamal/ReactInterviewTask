import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import "../styles/CreateEdit.scss";

export default function TableList({ data }) {
  const initialRowPerPage = 5;
  const [rowsPerPage, setRowsPerPage] = React.useState(initialRowPerPage);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const history = useNavigate();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Row Number</StyledTableCell>
              <StyledTableCell align="center">Firstname</StyledTableCell>
              <StyledTableCell align="center">LastName</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <StyledTableRow
                  className="tableRows"
                  onClick={() => {
                    history(`./edituser/${row.id}`);
                  }}
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <NavLink to={`/edituser/${row.id}`}> */}
                  <TableCell align="center" component="th" scope="row">
                    {index + page * rowsPerPage + 1}
                  </TableCell>
                  <TableCell align="center">{row.firstName}</TableCell>
                  <TableCell align="center">{row.lastName}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  {/* </NavLink> */}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data ? data?.length : 1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
