import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const DashboardHome = () => {
  const restaurantInfo = useSelector(
    (state) => state?.restaurants?.restaurantAuth?.restaurantInfo
  );

  return (
    <Card sx={{ maxWidth: 545, mt: 3, mx: "auto" }}>
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
                <PersonIcon style={{ fontSize: 40 }} />
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" component="div" gutterBottom>
              Welcome, {restaurantInfo?.restaurantName}
            </Typography>

            <Box display="flex" alignItems="center" mt={1}>
              <EmailIcon color="primary" />
              <Typography variant="subtitle1" component="div" ml={2}>
                Email: {restaurantInfo?.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardHome;
