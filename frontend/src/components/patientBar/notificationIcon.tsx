// CustomizedBadges.jsx
import React, { useState, useEffect } from 'react';
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
    id: string;
    subject: string;
    date: Date;
    msg: string;
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
  const [notifications, setNotifications] = useState<{ id: string, subject: string, date: Date, msg: string, formattedDate: string }[]>([]);
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
      setCount(notificationsCount);
  
      // Save the count value in local storage
      localStorage.setItem('notificationsCount', notificationsCount.toString());
    } catch (error) {
      console.error('Error fetching notifications count', error);
    }
  };
  useEffect(() => {
    const storedCount = localStorage.getItem('notificationsCount');
    if (storedCount) {
      setCount(Number(storedCount));
    } else {
      fetchNotificationsCount();
    }
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

        const formattedNotifications = (response.data as Notification[])?.map((notification) => ({
            ...notification,
            formattedDate: formatTimeDifference(new Date(notification.date)),
          })) || [];
    
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
    setCount((prevCount) => prevCount - 1);

  };
  function handleDelete(id: string) {
    // Call the delete notification API or perform any necessary actions
    // to delete the notification with the given ID
  
    // Update the notifications state by removing the deleted notification
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  
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
      <IconButton aria-label="notifications" onClick={handleBadgeClick}>
        <StyledBadge badgeContent={count} color="primary">
          <NotificationsActiveIcon color="primary" />
        </StyledBadge>
      </IconButton>

      {/* Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        transformOrigin={{
          vertical: 0,
          horizontal: -40,
        }}
        style={{  overflowWrap:'break-word'}}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleCloseMenu}>
            <Paper elevation={0} style={{ padding: '0px', width: '500px' ,  wordBreak:'break-word'}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiberManualRecordIcon style={{ marginRight: '8px' }} />
                <Typography variant="subtitle1">{notification.subject}</Typography>
              </div>             
              <Typography variant="body2" style={{ width: '50%'}}>
                {splitTextIntoLines(notification.msg,2).join('\n')}
              </Typography>
              <Typography variant="caption">{notification.formattedDate}</Typography>
              <div style={{ marginTop: '8px' }}>
      <IconButton onClick={() => handleDelete(notification.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
            </Paper>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CustomizedBadges;
