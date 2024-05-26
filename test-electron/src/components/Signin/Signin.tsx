// SignUpForm.js
import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'fullname') setFullname(value);
    else if (name === 'age') setAge(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleFormSubmit = async () => {
    // Aquí puedes enviar los datos del formulario al backend
    console.log('Datos enviados:', { fullname, age, email, password });
  };

  const validateFields = () => {
    // Validar los campos del formulario aquí
    const isValid = fullname.trim() !== '' && age.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    setButtonDisabled(!isValid);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <label htmlFor="fullname"><b>Full Name</b></label>
      <input type="text" placeholder="John Doe" name="fullname" value={fullname} onChange={handleInputChange} required />

      <label htmlFor="age"><b>Age</b></label>
      <input type="number" placeholder="25" name="age" value={age} onChange={handleInputChange} required />

      <label htmlFor="email"><b>Email</b></label>
      <input type="text" placeholder="mail@mail.com" name="email" value={email} onChange={handleInputChange} required />

      <label htmlFor="password"><b>Password</b></label>
      <input type="password" placeholder="••••••••" name="password" value={password} onChange={handleInputChange} required />

      <button className='boton' type="button" onClick={handleFormSubmit} disabled={buttonDisabled}>Register</button>

      <Link to='/' className="psw">Already have an account? Log In</Link>
    </div>
  );
};

export default Signin;
