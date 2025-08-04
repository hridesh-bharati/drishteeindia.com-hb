import React from 'react';
import CommanCourse from './CommanCourse';

export default function ComputerLanguage() {
    const targetCourses = [
        'C',
        'C++',
        'Java',
        'Python',
        'JavaScript',
        'TypeScript',
        'C#',
        'PHP',
        'Kotlin',
        'Swift',
        'Ruby',
        'Go',
        'R',
        'Dart',
        'Rust',
        'Perl',
        'Scala',
        'Visual Basic'
    ];

    const CTitle = 'Programming Language';

    return (
        <div className='MT3'>
            <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
        </div>
    );
}
