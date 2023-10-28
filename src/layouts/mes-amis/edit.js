/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import {
  Box,
  TextField,
} from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");


  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/api/posts/${id}`)
  //     .then((response) => {
  //       const postData = response.data;
  //       setTitle(postData.title); // Utilisez postData.title
  //       setBody(postData.body);   // Utilisez postData.body
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Une erreur est survenue, veuillez réessayer!",
  //       });
  //     });
  // }, [id]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((response) => {
        const postData = response.data;
        setTitle(postData[0].title);
        setBody(postData[0].body);
        console.log('Title:', postData[0].title);
        console.log('Body:', postData[0].body);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
        });
      });
  }, [id]);
  
  

  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/posts/${id}`, {
        title: title,
        body: body,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Article modifié avec succès!",
        }).then(() => {
          navigate("/posts");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur est survenue, veuillez réessayer!",
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
                  Modifier post
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <MDBox p={3}>
                  <form onSubmit={handleSubmit} >
                    <Box p={3}>
                    <TextField
                        label="Titre"
                        value={title}
                        onChange={handleTitleChange}
                        style={{ marginBottom: "2rem" }}
                        fullWidth
                    />
                    
                    <TextField
                        label="Contenu"
                        type="text"
                        value={body}
                        onChange={handleBodyChange}
                        style={{ marginBottom: "2rem" }}
                        fullWidth
                    />
                    </Box>
                    <MDBox p={3} textAlign="right">
                      <Link to="/posts" component={Link}>
                        <MDButton
                          variant="gradient"
                          color="primary"
                          style={{ marginRight: "10px" }}
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

export default EditPost;