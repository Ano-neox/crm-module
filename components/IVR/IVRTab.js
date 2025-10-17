import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton } from '@mui/material';
import { IconPhone, IconPlayerPlay, IconPlayerStop, IconSettings, IconPlus } from '@tabler/icons-react';

const IVRTab = () => {
  const [ivrCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Campaign',
      status: 'Active',
      calls: 1250,
      duration: '2:30 avg',
      success: '85%'
    },
    {
      id: 2,
      name: 'Follow-up Campaign',
      status: 'Paused',
      calls: 890,
      duration: '1:45 avg',
      success: '72%'
    }
  ]);

  const [recentCalls] = useState([
    {
      id: 1,
      number: '+91 98765 43210',
      campaign: 'Welcome Campaign',
      status: 'Completed',
      duration: '2:15',
      time: '10:30 AM'
    },
    {
      id: 2,
      number: '+91 87654 32109',
      campaign: 'Follow-up Campaign',
      status: 'Failed',
      duration: '0:30',
      time: '10:25 AM'
    }
  ]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        IVR Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">IVR Campaigns</Typography>
                <Button variant="contained" startIcon={<IconPlus />}>
                  New Campaign
                </Button>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Campaign Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total Calls</TableCell>
                      <TableCell>Avg Duration</TableCell>
                      <TableCell>Success Rate</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ivrCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>{campaign.name}</TableCell>
                        <TableCell>
                          <Chip 
                            label={campaign.status}
                            color={campaign.status === 'Active' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{campaign.calls}</TableCell>
                        <TableCell>{campaign.duration}</TableCell>
                        <TableCell>{campaign.success}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <IconPlayerPlay />
                          </IconButton>
                          <IconButton size="small">
                            <IconPlayerStop />
                          </IconButton>
                          <IconButton size="small">
                            <IconSettings />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent IVR Calls
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Campaign</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentCalls.map((call) => (
                      <TableRow key={call.id}>
                        <TableCell>{call.number}</TableCell>
                        <TableCell>{call.campaign}</TableCell>
                        <TableCell>
                          <Chip 
                            label={call.status}
                            color={call.status === 'Completed' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>{call.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                IVR Statistics
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Total Calls Today:</Typography>
                <Typography variant="body2" fontWeight="bold">156</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Successful:</Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">128</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Failed:</Typography>
                <Typography variant="body2" fontWeight="bold" color="error.main">28</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Success Rate:</Typography>
                <Typography variant="body2" fontWeight="bold">82%</Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Button variant="outlined" fullWidth sx={{ mb: 2 }} startIcon={<IconPhone />}>
                Start New Campaign
              </Button>
              
              <Button variant="outlined" fullWidth sx={{ mb: 2 }} startIcon={<IconSettings />}>
                Configure IVR
              </Button>
              
              <Button variant="outlined" fullWidth startIcon={<IconPlayerPlay />}>
                View Reports
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IVRTab;