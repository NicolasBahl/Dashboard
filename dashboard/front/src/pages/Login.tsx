import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const theme = createTheme();

interface TokenGoogle {
  family_name: string;
  given_name: string;
  email: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenGoogle, setTokenGoogle] = useState<string | undefined>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [googleEmail, setGoogleEmail] = useState<string>("");
  const navigate = useNavigate();

  const checkGoogleAccount = async () => {
    const res = await fetch("http://localhost:8080/user/google_account", {
      method: "POST",
      body: JSON.stringify({
        email: googleEmail,
        firstname: firstName,
        lastname: familyName,
      }),
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
        Authorization: `${tokenGoogle}`,
      },
    });
     await res.json();
    if (res.status === 200) {
      onLogWithGoogleAccount(googleEmail, tokenGoogle);
    }
    else if(res.status === 201){
      setTimeout(() => {
        onLogWithGoogleAccount(googleEmail,tokenGoogle);
      },2000)
    }
  };

  useEffect(() => {
    if (
      familyName !== undefined &&
      firstName !== undefined &&
      googleEmail !== undefined &&
      familyName !== "" &&
      firstName !== "" &&
      googleEmail !== "" &&
      tokenGoogle !== undefined &&
      tokenGoogle !== ""
    ) {
      checkGoogleAccount();
    }
  });

  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onLogWithGoogleAccount = async (email: string, password: string | undefined) => {
    const res = await fetch("http://localhost:8080/authentification", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      localStorage.setItem("tokenUser", json[0]);
      localStorage.setItem("email", json[1]);
      navigate("/");
    }
  };

  const onLog = async () => {
    const res = await fetch("http://localhost:8080/authentification", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      localStorage.setItem("tokenUser", json[0]);
      localStorage.setItem("email", json[1]);
      navigate("/");
    }
  };

  return (
    <>
      <NavBar links={["Home", "Register"]} />
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
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={onChangeMail}
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={onChangePassword}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                onClick={onLog}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  setTokenGoogle(credentialResponse.credential);
                  setFamilyName(
                    jwtDecode<TokenGoogle>(
                      credentialResponse.credential as string
                    ).family_name
                  );
                  setGoogleEmail(
                    jwtDecode<TokenGoogle>(
                      JSON.stringify(credentialResponse.credential)
                    ).email
                  );
                  setFirstName(
                    jwtDecode<TokenGoogle>(
                      credentialResponse.credential as string
                    ).given_name
                  );
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link style={{ textDecoration: "none" }} to={"/register"}>
                    You don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
