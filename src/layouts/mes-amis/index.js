/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
/* eslint-disable prettier/prettier */


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";
import { Link } from "react-router-dom";
import MenuHorizontal from "components/MenuHorizontal";
import withAuth from "layouts/controlLog";



// Data
import postsTableData from "layouts/post/data/postsTableData";

function Post() {
  const { columns, rows } = postsTableData();
  const menuItems = [
    { link: "/post", name: "Postes" },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MenuHorizontal
        menuColor="white"
        borderRadius="0.5rem"
        coloredShadow="info" 
        menuItems={menuItems}
        />
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
                  Articles
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                    <MDBox  textAlign="right" mr={3}>
                      <Link to='/post/add' component={Link}>
                        <MDButton
                          variant="gradient"
                          color="info"
                          type="submit"
                        >
                          Ajouter un post
                        </MDButton>
                      </Link>
                    </MDBox>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Post;
