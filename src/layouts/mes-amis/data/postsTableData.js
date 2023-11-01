/* eslint-disable prettier/prettier */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import * as React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { Box, Paper, Typography, ListItem, ListItemText, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";
import { PostService } from "services/post.service";
import AddIcon from '@mui/icons-material/Add';


export default function Friend() {
  const [checked, setChecked] = React.useState([1]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    PostService.listUser()
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
    <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
    {users.map((user, index) => (
      <ListItem
        key={user}
        disableGutters
        secondaryAction={
          <div>
      <IconButton color="blue" aria-label="Ajouter">
        <AddIcon />
      </IconButton>
    </div>

        }
      >
        <ListItemText primary={user.name} />
        

      </ListItem>
    ))}
  </List>
  </DashboardLayout>

  );
}