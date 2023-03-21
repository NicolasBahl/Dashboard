import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import { Grid } from "@mui/material";
// import GoogleLogOutBtn from "./LogoutButton";
import { googleLogout } from "@react-oauth/google";

googleLogout();

interface NavBarProps {
  window?: () => Window;
  links: string[];
}

const drawerWidth = 240;

export default function DrawerAppBar(props: NavBarProps) {
  const { window } = props;
  const navigation = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const token = localStorage.getItem("tokenUser");

  const onLogOut = () => {
    if (localStorage.getItem("email")?.includes("@gmail")) {
      localStorage.removeItem("tokenUser");
      localStorage.removeItem("email");
      googleLogout();
      navigation("/login");
    }
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("email");
    navigation("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Button
        sx={{ color: "#ff5943" }}
        onClick={() => {
          navigation("/");
        }}
      >
        <Typography variant="h6" sx={{ my: 2, cursor: "pointer" }}>
          KIRIBOARD
          <DashboardIcon />
        </Typography>
      </Button>
      <Divider />
      <List>
        {/* {
          tokenGoogle && <GoogleLogOutBtn color={"red"}/>
        } */}
        {token && (
          <Button style={{ color: "#000" }} onClick={onLogOut}>
            Logout
          </Button>
        )}
        {props.links &&
          props.links.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <Link
                  style={{ textDecoration: "none" }}
                  key={item}
                  to={
                    item.toLowerCase() === "home"
                      ? "/"
                      : `/${item.toLowerCase()}`
                  }
                >
                  <ListItemText
                    sx={{ textAlign: "center", color: "#111" }}
                    primary={item}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ backgroundColor: "#ff5943" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            onClick={() => {
              navigation("/");
            }}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", cursor: "pointer" },
            }}
          >
            KIRIBOARD
          </Typography>
          <DashboardIcon />

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {props.links &&
              props.links.map((item) => (
                <Link
                  style={{ textDecoration: "none" }}
                  key={item}
                  to={
                    item.toLowerCase() === "home"
                      ? "/"
                      : `/${item.toLowerCase()}`
                  }
                >
                  <Button sx={{ color: "#fff" }}>{item}</Button>
                </Link>
              ))}
            {token && (
              <Button style={{ color: "#fff" }} onClick={onLogOut}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
