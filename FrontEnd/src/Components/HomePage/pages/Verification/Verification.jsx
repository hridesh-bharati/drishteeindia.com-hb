// ====================== Imports ======================
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import UseFullCard from "./UseFullCard";
import html2pdf from "html2pdf.js";
import Marquee from "../../Marquee";
import Typed from "typed.js";
import { verifyCertificate } from "../../../../api/adminApi/api";
import Footer from "../../../Footer/Footer";
import "./Verification.css";
// =================== Constants & Styles ===================
const CAPTCHA_LENGTH = 6;

const HINDI_GUIDELINES = [
  "केवल पंजीकृत उपयोगकर्ताओं को ही आगे बढ़ने की अनुमति है।",
  "पंजीकरण संख्या छात्र इसे छात्र द्वारा सही ढंग से भरा जाना चाहिए।",
  "किसी भी छात्र/छात्रा का रिकॉर्ड प्राप्त करने के लिए छात्र/छात्रा का पंजीकृत संख्या सही-सही से भरें।",
  "रिकॉर्ड फाइल पाने के लिए नियम: सबसे पहले इंस्टीट्यूट कोड डालें फिर अपना सर्टिफिकेट नंबर डालें, जैसे: DIIT124/कोर्स का नाम/रजिस्ट्रेशन नंबर।"
];


const MainBg = {
  background: 'url("/images/vender/enquiryBg.webp") center center/cover',
  width: "100%",
  minHeight: "100vh",
  padding: 0,
  margin: 0,
};

const captchaBoxStyle = {
  background: 'url("/images/icon/captcha.png") center/cover',
  border: "1px dotted maroon",
  padding: " 5px",
  margin: " 5px",
  height: "40px",
  width: "auto",
};

const captchaTextStyle = {
  fontFamily: "Kotta One, serif",
  fontWeight: "bolder",
  fontStyle: "italic",
  fontSize: "1.7rem",
  height: "100%",
  letterSpacing: "10px",
  userSelect: "none",
};

// =================== Utility Functions ===================
const getCourseHrs = (duration) => {
  const match = String(duration).match(/\d+/);
  const dur = match ? parseInt(match[0], 10) : 0;
  return { 15: 580, 12: 400, 6: 230 }[dur] || 10;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const getImageDataUrl = (imageUrl) =>
  new Promise((resolve, reject) => {
    if (!imageUrl) return resolve("");
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = reject;
    img.src = imageUrl;
  });

// =================== Certificate Component ===================
const getCenterCode = (regNum) => {
  if (!regNum) return "DIIT000";
  const match = regNum.match(/^(DIIT\d{3})\//);
  return match ? match[1] : "DIIT000";
};

const Certificate = React.memo(function Certificate({ stdData, StdCourseHrs, formatDate }) {
  return (
    <div id="overflow-card">
      <div id="certificate-fixed-a4">
        <div className="certificate-wrapper">
          <div id="printResult" className="certificate-sheet-landscape m-auto">
            <div id="watermark" style={{ border: "12px solid var(--certificate-primary2)" }}>

              {/* ===== Header ===== */}
              <div className="certificate-header-grid">
                <div><img src="images/icon/logo.png" alt="DIIT" className="header-logo-img" /></div>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="ps-4">
                    <h1 className="certificate-main-title">DRISHTEE</h1>
                    <p className="certificate-sub-title fw-bold cert-center">An ISO 9001:2008 Certified Institute</p>
                  </div>
                  <div>
                    <div className="certificate-photo-container">
                      <img src={stdData.photo} alt="Student" className="certificate-photo" />
                    </div>
                  </div>
                </div>
                <div className="text-end cert-right fw-bold ">
                  <p className=" ">Reg Under Society Act 21, 1860 Govt. of India</p>
                  <p className="e">Reg No : 72/2013-14</p>
                </div>
              </div>

              {/* ===== Title ===== */}
              <h1 className="certificate-title">Certificate of Course Completion</h1>

              {/* ===== Body ===== */}
              <div className="certificate-body-grid p-2 text-center text-black">
                <div>
                  <p className="certificate-awarded-to d-inline">
                    <span className="h5">This Certificate is awarded to Mr./Miss</span>
                    <span className="certificate-name"> {stdData.name} S/O {stdData.fatherName}</span>
                  </p>
                  <p className="my-2">
                    <span className="h5">
                      on the successful Completion of a <b>{stdData.duration}</b> and
                      <b> ({StdCourseHrs} Hrs.)</b> course, titled
                    </span>
                  </p>
                  <h4 className="certificate-course-title py-1 m-0">{stdData.description}</h4>
                  <p className="mt-1">
                    <span className="h5">with grade & percentage </span>
                    <span className="certificate-grade-highlight">Excellent & {stdData.percentage}%</span>
                    <br />
                    <span className="h5">
                      Examination conducted on an all-India basis at
                      <span className="certificate-name"> Maharajganj / U.P.</span>
                    </span>
                  </p>

                  {/* ===== Modules Covered ===== */}
                  <div className="mt-1 row">
                    <div className="col-3 text-center">
                      <p className="m-0"><span className="h5"><b>Modules Covered:</b></span></p>
                    </div>
                    <div className="col-9">
                      <ul className="d-flex flex-wrap gap-2 p-0 m-0 list-group-numbered">
                        {(stdData.subjects?.flat() || []).map(subject => (
                          <li key={subject._id} className="certificate-module-item list-group-item">
                            {subject.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ===== Signature and Date ===== */}
                  <div className="certificateFooter">
                    <table className="w-100">
                      <tbody>
                        <tr>
                          <td className="text-start ps-5">
                            <img src="images/vender/signature.png" alt="Sign" style={{ width: "200px" }} />
                            <h6 className="dbluetext fw-bold m-2">Chief Exam Controller</h6>
                          </td>
                          <td></td>
                          <td className="text-end pe-5 pt-4 fw-bold ftrTExt">
                            Date of issue: <span className="dbluetext">{formatDate(stdData.completationDate)}</span>
                          </td>
                        </tr>
                        <tr className="text-center fw-bold ftrTExt" style={{ borderTop: "1px solid darkblue", borderBottom: "1px solid darkblue" }}>
                          <td colSpan={2}><span className="dbluetext">Student Reg No.:</span> <span className="text-uppercase">{stdData.regNum}</span></td>
                          <td><span className="dbluetext">Center Code:</span> <span className="me-5">{getCenterCode(stdData.regNum)}</span></td>
                        </tr>

                      </tbody>
                    </table>

                    {/* ===== Grade Key ===== */}
                    <div className="mt-2">
                      <p className="border border-1 bg-warning-subtle footer-grade d-inline-block px-2 py-0 my-1 fw-bold">
                        Grade Mark: Excellent (81% - 100%), Very Good (71% - 80%), Good (61% - 70%), Satisfactory (50% - 60%)
                      </p>
                    </div>

                    {/* ===== Footer ===== */}
                    <div className="text-center">
                      <h3 className="certificate-footer-title fw-bolder p-0 m-0 maroonText">DRISHTEE INSTITUTE OF INFORMATION TECHNOLOGY</h3>
                      <p className="fw-bold m-0 footer-grade">
                        <small style={{ letterSpacing: "1px" }}>(A UNIT OF DRISHTEE EDUCATIONAL & WELFARE SOCIETY)</small>
                      </p>
                      <p className="certificate-footer-note fw-bold dbluetext p-0 m-0">
                        Corporate Office: Harredeeh, ward No. 5, Nichlaul, Distt: Maharajganj (273304)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// =================== Main Component: Verification ===================
const Verification = () => {
  const [regNum, setRegNum] = useState("");
  const [stdData, setStdData] = useState({});
  const [captchaValue, setCaptchaValue] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);

  const StdCourseHrs = useMemo(() => getCourseHrs(stdData?.details?.duration || stdData?.duration), [stdData]);

  useEffect(() => { generateCaptcha(); }, []);
  useEffect(() => {
    const typed = new Typed("#guidline", { strings: ["Important Guidelines."], typeSpeed: 50, loop: true });
    return () => typed.destroy();
  }, []);

  // ----- Handlers -----
  const generateCaptcha = useCallback(() => {
    setCaptchaValue(Math.random().toString(36).substring(2, 2 + CAPTCHA_LENGTH));
    setUserInput("");
    setIsCaptchaVerified(false);
  }, []);

  const verifyCertificateHandler = useCallback(async () => {
    if (!regNum) return toast.error("Please Enter Registration Number");
    const rspns = await verifyCertificate(regNum);
    setStdData(rspns.message);
  }, [regNum]);

  const handleInputChange = useCallback((e) => setUserInput(e.target.value), []);

  const handleCaptchaCheck = useCallback(() => {
    if (userInput.trim().toLowerCase() === captchaValue.toLowerCase()) {
      setIsCaptchaVerified(true);
      toast.success("CAPTCHA Verified!");
      verifyCertificateHandler();
    } else {
      setIsCaptchaVerified(false);
      toast.error("CAPTCHA failed.");
      generateCaptcha();
    }
  }, [userInput, captchaValue, generateCaptcha, verifyCertificateHandler]);

  const downloadPDF = useCallback(async () => {
    const printResult = document.getElementById("printResult");
    if (!printResult) return alert("Element not found.");
    try {
      const imageDataUrl = await getImageDataUrl(stdData?.photo);
      const clonedPrintResult = printResult.cloneNode(true);
      Array.from(clonedPrintResult.getElementsByTagName("img")).forEach((img) => {
        if (img.src === stdData?.photo) img.src = imageDataUrl;
      });
      const options = {
        margin: 0,
        filename: (stdData?.name || "certificate") + ".pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 4, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      };
      html2pdf().from(clonedPrintResult).set(options).save();
    } catch (error) {
      toast.error("PDF generation failed");
    }
  }, [stdData]);
  return (
    <div className="container-fluid p-0 m-0 text-black" style={MainBg}>
      <div id="VerificationBody">
        <div className="row m-0 p-0 justify-content-center my-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {/* ===== Guidelines Section ===== */}
          <div className="col-md-4 col-sm-12 mt-4 rounded-2 cardEffectsBorder cardEffects">
            <div className="row">
              <div className="col-12  mt-35  bg-warning text-dark py-2 px-3">
                <h5 className="fw-bold m-0 text-uppercase">
                  <span id="guidline">महत्वपूर्ण निर्देश</span>
                </h5>
              </div>

              <div className="col-12 text-white small p-3" style={{ height: '200px', overflow: 'hidden' }}>
                <Marquee behavior="scroll" scrollamount="2" direction="up">
                  {HINDI_GUIDELINES.map((text, idx) => (
                    <React.Fragment key={idx}>
                      <p className="HindiFont mb-1">[{idx + 1}]. {text}</p>
                      {idx !== HINDI_GUIDELINES.length - 1 && <hr className="border-light my-2" />}
                    </React.Fragment>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>

          {/* ===== Verification Form ===== */}
          <div className="col-md-4 col-sm-12 mt-4 mt-35  mx-0 px-1">
            <div className="rounded-2 cardEffectsBorder cardEffects">
              <form className="row gy-2 m-0 myshadow searchCard m-auto text-center" onSubmit={e => e.preventDefault()}>
                <div className="col-12 m-0 p-0" style={{ border: "1px solid #012C5", background: "var(--card-bg)" }}>
                  <div className="container text-center pt-2  pb-0 h4 fw-bold text-uppercase text-white">
                    <b style={{ letterSpacing: "1px" }}>
                      Verify Your <span className="text-danger">Certificate</span>
                    </b>
                  </div>
                </div>
                <div className="col-12">
                  <span className="text-white">Read the guidelines.</span>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="bi bi-person-fill"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Registration No."
                      value={regNum}
                      onChange={e => setRegNum(e.target.value)}
                    />
                  </div>
                </div>

                {/* ===== CAPTCHA ===== */}
                <>
                  <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center gap-2">
                      <label htmlFor="captcha" style={{ ...captchaTextStyle, marginBottom: 0 }}>
                        <div style={captchaBoxStyle}>{captchaValue}</div>
                      </label>
                      <button
                        type="button"
                        className="btn btn-warning px-2 btn-sm border-0"
                        onClick={generateCaptcha}
                        title="Refresh Captcha"
                      >
                        <img src="/images/icon/refresh.png" alt="Reload Captcha" style={{ height: "20px" }} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-check2-square"></i></span>
                      <input type="text" id="captcha" placeholder="Enter Captcha here.." value={userInput} className="form-control border-0 bg-white" onChange={handleInputChange} />
                    </div>
                    <button type="button" className="btn btn-warning w-100 my-3" onClick={handleCaptchaCheck} disabled={!userInput || isCaptchaVerified}>
                      <i className="bi bi-search"></i> Verify
                    </button>
                  </div>
                </>
              </form>
            </div>
          </div>
          <UseFullCard />
        </div>

        {/* ===== Certificate & Download Button ===== */}
        <div className="mt-4 fs-5">
          {stdData.photo && (
            <>
              <Certificate stdData={stdData} StdCourseHrs={StdCourseHrs} formatDate={formatDate} />
              <div className="download-row text-center p-4">
                <button className="btn btn-sm hover-btn p-0 m-0" onClick={downloadPDF}>
                  <img src="/images/icon/download.png" className="img-fluid resultimg" alt="Download" />
                </button>
                <h6 className="text-white lh-lg">Download your E-Certificate</h6>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verification;
