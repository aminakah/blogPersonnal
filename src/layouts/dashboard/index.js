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

// Material Dashboard 2 React components
import { useEffect, useState } from "react";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { PostService } from "services/post.service";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [showFullText, setShowFullText] = useState(new Array(posts.length).fill(false));

  async function getPosts() {
    const response = await PostService.getAllPosts();
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
    {posts.map((post, index) => (
     <Card key={index} sx={{ minWidth: 900 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {post.title}
      </Typography>
      <Typography variant="body2">
        {showFullText[index] ? post.body : post.body.slice(0, 255)} 
         <Button size="small" onClick={() => {   const updatedShowFullText = [...showFullText];   updatedShowFullText[index] = !updatedShowFullText[index];   setShowFullText(updatedShowFullText); }} >
        {showFullText[index] ? 'Voir moins' : 'Voir plus'}
      </Button>
        <CardActions>
     
    </CardActions>
    <Button size="small">Commenter</Button>
          <Button size="small">Aimer</Button>
      </Typography>
    </CardContent>
    <Card></Card>
  </Card>
  
  
    ))}
    <Card></Card>
  </DashboardLayout>
  );
}

export default Dashboard;
