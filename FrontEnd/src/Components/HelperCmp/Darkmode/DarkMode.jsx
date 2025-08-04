import { useEffect } from "react";

const DarkMode = (isDarkMode, setIsDarkMode, options = { autoDetect: false }) => {
    // Function to apply dark/light mode styles
    const applyMode = (mode) => {
        localStorage.setItem("theme", mode ? "dark" : "light");

        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", mode ? "#000000" : "#00268f");

        const root = document.getElementById("root");
        const team = document.getElementById("team");

        if (root) {
            root.classList.toggle("dark-mode", mode);
            root.style.background = mode ? "var(--mainBgcolorDark)" : "var(--lightWhite)";
        }
        if (team) {
            team.classList.toggle("dark-mode", mode);
        }

        const white = "var(--whiteBg)";
        const black = "var(--mainBgcolorDark)";
        const midBlack = "var(--MyDarkGrayBg)";
        const lightBlack = "var(--lightGrayColor)";
        const lightwhite = "var(--lightWhite)";
        const navRed = "var(--topNavBgColor)";
        const darkBlue = "var(--cardHeadColorDark)";
        const darkBlue2 = "var(--d-blue)";

        const elements = [
            { el: document.getElementById("FullScreenNav"), styles: { background: mode ? black : navRed } },
            { el: document.getElementById("ToperNav"), styles: { background: mode ? black : navRed } },
            { el: document.getElementById("MobileNav"), styles: { background: mode ? black : navRed } },
            { el: document.getElementById("homeA"), styles: { background: mode ? midBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("homeB"), styles: { background: mode ? midBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("dText"), styles: { color: mode ? white : midBlack } },
            { el: document.getElementById("team"), styles: { background: mode ? midBlack : white } },
            { el: document.getElementById("timeTable"), styles: { background: mode ? midBlack : white } },
            { el: document.getElementById("noticeBg"), styles: { background: mode ? midBlack : white } },
            { el: document.getElementById("TestimonialChild"), styles: { background: mode ? midBlack : white } },
            { el: document.getElementById("TestimonialParent"), styles: { background: mode ? midBlack : white } },
            { el: document.getElementById("liveCards"), styles: { background: mode ? midBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("liveA"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("liveB"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("liveC"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("liveD"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("HomeOffer"), styles: { background: mode ? lightBlack : white } },
            { el: document.getElementById("signUpNow"), styles: { background: mode ? lightBlack : white } },
            { el: document.getElementById("CourseListNav"), styles: { background: mode ? black : navRed } },
            { el: document.getElementById("studentZoneNav"), styles: { background: mode ? black : navRed } },
            ...Array.from(document.querySelectorAll(".about-section")).map(el => ({
                el,
                styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack }
            })),
            { el: document.getElementById("MissionLeft1"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("MissionLeft2"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("MissionRight"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("MyCardBg"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("Accordion1"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("counter1"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("counter2"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("counter3"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("counter4"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("CourseEleChild"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("cerEle"), styles: { background: mode ? lightBlack : white, color: mode ? white : midBlack } },
            { el: document.getElementById("MyFooterColor"), styles: { background: mode ? lightBlack : darkBlue, color: mode ? white : midBlack } },
            { el: document.getElementById("thumblain"), styles: { background: mode ? lightBlack : darkBlue, color: mode ? white : midBlack } },
            { el: document.getElementById("BAddress"), styles: { background: mode ? lightBlack : darkBlue2, color: mode ? white : midBlack } },
            { el: document.getElementById("branchBgCard"), styles: { background: mode ? midBlack : darkBlue } },
            { el: document.getElementById("branchChild"), styles: { background: mode ? midBlack : darkBlue } },
            { el: document.getElementById("shortContact"), styles: { background: mode ? midBlack : darkBlue } },
            { el: document.getElementById("shortContactA"), styles: { background: mode ? midBlack : darkBlue } },
            { el: document.getElementById("absirfdiitBg"), styles: { background: mode ? midBlack : navRed } },
        ];

        elements.forEach(({ el, styles }) => {
            if (el && styles) {
                Object.entries(styles).forEach(([prop, value]) => {
                    el.style[prop] = value;
                });
            }
        });
    };

    useEffect(() => {
        if (options.autoDetect) {
            // Initial system preference sync
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            setIsDarkMode(mediaQuery.matches);

            // Listen for real-time system preference changes
            const listener = (e) => {
                setIsDarkMode(e.matches);
            };

            mediaQuery.addEventListener("change", listener);

            // Cleanup listener on unmount
            return () => {
                mediaQuery.removeEventListener("change", listener);
            };
        }
    }, [options.autoDetect, setIsDarkMode]);

    // Apply styles immediately when isDarkMode changes
    useEffect(() => {
        applyMode(isDarkMode);
    }, [isDarkMode]);

    // Return toggle function for manual toggle usage
    const toggle = () => setIsDarkMode((prev) => !prev);

    return toggle;
};

export default DarkMode;
