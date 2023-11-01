/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import axios from 'axios';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { PostService } from 'services/post.service';
function MyFriend() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [publicArticles, setPublicArticles] = useState([]);
  const handleSearch = () => {
    // Effectuez une requête à votre API pour rechercher des utilisateurs par leur nom d'utilisateur
     PostService.rechercherUser().then(response => {
        setSearchResults(response.data);
        console.log(response.data)
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
        <input
          type="text"
          placeholder="Rechercher un ami par nom d'utilisateur"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <div>
        <h2>Résultats de la recherche :</h2>
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              {user.name}{' '}
              <button onClick={() => handleAddFriend(user)}>Ajouter comme ami</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Mes Amis :</h2>
        <ul>
          {friends.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={loadPublicArticles}>Charger les articles publics de mes amis</button>
        <h2>Articles Publics de Mes Amis :</h2>
        <ul>
          {publicArticles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div>
    </div>
    </DashboardLayout>

  );
}

export default MyFriend;
