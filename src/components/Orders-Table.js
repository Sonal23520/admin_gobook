import PropTypes from "prop-types";

import {
  Box,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
} from "@material-ui/core";
import { Scrollbar } from "./scrollbar";

const statusVariants = [
  {
    label: "Placed",
    value: "placed",
  },
  {
    label: "Processed",
    value: "processed",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Complete",
    value: "complete",
  },
];

export const OrdersTable = ({ orders }) => {
  return (
    <div>
      <TableContainer sx={{ maxHeight: "45vh" }}>
        <Table stickyHeader sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.date}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.data.date}</TableCell>
                  <TableCell>{order.data.bookname}</TableCell>
                  <TableCell>{order.data.qty}</TableCell>
                  <TableCell>{order.data.price}</TableCell>
                  <TableCell>
                    <Chip
                      color={order.data.ispending ? "error" : "success"}
                      label={order.data.ispending ? "Pending" : "Completed"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};
