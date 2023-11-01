/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import axios from "axios";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Box from "@mui/material/Box";
import Pagination from "@mui/lab/Pagination";
import { Link } from 'react-router-dom';
import Style from './Style.css';
import {
  AppBar,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { PostService } from "services/post.service";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [showFullText, setShowFullText] = useState(new Array(posts.length).fill(false));

  async function getPosts() {
    const response = await PostService.getAllPosts();
    console.log(response)
    return response.data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getPosts();
      setPosts(data);
    }

    fetchData();
  }, []);
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <h1>liste des postes  public</h1>
    {posts.map((post, index) => (
     <Card key={index} sx={{ minWidth: 600 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography variant="body2">
  {showFullText[index] ? post.body : post.body.slice(0, 255)} 
  <Link key="details" to={`/details/${post.id}`} component={Link}>

  {/* Remplacez "details" par le chemin de la page de détails et post.id par l'identifiant du post */}
    <Button size="small" onClick={(e) => e.stopPropagation()}> {/* Utilisez stopPropagation pour éviter de déclencher à la fois la navigation et le changement du texte */}
      {/* {showFullText[index] ? 'Voir moins' : 'details'} */}
     details
    </Button>
  </Link>

        {/* <CardActions>
     
    </CardActions> */}
    {/* <Button size="small">Commenter</Button>
          <Button size="small">Aimer</Button> */}
      </Typography>
    </CardContent>
    <Card></Card>
  </Card>
  
  
    ))}
    <Card></Card>
  </DashboardLayout>
  );
}

export default AllPost;
