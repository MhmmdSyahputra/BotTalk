import React from 'react'
import { useNavigate } from 'react-router-dom';


export const ChtGroup = ({data,id}) => {
    const navigate = useNavigate()
    const goCht = (id) =>{
        navigate(`/Chat/${id}`)
    }
    return (
        <>
            <div className="col-md-12 my-2 pb-4 px-4 p-3 text-start" onClick={() => goCht(id)} style={{ maxHeight: '20%', minHeight: '15%', backgroundColor: '#181C20' }}>
                <h2 className='fs-5 mx-4'>
                    {data.namagroup}
                    <div className='fs-6 mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, totam?</div>
                </h2>
            </div>
        </>
    )
}
