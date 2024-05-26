import React, { useState } from 'react';
import DropdownMenu from '../DropDownMenu/DropDownMenu'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './PasswordCheck.css'

const PasswordCheck = () => {

    const [pass,setPass] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
      };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:3000/verificar-contrasena', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contraseña: pass }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            if (data.comprometida) {
                setShowSuccess(false);
                setShowError(true);
              } else {
                setShowSuccess(true);
                setShowError(false);
              }
          } else {
            throw new Error(data.error);
          }
        } catch (error) {
          console.error('Error al verificar la contraseña:', error);
        }
      };

  return (
    <div>
        <DropdownMenu/>
        <div className="form-container">
      <h2>Password Tester</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your pass here"
          name="pass"
          value={pass}
          onChange={handlePassChange}
          required
        />


        <button className='boton' type="submit">Log In</button>

      </form>
      {showSuccess && <div className="bien"><h1>Buenas Noticias</h1><p>Esta contraseña no se ha encontrado en la base de datos</p></div>}
        {showError && <div className="mal"><h1>Malas Noticias</h1><p>Esta contraseña se ha encontrado en la base de datos</p></div>}
    </div>
    
    </div>
  )
}

export default PasswordCheck