import React from 'react';
const TimeTable = () => (
    <div className="col-md-6 my-1 p-0 px-lg-1 px-md-0">
        <div className="cardBoxShadow" id='timeTable'>
            <div className="card-header h4 p-2 text-white text-uppercase text-start" style={{ background: 'var(--cardHeadColor)' }}>
                <div data-aos="fade-right" data-aos-duration="500"><i className="fa fa-line-chart text-warning"></i> Opening hours </div>
            </div>
            <div className="card-body cardBoxShadow p-2" >
                <table className="table table-hover border-opacity-10 smallText">
                    <tbody className="fw-normal text-start">
                        {days.map(day => (
                            <tr key={day}>
                                <td className="transparentTableData text-secondary">{day} :</td>
                                <td className="transparentTableData text-secondary">{day === 'Sunday' ? 'Closed' : '07am - 07pm'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default TimeTable;
