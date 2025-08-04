import React from 'react';
import { Link } from 'react-router-dom';

const cardData = [
    {
        to: '/Contact-us',
        label: 'Enquery Now',
        bgColor: 'bg-warning'
    },
    {
        to: '/AdmissionForm',
        label: 'New Admission',
        bgColor: 'bg-danger'
    },
    {
        to: 'https://student.nielit.gov.in/Home.aspx',
        label: 'CCC Result',
        bgColor: 'bg-primary'
    },
    {
        to: '/Offers',
        label: "What's New Offers..?",
        bgColor: 'bg-voilet'
    },
    {
        to: 'https://student.nielit.gov.in/Home.aspx',
        label: "O Level Result",
        bgColor: 'bg-danger'
    },
    {
        to: '/Gallery',
        label: "Gallary/Images",
        bgColor: 'bg-warning'
    }
];

export default function UseFullCard() {
    return (
        <div className="col-md-4 col-sm-12 mt-4 mt-35  cardEffectsBorder cardEffects">
            <div className="row">
                <div className="container text-center m-0 py-2 h4 fw-bold text-uppercase"
                    style={{ color: 'rgb(255, 255, 255)', background: 'var(--card-bg)' }}>
                    <b style={{ letterSpacing: '1px', color: 'white' }}>
                        Useful Links
                    </b>
                </div>
                {cardData.map((card, index) => (
                    <div key={index} className={`col-xl-6 col-md-6 col-sm-12 my-2 ${index >= 2 ? 'col-md-12' : ''}`}>
                        <Link to={card.to} className="nav-link">
                            <div className={`widget-stat myshadow border card ${card.bgColor} d-flex`}>
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body text-white text-center">
                                            {card.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    );
}
