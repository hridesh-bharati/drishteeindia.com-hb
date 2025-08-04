import React from 'react';
import CommanCourse from './CommanCourse';

export default function Designing() {
    const targetCourses = ['DTP']; 
       const CTitle = 'Desingn'
    return (
        <div className='MT3'>
            <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
        </div>
    );
}
