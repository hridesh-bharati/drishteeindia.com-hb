import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../../HomePage/Marquee';

const notices = [
    { text: "Course certified by Microsoft." },
    { text: "CCC free on ADCA course", imageSrc: "images/icon/gifPic.gif" },
    { text: "Free English Speaking & Personality Development classes", imageSrc: "images/icon/gifPic.gif" },
    { text: "प्रत्येक पाठ्यक्रम के पूरा होने पर नि: शुल्क प्रमाण पत्र।" },
    { text: "GOVT. recognized institute" },
];

const NoticeBoard = () => (
    <div className="col-md-6 my-1 p-0 px-lg-1 px-md-0">
        <div className="cardBoxShadow border-0">
            <style>
                {`
                /* Dark mode for card-header in NoticeBoard */
.dark-mode .card-header[style*="var(--cardHeadColor)"],
.dark-mode .card-header {
  background: #23293a !important;
  color: #ffe066 !important;
  border-bottom: 1px solid #444;
}
.dark-mode .card-header .text-white {
  color: #ffe066 !important;
}
.dark-mode .card-header .text-warning {
  color: #ffe066 !important;
}
                `}
            </style>
            <div className="card-header h4 p-2 text-white text-start"
                style={{ background: 'var(--cardHeadColor)' }}>
                <div data-aos="fade-right">
                    <i className="bi bi-bell-fill text-warning"></i> NOTICE BOARD
                </div>
            </div>
            <div className="fw-normal my-0 py-0 p-2 smallText" id='noticeBg'>
                <Marquee direction="up" scrollamount="3" className='transparentTableData text-secondary' behavior="scroll">
                    {notices.map((notice, index) => (
                        <React.Fragment key={index}>
                            <p>
                                {notice.text}
                                {notice.imageSrc && <img src={notice.imageSrc} className="img-fluid" width="40px" alt="icon" />}
                            </p>
                            <hr width="90%" />
                        </React.Fragment>
                    ))}
                </Marquee>
            </div>
            <Marquee className="py-0 my-0" behavior="scroll" direction="left">
                <Link to="/Download-Certificate" className="blink smallText">
                    <b>अपनी प्रमाणपत्र की स्थिति जानने के लिए क्लिक करें</b>
                </Link>
            </Marquee>
        </div>
    </div>
);

export default NoticeBoard;
