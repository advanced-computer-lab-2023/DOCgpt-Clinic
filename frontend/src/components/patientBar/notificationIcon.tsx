// CustomizedBadges.jsx
import React, { useState, useEffect, Key } from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { formatTimeDifference } from './utils'; // Adjust the path accordingly
import { Button, Paper, Typography } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DeleteIcon from '@mui/icons-material/Delete';
interface Notification {
    _id: string;
    subject: string;
    date: Date;
    msg: string;
    read : boolean
  }
  
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const CustomizedBadges = () => {
  const [count, setCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<{
    _id: Key | null | undefined;
    read: boolean;  subject: string, date: Date, msg: string, formattedDate: string 
}[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedNotificationIds, setClickedNotificationIds] = useState<string[]>([]);

  const fetchNotificationsCount = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('/routes/notifications/countP', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const notificationsCount = Number(response.data.notificationsCount);
      console.log(notificationsCount);
      setCount(notificationsCount);
    } catch (error) {
      console.error('Error fetching notifications count', error);
    }
  };
  
  useEffect(() => {
   
      fetchNotificationsCount();
    
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/routes/notifications/patient', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

           //console.log(response.data);
        // Check if response.data.notifications is defined before mapping
        console.log('Notification response:', response.data);

       const formattedNotifications = response.data.map((notification: { date: string | number | Date; read: any; }) => ({
  ...notification,
  formattedDate: formatTimeDifference(new Date(notification.date)),
  read: notification.read // Assuming 'read' is a field from your backend
}));

    
        console.log('Formatted notifications:', formattedNotifications);
    
        setNotifications(formattedNotifications);
              } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };
  
    if (isMenuOpen) {
      fetchNotifications();
    }
  }, [isMenuOpen]);

  const handleBadgeClick = (event : any) => {
    // Vibrate when the badge is clicked
    
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }

    // Toggle the menu visibility
    setIsMenuOpen((prev) => !prev);

    // Set the anchor element for the menu
    setAnchorEl(event.currentTarget);
    
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleNotificationClick = async (notificationId : any) => {
    // Find the clicked notification
    const clickedNotification = notifications.find(notification => notification._id === notificationId);
  
    // Check if the notification was previously unread
    if (clickedNotification && !clickedNotification.read) {
      // Mark as read and decrement the count
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  
      // Call your API to mark the notification as read
      try {
        const response = await axios.post('/routes/notifications/mark', {
          notificationId,
        });
        // Additional logic to handle the response
        // ...
      } catch (error) {
        console.error('Error marking notification as read', error);
      }
    }
  }
  function handleDelete(id: string) {
    // Call the delete notification API or perform any necessary actions
    // to delete the notification with the given ID
  
    // Update the notifications state by removing the deleted notification
   
  
    // Decrement the count state by one
  }

    function handleClear(id: string) {
        throw new Error('Function not implemented.');
    }

    function handleMarkAsRead(id: string): void {
        throw new Error('Function not implemented.');
    }

    function splitTextIntoLines(text: string, wordsPerLine: number) {
      const words = text.split(' ');
      const lines = [];
    
      for (let i = 0; i < words.length; i += wordsPerLine) {
        const line = words.slice(i, i + wordsPerLine).join(' ');
        lines.push(line);
      }
    
      return lines;
    }

    return (
      <>
        <IconButton aria-label="notifications" onClick={handleBadgeClick} style={{ position: 'relative' }}>
          <Badge badgeContent={count} color="primary">
            <NotificationsActiveIcon color="primary" />
          </Badge>
        </IconButton>
    
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleCloseMenu}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          style={{ marginTop: '0px', marginLeft: '70px',overflowWrap: 'break-word' ,  borderRadius: '80px'  }}
        >
          {notifications.length === 0 ? (
            <MenuItem style={{ padding: '10px'  ,  borderRadius: '80px'}}>
              <Typography>No notifications so far</Typography>
            </MenuItem>
          ) : (
            notifications.slice().reverse().map((notification) => (
              <MenuItem key={notification._id} onClick={() => handleNotificationClick(notification._id)} style={{ backgroundColor: notification.read ? '#ffffff' : '#D0E0F2'  }}>
                <Paper elevation={0} style={{ padding: '10px', width: '300px', backgroundColor: notification.read ? '#ffffff' : '#D0E0F2' ,overflowWrap: 'break-word'}}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FiberManualRecordIcon style={{ marginRight: '8px', color: notification.read ? '#c0c4c8' : '#007bff' }} />
                    <Typography variant="subtitle1" style={{ fontWeight: notification.read ? 'normal' : 'bold', color: notification.read ? '#4b4f56' : '#2B59C3' }}>
                      {notification.subject}
                    </Typography>
                  </div>
                  <p  style={{ color: '#4b4f56', overflowWrap: 'break-word' , width : '70px', fontSize:12}}>
                    {splitTextIntoLines(notification.msg, 2).join('\n')}
                  </p>
                  <Typography variant="caption" style={{ color: '#8d949e', marginTop: '4px' }}>
                    {notification.formattedDate}
                  </Typography>
                  <div style={{ marginTop: '8px' }}>
                    {/* <IconButton>
                      <DeleteIcon />
                    </IconButton> */}
                  </div>
                </Paper>
              </MenuItem>
            ))
          )}
        </Menu>
      </>
    );
    
    
};

export default CustomizedBadges;
