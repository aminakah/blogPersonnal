/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserService } from "services/user.service";
import { Avatar, Button, CardContent, Typography } from "@material-ui/core";
import Swal from "sweetalert2";


function AddFriend() {
  const navigate = useNavigate();


  const [users, setUsers] = useState([]);

  

  
  useEffect(() => {
    UserService.getFriends()
    .then(response =>{
      console.log(response)
    })
    UserService.getAllUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

const addFriend = (id) =>{
  UserService.addFriend(id).
  then(response => {
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Demande envoyée avec succès'
    })
  }
  )
  .catch(error => {
    console.log(error)
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: error.response.data.message
    })
  })
}

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ajout un ami
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                { users.map( (user, index) => 
                  <Card key={index} sx={{ minWidth: 900 }} style={{marginTop: '4px'}}>
                  <CardContent>
                    <div style={{display: 'flex'}}>
                    <Avatar alt={user.name}  style={{textTransform: 'capitalize'}} />
                    <span style={{marginLeft: '4px', textTransform: 'capitalize'}}>{user.name}</span>
                    </div>
                    <Button variant="contained" onClick={() => addFriend(user.id)}>Ajouter comme ami</Button>
                  </CardContent>
                </Card>)
                }
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddFriend;
