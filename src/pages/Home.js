/*
 * Copyright (c)  2021-2021, Sonal Sithara
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, CardHeader, Container, Divider, Grid, Typography } from '@material-ui/core';
import { Statistics_Card } from '../components/card/Statistics_Card';
import { OrdersTable } from '../components/Orders-Table';
import { ImportContacts, LibraryAdd, ShoppingCart } from '@material-ui/icons';
import { db } from '../Firebase';

export const Home = () => {
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState(0);

  const stats = [
    {
      content: orders.length,
      icon: ShoppingCart,
      label: 'Orders'
    },
    {
      content: category,
      icon: LibraryAdd,
      label: 'Category'
    },
    {
      content: '0',
      icon: ImportContacts,
      label: 'All Books'
    }
  ];

  useEffect(() => {
    db.collection('Orders').onSnapshot((snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    });
    db.collection('GoBook').onSnapshot((snapshot) => {
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
          backgroundColor: 'background.default',
          pb: 3,
          pt: 4
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
                <Statistics_Card
                  content={item.content}
                  icon={item.icon}
                  label={item.label}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader title="Latest Orders"/>
                <Divider/>
                <OrdersTable orders={orders}/>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
