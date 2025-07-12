import React from 'react';
import { Link } from 'react-router-dom';
import callIcon from '/images/icon/call.gif';

const addressData = {
    address1: 'Paragpur Road Near Sunsine School Nichlaul Maharajganj.',
    address2: 'Main Market Road ,Behind of pakli Mandi Thoothibari Maharajganj.',
    phoneNumbers: [
        { name: 'Mr. Ajay Tiwari', number: '9918151032' },
        { name: 'Santosh Singh Chauhan', number: '7398889347' },
        { name: 'Manjesh Vishwakarma', number: '9621444858' },
        { name: 'Hridesh Bharati', number: '7267995307' },
    ],
};

const quickLinksData = [
    { text: 'Home', link: '/' },
    { text: 'Branch', link: '/branch' },
    { text: 'Nielit Course', link: '/Nielet' },
    { text: 'Diploma Courses', link: '/OurCourses' },
];

const otherLinksData = [
    { text: 'Certification', link: '/Download-Certificate' },
    { text: 'New Admission', link: '/AdmissionForm' },
    { text: 'Enquire', link: '/Contact-us' },
    { text: 'Term & Conditions', link: '/Discription' },
];

const newsUpdatesData = [
    'Free CCC with 1-Year+ Course Enrollment!',
    'Assignments in Every Module',
    'Project-Based Classes Included',
];

const whatsappLink = "https://wa.me/919918151032?text=Hello!%20Mr.%20Ajay%20Tiwari*";

const links = [
    {
        to: whatsappLink,
        iconClass: 'bi-whatsapp',
        backgroundColor: '#19960e',
        title: 'WhatsApp Share'
    },
    {
        to: '#',
        iconClass: 'bi-youtube',
        backgroundColor: 'red',
        title: 'YouTube'
    },
    {
        to: 'https://www.facebook.com/DrishteeInstituteOfComputerTechnology?mibextid=ZbWKwL',
        iconClass: 'bi-facebook',
        backgroundColor: 'blue',
        title: 'Go to Facebook Page'
    }
];

function Footer() {
    return (
        <footer className="text-white text-lg-start pb-2 pt-5 m-0" id="MyFooterColor"
            style={{ background: 'var(--cardHeadColorDark)' }}>
            <div className="container-fluid border-bottom bg-transparent">
                <div className="row">
                    {/* Address Section */}
                    <div className="col-md-4 mb-2 mb-md-0 p-0">
                        <b className="ms-1" style={{ color: 'orange' }}>
                            <i className="bi bi-geo-alt-fill text-white"></i> ADDRESS
                        </b>
                        <hr className="m-0 p-0" />
                        <table className="table mytable table-striped-columns mt-1">
                            <tbody>
                                <tr>
                                    <td>
                                        <i className="bi bi-geo-alt-fill text-danger"></i> {addressData.address1}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <i className="bi bi-geo-alt-fill text-danger"></i> {addressData.address2}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="d-flex flex-wrap">
                                            {addressData.phoneNumbers.map((phone, index) => (
                                                <div key={index} className="d-inline-flex align-items-center mb-2 me-4">
                                                    <img src={callIcon} alt="Call" />
                                                    <span className="ms-2" title={phone.name}>+91 {phone.number}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-4 mb-2 mb-md-0">
                        <b style={{ color: 'orange' }}>
                            <i className="bi bi-link text-white"></i> QUICK LINKS
                        </b>
                        <hr className="m-0 p-0" />
                        <div className="row">
                            <div className="col-6">
                                <table className="table text-white table-striped-columns mt-1 footer-table">
                                    <tbody>
                                        {quickLinksData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={item.link} className="nav-link icon-link icon-link-hover">
                                                        <i className="bi bi-arrow-right-short"></i> {item.text}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-6">
                                <table className="table text-white table-striped-columns mt-1 footer-table">
                                    <tbody>
                                        {otherLinksData.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Link to={item.link} className="nav-link icon-link icon-link-hover">
                                                        <i className="bi bi-arrow-right-short"></i> {item.text}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* News & Social */}
                    <div className="col-md-4 mb-4 mb-md-0">
                        <b style={{ color: 'orange' }}>
                            <i className="bi bi-newspaper text-white"></i> NEWS & UPDATES
                        </b>
                        <hr className="m-0 p-0" />
                        <table className="table text-white table-striped-columns mt-1 footer-table">
                            <tbody>
                                {newsUpdatesData.map((update, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link className="nav-link icon-link icon-link-hover">
                                                <i className="bi bi-arrow-right-short"></i> {update}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="d-flex justify-content-evenly">
                                        {links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.to}
                                                className="nav-link"
                                                title={link.title}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i
                                                    className={`bi ${link.iconClass} fs-4 text-white px-2 py-1`}
                                                    style={{
                                                        backgroundColor: link.backgroundColor,
                                                        borderRadius: '5px'
                                                    }}
                                                ></i>
                                            </a>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="p-3 text-center small" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} id="lastFooter">
                &copy; 2025 DIIT All Rights Reserved | Developed by : DIIT STUDENT{' '}
                <b className="text-warning">Hridesh Bharati & Sushil Kandu</b>
            </div>
        </footer>
    )
}

export default Footer
