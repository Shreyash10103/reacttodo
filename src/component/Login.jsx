import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const { loading, setLoading } = useContext(Context);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const SubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/users/login`, {
        email, password
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
      setIsAuthenticated(false);

    }
  };
  if (isAuthenticated) return <Navigate to={"/"}></Navigate>

  return (

    <div className="login">
      <section>
        <form onSubmit={SubmitHandler}>
          <input
            value={email} onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            required

          />
          <input
            value={password} onChange={(e) => setpassword(e.target.value)}
            type="password"
            required
            placeholder="Password"

          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>

  )
}

export default Login
