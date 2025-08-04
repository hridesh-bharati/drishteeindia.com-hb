import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCourses } from '../../store/reduxStore/student/studentSlice';
import '../../App.css';
import "./FullScreenNav.css"
import { getCourseList, loginAdmin, sendOtpForRPsd as sendOtpForRPsdAdmin, verifyOtpAndUpdatePsd as verifyOtpAndUpdatePsdAdmin } from '../../api/adminApi/api';
import { loginStudent, sendOtpForRPsd as sendOtpForRspStudent, verifyOtpAndUpdatePsd as verifyOtpAndUpdatePsdStudent } from '../../api/studentApi/api';
import DarkMode from '../HelperCmp/Darkmode/DarkMode';
import Fullscreen from './FullScreen';
import RouteLinks from '../GlobleSearch/RouteLinks';
import GlobleSearchBox from '../GlobleSearch/GlobleSearchBox';
import HeaderProgressBar from './HeaderProgressBar';
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [regNum, setRegNum] = useState('');
  const [time, setTime] = useState(120);
  const [fEmail, setFEmail] = useState('');
  const [nPsd, setNPsd] = useState('');
  const [tOtp, setTOtp] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [EnabledSendOtpBtn, setEnabledSendOtpBtn] = useState(true);
  const [otpStatus, setOtpStatus] = useState(false);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [islogin, setIslogin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isForgotView, setIsForgotView] = useState(false);

  const startCountDown = () => {
    let countdown = 120;
    setTime(countdown);
    setEnabledSendOtpBtn(false);
    const interval = setInterval(() => {
      countdown--;
      setTime(countdown);
      if (countdown <= 0) {
        clearInterval(interval);
        setEnabledSendOtpBtn(true);
        setOtpStatus(false);
        setTime(120);
      }
    }, 1000);
  };

  const fetchCourses = async () => {
    try {
      const rspns = await getCourseList();
      if (rspns.ackbool === 1) {
        dispatch(setCourses(rspns.message));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    }
  };

  const fetchLogin = async (func) => {
    const id = isAdmin ? email : regNum;
    if (id && password) {
      try {
        const rspns = await func(id, password);
        if (rspns.ackbool === 1) {
          const tokenKey = isAdmin ? 'aToken' : 'sToken';
          localStorage.setItem(tokenKey, rspns.token);
          document.getElementById('loginOffcanvasCloseBtn')?.click();
          const redirectPath =
            location.state?.from?.pathname || (isAdmin ? '/Admin-Pannel' : '/Student-Portal');
          toast.success('Logged In');
          navigate(redirectPath, { replace: true }); // ✅ smart redirection
          window.location.reload();
        } else {
          toast.error(rspns.message || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Login failed');
      }
    } else {
      toast.error('Please fill all required fields');
    }
  };


  const sendOtpHandler = async (func) => {
    if (!fEmail) return toast.error('Please enter your email');
    try {
      const rspns = await func(fEmail);
      if (rspns.ackbool === 1) {
        toast.success(rspns.message);
        setOtpStatus(true);
        startCountDown();
      } else {
        toast.error(rspns.message || 'Failed to send OTP');
        setEnabledSendOtpBtn(true);
      }
    } catch (error) {
      console.error('OTP error:', error);
      toast.error('Failed to send OTP');
      setEnabledSendOtpBtn(true);
    }
  };

  const updatePsd = async (func) => {
    if (!fEmail || !tOtp || !nPsd) return toast.error('Fill all fields');
    try {
      const rspns = await func(fEmail, tOtp, nPsd);
      if (rspns.ackbool === 1) {
        toast.success(rspns.message);
        setOtpStatus(false);
        setEnabledSendOtpBtn(true);
        setFEmail('');
        setTOtp('');
        setNPsd('');
      } else {
        toast.error(rspns.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password');
    }
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setIslogin(!islogin);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
  }, []);

  const toggleDarkMode = DarkMode(isDarkMode, setIsDarkMode, { autoDetect: true });

  const handleToggle = () => toggleDarkMode();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=Header';
    document.body.appendChild(script);
    window.Header = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'af,sq,am,bho,ar,hy,az,eu,be,bn,bs,bg,my,ca,ceb,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,he,hi,hmn,hu,is,ig,id,ga,it,ja,jw,kn,kk,km,rw,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu'
      }, 'ChangerLang');
      setIsLanguageLoaded(true);
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const courses = [
    { path: "/OurCourses", name: "All Computer Course" },
    { path: "/Certificate", name: "Computer Certificate" },
    { path: "/ComputerLanguage", name: "Computer Language" },
    { path: "/Designing", name: "Graphics Design" },
    { path: "/WebDev", name: "Web Development" },
    { path: "/CRepairing", name: "Computer Repairing" },
    { path: "/Nielet", name: "NIELIT Courses" },
    { path: "/Banking", name: "Banking Course" }
  ];

  const studentZoneItems = [
    { path: "/AdmissionForm", name: "New Admission" },
    { path: "/Download-Certificate", name: "Download Certificate" }
  ];
  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      const nav = document.getElementById('navbarNav');
      if (
        nav?.classList.contains('show') &&
        !e.target.closest('#navbarNav') &&
        !e.target.closest('.navbar-toggler')
      ) {
        new bootstrap.Collapse(nav).hide();
      }
    });
  }, []);

  return (
    <>

      <nav className="navbar navbar-expand-lg fixed-top py-0 my-0 d-flex justify-content-center align-items-center" id="TopNavBar">
        <div className="container-fluid fw-medium text-uppercase" id="ToperNav">
          <Link className="navbar-brand p-0" to="/">
            <img src="images/icon/logo.png" className="img-fluid smallText" width={30} alt="DIIT" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 ms-auto d-flex justify-content-around overflow-0 align-items-center MobileNav" id='MobileNav' style={{ height: '35px' }}>
              <li className="nav-item">
                <Link to="/" className="nav-link"><i className="fas fa-home me-2" />Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link">< i className="fas fa-circle-info me-2" />About</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link " to="/OurCourses" role="button" onMouseEnter={fetchCourses} data-bs-toggle="dropdown">
                  <i className="fas fa-graduation-cap me-2" />Courses</Link>
                <ul className="dropdown-menu px-1 py-0 smallText" id="CourseListNav">
                  {courses.map((item, index) => (
                    <li key={index}>
                      <Link className="dropdown-item my-1 p-1" to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/Library" className="nav-link"><i className="fas fa-book-open me-2" /> Library</Link>
              </li>
              <li className="nav-item">
                <Link to="/Branch" className="nav-link"><i className="fas fa-map-marker-alt me-2" /> Branch</Link>
              </li>
              <li className="nav-item">
                <Link to="/Gallery" className="nav-link"><i className="fas fa-images me-2" /> Gallery</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" to="/StudentZone" role="button" data-bs-toggle="dropdown"><i className="fas fa-user-graduate me-2" />Student Zone</Link>
                <ul className="dropdown-menu p-1 smallText" id="studentZoneNav">
                  {studentZoneItems.map((item, index) => (
                    <li key={index}>
                      <Link className="dropdown-item m-0 p-1" to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item"><Link to="/Contact-us" className="nav-link"><i className="fas fa-phone-volume me-2" /> Contact</Link></li>
              <li className="nav-item d-lg-block p-0 order-2 order-lg-1" style={{ minWidth: '200px' }}>
                <GlobleSearchBox routes={RouteLinks} />
              </li>
              <li className="nav-item d-flex align-items-center position-relative order-1 order-lg-2" style={{ width: 'auto' }}>
                <span
                  id="ChangerLang"
                  title="Change the Language"
                  className="d-flex align-items-center"
                  onClick={() => {
                    const select = document.querySelector('.goog-te-combo');
                    if (select) select.click();
                  }}
                  style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
                >
                  <i className="bi bi-translate text-white fs-5 ms-2"></i>
                  <span className="nav-item text-white d-block d-lg-none">App Language</span>
                </span>
                {/* Hidden but clickable Google Translate dropdown */}
                <select className="goog-te-combo" aria-hidden="true" />
                <style>{`
              /* Hide Google Translate default text */
              #ChangerLang .goog-te-gadget {
                font-size: 0 !important;
                color: transparent !important;
              }

              /* Shrink and reposition dropdown to be clickable only over the icon */
              .goog-te-combo {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                opacity: 0;
                z-index: 1;
                width: 30px;
                height: 30px;
                cursor: pointer;
              }

              .goog-logo-link,
              .goog-te-gadget span {
                display: none !important;
              }
                
            `}</style>
              </li>
            </ul>
          </div>
          <div className="smallFont">
            <div className="d-flex align-items-center small">
              <div
                className="nav-link py-0 my-0 mx-2"
                onClick={() => {
                  if (localStorage.getItem('sToken')) {
                    return navigate('/Student-Portal');
                  }
                  setIsAdmin(false);
                }}
              >
                <button
                  className="btn btn-sm border-0 myDisplayflexRow flex-column text-white login-toggle-btn m-0 p-0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#loginSideBar"
                  aria-controls="offcanvasScrollingRight"
                >
                  Student
                </button>
              </div>

              <div
                className="nav-link py-0 my-0 mx-2"
                onClick={() => {
                  if (localStorage.getItem('aToken')) {
                    return navigate('/Admin-Pannel');
                  }
                  setIsAdmin(true);
                }}
              >
                <button
                  className="btn btn-sm border-0 myDisplayflexRow borderline flex-column text-white login-toggle-btn m-0 p-0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#loginSideBar"
                  aria-controls="offcanvasScrollingRight"
                >
                  Admin
                </button>
              </div>


              <button
                className="btn text-white p-0 m-0 fs-5 theme-toggle-btn borderline"
                onClick={toggleDarkMode}
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>

              <Fullscreen />

              <button
                className="navbar-toggler small p-1 m-0 border-0 borderline"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false">
                <span className="bi bi-three-dots-vertical small fs-6 text-light p-0 m-0 borderline"></span>
              </button>
            </div>
          </div>
          <HeaderProgressBar />
        </div>
      </nav>

      <div className="offcanvas offcanvas-end shadow stdlogin mt-35 p-0" data-bs-backdrop="false" tabIndex={-1}
        id="loginSideBar" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-body card myshadow shadow p-0 m-0 fbcolor">
          <div className="row mx-0 ">
            <div className="col-3 mt-5">
              <button type="button" className="btn btn-sm " data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="bi bi-arrow-left fw-bolder fs-3"></i></button>
            </div>
            <div className="col-12 pt-5 mt-5" style={{ maxeight: '100vh' }} >
              <div className='d-flex align-content-center justify-content-center flex-column logincard w-100'>
                <h2 className="text-center fw-bolder text-primary">
                  <b>{isForgotView ? 'Reset Password' : isAdmin ? 'Admin Login' : 'Student Login'}</b>
                </h2>

                {!isForgotView ? (
                  <>
                    <button
                      type="button"
                      className="btn-close d-none"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      id="loginOffcanvasCloseBtn"
                    ></button>
                    <div className="my-2">
                      <input
                        type={isAdmin ? 'email' : 'text'}
                        value={isAdmin ? email : regNum}
                        className="form-control rounded-3 border-0"
                        placeholder={isAdmin ? 'Enter your email' : 'Enter your registration ID'}
                        onChange={(e) => {
                          if (isAdmin) setEmail(e.target.value);
                          else setRegNum(e.target.value);
                        }}
                      />
                    </div>
                    <div className="my-2">
                      <input
                        type="password"
                        value={password}
                        className="form-control rounded-3 border-0"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn bg-primary text-white fw-bold my-1 rounded-pill mt-2"
                      onClick={() => {
                        isAdmin ? fetchLogin(loginAdmin) : fetchLogin(loginStudent);
                      }}
                    >
                      Log in
                    </button>
                    <div className="text-center mt-2">
                      <button className="btn btn-link  small" style={{ textDecoration: 'none' }} onClick={() => setIsForgotView(true)}>
                        Forgot Password?
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      value={fEmail}
                      className="form-control rounded-3 border-0 mb-2"
                      placeholder="Enter your email"
                      onChange={(e) => setFEmail(e.target.value)}
                    />
                    {EnabledSendOtpBtn ? (
                      <button
                        type="button"
                        className="btn bg-warning btn-sm fw-bold mb-2"
                        onClick={() => {
                          isAdmin ? sendOtpHandler(sendOtpForRPsdAdmin) : sendOtpHandler(sendOtpForRspStudent);
                        }}
                      >
                        Send OTP
                      </button>
                    ) : (
                      <div className="text-center fw-bold text-danger mb-2">{time}</div>
                    )}
                    {otpStatus && (
                      <>
                        <input
                          type="text"
                          className="form-control mt-2"
                          value={tOtp}
                          onChange={(e) => setTOtp(e.target.value)}
                          placeholder="Enter OTP"
                        />
                        <input
                          type="password"
                          className="form-control mt-2"
                          value={nPsd}
                          onChange={(e) => setNPsd(e.target.value)}
                          placeholder="New Password"
                        />
                        <button
                          type="button"
                          className="btn bg-primary text-white rounded-pill px-4 btn-sm mt-2"
                          onClick={() => {
                            isAdmin ? updatePsd(verifyOtpAndUpdatePsdAdmin) : updatePsd(verifyOtpAndUpdatePsdStudent);
                          }}
                        >
                          Verify OTP & Reset Password
                        </button>
                      </>
                    )}
                    <div className="text-center mt-2">
                      <button className="btn btn-link small" style={{ textDecoration: 'none' }} onClick={() => setIsForgotView(false)}>
                        Back to Login
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
