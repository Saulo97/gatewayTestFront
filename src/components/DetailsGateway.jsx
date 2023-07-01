import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'

function DetailsGateway() {
    const {gatewayid}  = useParams()
    const [gateway, setGateway] = useState({})
    const [devices, setDevices] = useState([])
    const navigate = useNavigate()
    const deleteDevice =(id)=>{
        if(window.confirm("Seguro que desea eliminar el device seleccionado")){
            const url = import.meta.env.VITE_BACKEND_URL
            fetch(url+"/deleteDevice/"+id,{
                method: "DELETE"
                }).then((res)=>{
                    if(res.ok != true){
                        res.json().then(val=>alert(val.error))
                    }else{
                        alert("Elemento eliminado correctamente")
                        setDevices(devices.filter((device)=>(
                            device.id !== id
                        )))
                        //navigate("/gateway/details/"+gatewayiD)
                    }
                })
        }
    }
    useEffect(() => {
        const url = import.meta.env.VITE_BACKEND_URL
        fetch(`${url}/getGateway/${gatewayid}`, {
            method: "GET"
          })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) =>{
                setGateway(data)
                setDevices(data.devices)
            }) 
            
            .catch((error) => console.error(error))}, [])
    
  return (
    <div className="container">
    <div className="card">
        <div className="card-title">
            <h2>Gateways List</h2>
        </div>
        <div className="card-body">
            <div style={{textAlign:'left',justifyContent:'center'}}><h3>ID: {gateway.id}</h3></div>
            <div style={{textAlign:'left',justifyContent:'center'}}><h3>NAME: {gateway.name}</h3></div>
            <div style={{textAlign:'left',justifyContent:'center'}}><h3>SERIAL NUMBER: {gateway.serialNumber}</h3></div>
            <div style={{textAlign:'left',justifyContent:'center'}}><h3>IP: {gateway.ipv4}</h3></div>
            <div style={{textAlign:'left',justifyContent:'center'}}><h3>DEVICES:</h3></div>
            <div>
                <Link to={'/device/create/'+gateway.id} className='btn btn-success divbtn'>Add New Device (+)</Link>
            </div>
            
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr>
                        <td>ID</td>
                        <td>UID</td>
                        <td>Vendor</td>
                        <td>Created Date</td>
                        <td>Status</td>
                        <td>Options</td>
                    </tr>
                </thead>
                <tbody>
                    {devices && 
                        devices.map(device=>(
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.uid}</td>
                                <td>{device.vendor}</td>
                                <td>{device.createdDate}</td>
                                <td>{device.status}</td>
                                <td>
                                    <a onClick={()=>{deleteDevice(device.id)}} className="btn btn-danger">Delete</a>
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

export default DetailsGateway