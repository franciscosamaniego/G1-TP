import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

const Item = props => {
const [CalifProm, setCalifProm] = useState(0);
const [newCalif, setnewCalif] = useState({
    Calif : 0
});


function deleteItem(event){
    event.preventDefault()
    axios.delete('/movies/' + props.item_id)
    .then(respose =>{
        console.log("Peticion Envidada")
        console.log(respose)}
      )
      .catch(error => {
        console.error(error);
      })
      window.location.reload()
}

function handleCalif(event){
    event.preventDefault()
    props.Califs.push(newCalif)
    console.log(props.Califs);
    axios.put('/movies/' + props.item_id, props.Califs)
    .then(respose =>{
        console.log("Peticion Envidada")
        console.log(respose)
        window.location.reload()}
      )
      .catch(error => {
        console.error(error);
      })
}

    useEffect(() => {
        let prom = 0;
        console.log()
        for (const calif of props.Califs) {
            prom += calif.Calif
        }
        console.log(props.Califs)
        prom = prom / props.Califs.length;
        prom = prom.toFixed(2)
        setCalifProm(prom)
    }, [props.Califs])


    return (
        <div className="form">
          <img className="img"src={props.Image}/>
            <h3>{props.Name}</h3>
                <p>Genero: {props.Gender}</p>
                <p>Sinopsis: {props.Sinopsis}</p>
                <p>Calificación: {CalifProm}</p>
                <form onSubmit={handleCalif}>
                    <label>Ingrese su Calificacion : </label>
                    <input className="cabra"
                    data-itemid = {props.item_id}
                    type= "number"
                    min = "0"
                    max = "10"
                    value = {newCalif.Calif}
                    onChange={e =>{
                        setnewCalif({
                          ...newCalif,
                          Calif : +e.target.value
                        })
                      }}
                    />
                    <button className="btn btn-success"type = "submit">Enviar</button>
                </form>

            <p>{props.admin_mode ? <button className="btn btn-danger default" onClick={deleteItem}>Eliminar</button> : ''}</p>
        </div>
    )
}

export default Item
