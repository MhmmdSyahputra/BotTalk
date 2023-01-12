import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, push, onValue, set, auth } from "firebase/database";


export const ChtGroup = ({ data, id }) => {
    const [lastmessage, setLastmessage] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        const db = getDatabase();
        onValue(ref(db, `group-cht/${id}/pesan`), (snapshot) => {
            const data = snapshot.val();
            setLastmessage(data);
        });

    }, [])


    const goCht = (id) => {
        navigate(`/Chat/${id}`)
    }
    return (
        <>
            <div className="col-md-12 my-2 pb-4 px-4 p-3 text-start" onClick={() => goCht(id)} style={{ maxHeight: '20%', minHeight: '15%', backgroundColor: '#181C20' }}>
                <h2 className='fs-5 mx-4'>
                    <div className='fw-bold'>{data.namagroup}</div>
                    {
                        lastmessage &&
                        Object.entries(lastmessage)
                        
                            .map(([key, data]) => (
                                <div className='fs-6 mt-2'>{data.cht}</div>
                            ))
                            .reverse()
                            .slice(0, 1)

                    }
                </h2>
            </div>
        </>
    )
}
