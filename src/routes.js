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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";


import Dashboard from "layouts/dashboard";
import User from "layouts/user";
import AddUser from "layouts/user/add";
import EditUser from "layouts/user/edit";
import SignOut from "layouts/logout";
import SignIn from "layouts/authentication/sign-in";
import Invoice from "layouts/sales/invoice";
import AddInvoice from "layouts/sales/addInvoice";
import withAuth from "layouts/controlLog";
import Post from "layouts/post";
import AddPost from "layouts/post/add";
import EditPost from "layouts/post/edit";
// @mui icons
import Icon from "@mui/material/Icon";
import AddFriend from "layouts/mes-amis/add";
import AddComment from "layouts/commentaire/add";
import Friend from "layouts/mes-amis/data/postsTableData";
import AllPostsTable from "layouts/all-Posts/data/postsTableData";
import AllPost from "layouts/all-Posts";
import DetailsPost from "layouts/all-Posts/details";

const routes = [
  {
    type: "collapse",
    name: "Tous les articles",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/allPosts",
    component: <AllPost />,
  },
  {
    type: "collapse",
    name: "Mes Articles",
    key: "post",
    icon: <Icon fontSize="small">article</Icon>,
    route: "/posts",
    component: <Post />,
  },
  {
    type: "collapse",
    name: "Mes amis",
    key: "mesAmis",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/mes-amis",
    component: <Friend />,
  },
  {
    
    route: "/mes-amis/add",
    component: <AddFriend />,
  },
  {
    route: "/mes-amis/:id",
    component: <Friend />,
  },
  {
    route: "details/:id",
    component: <DetailsPost />,
  },
  {
    route: "/addComment/:id",
    component: <AddComment />,
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Utilisateur",
  //   key: "user",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/user",
  //   component: <User />,
  // },
 
  {
    route: "/post/add",
    component: <AddPost />,
  },
  {
    route: "/user/add",
    component: <AddUser />,
  },
  

  {
    route: "/post/edit/:id",
    component: <EditPost />,
  },
  {
    type: "collapse",
    name: "Déconnexion",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <SignOut />,
  },
];

export default routes;
