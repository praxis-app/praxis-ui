import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from "@mui/material";

interface TableCellProps extends MuiTableCellProps {
  isLast?: boolean;
}

const TableCell = ({ sx, isLast, ...props }: TableCellProps) => (
  <MuiTableCell
    {...props}
    sx={{ borderBottom: isLast ? "none" : undefined, ...sx }}
  />
);

export default TableCell;
