import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { format } from "date-fns";
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
  console.log(orders);
  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
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
              // const statusVariant = statusVariants.find(
              //   (variant) => variant.value === order.status
              // );

              return (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.data.date}</TableCell>
                  <TableCell>{order.data.bookname}</TableCell>
                  <TableCell>{order.data.qty}</TableCell>
                  <TableCell>{order.data.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.data.ispending ? "Pending" : "Completed"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired,
};
