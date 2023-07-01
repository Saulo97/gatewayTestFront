import React, {useEffect} from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function GatewaysList() {
    const [gateways, setGateways] = useState([])
    const navigate = useNavigate()
    const gatewayDetails = (gatewayId)=>{
        navigate(`/gateway/details/${gatewayId}`)
    }
    const addDevice = (id) =>{
        navigate('/device/create/'+id)
    }
    const deleteGateway =(id)=>{
        if(window.confirm("Seguro que desea eliminar el gateway seleccionado")){
            const url = import.meta.env.VITE_BACKEND_URL
            fetch(url+"/deleteGateway/"+id,{
                method: "DELETE"
            }).then((res)=>{
                if(res.ok != true){
                    res.json().then(val=>alert(val.error))
                }else{
                    alert("Elemento eliminado correctamente")
                    setGateways(gateways.filter((gateway)=>(
                        gateway.id !==id
                    )))
                }
            })
        }

    }

    useEffect(() => {
        const url = import.meta.env.VITE_BACKEND_URL
        fetch(url+"/getAllGateways", {
            method: "GET"
          })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => setGateways(data)) // Do something with the data
            .catch((error) => console.error(error))}, [])
    
  return (
    <div className="container">
        <div className="card">
            <div className="card-title">
                <h2>Gateways List</h2>
            </div>
            <div className="card-body">
                <div>
                    <Link to={'/gateway/create'} className='btn btn-success divbtn'>Add New Gateway (+)</Link>
                </div>
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Serial Number</td>
                            <td>IP</td>
                            <td>Options</td>
                        </tr>
                    </thead>
                    <tbody>
                        {gateways && 
                            gateways.map(gateway=>(
                                <tr key={gateway.id}>
                                    <td>{gateway.id}</td>
                                    <td>{gateway.name}</td>
                                    <td>{gateway.serialNumber}</td>
                                    <td>{gateway.ipv4}</td>
                                    <td>
                                        <a onClick={()=>{gatewayDetails(gateway.id)}} className='btn btn-success'>Details</a>
                                        <a onClick={()=>{addDevice(gateway.id)}} className="btn btn-primary">Add Device</a>
                                        <a onClick={()=>{deleteGateway(gateway.id)}} className="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
