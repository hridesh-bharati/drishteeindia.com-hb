import React from 'react';
import CommanCourse from './CommanCourse';

export default function Banking() {
    const targetCourses = ['cca', 'cac'];
    const CTitle = 'Computer certificate course';

    return (
        <div className="MT3">
            <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
        </div>
    );
}
