import React, { useState, useEffect } from 'react'
// import firebase from '../config';
import { getDatabase, ref, push, onValue, set, auth } from "firebase/database";
import { firebaseAuth, firebaseAuthWithFire } from '../config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,signOut } from "firebase/auth";
// Initialize Firebase
export const Home = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [dologin, setDoLogin] = useState(false)


    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                const uid = user.id;
                setDoLogin(true)
            } else {
                setDoLogin(false)
            }
        });
    }, [])

    const login = () => {
        signInWithEmailAndPassword(firebaseAuthWithFire, email, password)
            .then((response) => {
                const db = getDatabase();
                set(ref(db, 'users/' + response.user.uid), {
                    displayName: response.user.displayName,
                    email: response.user.email,
                    photoURL: response.user.photoURL
                });
            }).catch(() => {
                alert('err')
            })
    }

    const logout = () =>{
        signOut(firebaseAuthWithFire)
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 content">
                        Comming Soon!
                        <div className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <div className='mb-3 fs-1 fw-bold'>
                                {
                                    dologin ? ('Selamat Datang') : ('Silahkan Login Dahulu')
                                }
                            </div>
                            {
                                dologin ? (
                                    <a className="btn btnAdd" onClick={()=>logout()}>Logout</a>
                                ) : (
                                    <a className="btn btnAdd" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Login</a>
                                )
                            }
                        </div>

                        <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                            tabndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-dark fs-1 text-center" id="exampleModalToggleLabel">Login</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" placeholder="Email" className="form-control my-3" />
                                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} autoComplete="off" placeholder="Password" className="form-control my-3" />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-success" style={{ border: '0px solid green' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                            data-bs-dismiss="modal" onClick={() => login()}>Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
