import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      alert("Login Successful");

      console.log(res.data);

    } catch (error) {

      console.log(error);
      alert("Login Failed");

    }

  };

  return (
    <div>

      <h2>Login Page</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

    </div>
  );
}

export default Login;