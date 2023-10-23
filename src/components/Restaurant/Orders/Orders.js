import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Orders = () => {
  const orders = [
    { id: 1, customerName: 'John Doe', items: 'Pizza, Burger', total: '$25' },
    { id: 2, customerName: 'Jane Smith', items: 'Pasta, Soda', total: '$18' },
    // ... add more dummy data
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.customerName}</TableCell>
              <TableCell align="right">{order.items}</TableCell>
              <TableCell align="right">{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Orders;
