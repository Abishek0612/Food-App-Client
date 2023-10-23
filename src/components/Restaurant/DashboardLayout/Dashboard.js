import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Routes, Route, Outlet } from "react-router-dom";
import Orders from "../Orders/Orders";

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const restaurantInfo = useSelector(
    (state) => state?.restaurants?.restaurantAuth?.restaurantInfo
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, mt: 8 }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            display="flex"
            flexGrow={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              Restaurant Dashboard
            </Typography>
            <Typography variant="h6" noWrap component="div" ml={2}>
              Welcome, {restaurantInfo?.restaurantName}
            </Typography>
            <Typography variant="h6" noWrap component="div" ml={2}>
              Email: {restaurantInfo?.email}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="orders">
            <ListItemText primary="Orders" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, mt: 8 }}
      >
        <Toolbar />
        <Container>
          <Routes>
            <Route path="orders" element={<Orders />} />
            <Route path="/" element={<div>Dashboard Home</div>} />
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="*" element={<Outlet />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
