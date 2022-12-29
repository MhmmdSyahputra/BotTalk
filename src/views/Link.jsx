import React, { useState, useEffect } from 'react'
import { getDatabase, ref, push, onValue } from "firebase/database";
import firebase from '../config';
// import {firebase} from 'firebase'
import { LinkColle } from '../components/LinkColle';

export const MyLink = () => {

  const [datalink, setDatalink] = useState([])

  const [namelink, setName] = useState()
  const [link, setLink] = useState()

  // read all cht
  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, 'my-link'), (snapshot) => {
      // setDatalink([]);
      const data = snapshot.val()

      setDatalink(data)
      // if (data !== null) {
      //   Object.values(data).map((alldata) => {
      //     setDatalink((olddata) => [...olddata, alldata]);
      //   });
      // }
    })
  }, []);


  const createData = () =>{
    const db = getDatabase();
    // let data = {
    //   name: name,
    //   link: link
    // };
    // db.ref('my-link').push(data);

    push(ref(db, 'my-link'), {
      name: namelink,
      link: link 
    });

    setName('')
    setLink('')

  }


  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 content">
              <div className='m-3'>
                <div className="text-end me-5">
                  <a className="btn btnAdd" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Add Data</a>
                </div>

                <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                  tabndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalToggleLabel">Tambah Data Baru</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <input type="text" onChange={e => setName(e.target.value)} value={namelink} autoComplete="off" placeholder="Nama" className="form-control my-3" />
                          <input type="text" onChange={e => setLink(e.target.value)} value={link} autoComplete="off" placeholder="Link" className="form-control my-3" />
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                              data-bs-dismiss="modal" onClick={()=> createData()}>Save</button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row content2 p-3">
                  {
                    datalink && Object.entries(datalink).reverse().map(([key, data]) => (
                      <LinkColle data={data} key={key} id={key} />
                    ))
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      )
}
