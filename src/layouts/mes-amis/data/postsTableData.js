/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { Box, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
export default function Friend() {
  const [friends, setFriends] = useState([]);
  const { id } = useParams(); 
  async function getFriends() {
    axios.get(`http://127.0.0.1:8000/api/friend/${id}`)
    .then((response) => {
         console.log(response);
         setFriends(response.data);
        })
  }

  useEffect(() => {
    async function fetchData() {
       getFriends();
    }
    fetchData();
  }, []);

  return 
  <DashboardLayout>
  <DashboardNavbar />
  
  <MDTypography variant="h6" color="white">
    Modifier post
   </MDTypography>
        
 

</DashboardLayout>
  
}

