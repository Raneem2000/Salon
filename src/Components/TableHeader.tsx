import { FC, PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6870fa",
    color: "#fff",
    fontWeight: "900",
    fontSize: "16px",
  },
}));
type ITableProps = {
  TableHeaderArray: string[];
  productStatus?: number;
  titleHead?: string;
};
const TableHeader: FC<PropsWithChildren<ITableProps>> = ({
  children,
  TableHeaderArray,
}) => {
  return (
    <>
      <TableContainer sx={{
        width:"fitContent"
      }} component={Paper}
      elevation={4}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {TableHeaderArray.map((ar) => (
                <StyledTableCell align="center">{ar}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          {children}
        </Table>
      </TableContainer>
    </>
  );
};
export default TableHeader;
