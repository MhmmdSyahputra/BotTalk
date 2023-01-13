import React, { useState, useEffect } from 'react'
// import firebase from '../config';
import { getDatabase, ref, query, orderByChild, push, onValue, set, auth, } from "firebase/database";
import { firebaseAuth, firebaseAuthWithFire } from '../config';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toast from 'siiimple-toast';
import { signInWithGoogle } from '../config';
import GoogleButton from 'react-google-button'
import 'siiimple-toast/dist/style.css';// st
import { ChtGroup } from '../components/ChtGroup';

export const Home = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [dologin, setDoLogin] = useState(false)
    const [uid, setUid] = useState(false)

    const [namegroup, setNameGroup] = useState('')
    const [datagroup, setDataGroup] = useState('')


    const loginWithGoogle = () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                // const db = getDatabase();
                // push(ref(db, 'users'), {
                //     uid: res.uid,
                //     displayName: res.displayName,
                //     email: res.email,
                //     photoURL: res.photoURL
                // });
            }).catch((err) => {
                console.log(err);
            })
    }


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

                    const db = getDatabase();
                    // push(ref(db, 'users'), {
                    //     uid: user.uid,
                    //     displayName: user.displayName,
                    //     email: user.email,
                    //     photoURL: user.photoURL
                    // });

                const userData = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }

                const auth = getAuth();

                // onValue(ref(db, "users").orderByChild(user.uid), (snapshot) => {
                //     const data = snapshot.val();
                //     console.log(data);
                // });
                // const db = getDatabase();
                // onValue(ref(db, "users"), (snapshot) => {
                //     const data = snapshot.val();
                //     if (!data || data.uid !== user.uid) {
                //         // push(ref(db, 'users'), {
                //         //     uid: user.uid,
                //         //     displayName: user.displayName,
                //         //     email: user.email,
                //         //     photoURL: user.photoURL
                //         // });
                //         console.log('blm ada');
                //         return
                //     }else {
                //         console.log("Data user sudah tersimpan di Firebase Realtime Database");
                //     }
                // });

                setDoLogin(true)
                window.localStorage.setItem("dataUser", JSON.stringify(userData))
            } else {
                setDoLogin(false)
            }
        });
    }, [])


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
                        <div className="text-center">
                            <div className='mb-3 fs-1 fw-bold'>
                                {
                                    dologin ? (
                                        <div>
                                            <div className="text-end">
                                                <button className='btn btnAdd my-4' data-bs-toggle="modal" href="#creategroup" role="button" style={{ minWidth: '150px' }}>Buat Group</button>

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
                                                            <ChtGroup key={key} data={data} id={key} />
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
                                    <div>
                                        {/* <a className="btn btnAdd" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Login</a> */}
                                        <div className="d-flex justify-content-center mb-5">
                                            <GoogleButton
                                                label='Sign In With Google'
                                                onClick={() => loginWithGoogle()}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
