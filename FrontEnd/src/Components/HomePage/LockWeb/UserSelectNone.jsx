import React, { useEffect, useState, useMemo } from "react";

const noSelectStyle = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
};
export default function UserSelectNone({ children }) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile((prev) => (prev !== mobile ? mobile : prev));
        };
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const style = useMemo(() => (isMobile ? noSelectStyle : undefined), [isMobile]);

    return <div style={style}>{children}</div>;
}