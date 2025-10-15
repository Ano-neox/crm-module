import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Chip, IconButton, Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions, Button, Grid, LinearProgress, Box
} from '@mui/material';
import { IconEdit, IconTrash, IconPhone, IconMail, IconTrendingUp } from '@tabler/icons-react';

const LeadsList = () => {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Tech Startup Inc', contact: 'John CEO', email: 'john@techstartup.com', phone: '+91-9876543210', source: 'Website', status: 'New', score: 85, value: 250000 },
    { id: 2, name: 'Digital Agency', contact: 'Sarah Manager', email: 'sarah@digital.com', phone: '+91-9876543211', source: 'Referral', status: 'Qualified', score: 92, value: 180000 },
    { id: 3, name: 'E-commerce Store', contact: 'Mike Owner', email: 'mike@ecom.com', phone: '+91-9876543212', source: 'Social Media', status: 'Proposal', score: 78, value: 320000 }
  ]);

  const [open, setOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', phone: '', source: 'Website', status: 'New', score: 0, value: 0 });

  const handleEdit = (lead) => {
    setEditLead(lead);
    setFormData(lead);
    setOpen(true);
  };

  const handleSave = () => {
    if (editLead) {
      setLeads(leads.map(l => l.id === editLead.id ? { ...formData, id: editLead.id } : l));
    } else {
      setLeads([...leads, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'info';
      case 'Qualified': return 'primary';
      case 'Proposal': return 'warning';
      case 'Won': return 'success';
      case 'Lost': return 'error';
      default: return 'default';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success.main';
    if (score >= 60) return 'warning.main';
    return 'error.main';
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Source</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Score</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Value</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead, index) => (
              <TableRow key={lead.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                <TableCell>
                  <Box>
                    <Box sx={{ fontWeight: 'medium' }}>{lead.name}</Box>
                    <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>{lead.contact}</Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ color: 'text.secondary' }}>{lead.email}</Box>
                    <Box sx={{ color: 'text.secondary' }}>{lead.phone}</Box>
                  </Box>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Chip label={lead.status} color={getStatusColor(lead.status)} size="small" />
                </TableCell>
                <TableCell>
                  <Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={lead.score} 
                      sx={{ width: 80, mb: 0.5 }}
                      color={lead.score >= 80 ? 'success' : lead.score >= 60 ? 'warning' : 'error'}
                    />
                    <Box sx={{ color: getScoreColor(lead.score), fontWeight: 'bold' }}>{lead.score}%</Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{lead.value.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <IconPhone />
                  </IconButton>
                  <IconButton size="small" color="info">
                    <IconMail />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(lead)} size="small">
                    <IconEdit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <IconTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editLead ? 'Edit Lead' : 'New Lead'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Source"
                value={formData.source}
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Email Campaign">Email Campaign</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Lead Score"
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({...formData, score: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Potential Value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value) || 0})}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeadsList;