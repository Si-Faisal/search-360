import React, { useState } from 'react';
import useClasses from '../../../Hooks/useClasses';
import { useEffect } from 'react';

const InstractorsInfo = () => {
    const [instructors, setInstructors] = useState([]);
    const [instructorClassCounts, setInstructorClassCounts] = useState({});
    const [instructorClasses, setInstructorClasses] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/classes');
                if (!response.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const data = await response.json();
                const approvedClass = data.filter((item) => item.status === 'approved');

                const classCounts = {};
                const classesByInstructor = {};

                approvedClass.forEach(info => {
                    const email = info.instractoremail;
                    classCounts[email] = (classCounts[email] || 0) + 1;
                    classesByInstructor[email] = classesByInstructor[email] || [];
                    classesByInstructor[email].push(info.classname);
                });

                setInstructorClassCounts(classCounts);
                setInstructorClasses(classesByInstructor);

                const uniqueInstructors = [];
                approvedClass.forEach(info => {
                    const exist = uniqueInstructors.find(data => data.instractoremail === info.instractoremail);
                    if (!exist) {
                        uniqueInstructors.push(info);
                    }
                });

                setInstructors(uniqueInstructors);
                setIsLoading(false); 
            } catch (error) {
                setError(error.message);
                setIsLoading(false); 
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }



    return (
        <div className='grid grid-cols-2 w-full '>
            {
                instructors.map(ins => <div key={ins._id} className="card mr-4 mb-6 text-center glass">
                    <figure><img className='h-72' src={ins.instractorimage} alt="car!" /></figure>
                    <div className="card-body text-left">
                        <h2 className="card-title uppercase">{ins.instractorname}</h2>
                        <p>Email: {ins.instractoremail}</p>
                        <h2 className="card-title text-success">Number of class: <span className='text-2xl text-red-700'>{instructorClassCounts[ins.instractoremail]}</span> </h2>
                        <h3 className='font-bold text-xl text-success'>Name of Classes:</h3>
                        <ol className='text-left text-slate-800'>
                            {instructorClasses[ins.instractoremail].map((className, index) => (
                                <li key={index}>{index +1 } . {className}</li>
                            ))}
                        </ol>
                        
                    </div>
                </div>)
            }
        </div>
        
    );
};

export default InstractorsInfo;