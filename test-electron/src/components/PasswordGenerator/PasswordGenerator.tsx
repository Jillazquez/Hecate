import React from 'react'
import DropdownMenu from '../DropDownMenu/DropDownMenu'
import './PasswordGenerator.css'


const PasswordGenerator = () => {

    const generatePass = () => {
    let input = document.getElementById('contraseñaInput');
    const numCheck = document.getElementById('numerosCheckbox');
    const charCheck = document.getElementById('caracteresCheckbox');
    const letCheck = document.getElementById('letrasCheckbox');

    // Array con letras en mayúscula y minúscula
    let letras = ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'];

    // Array con números del 0 al 9
    let numeros = ['01234567890123456789'];

    // Array con caracteres especiales
    let caracteres = ['!@#$%&*?+-_=!@#$%&*?+-_='];

    let array = [];
    let string = "";
    if(numCheck.checked)
        array += numeros;
    if(charCheck.checked)
        array += caracteres;
    if(letCheck.checked)
        array += letras;
   
    //Comprobamos que al menos uno de los botones esta pulsado
    if(!numCheck.checked && !charCheck.checked && !letCheck.checked){
        console.log('No ha pulsado ningun checkbox');
        return;
    }else{
        for(let i = 0; i < 16; i++){
            let ranNum = Math.floor(Math.random() * array.length);
            string += array.charAt(ranNum);
        }
        input.value = string;
    }
    };

  return (
    <>
        <DropdownMenu />
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form>
              <div className="mb-3">
                <label  className="form-label">Contraseña:</label>
                <input type="text" className="form-control" id="contraseñaInput" name="contraseñaInput" placeholder="Ingrese su contraseña"/>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="numerosCheckbox" name="numerosCheckbox"/>
                <label className="form-check-label" >Incluir números</label>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="letrasCheckbox" name="letrasCheckbox"/>
                <label className="form-check-label" >Incluir letras</label>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="caracteresCheckbox" name="caracteresCheckbox"/>
                <label className="form-check-label" >Incluir caracteres especiales</label>
              </div>
              <button type="button" className="btn btn-primary" id="botonPass" onClick={generatePass}>Generar Contraseña</button>
            </form>
          </div>
        </div>
    </>

  );
};

export default PasswordGenerator