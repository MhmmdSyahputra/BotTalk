import React, { useState, useEffect } from 'react'
import { getDatabase, ref, push, onValue } from "firebase/database";
import firebase from '../config';
import parse from 'html-react-parser';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// 


export const DetailNote = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [getidnote, setGetidNote] = useState(params.id)
    const [datanote, setDataNote] = useState([])
    const [isupdate, setIsupdate] = useState(false)

    

    const [title, setTitle] = useState()
    const [content, setContent] = useState()

    //   read all cht
    useEffect(() => {
        const db = getDatabase();
        onValue(ref(db, 'my-note'), (snapshot) => {
            const data = snapshot.val()
            setDataNote(data)
        })
    }, []);


    const createData = () => {
        const db = getDatabase();

        push(ref(db, 'my-note'), {
            title: title,
            content: content
        }).then(() => {
            toast.success("Data Berhasil Ditambah ", {
                position: "top|right",
                margin: 15,
                delay: 0,
                duration: 2000,
            })
            navigate("/Note/");
        });

    }

    const detailNote = (id) => {
        navigate("/DetailNote/" + id);
    }


    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-7 content">
                            <div className="row content2 p-3" style={{ height: '80vh' }}>
                                {
                                    getidnote ? (
                                        datanote && Object.entries(datanote)
                                            .filter(([key, data]) => key == getidnote)
                                            .map(([key, data]) => (
                                                isupdate ? (
                                                    <div className="col-md-12 my-4 p-4 body-link text-start" >
                                                        <div className="row">
                                                            <div className="col">
                                                                <button className='btn' onClick={() => setIsupdate(() => false)} style={{ border: '2px solid red' }}>batal</button>
                                                            </div>
                                                            <div className="col text-end">
                                                                <button className='btn'>Update</button>
                                                            </div>
                                                        </div>

                                                        <h2 className='fs-3 sticky-xl-top p-3 mx-0' style={{ backgroundColor: '#181C23', top: '-20px' }}>
                                                            <input type="text" value={data.title} autoComplete="off" placeholder="Nama" className="form-control my-3" />
                                                        </h2>
                                                        <p>
                                                            <CKEditor
                                                                content={data.content}
                                                                events={{
                                                                    "change": (e) => setContent(e.editor.getData())
                                                                }}
                                                            />
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="col-md-12 my-4 p-4 body-link text-start" key={key}>
                                                        <h2 className='fs-3 sticky-xl-top p-3 mx-0' style={{ backgroundColor: '#181C23', top: '-20px' }}>
                                                            {data.title} |
                                                            <i className="thisIcon mx-2 fa-solid fs-6 text-warning fa-pen-to-square" onClick={() => setIsupdate(() => true)}></i>
                                                        </h2>
                                                        <p>
                                                            {parse(data.content)}
                                                        </p>
                                                    </div>
                                                )
                                            ))
                                    )
                                        :
                                        (

                                            <div className="col-md-12 my-4 p-4 body-link text-start" >
                                                <div className="row">
                                                    <div className="col">
                                                        <Link to='/Note' className='btn' style={{ border: '2px solid red' }}>batal</Link>

                                                    </div>
                                                    <div className="col text-end">
                                                        <button className='btn' onClick={() => createData()}>Simpan</button>
                                                    </div>
                                                </div>
                                                <h2 className='fs-3 sticky-xl-top p-3 mx-0' style={{ backgroundColor: '#181C23', top: '-20px' }}>
                                                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} autoComplete="off" placeholder="Nama" className="form-control my-3" />
                                                </h2>
                                                <p>
                                                    <CKEditor
                                                        content={content}
                                                        events={{
                                                            "change": (e) => setContent(e.editor.getData())
                                                        }}
                                                    />
                                                </p>
                                            </div>


                                        )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
