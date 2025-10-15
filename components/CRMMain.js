import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, IconButton, Tabs, Tab
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconPhone, IconMail } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';
import LeadsList from './Leads/LeadsList';
import DealsList from './Deals/DealsList';

const CRMMain = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', status: 'Active', deals: 3 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', status: 'Prospect', deals: 1 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', status: 'Active', deals: 5 }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Prospect' });

  const handleAdd = () => {
    setEditCustomer(null);
    setFormData({ name: '', email: '', phone: '', status: 'Prospect' });
    setOpen(true);
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setFormData(customer);
    setOpen(true);
  };

  const handleSave = () => {
    if (editCustomer) {
      setCustomers(customers.map(c => c.id === editCustomer.id ? { ...formData, id: editCustomer.id } : c));
    } else {
      setCustomers([...customers, { ...formData, id: Date.now(), deals: 0 }]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <PageContainer title="CRM" description="Customer Relationship Management">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">CRM Dashboard</Typography>
          <Button variant="contained" startIcon={<IconPlus />} onClick={handleAdd}>
            {activeTab === 0 ? 'Add Customer' : activeTab === 1 ? 'Add Lead' : 'Add Deal'}
          </Button>
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Customers</Typography>
                <Typography variant="h4" color="primary">{customers.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Customers</Typography>
                <Typography variant="h4" color="success.main">
                  {customers.filter(c => c.status === 'Active').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Prospects</Typography>
                <Typography variant="h4" color="warning.main">
                  {customers.filter(c => c.status === 'Prospect').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Deals</Typography>
                <Typography variant="h4" color="info.main">
                  {customers.reduce((sum, c) => sum + c.deals, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="Customers" />
              <Tab label="Leads" />
              <Tab label="Deals" />
            </Tabs>
          </Box>
          <CardContent>
            {activeTab === 0 && (
              <>
                <Typography variant="h6" mb={2}>Customer List</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deals</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer, index) => (
                    <TableRow key={customer.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                      <TableCell sx={{ fontWeight: 'medium' }}>{customer.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{customer.email}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{customer.phone}</TableCell>
                      <TableCell>
                        <Chip 
                          label={customer.status} 
                          color={customer.status === 'Active' ? 'success' : 'warning'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{customer.deals}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(customer)} size="small">
                          <IconEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(customer.id)} size="small" color="error">
                          <IconTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                </TableContainer>
              </>
            )}
            {activeTab === 1 && <LeadsList />}
            {activeTab === 2 && <DealsList />}
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              margin="normal"
              SelectProps={{ native: true }}
            >
              <option value="Prospect">Prospect</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default CRMMain;