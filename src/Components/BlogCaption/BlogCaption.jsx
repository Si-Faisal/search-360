import React from 'react';

const BlogCaption = ({h1,p}) => {
    return (
        <div className='w-1/3 mx-auto py-8 mt-10 text-center border-primary bg-slate-300 border-0 border-s-8'>
            <h1 className='text-3xl font-bold mb-6'>{h1}</h1>
            <p>{ p}</p>
        </div>
    );
};

export default BlogCaption;