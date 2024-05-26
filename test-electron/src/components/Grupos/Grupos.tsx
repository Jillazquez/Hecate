import React, { useState, useEffect } from 'react';
import './Grupos.css'; // Asegúrate de que tienes los estilos necesarios en este archivo
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../DropDownMenu/DropDownMenu';

interface Group {
  group_name: string;
  description: string;
  group_id: string;
}

const Grupos: React.FC = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupMenuVisible, setGroupMenuVisible] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  useEffect(() => {
    const nombre = sessionStorage.getItem('nombre');
    setNombreUsuario(nombre);
    if (nombre) {
      getGroups(nombre);
    }
  }, []);

  const getGroups = async (email: string) => {
    const res = await fetch(`http://localhost:3000/getGroups?email=${encodeURIComponent(email)}`);
    const groups = await res.json();
    setGroups(groups);
  };

  const handleAddGroup = async () => {
    if (!nombreUsuario) return;
    const res = await fetch('http://localhost:3000/createGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nameInput, description: descriptionInput, email: nombreUsuario }),
    });

    if (!res.ok) {
      throw new Error('Error añadiendo grupo');
    } else {
      console.log('Grupo añadido');
      setGroupMenuVisible(false);
      getGroups(nombreUsuario); // Refresh the groups list after adding a new group
    }
  };

  const handleViewPasswords = (groupId:string) => {
    navigate(`/GrupPass?grupo=${encodeURIComponent(groupId)}`);
  };

  return (
    <div className="Main">
      <DropdownMenu/>
      <button className="btn btn-primary" onClick={() => setGroupMenuVisible(true)}>Crear Grupo</button>
      <button className="btn btn-primary" onClick={() => getGroups(nombreUsuario!)}>Actualizar</button>
      <h1>Lista de Grupos</h1>
      <div id="groupContainer">
        {groups.map((group, index) => (
          <div key={index} className="card">
            <h2>{group.group_name}</h2>
            <p>{group.description}</p>
            <p>Group ID: {group.group_id}</p>
            <button onClick={() => handleViewPasswords(group.group_id)}>Ver contraseñas</button>
          </div>
        ))}
      </div>

      {groupMenuVisible && (
        <div
          id="groupMenu"
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
            placeholder="Introduce el nombre del grupo"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            id="descriptionInput"
            placeholder="Descripcion del grupo"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <button onClick={handleAddGroup}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default Grupos;