import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
} from '@mui/material';
import { styled } from '@mui/system';
import AdminDashboard from '../AdminDashboard';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


// Styled components for consistent layout
const StyledTableCell = styled(TableCell)({
    borderBottom: '1px solid #ddd',
});

const OrderDetails = () => {
    const { id } = useParams();
    const [invoiceItems, setInvoiceItems] = useState('');
    const [invoice, setInvoice] = useState('');
    const navigate = useNavigate(); 
    useEffect(() => {
        fetch(`/api/invoice-items/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setInvoiceItems(data.items);
                setInvoice(data.invoice)
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    const handleUpdate = () => {
        fetch(`/api/invoices/updateInvoice/${id}`, { method: 'PUT' })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    toast.success("Updated delivery status successfully")
                    navigate('/admin/orders')
                } else {
                    toast.error(data.message)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminDashboard />
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {invoice ? (
                    <Box>
                        {/* Order ID and Header */}
                        <Typography variant="h4" component="h1" gutterBottom>
                            Order ID : <span style={{ color: 'red' }}>{invoice.orderId}</span>
                        </Typography>

                        {/* Customer Information */}
                        <Paper sx={{ padding: 2, marginBottom: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <Typography variant="h6">{invoice.customer_id.first_name} {invoice.customer_id.last_name}</Typography>
                                    <Typography variant="body1">{invoice.customer_id.email}</Typography>
                                </Box>
                            </Box>

                            {/* Order Date and Address */}
                            <Box sx={{ marginTop: 3 }}>
                                <Typography variant="body2">
                                    <strong>Date:</strong> {invoice.createdAt}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Delivery Address:</strong> {invoice.customer_id.address}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Total:</strong> {invoice.total}
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Order Items Table */}
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <StyledTableCell><strong></strong></StyledTableCell>
                                        <StyledTableCell><strong>Item</strong></StyledTableCell>
                                        <StyledTableCell><strong>Price</strong></StyledTableCell>
                                        <StyledTableCell><strong>Quantity</strong></StyledTableCell>
                                        <StyledTableCell><strong>Total</strong></StyledTableCell>
                                    </TableRow>
                                    {invoiceItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <StyledTableCell>
                                                <img src={`http://localhost:4000/products/${item.product_id.img_card}`} alt={item.product_id._id} style={{ width: '60px', height: '60px', borderRadius: '5px' }} />
                                            </StyledTableCell>
                                            <StyledTableCell>{item.product_id.title}</StyledTableCell>
                                            <StyledTableCell>{item.product_id.price}</StyledTableCell>
                                            <StyledTableCell>{item.qty}</StyledTableCell>
                                            <StyledTableCell>{item.product_id.price * item.qty}</StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Update Delivery Status Button */}
                        <Box sx={{ marginTop: 3 }}>
                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                onClick={() => handleUpdate()}
                            >
                                Update Delivered Status
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h6">Order not found</Typography>
                )}
            </Box>
        </Box>
    );
};

export default OrderDetails;
