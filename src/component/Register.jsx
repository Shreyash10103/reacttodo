import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {

  const [name, setname] = useState("");
  const { loading, setLoading } = useContext(Context);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const SubmitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/users/new`, {
        name, email, password
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
      setLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"}></Navigate>


  return (
    <div className="login" >
      <section>
        <form onSubmit={SubmitHandler}>
          <input value={name} onChange={(e) => setname(e.target.value)}

            type="text"
            placeholder="Name"
            required
          />
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
          <button disabled={loading} type="submit">Sign Up</button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register
