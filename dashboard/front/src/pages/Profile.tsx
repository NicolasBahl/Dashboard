import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ProfileBox from "../components/Profile";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const localStorageEmail = localStorage.getItem("email");
  const token = localStorage.getItem("tokenUser");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getUserInformation();
  }, []);

  async function getUserInformation() {
    const res = await fetch(`http://localhost:8080/user/${localStorageEmail}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setLastName(json.lastname);
    setEmail(json.email);
    setPassword(json.password);
    setFirstName(json.firstname);
  }

  const onModify = async () => {
    const res = await fetch(`http://localhost:8080/user/${localStorageEmail}`, {
      method: "PUT",
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      }),
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      setLastName(json.lastname);
      setFirstName(json.firstname);
      getUserInformation();
      return json;
    } else {
      console.log("Error");
    }
  };

  const onDelete = async () => {
    const res = await fetch(`http://localhost:8080/user/${localStorageEmail}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("tokenUser");
      navigate("/");
    } else {
      console.log("Error");
    }
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <NavBar links={token ? ["Home", "Widgets"]: [""] } />
      <ProfileBox
        onModify={onModify}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        onChangePassword={onChangePassword}
        onChangelastName={onChangeLastName}
        onChangefirstName={onChangeFirstName}
        onDelete={onDelete}
      />
    </>
  );
};

export default MyPage;
