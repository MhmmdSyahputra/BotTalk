import React, { useState, useEffect } from 'react'
import { getDatabase, ref, push, onValue, set, auth } from "firebase/database";
import { firebaseAuth, firebaseAuthWithFire } from '../config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useParams } from 'react-router-dom';

export const DetailCht = () => {
    const params = useParams();
    const id = params.id
    const [newmessage, setNewmessage] = useState('')
    const [allmessage, setAllmessage] = useState()
    const dataUser = JSON.parse(window.localStorage.getItem("dataUser"))

    //   read all cht
    useEffect(() => {
        const db = getDatabase();
        onValue(ref(db, `group-cht/${id}/pesan`), (snapshot) => {
            const data = snapshot.val();
            setAllmessage(data);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        const db = getDatabase();
        push(ref(db, `group-cht/${id}/pesan/`), {
            uid: dataUser.uid,
            name: dataUser.displayName,
            cht: newmessage,
        });
        setNewmessage('')
    }
    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 content">
                        <div className="row content2 p-3" style={{ height: '85vh' }}>
                            <div className="col-md-12 my-4 p-4 ">
                                {
                                    allmessage &&
                                    Object.entries(allmessage)  
                                        .map(([key, data]) => (
                                            <div>
                                                <div className={`row ${data.uid == dataUser.uid ? 'd-flex justify-content-end' : ''} `}>
                                                    <div className={`col-md-12 my-3 p-2 ${data.uid == dataUser.uid ? 'text-end' : 'text-start'} `}
                                                        style={{
                                                            borderRight: data.uid == dataUser.uid ? '2px solid #FFA500' : 'none',
                                                            borderLeft: data.uid != dataUser.uid ? '2px solid #FFA500' : 'none',
                                                            maxWidth: '50vh'
                                                        }}>
                                                        <div className='pb-3 fw-bold'>
                                                            {data.name}
                                                        </div>
                                                        <div>
                                                            {data.cht}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                }


                            </div>
                        </div>

                        <div className="form-inline">
                            <form onSubmit={sendMessage}>
                                <div className="input-group mb-3">
                                    <input type="text" onChange={e => setNewmessage(e.target.value)} value={newmessage} autoComplete="off" className="form-control" placeholder="Pesan.." />
                                    <button type='submit' className='btn'>Kirim</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
