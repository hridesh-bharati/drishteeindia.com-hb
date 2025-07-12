import React from 'react';
import CommanCourse from './CommanCourse';

export default function Nielit() {
    const targetCourses = ['CCC', 'O LEVEL', 'A LEVEL', 'B LEVEL'];
    const CTitle = 'NIELIT';

    return (
        <div className="MT3">
            <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
        </div>
    );
}
