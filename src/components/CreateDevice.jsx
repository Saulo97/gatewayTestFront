import React, {useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function CreateDevice() {
    const {gatewayid} = useParams()
    const navigate = useNavigate()
    const [uid, changeUID] = useState("")
    const [vendor, changeVendor] = useState("")
    const [status, changeStatus] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault()
        const device={uid,vendor,status}
        const url = import.meta.env.VITE_BACKEND_URL
        fetch(url+"/addDeviceToGateway/"+gatewayid,{
            method: "POST",
            headers: {"content-type":"application/json"},
            body:JSON.stringify(device)
        }).then((res)=>{
            if(res.ok != true){
                res.json().then(val=>{
                    if(val.error){
                        alert("Error:"+val.error)
                    }else if(val.uid){
                        alert("UID:"+val.uid)
                    }
                })
            }else{
                res.json().then(alert("Device guardado correctamente"))
                navigate("/gateway/details/"+gatewayid)
            }
        }
        ).catch((err)=>{
            console.error(err)
        })
    }
  return (
    <div className='row'>
        <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-title">
                        <h2>Gateway Create</h2>
                    </div>

                    <div className="card-body" style={{"textAlign":"left"}}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>UID</label>
                                    <input required value={uid} onChange={e=>changeUID(e.target.value)} type='text' className='form-control'/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Vendor</label>
                                        <input required value={vendor} onChange={e=>changeVendor(e.target.value)} type='text' className='form-control'/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                    <label>Status</label>
                                            <select defaultValue={status}className="form-select" aria-label="status" onChange={e=>changeStatus(e.target.value)}>
                                            <option>Seleccione una de las siguientes opciones</option>
                                            <option value="ONLINE">ONLINE</option>
                                            <option value="OFFLINE">OFFLINE</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className='btn btn-success' type='submit'>SAVE</button>
                                        <Link to="/" className="btn btn-danger">BACK</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateDevice