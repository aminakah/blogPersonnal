/* eslint-disable prettier/prettier */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material UI components
import { Box, TextField, MenuItem, Select as MDSelect,InputLabel,TextareaAutosize } from "@material-ui/core";

// Axios for API requests
import axios from "axios";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// React Router Dom
import { useNavigate,Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import Swal from 'sweetalert2';
import Checkbox from "@mui/material/Checkbox";

function AddInvoice() {
  const navigate = useNavigate();

  
  const [description, setDescription] = useState("");
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const [amount, setAmount] = useState("");
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const [expenseDate, setExpenseDate] = useState("");
  const handleExpenseDateChange = (event) => {
    setExpenseDate(event.target.value);
  };

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  const [project, setProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const handleProjectChange = (event) => {
    const selectedProjectId = event.target.value;
    setSelectedProject(selectedProjectId);
  };

  const [team, setTeam] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const [billable, setBillable] = useState("");
//   const handleBillableChange = (event) => {
//     setBillable(event.target.value);
//   };
    const handleBillableChange = (event) => {
    const isChecked = event.target.checked;
    setBillable(isChecked ? 1 : 0);
  };
  

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const [price, setPrice] = useState('');
  const [invoiceType, setInvoiceType] = useState('invoice');
  const [invoiceStatus, setInvoiceStatus] = useState('open');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress1, setCustomerAddress1] = useState('');
  const [customerAddress2, setCustomerAddress2] = useState('');
  const [customerTown, setCustomerTown] = useState('');
  const [customerCounty, setCustomerCounty] = useState('');
  const [customerPostcode, setCustomerPostcode] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNameShip, setCustomerNameShip] = useState('');
  const [customerAddress1Ship, setCustomerAddress1Ship] = useState('');
  const [customerAddress2Ship, setCustomerAddress2Ship] = useState('');
  const [customerTownShip, setCustomerTownShip] = useState('');
  const [customerCountyShip, setCustomerCountyShip] = useState('');
  const [customerPostcodeShip, setCustomerPostcodeShip] = useState('');
  const [customerPhoneShip, setCustomerPhoneShip] = useState('');

  
  const handleCreateInvoice = (e) => {
    e.preventDefault();
    // Logique pour créer une facture ici avec les données du formulaire
    // Vous pouvez envoyer les données à votre backend ou effectuer d'autres opérations nécessaires
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData();
  data.append('description', description);
  data.append('amount', amount);
  data.append('category', selectedCategory);
  data.append('expenseDate', expenseDate);
  data.append('project', selectedProject);
  data.append('team', selectedTeam);
  data.append('billable', billable);
  data.append('file', file);
  axios.post("http://127.0.0.1:8000/api/expense/store", data)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Dépense ajoutée avec succès!',
      }).then(() => {
        // redirection vers la page de liste d'utilisateurs
        navigate("/expenses");
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

useEffect(() => {
  async function fetchTeams() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user");
      setTeam(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des équipes :", error);
    }
  }

  fetchTeams();
}, []);

useEffect(() => {
  async function fetchCategory() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/expense/category");
      setCategory(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des category :", error);
    }
  }

  fetchCategory();
}, []);

useEffect(() => {
async function fetchProjects() {
    try {
    const response = await axios.get("http://127.0.0.1:8000/api/projects");
    setProject(response.data);
    } catch (error) {
    console.error("Erreur lors du chargement des projects :", error);
    }
}

fetchProjects();
}, []);

useEffect(() => {
async function fetchTeams() {
    try {
    const response = await axios.get("http://127.0.0.1:8000/api/user");
    setTeam(response.data);
    } catch (error) {
    console.error("Erreur lors du chargement des équipes :", error);
    }
}

fetchTeams();
}, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                {/* Formulaire d'ajout utilisateur */}
                <MDBox p={3}>
                <form method="post" id="create_invoice" onSubmit={handleCreateInvoice}>
                <div style={{ display: 'flex', alignItems: 'right' }}>
                  <MDTypography variant="body1">Sélectionner le type :</MDTypography>
                  
                    <MDSelect
                      name="invoice_type"
                      id="invoice_type"
                      variant="outlined"
                      fullWidth
                      value={invoiceType}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      style={{ width: '300px' }}
                    >
                      <MenuItem value="invoice">Facture</MenuItem>
                      <MenuItem value="quote">Devis</MenuItem>
                      <MenuItem value="receipt">Reçu</MenuItem>
                    </MDSelect>

                    <MDSelect
                      name="invoice_type"
                      id="invoice_type"
                      variant="outlined"
                      fullWidth
                      value={invoiceType}
                      onChange={(e) => setInvoiceType(e.target.value)}
                      style={{ width: '300px' }}
                    >
                      <MenuItem value="invoice">Facture</MenuItem>
                      <MenuItem value="quote">Devis</MenuItem>
                      <MenuItem value="receipt">Reçu</MenuItem>
                    </MDSelect>
                  
                </div>
                    <Box>
                    <InputLabel>Select Status:</InputLabel>
                    <MDSelect
                        name="invoice_status"
                        id="invoice_status"
                        variant="outlined"
                        fullWidth
                        value={invoiceStatus}
                        onChange={(e) => setInvoiceStatus(e.target.value)}
                    >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                    </MDSelect>
                    </Box>
                    <Box>
                    <TextField
                        type="date"
                        label="Invoice Date"
                        variant="outlined"
                        fullWidth
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                    </Box>
                    <Box>
                    <TextField
                        type="date"
                        label="Due Date"
                        variant="outlined"
                        fullWidth
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    </Box>
                    <Box>
                    <TextField
                        type="text"
                        label="Invoice Number"
                        variant="outlined"
                        fullWidth
                        value={invoiceId}
                        onChange={(e) => setInvoiceId(e.target.value)}
                    />
                    </Box>
                    <Box>
                    <InputLabel>Customer Information</InputLabel>
                    <TextField
                        type="text"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address 1"
                        variant="outlined"
                        fullWidth
                        value={customerAddress1}
                        onChange={(e) => setCustomerAddress1(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address 2"
                        variant="outlined"
                        fullWidth
                        value={customerAddress2}
                        onChange={(e) => setCustomerAddress2(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Town"
                        variant="outlined"
                        fullWidth
                        value={customerTown}
                        onChange={(e) => setCustomerTown(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="County"
                        variant="outlined"
                        fullWidth
                        value={customerCounty}
                        onChange={(e) => setCustomerCounty(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Postcode"
                        variant="outlined"
                        fullWidth
                        value={customerPostcode}
                        onChange={(e) => setCustomerPostcode(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                    </Box>
                    <Box>
                    <InputLabel>Shipping Information</InputLabel>
                    <TextField
                        type="text"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={customerNameShip}
                        onChange={(e) => setCustomerNameShip(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address 1"
                        variant="outlined"
                        fullWidth
                        value={customerAddress1Ship}
                        onChange={(e) => setCustomerAddress1Ship(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Address 2"
                        variant="outlined"
                        fullWidth
                        value={customerAddress2Ship}
                        onChange={(e) => setCustomerAddress2Ship(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Town"
                        variant="outlined"
                        fullWidth
                        value={customerTownShip}
                        onChange={(e) => setCustomerTownShip(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="County"
                        variant="outlined"
                        fullWidth
                        value={customerCountyShip}
                        onChange={(e) => setCustomerCountyShip(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Postcode"
                        variant="outlined"
                        fullWidth
                        value={customerPostcodeShip}
                        onChange={(e) => setCustomerPostcodeShip(e.target.value)}
                    />
                    <TextField
                        type="text"
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        value={customerPhoneShip}
                        onChange={(e) => setCustomerPhoneShip(e.target.value)}
                    />
                    </Box>
                    {/* Le reste du formulaire */}
                    {/* Utilisez les composants MDBox, MDTypography, MDButton, etc., comme nécessaire pour personnaliser davantage */}
                    <MDButton
                    variant="gradient"
                    color="info"
                    type="submit"
                    onClick={handleCreateInvoice}
                    >
                    Create Invoice
                    </MDButton>
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

export default AddInvoice;
