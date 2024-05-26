import React, { useState, useEffect } from 'react';
import './ContrasenasGrupos.css'; // Asegúrate de que tienes los estilos necesarios en este archivo
import DropdownMenu from '../DropDownMenu/DropDownMenu';

interface Password {
  password_name: string;
  password_value: string;
  group_id: string;
  id: string;
}

const ContrasenasGrupos: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [passMenuVisible, setPassMenuVisible] = useState(false);
  const [personMenuVisible, setPersonMenuVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [mailInput, setMailInput] = useState('');

  useEffect(() => {
    const nombre = sessionStorage.getItem('nombre');
    setNombreUsuario(nombre);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const groupId = urlParams.get('grupo');
    setGroupId(groupId);

    if (groupId) {
      getGroupPasswords(groupId);
    }
  }, []);

  const getGroupPasswords = async (groupId: string) => {
    const res = await fetch(`http://localhost:3000/getGroupPass?id=${encodeURIComponent(groupId)}`);
    const passwords = await res.json();
    setPasswords(passwords);
  };

  const handleAddPassword = async () => {
    if (!groupId) return;

    const res = await fetch('http://localhost:3000/addGroupPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: groupId, name: nameInput, desc: descriptionInput }),
    });

    if (!res.ok) {
      throw new Error('Error añadiendo contraseñas');
    } else {
      console.log('Contraseña añadida');
      setPassMenuVisible(false);
      getGroupPasswords(groupId); // Refresh the passwords list after adding a new password
    }
  };

  const handleAddPerson = async () => {
    if (!groupId) return;

    const res = await fetch('http://localhost:3000/addPersonGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail: mailInput, group_id: groupId }),
    });

    if (!res.ok) {
      throw new Error('Error añadiendo persona');
    } else {
      console.log('Persona añadida');
      setPersonMenuVisible(false);
    }
  };

  const handleDeletePassword = async (passwordId: string) => {
    const res = await fetch('http://localhost:3000/deleteGroupPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: passwordId }),
    });

    if (!res.ok) {
      throw new Error('Error borrando contraseña');
    } else {
      console.log('Contraseña borrada');
      if (groupId) {
        getGroupPasswords(groupId);
      }
    }
  };

  return (
    <>
    <DropdownMenu/>
    <div className="Main">
      <h1>Contraseñas Grupo numero {groupId}</h1>
      <button className="btn btn-primary" onClick={() => setPassMenuVisible(true)}>Añadir Contraseña</button>
      <button className="btn btn-primary" onClick={() => groupId && getGroupPasswords(groupId)}>Actualizar</button>
      <button className="btn btn-primary" onClick={() => setPersonMenuVisible(true)}>Añadir persona</button>
      <div id="passContainer">
        {passwords.map((password, index) => (
          <div key={index} className="card">
            <h2>{password.password_name}</h2>
            <p>{password.password_value}</p>
            <p>Group ID: {password.group_id}</p>
            <p>El id de la pass es {password.id}</p>
            <button onClick={() => handleDeletePassword(password.id)}>Borrar Contraseña</button>
          </div>
        ))}
      </div>

      {passMenuVisible && (
        <div
          id="passMenu"
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
            id="nameInput"
            placeholder="Introduce la contraseña"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            id="descriptionInput"
            placeholder="Nombre de la contraseña"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <button onClick={handleAddPassword}>Enviar</button>
          <button onClick={() => setPassMenuVisible(false)}>Cerrar</button>
        </div>
      )}

      {personMenuVisible && (
        <div
          id="personMenu"
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
            type="email"
            id="mailInput"
            placeholder="Introduce el correo"
            value={mailInput}
            onChange={(e) => setMailInput(e.target.value)}
          />
          <button onClick={handleAddPerson}>Enviar</button>
          <button onClick={() => setPersonMenuVisible(false)}>Cerrar</button>
        </div>
      )}
    </div>
    </>
  );
};

export default ContrasenasGrupos;
