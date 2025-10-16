import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Button, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, Chip,
  List, ListItem, ListItemText, ListItemSecondaryAction, Tabs, Tab
} from '@mui/material';

const FollowUpCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [calendarTab, setCalendarTab] = useState(0);
  const [followUps, setFollowUps] = useState([
    { id: 1, customer: 'John Doe', type: 'Call', date: '2024-01-20', time: '10:00 AM', notes: 'Discuss new requirements' },
    { id: 2, customer: 'Jane Smith', type: 'Meeting', date: '2024-01-21', time: '2:00 PM', notes: 'Product demo' },
    { id: 3, customer: 'Bob Johnson', type: 'Email', date: '2024-01-22', time: '9:00 AM', notes: 'Send proposal' }
  ]);
  const [formData, setFormData] = useState({
    customer: '', type: 'Call', date: '', time: '', notes: ''
  });

  const currentMonth = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const handleAddFollowUp = () => {
    setFollowUps([...followUps, { ...formData, id: Date.now() }]);
    setFormData({ customer: '', type: 'Call', date: '', time: '', notes: '' });
    setOpen(false);
  };

  const getFollowUpsForDate = (date) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return followUps.filter(f => f.date === dateStr);
  };

  const renderHorizontalCalendar = () => {
    const allDays = [];
    const today = new Date().getDate();
    const currentMonthYear = new Date().getMonth() === selectedDate.getMonth() && new Date().getFullYear() === selectedDate.getFullYear();

    // Previous month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() - firstDayOfMonth + i + 1;
      allDays.push({ day: prevMonthDay, isCurrentMonth: false, isToday: false });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = currentMonthYear && day === today;
      allDays.push({ day, isCurrentMonth: true, isToday });
    }

    // Next month days
    const totalCells = Math.ceil(allDays.length / 7) * 7;
    const remainingCells = totalCells - allDays.length;
    for (let i = 1; i <= remainingCells; i++) {
      allDays.push({ day: i, isCurrentMonth: false, isToday: false });
    }

    return (
      <Box display="flex" flexWrap="wrap" sx={{ width: '100%' }}>
        {allDays.map((dayObj, index) => (
          <Box
            key={index}
            sx={{
              width: `${100/7}%`,
              minHeight: 120,
              border: '1px solid #e2e8f0',
              p: 1,
              backgroundColor: dayObj.isToday ? '#fef3c7' : dayObj.isCurrentMonth ? 'white' : '#f8fafc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              '&:hover': { backgroundColor: '#f7fafc' }
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: dayObj.isToday ? 'bold' : 'normal',
                color: dayObj.isCurrentMonth ? (dayObj.isToday ? '#1a365d' : '#3182ce') : '#a0aec0',
                fontSize: '14px'
              }}
            >
              {dayObj.day}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', p: 0, m: -3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Tabs value={calendarTab} onChange={(e, v) => setCalendarTab(v)} sx={{ '& .MuiTab-root': { fontSize: '16px', fontWeight: 'medium' } }}>
          <Tab label="Calendar View" />
          <Tab label="Upcoming Follow-ups" />
        </Tabs>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ px: 3, py: 1 }}>
          Schedule Follow-up
        </Button>
      </Box>

      {calendarTab === 0 && (
        <Box sx={{ backgroundColor: '#f8fafc', p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                sx={{ minWidth: 40, height: 40 }}
              >
                ‹
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                sx={{ minWidth: 40, height: 40 }}
              >
                ›
              </Button>
              <Button variant="outlined" size="small" sx={{ px: 2 }}>Today</Button>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c' }}>
              {currentMonth}
            </Typography>
            <Box display="flex" gap={1}>
              <Button variant="contained" size="small" sx={{ backgroundColor: '#2d3748', color: 'white', px: 3 }}>Month</Button>
              <Button variant="outlined" size="small" sx={{ px: 3 }}>Week</Button>
              <Button variant="outlined" size="small" sx={{ px: 3 }}>Day</Button>
            </Box>
          </Box>
          
          <Box sx={{ backgroundColor: 'white', borderRadius: 2, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <Box display="flex" sx={{ borderBottom: '1px solid #e2e8f0' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Box key={day} sx={{ 
                  flex: 1, 
                  textAlign: 'center', 
                  p: 2, 
                  borderRight: index < 6 ? '1px solid #e2e8f0' : 'none',
                  backgroundColor: '#f8fafc'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#3182ce' }}>{day}</Typography>
                </Box>
              ))}
            </Box>
            
            {renderHorizontalCalendar()}
          </Box>
        </Box>
      )}

      {calendarTab === 1 && (
        <Box sx={{ backgroundColor: '#f8fafc', p: 3 }}>
          <Card sx={{ borderRadius: 2, boxShadow: 'none', border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" mb={3}>Upcoming Follow-ups</Typography>
              <List>
                {followUps.map(followUp => (
                  <ListItem key={followUp.id} divider sx={{ py: 2 }}>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 'bold', color: '#1a202c' }}>{followUp.customer}</Typography>}
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#4a5568' }}>{followUp.date} at {followUp.time}</Typography>
                          <Typography variant="body2" sx={{ color: '#718096' }}>{followUp.notes}</Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip 
                        label={followUp.type} 
                        size="small" 
                        color={followUp.type === 'Call' ? 'primary' : followUp.type === 'Meeting' ? 'success' : 'warning'}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Follow-up</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Customer"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            margin="normal"
            SelectProps={{ native: true }}
          >
            <option value="Call">Call</option>
            <option value="Meeting">Meeting</option>
            <option value="Email">Email</option>
          </TextField>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddFollowUp} variant="contained">Schedule</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FollowUpCalendar;