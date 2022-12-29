import React from 'react'
import firebase from '../config';
import { getDatabase, ref, push, onValue,remove } from "firebase/database";
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// st

export const LinkColle = ({ data,id }) => {
  
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

  return (
    <>
      <div className="col-md-12 my-4 p-4 body-link text-start">
        <h2 className='fs-3'>
          {data.name}
          <i className="thisIcon mx-2 fa-solid fs-6 text-danger fa-trash-can" onClick={() => deleteRow(id)}></i>| 
          <i className="thisIcon mx-2 fa-solid fs-6  text-warning fa-pen-to-square" data-bs-toggle="modal" href="#exampleModalToggle" role="button"></i>
        </h2>
        <div>
          <a href={data.link} target="_blank" className='btn mx-2'>Go</a>
          <button onClick={()=>copyLink(data.link)} className='btn mx-2'>Copy</button>
        </div>
      </div>
    </>
  )
}
