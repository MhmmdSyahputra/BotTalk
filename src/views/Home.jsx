import React, { useState, useEffect } from 'react'
// import firebase from '../config';
import { getDatabase, ref, push, onValue, set, auth } from "firebase/database";
import { firebaseAuth, firebaseAuthWithFire } from '../config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from 'siiimple-toast';
import 'siiimple-toast/dist/style.css';// st
import { ChtGroup } from '../components/ChtGroup';
export const Home = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [dologin, setDoLogin] = useState(false)
    const [uid, setUid] = useState(false)

    const [namegroup, setNameGroup] = useState('')
    const [datagroup, setDataGroup] = useState('')


     //   read all cht
  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, "group-cht"), (snapshot) => {
      const data = snapshot.val();
      setDataGroup(data);
    //   setLoading(false);
    });
  }, []);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUid(user.uid);
                setDoLogin(true)
                window.localStorage.setItem("uid",user.uid)   
            } else {
                setDoLogin(false)
            }
        });
    }, [])

    const login = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(firebaseAuthWithFire, email, password)
            .then((response) => {
                const db = getDatabase();
                set(ref(db, 'users/' + response.user.uid), {
                    displayName: response.user.displayName,
                    email: response.user.email,
                    photoURL: response.user.photoURL
                });
                setEmail('')
                setPassword('')
            }).catch(() => {
                toast.alert("Gagal! Email / Password Salah", {
                    position: "top|right",
                    margin: 15,
                    delay: 0,
                    duration: 2000,
                })
                setEmail('')
                setPassword('')
            })
    }

    const logout = () => {
        signOut(firebaseAuthWithFire)
    }
    const CreateGroup = (event) => {
        event.preventDefault();

        const db = getDatabase();
        push(ref(db, 'group-cht'), {
            namagroup: namegroup,
        });

        setNameGroup('')


    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 content">
                        Comming Soon!


                        <div className="text-center">
                            <div className='mb-3 fs-1 fw-bold'>
                                {
                                    dologin ? (
                                        <div>
                                            <div className="text-end">
                                                <button className='btn btnAdd mb-5' data-bs-toggle="modal" href="#creategroup" role="button" style={{ minWidth: '150px' }}>Buat Group</button>

                                                <div className="modal fade" id="creategroup" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
                                                    tabndex="-1">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title text-dark fs-1 text-center" id="exampleModalToggleLabel">Create New Group</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <form onSubmit={CreateGroup}>
                                                                <div className="modal-body">
                                                                    <input type="text" onChange={e => setNameGroup(e.target.value)} value={namegroup} autoComplete="off" placeholder="Nama Group" className="form-control my-3" />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn btn-success" style={{ border: '0px solid green' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                                                        data-bs-dismiss="modal" type='submit'>Create</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="fs-4 text-start mx-3">Friends</div>
                                            <div className="row">
                                                {
                                                    datagroup &&
                                                    Object.entries(datagroup)
                                                      .reverse()
                                                      .map(([key, data]) => (
                                                        <ChtGroup key={key} data={data} id={key}/>
                                                      ))
                                                  
                                                }
                                                
                                            </div>

                                        </div>
                                    ) : ('Silahkan Login Dahulu')
                                }
                            </div>
                            {
                                dologin ? (
                                    <a className="btn btnAdd" onClick={() => logout()}>Logout</a>
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
                                    <form onSubmit={login}>
                                        <div className="modal-body">
                                            <input type="text" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" placeholder="Email" className="form-control my-3" />
                                            <input type="password" onChange={e => setPassword(e.target.value)} value={password} autoComplete="off" placeholder="Password" className="form-control my-3" />
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-success" style={{ border: '0px solid green' }} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
                                                data-bs-dismiss="modal" type='submit'>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
