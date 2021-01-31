import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  //runs when the app is loaded
  useEffect(() => {
    //have to define an async function inside the use effect since back-end using async
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      //if the token is not stored in the local storage, set the token as being empty.
      //this will allow the check for if the token is valid to return false rather than a server error
      if (token === null) {
        //localStorage.setItem("auth-token", "");
        token = "";
        console.log("notoken");
      }

      const tokenRes = await axios.post(
        "https://habitrack8.herokuapp.com/api/auth/validatetoken",
        null,
        { headers: { Authorization: "Bearer " + token } }
      );

      //the data will contain a true / false from the backend endpoint
      if (tokenRes.data.isValid) {
        console.log("valid");
        console.log(token);

        const userRes = await axios.get(
          "https://habitrack8.herokuapp.com/api/users/getbytoken",
          { headers: { authorization: "Bearer " + token } }
        );

        //set the user data to the user that was retrieved
        setUserData(userRes.data.user);
        setToken(token);
        setLoading(false);
      } else {
        console.log("hello");
        setUserData(null);
        setToken(null);
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, token, setToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
