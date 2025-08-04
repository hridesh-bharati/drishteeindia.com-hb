import React from 'react';
import CommanCourse from './CommanCourse';

export default function WebDev() {
  const targetCourses = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'ReactJS',
    'Angular',
    'AngularJS',
    'VueJS',
    'NextJS',
    'NodeJS',
    'ExpressJS',
    'PHP',
    'Laravel',
    'Python',
    'Django',
    'Flask',
    'ASP.NET',
    'Ruby on Rails',
    'Spring Boot',
    'jQuery',
    'Bootstrap',
    'Tailwind CSS'
  ];

  const CTitle = 'Web Development';

  return (
    <div className='MT3'>
      <CommanCourse targetCourses={targetCourses} CTitle={CTitle} />
    </div>
  );
}
