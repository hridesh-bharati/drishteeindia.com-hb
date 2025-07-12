import StudentFooter from './StudentFooter';
import Default from './Default';
import Exam from './Exam'
import {Routes, Route} from 'react-router-dom'
export default function StudentHomePage() {
    return (
        <div>
            <Routes>
                <Route path = "/" element={<Default/>}></Route>
                <Route path='Exam' element = {<Exam/>}></Route>
            </Routes>
            <StudentFooter />
        </div>
    )
}
