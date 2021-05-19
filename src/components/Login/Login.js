
import { useContext, useState } from "react";
import {UserContext} from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework } from "./LoginManager";


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: ""
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }

  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
  })
}
  
  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    })
  }
  
  const handleBlur = (e) => {
    // debugger;
    // console.log(e.target.name, e.target.value);
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log("email" ,isFieldValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      // console.log("password" , isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      // updateUserName(user.name);
    }
  };
  const handleSubmit = (e) => {
    // console.log(user.email , user.password);
    if (newUser && user.email && user.password) {
      // console.log("submitting");
    }
    if (!newUser && user.email && user.password) {
    }
    e.preventDefault();
  };

  return (
    <div style={{textAlign: 'center'}}>
      <br />
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={GoogleSignIn}>Sign in</button>
      )}
      <br />
      <button onClick={fbSignIn}>Sign In using facebook</button>
      <h1>Our own Authentication</h1>

      {/* <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.displayName}</h2> */}

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign up</label>
      <br />
      {user.isSignedIn && (
        <div>
          <h2>welcome, {user.name}</h2>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged In"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;