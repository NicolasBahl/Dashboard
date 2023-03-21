import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangelastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangefirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onModify: () => void;
  onDelete: () => void;
}
export default function ProfileBox(props: ProfileProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#ff5943" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              My profile
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder={props.firstName}
                    onChange={props.onChangefirstName}
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    id="firstName"
                    label={"firstName"}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={props.onChangelastName}
                    fullWidth
                    id="lastName"
                    placeholder={props.lastName}
                    label={"lastName"}
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    id="email"
                    label={props.email}
                    placeholder={props.email}
                    name="emai"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={props.onChangePassword}
                    fullWidth
                    name="password"
                    label={"Password"}
                    placeholder={"**********"}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                onClick={props.onModify}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modify
              </Button>
              <Button
                color="error"
                onClick={props.onDelete}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
