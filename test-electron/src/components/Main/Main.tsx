import React, { useEffect, useState } from 'react';
import './Main.css';
import DropdownMenu from '../DropDownMenu/DropDownMenu';

interface Password {
  password_name: string;
  password_value: string;
}

const Main: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [passwordMenuVisible, setPasswordMenuVisible] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const nombre = sessionStorage.getItem('nombre');
    setNombreUsuario(nombre);
    getPass(nombre);
  }, []);

  const borrarTabla = () => {
    setPasswords([]);
    console.log('borra tabla');
  };

  const getPass = async (nombreUsuario: string | null) => {
    if (!nombreUsuario) return;
    const res = await fetch(`http://localhost:3000/getPasswords?email=${encodeURIComponent(nombreUsuario)}`);
    const passwords = await res.json();
    setPasswords(passwords);
  };

  const handleDeletePassword = async (password: string) => {
    if (!nombreUsuario) return;
    const res = await fetch('http://localhost:3000/borrarPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: nombreUsuario, password }),
    });

    if (!res.ok) {
      throw new Error('Error borrando contraseña');
    }

    console.log('Contraseña borrada');
    borrarTabla();
    getPass(nombreUsuario);
  };

  const handleAddPassword = async () => {
    if (!nombreUsuario) return;
    const res = await fetch('http://localhost:3000/addPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: nombreUsuario, password: passwordInput, passwordDesc: descriptionInput }),
    });

    if (!res.ok) {
      throw new Error('Error añadiendo contraseñas');
    }

    console.log('Contraseña añadida');
    borrarTabla();
    getPass(nombreUsuario);
    setPasswordMenuVisible(false);
  };

  return (
    <div className="Main">
      <DropdownMenu />
      <h1 id="nombreUsuario">{nombreUsuario}</h1>
      <h6>TESTTEESTTEST</h6>
      <div className="menu-container"></div>
      <div className='botones'>
      <button className="btn btn-primary boton" onClick={() => setPasswordMenuVisible(true)}>Añadir Contraseña</button>
      <button className="btn btn-primary boton" onClick={() => getPass(nombreUsuario)}>Actualizar</button>
      </div>
      

      <div id="passwordTableContainer">
        <table id="passwordTable">
          <thead>
            <tr>
              <th>Nombre de la contraseña</th>
              <th>Valor de la contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password, index) => (
              <tr key={index}>
                <td>{password.password_name}</td>
                <td>{password.password_value}</td>
                <td>
                  <button onClick={() => handleDeletePassword(password.password_value)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {passwordMenuVisible && (
        <div
          id="passwordMenu"
          style={{
            display: 'block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '200px',
            background: 'white',
            zIndex: 9999,
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <input
            type="text"
            id="descriptionInput"
            placeholder="Introduce la descripción"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            id="passwordInput"
            placeholder="Introduce tu contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          /> Mostrar contraseña
          <button onClick={handleAddPassword}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default Main;
