import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        const data = await res.json();
        const hash = data.password;

        const res2 = await fetch('http://localhost:3000/compare', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, hash }),
        });

        if (!res2.ok) {
          throw new Error(`HTTP error! status: ${res2.status}`);
        } else {
          const data2 = await res2.json();
          if (data2.match) {
            sessionStorage.setItem('nombre', email);
            navigate('/Main')
          } else {
            console.log('Las contraseñas no coinciden.');
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"><b>Email</b></label>
        <input
          type="text"
          placeholder="mail@mail.com"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="••••••••"
          name="psw"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <span className="psw"><a href="../SignUp/index.html">Forgot your password?</a></span>

        <button className='boton' type="submit">Log In</button>

        <Link to='/Signin' className="psw">Don't have an account yet? Create one</Link>
      </form>
    </div>
  );
};

export default Login;
