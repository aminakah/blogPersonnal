/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { PostService } from 'services/post.service';
import { Avatar, Button, Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserService } from 'services/user.service';
import Swal from 'sweetalert2';
function MyFriend() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [publicArticles, setPublicArticles] = useState([]);
  const [fiendArticles, setFriendArticles] = useState([]);
  const [showFullText, setShowFullText] = useState(Array(fiendArticles.length).fill(false));

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
  

  useEffect(() => {
    UserService.getFriends()
    .then(response =>{
      console.log(response)
      setFriends(response.data);
    }).catch(error => {
      console.error(error);
    });
    PostService.getFriendArticles()
      .then(response => {
        setFriendArticles(response.data.articles);
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });

      UserService.getFriendRequests()
      .then(response => {
        setFriendRequests(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleSearch = () => {

    // Effectuez une requête à votre API pour rechercher des utilisateurs par leur nom d'utilisateur
     UserService.rechercherUser(searchTerm).then(response => {

      setSearchResults(response.data.item);
        console.log(response.data.item)
      })
      .catch(error => {
        console.error('Erreur lors de la recherche d\'utilisateurs', error);
      });
  };

  const handleAddFriend = (user) => {
    // Effectuez une requête pour ajouter un ami
    // axios.post('/api/add-friend', { userId: user.id })

      PostService.AddFriend().then(() => {
        setFriends([...friends, user]);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout d\'ami', error);
      });
  };

  const loadPublicArticles = () => {
    // Effectuez une requête pour charger les articles publics de vos amis
    axios.get('http://127.0.0.1:8000/api/allPosts')
      .then(response => {
        setPublicArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des articles publics', error);
      });
  };

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div>
      {/* <h1>Gestion d'Amis</h1> */}
      <div>
      <Link key="addFriend" to={'/mes-amis/add'} component={Link}>
    <Button size="small">Ajouter un ami</Button>
     </Link> 
        <input
          type="text"
          placeholder="Rechercher un ami par nom d'utilisateur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Rechercher</button>
      </div>
      <div>
        <h2>Résultats de la recherche :</h2>
       
          {searchResults.map((user) => (
            <Card key={user.id}>
              <CardContent>
              {user.name}{' '}
              <Button variant="contained" onClick={() => addFriend(user.id)}>Ajouter comme ami</Button>
              </CardContent>
            </Card>
          ))}
        
      </div>
      <div>
        <h2>Mes demande ami :</h2>
        { friendRequests.map( (freind, index) => 
                  <Card key={index} sx={{ minWidth: 900 }} style={{marginTop: '4px'}}>
                  <CardContent>
                    <div style={{display: 'flex'}}>
                    <Avatar alt={freind}  style={{textTransform: 'capitalize'}} />
                    <span style={{marginLeft: '4px', textTransform: 'capitalize'}}>{freind.name}</span>
                    </div>
                  </CardContent>
                </Card>)
                }
      </div>
      <div>
        <h2>Mes Amis :</h2>
        { friends.map( (freind, index) => 
                  <Card key={index} sx={{ minWidth: 900 }} style={{marginTop: '4px'}}>
                  <CardContent>
                    <div style={{display: 'flex'}}>
                    <Avatar alt={freind}  style={{textTransform: 'capitalize'}} />
                    <span style={{marginLeft: '4px', textTransform: 'capitalize'}}>{freind.name}</span>
                    </div>
                  </CardContent>
                </Card>)
                }
      </div>
      <div>
        <h2>Articles Publics de Mes Amis :</h2>
        {fiendArticles.map((post, index) => (
        <Card key={index} sx={{ minWidth: 600 }} style={{marginTop: '3px'}}>
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
      </div>
    </div>
    </DashboardLayout>

  );
}

export default MyFriend;
