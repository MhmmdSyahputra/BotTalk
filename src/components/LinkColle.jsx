import React,{useState} from 'react'
import firebase from '../config';
import { getDatabase, ref, push,update, onValue,remove } from "firebase/database";
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// st

export const LinkColle = ({ data,id }) => {

  const [namelink, setName] = useState(data.name)
  const [link, setLink] = useState(data.link)
  
  const deleteRow = (id) => {
    const db = getDatabase();
    remove(ref(db,'/my-link/' + id));
  }

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    toast.success("Link Disalin ", {
      position: "top|right",
      margin: 15,
      delay: 0,
      duration: 2000,
    })
  }

  const updateData = () => {
    const db = getDatabase();
    update(ref(db, 'my-link/'+ id), {
      name: namelink,
      link: link
    });

  }

  return (
    <>
      <div className="col-md-12 my-4 p-4 body-link text-start" style={{maxHeight:'35%'}}>
        <h2 className='fs-3'>
          {data.name}
          <i className="thisIcon mx-2 fa-solid fs-6 text-danger fa-trash-can" onClick={() => deleteRow(id)}></i>| 
          <i className="thisIcon mx-2 fa-solid fs-6  text-warning fa-pen-to-square" data-bs-toggle="modal" href="#modaledit" role="button"></i>

          <div className="modal fade" id="modaledit" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                tabndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fs-1 text-dark" id="exampleModalToggleLabel">Edit Data</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <input type="text" onChange={e => setName(e.target.value)} value={namelink} autoComplete="off" placeholder="Nama" className="form-control my-3" />
                      <input type="text" onChange={e => setLink(e.target.value)} value={link} autoComplete="off" placeholder="Link" className="form-control my-3" />
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-warning text-dark" style={{border:'0px solid green'}} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                        data-bs-dismiss="modal" onClick={() => updateData()}>Update</button>
                    </div>
                  </div>
                </div>
              </div>
        </h2>
        <div>
          <a href={data.link} target="_blank" className='btn mx-2'>Go</a>
          <button onClick={()=>copyLink(data.link)} className='btn mx-2'>Copy</button>
        </div>
      </div>
    </>
  )
}
