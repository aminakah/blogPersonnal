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
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";


export default function Friend() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  const [users, setUser] = useState([]);
  const { id } = useParams();
  const [friendsList, setFriendsList] = useState([]);
  const [friendId, setFriendId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addFriend = (friendId) => { // Ajoutez le paramètre `friendId` ici
    PostService.addFriend(friendId)
      .then((response) => {
        console.log('Ami ajouté avec succès');
        console.log(response);
        
      })
      .catch((error) => {
        setErrorMessage('Erreur lors de l\'ajout d\'ami');
        console.error(error);
      });
  };
 
  useEffect(() => {
    // Chargez la liste des amis lorsque le composant est monté
    PostService.listFriends()
      .then((response) => {
        setFriendsList(response.data.friends);
      })
      .catch((error) => {
        setErrorMessage('Erreur lors du chargement de la liste des amis');
        console.error(error);
      });
  }, []);
  const handleSearch = () => {
        PostService.rechercherUser(searchTerm)
          .then((response) => {
            setSearchTerm(response.data.item[0].name);
            setSearchResults(response.data.item);
            console.log(response.data.item[0].name);
          })
          .catch((error) => {
            console.error('Erreur lors de la recherche d\'utilisateurs', error);
          });
      };
      const viewFriendArticles = (friendId) => {
        // Effectuez une requête pour récupérer les articles de l'ami
        PostService.getFriendArticles(friendId)
          .then((response) => {
            // Mettez à jour l'état de votre composant avec les articles de l'ami
            setFriendArticles(response.data.articles);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des articles de l\'ami', error);
          });
      };
      
  // useEffect(()=>{
  //   const addFriend = (id) => {
  //     PostService.addFriend(id).then((response) => {
  //       console.log(response.data);
  //       // console.log(user.name);
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la recherche d\'utilisateurs', error);
  //     });
     
  //     setFriendsList([...friendsList, user]);
  //   };
  // }[id]);
  
//   useEffect(() => {
//     PostService.listUser()
//     .then(response => {
//       setUser(response.data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }, []);

// useEffect(() => {
//   const handleSearch = () => {
//     PostService.rechercherUser(searchTerm)
//       .then((response) => {
//         setSearchTerm(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error('Erreur lors de la recherche d\'utilisateurs', error);
//       });
//   };
//   handleSearch();
// }, []);

// const handleSearch = () => {
//   // Effectuez une requête à votre API pour rechercher des utilisateurs par leur nom d'utilisateur
//    PostService.rechercherUser(searchTerm).then(response => {
//       setSearchResults(response.data);
//       console.log(response.data)
//     })
//     .catch(error => {
//       console.error('Erreur lors de la recherche d\'utilisateurs', error);
//     });
// };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
      <input
        type="text"
        placeholder="Rechercher un utilisateur"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div>
        <h2>Résultats de la recherche</h2>
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => addFriend(user)}>Ajouter aux amis</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Liste de mes amis</h2>
        <ul>
      {friendsList.map((friend) => (
        <a href="/postAmis/${id}" key={friend}>{friend}</a>
        
      ))}
    </ul>
    <input
        type="number"
        placeholder="ID de l'ami à ajouter"
        value={friendId}
        onChange={(e) => setFriendId(e.target.value)}
      />
      <button onClick={() => addFriend(friendId)}>Ajouter un ami</button>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
        
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

