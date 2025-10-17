import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, TextField } from '@mui/material';
import { IconPlayerPlay, IconPlayerPause, IconDownload, IconSearch, IconVolume } from '@tabler/icons-react';

const CallRecordingTab = () => {
  const [recordings] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      phoneNumber: '+91 98765 43210',
      duration: '5:30',
      date: '2025-01-15',
      time: '10:30 AM',
      status: 'Completed',
      fileSize: '2.1 MB'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      phoneNumber: '+91 87654 32109',
      duration: '3:45',
      date: '2025-01-15',
      time: '09:15 AM',
      status: 'Completed',
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      phoneNumber: '+91 76543 21098',
      duration: '7:20',
      date: '2025-01-14',
      time: '04:45 PM',
      status: 'Completed',
      fileSize: '3.2 MB'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecordings = recordings.filter(recording =>
    recording.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recording.phoneNumber.includes(searchTerm)
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Call Recordings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Recorded Calls</Typography>
                <TextField
                  size="small"
                  placeholder="Search recordings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <IconSearch size={20} style={{ marginRight: 8, color: '#666' }} />
                  }}
                />
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>File Size</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRecordings.map((recording) => (
                      <TableRow key={recording.id}>
                        <TableCell>{recording.customerName}</TableCell>
                        <TableCell>{recording.phoneNumber}</TableCell>
                        <TableCell>{recording.duration}</TableCell>
                        <TableCell>{recording.date}</TableCell>
                        <TableCell>{recording.time}</TableCell>
                        <TableCell>{recording.fileSize}</TableCell>
                        <TableCell>
                          <Chip 
                            label={recording.status}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" title="Play Recording">
                            <IconPlayerPlay />
                          </IconButton>
                          <IconButton size="small" title="Download">
                            <IconDownload />
                          </IconButton>
                        </TableCell>
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
                Recording Statistics
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Total Recordings:</Typography>
                <Typography variant="body2" fontWeight="bold">{recordings.length}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Today's Recordings:</Typography>
                <Typography variant="body2" fontWeight="bold">2</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2">Total Duration:</Typography>
                <Typography variant="body2" fontWeight="bold">16:35</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Storage Used:</Typography>
                <Typography variant="body2" fontWeight="bold">7.1 MB</Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recording Settings
              </Typography>
              
              <Button variant="outlined" fullWidth sx={{ mb: 2 }} startIcon={<IconVolume />}>
                Audio Quality Settings
              </Button>
              
              <Button variant="outlined" fullWidth sx={{ mb: 2 }} startIcon={<IconDownload />}>
                Bulk Download
              </Button>
              
              <Button variant="outlined" fullWidth>
                Storage Management
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Audio Player
              </Typography>
              
              <Box sx={{ 
                height: 200, 
                bgcolor: '#f5f5f5', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid #ddd',
                borderRadius: 1,
                flexDirection: 'column'
              }}>
                <IconVolume size={48} style={{ color: '#666', marginBottom: 16 }} />
                <Typography color="textSecondary">
                  Select a recording to play
                </Typography>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <IconButton size="large" disabled>
                    <IconPlayerPlay />
                  </IconButton>
                  <IconButton size="large" disabled>
                    <IconPlayerPause />
                  </IconButton>
                  <IconButton size="large" disabled>
                    <IconDownload />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CallRecordingTab;