// Import des dépendances nécessaires
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { PostService } from "services/post.service";

// Composant Details
const Details = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [showFullText, setShowFullText] = useState([]); // Ajout d'un état pour gérer l'affichage du texte complet

  useEffect(() => {
    
    // let token=localStorage.getItem("token");
    // axios.request({
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   },
    //   method: "GET",
    //   url: `http://127.0.0.1:8000/api/posts/${id}`
    // }).then(response => {
    //   console.log(response.data);
    //     setPosts(response.data);

    // });
    // PostService.getPostById(id)
    PostService.getPostsById(id)
      .then(response => {
        setPosts(response.data);
        setShowFullText(new Array(response.data.length).fill(false)); // Initialisation de showFullText
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  // Fonction pour basculer l'affichage du texte complet
  const toggleFullText = (index) => {
    const updatedShowFullText = [...showFullText];
    updatedShowFullText[index] = !showFullText[index];
    setShowFullText(updatedShowFullText);
  };

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
              <Link key="edit" to={`/details/${post.id}`} component={Link}>
                <Button size="small" onClick={(e) => e.stopPropagation()}>
                  {showFullText[index] ? "Voir moins" : "Voir plus"}
                </Button>
              </Link>
               <CardActions>
     
    </CardActions> 
    <Link key="addComment" to={`/addComment/${post.id}`} component={Link}>
    <Button size="small">Commenter</Button>
              </Link>
 
          <Button size="small">Aimer</Button>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </DashboardLayout>
  );
};

export default Details;

