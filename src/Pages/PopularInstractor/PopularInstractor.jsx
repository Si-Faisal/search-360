



import React, { useState, useEffect } from 'react';
import useEnroll from '../../Hooks/useEnroll';

const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollRefetch, enrollLoading, isEnroll] = useEnroll();
    const [instructorCounts, setInstructorCounts] = useState({});
    const [approvedClasses, setApprovedClasses] = useState([]);

    // console.log(enrollRefetch);
    // console.log(isEnroll);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/classes');
                if (!response.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const data = await response.json();
                const filteredClasses = data.filter((item) => item.status === 'approved');
                setApprovedClasses(filteredClasses);

                // Count the number of enrolled students for each instructor
                const counts = {};
                console.log(counts)
                // console.log(counts)
                
                filteredClasses.forEach((info) => {
                    
                    // console.log(enrollInstractoremail)
                    const email = info?.instractoremail;
                    if (!counts[email]) {
                        counts[email] = 0;
                    }
                    if (isEnroll?.filter((enroll) => enroll?.data?.instractoremail === info?.instractoremail)) {
                       
                        counts[email] +=1;
                    }
                });

                setInstructorCounts(counts);

                // Sort instructors based on the number of enrolled students
                const sortedInstructors = filteredClasses
                    .reduce((uniqueInstructors, info) => {
                        if (!uniqueInstructors.some((instructor) => instructor.instractoremail === info.instractoremail)) {
                            uniqueInstructors.push(info);
                        }
                        return uniqueInstructors;
                    }, [])
                    .sort((a, b) => counts[b.instractoremail] - counts[a.instractoremail])
                    .slice(0, 6);

                setInstructors(sortedInstructors);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
        enrollRefetch();
    }, [isEnroll, isEnroll]);

    if (isLoading) {
        return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    return (
        <div>
            <div className="w-1/2 text-center mx-auto mb-8 mt-6 py-10">
                <h2 className="text-4xl mb-3 font-bold text-success">Popular Instructor</h2>
                <p>They inspire you, and every class they conduct focuses on the students' understanding with humor and engagement.</p>
            </div>
            <div>
                <div className="grid grid-cols-2 w-full gap-6">
                    {instructors.map((ins) => (
                        <div key={ins._id} className="card card-side bg-base-100 shadow-xl">
                            <figure className="w-1/3">
                                <img className="w-full h-full m-0 p-0" src={ins.instractorimage} alt="Movie" />
                            </figure>
                            <div className="card-body text-left ml-3 m-0 p-0">
                                <h2 className="card-title uppercase font-bold text-xl">{ins.instractorname}</h2>
                                <p>Email: {ins.instractoremail}</p>
                                <h3 className="font-bold text-xl text-success"> Enrolled Students: {instructorCounts[ins.instractoremail]}</h3>
                                <h3 className="font-bold text-xl text-success">Name of Classes:</h3>
                                <ol className="text-left text-slate-800">
                                    {approvedClasses
                                        .filter((info) => info.instractoremail === ins.instractoremail)
                                        .map((info,index) => (
                                            <li key={info._id}>{index+1}.{info.classname}</li>
                                        ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularInstructor;


