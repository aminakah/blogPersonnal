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
import { useNavigate,Link } from "react-router-dom";
import React, { useState } from "react";
import Swal from 'sweetalert2';
import { PostService } from "services/post.service";


function AddPost() {
  const navigate = useNavigate();

  
  const [title, setTitle] = useState("");
  const handlePostTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const [body, setBody] = useState("");
  const handlePostBodyChange = (event) => {
    setBody(event.target.value);
  };

  const [status, setStatus] = useState(false);

  const handlePostPrivateChange = (event) => {
    setStatus(event.target.checked);
  };
  


const handleSubmit = (event) => {
  event.preventDefault();
  const data = {
    title,
    body,
    status,
  };
  PostService.addPost(data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Article ajouté avec succès!',
      }).then(() => {
        navigate("/posts");
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
                <MDTypography variant="h6" color="white">
                  Ajout article
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                  <form onSubmit={handleSubmit}>
                  <Box p={3}>
                    <TextField
                        label="Titre"
                        value={title}
                        onChange={handlePostTitleChange}
                        fullWidth
                    />
                    </Box>
                    <Box p={3}>
                    <TextareaAutosize
                       
                        value={body}
                        onChange={handlePostBodyChange}
                        aria-label="Contenu"
                        minRows={4} // Vous pouvez ajuster le nombre minimum de lignes ici
                        placeholder="Saisissez la corps ici"
                        style={{ width: '100%' }}
                      />
                    </Box>
                    <Box p={3}>
                      
                    <Checkbox
                      id="postPrivate"
                      onChange={handlePostPrivateChange}
                      checked={status} // Assurez-vous que l'état est correctement lié
                      color="primary"
                      value={status}
                    />
                    Cocher si vous voulez le rendre privé

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

export default AddPost;
