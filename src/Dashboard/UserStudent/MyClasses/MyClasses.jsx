import React from 'react';
import useEnroll from '../../../Hooks/useEnroll';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';

const MyClasses = () => {
    const [myclass, setMyclass] = useState([]);

    const { user } = useContext(AuthContext); 
    const [enrollrefetch, enrollLoading, isEnroll] = useEnroll();

    console.log(isEnroll)

    useEffect(() => {
        isEnroll.map(data => {
            if (data.data.userEmail === user ?.email) {
                const enrollclass = isEnroll.filter(dt => dt.data.userEmail === user.email);
                console.log(enrollclass);
                setMyclass(enrollclass);
            }
        })
    }, [isEnroll])
    return (
        <div>
            <h2>My Total classes is : {myclass.length}</h2>
            <div className='grid grid-col-1 gap-10 mt-8'> 
                {
                    myclass.map(info => <div key={info._id} className="card card-side bg-base-100 shadow-xl">
                        <figure><img src={info.data.image } alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl ">{ info.data.classname}</h2>
                            <p className='text-lg text-red-700'>Instractor Name: <span className='text-primary font-bold'> {info.data.instractorname}</span>  </p>
                            <div className='flex gap-3 items-center justify-center text-center'>
                               
                               
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">continue Class</button>
                            </div>
                        </div>
                    </div>)
                }
                
            </div>
        </div>
    );
};

export default MyClasses;