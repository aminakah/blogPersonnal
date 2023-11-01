/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect,TextareaAutosize } from "@material-ui/core";
import { Checkbox } from "@mui/material";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link,useParams } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { PostService } from "services/post.service";


function AddComment() {
  const navigate = useNavigate();

  const { id } = useParams(); 
  
  const [comment, setComment] = useState("");
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const data = {
    comment:comment,
    post_id:id
   
  };
  console.log(data);
  PostService.saveComment(id ,data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Article ajouté avec succès!',
      }).then(() => {
        navigate(`/details/${id}`);
      });
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur est survenue, veuillez réessayer!',
      });
    });
};

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
                
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>

                  <form onSubmit={handleSubmit}>
                  
                    <Box p={3}>
                    <TextareaAutosize
                       
                        value={comment}
                        onChange={handleCommentChange}
                        aria-label="commentaire"
                        minRows={4} // Vous pouvez ajuster le nombre minimum de lignes ici
                        placeholder="Saisissez la corps ici"
                        style={{ width: '100%' }}
                      />
                    </Box>
                    <Box p={3}>
                    </Box>
                    <MDBox p={3} textAlign="right">
                        <Link to='/posts' component={Link} >
                            <MDButton
                            variant="gradient"
                            color="primary"
                            style={{ marginRight: '10px' }}
                            >
                            Retour
                            </MDButton>
                        </Link>
                        <MDButton
                            variant="gradient"
                            color="info"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Enregistrer
                        </MDButton>
                    </MDBox>
                  </form>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddComment;
