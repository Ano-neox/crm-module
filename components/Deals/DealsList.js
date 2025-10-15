import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Chip, IconButton, Dialog, DialogTitle, DialogContent, 
  TextField, DialogActions, Button, Grid, LinearProgress, Box
} from '@mui/material';
import { IconEdit, IconTrash, IconEye, IconTrendingUp } from '@tabler/icons-react';

const DealsList = () => {
  const [deals, setDeals] = useState([
    { id: 1, title: 'Website Development Project', client: 'Tech Startup Inc', value: 250000, stage: 'Proposal', probability: 75, closeDate: '2024-03-15', owner: 'John Sales' },
    { id: 2, title: 'Mobile App Development', client: 'Digital Agency', value: 180000, stage: 'Negotiation', probability: 85, closeDate: '2024-02-28', owner: 'Sarah Manager' },
    { id: 3, title: 'E-commerce Platform', client: 'Online Store', value: 320000, stage: 'Closed Won', probability: 100, closeDate: '2024-01-20', owner: 'Mike Sales' }
  ]);

  const [open, setOpen] = useState(false);
  const [editDeal, setEditDeal] = useState(null);
  const [formData, setFormData] = useState({ title: '', client: '', value: 0, stage: 'Prospecting', probability: 0, closeDate: '', owner: '' });

  const handleEdit = (deal) => {
    setEditDeal(deal);
    setFormData(deal);
    setOpen(true);
  };

  const handleSave = () => {
    if (editDeal) {
      setDeals(deals.map(d => d.id === editDeal.id ? { ...formData, id: editDeal.id } : d));
    } else {
      setDeals([...deals, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Prospecting': return 'info';
      case 'Qualification': return 'primary';
      case 'Proposal': return 'warning';
      case 'Negotiation': return 'secondary';
      case 'Closed Won': return 'success';
      case 'Closed Lost': return 'error';
      default: return 'default';
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'success.main';
    if (probability >= 50) return 'warning.main';
    return 'error.main';
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deal Title</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Client</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Value</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stage</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Probability</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Close Date</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Owner</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deals.map((deal, index) => (
              <TableRow key={deal.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                <TableCell sx={{ fontWeight: 'medium' }}>{deal.title}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{deal.client}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{deal.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip label={deal.stage} color={getStageColor(deal.stage)} size="small" />
                </TableCell>
                <TableCell>
                  <Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={deal.probability} 
                      sx={{ width: 80, mb: 0.5 }}
                      color={deal.probability >= 80 ? 'success' : deal.probability >= 50 ? 'warning' : 'error'}
                    />
                    <Box sx={{ color: getProbabilityColor(deal.probability), fontWeight: 'bold' }}>{deal.probability}%</Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{deal.closeDate}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{deal.owner}</TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <IconEye />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(deal)} size="small">
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
        <DialogTitle>{editDeal ? 'Edit Deal' : 'New Deal'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deal Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Client"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Deal Value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: parseFloat(e.target.value) || 0})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Stage"
                value={formData.stage}
                onChange={(e) => setFormData({...formData, stage: e.target.value})}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="Prospecting">Prospecting</option>
                <option value="Qualification">Qualification</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Probability (%)"
                type="number"
                value={formData.probability}
                onChange={(e) => setFormData({...formData, probability: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Expected Close Date"
                type="date"
                value={formData.closeDate}
                onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deal Owner"
                value={formData.owner}
                onChange={(e) => setFormData({...formData, owner: e.target.value})}
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

export default DealsList;