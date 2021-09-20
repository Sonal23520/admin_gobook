import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { SummaryItem } from "../components/reports/summary-item";
import { OrdersTable } from "../components/orders-table";
import { LibraryAdd, AttachMoney, ShoppingCart } from "@material-ui/icons";
import { db } from "../Firebase";

export const Reports = () => {
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState(0);

  const stats = [
    {
      content: orders.length,
      icon: ShoppingCart,
      label: "Orders",
    },
    {
      content: category,
      icon: LibraryAdd,
      label: "Category",
    },
    {
      content: "3456",
      icon: AttachMoney,
      label: "Transactions",
    },
  ];

  useEffect(() => {
    db.collection("Orders").onSnapshot((snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    db.collection("GoBook").onSnapshot((snapshot) => {
      setCategory(snapshot.size);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>GoBook Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          pb: 3,
          pt: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h4">
                Statistics
              </Typography>
            </Grid>
            {stats.map((item) => (
              <Grid item key={item.label} md={4} xs={12}>
                <SummaryItem
                  content={item.content}
                  icon={item.icon}
                  label={item.label}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader title="Latest Orders" />
                <Divider />
                <OrdersTable orders={orders} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
