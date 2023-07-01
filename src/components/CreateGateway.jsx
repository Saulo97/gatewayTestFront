import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function CreateGateway() {

    const [name, changeName] = useState("")
    const [serialNumber, changeSerialNumber] = useState("")
    const [ipv4, changeIp] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const gateway={name,serialNumber,ipv4}
        const url = import.meta.env.VITE_BACKEND_URL
        fetch(url+"/createGateway",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body:JSON.stringify(gateway)
        }).then((res)=>{
            if(res.ok != true){
                res.json().then(val=>alert(val.error))
            }else{
                res.json().then(alert("valor guardado correctamente"))
                navigate("/")
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
                                    <label>Name</label>
                                    <input required value={name} onChange={e=>changeName(e.target.value)} type='text' className='form-control'/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>IP</label>
                                        <input required value={ipv4} onChange={e=>changeIp(e.target.value)} type='text' className='form-control'/>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Serial Number</label>
                                        <input required value={serialNumber} onChange={e=>changeSerialNumber(e.target.value)} type='text' className='form-control'/>
                                    </div>
                                </div>
                                {/* <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Status</label>
                                            <select class="form-select" aria-label="status">
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                    </div>
                                </div> */}
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

export default CreateGateway