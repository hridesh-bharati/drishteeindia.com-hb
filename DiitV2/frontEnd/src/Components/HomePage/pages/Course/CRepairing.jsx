import React from 'react';
import CommanCourse from './CommanCourse';

export default function CRepairing() {
    const targetCourses = ['CHN'];
    const CTitle = 'Computer Reparing'
    return (
        <div className='MT3'>
            <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
        </div>
    );
}
