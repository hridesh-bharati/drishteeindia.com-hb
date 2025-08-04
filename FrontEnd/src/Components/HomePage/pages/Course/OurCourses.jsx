import React from "react";
import CommanCourse from "./CommanCourse";
import ScrollDownArrow from "../../../HelperCmp/Scroller/ScrollDown";

export default function OurCourses() {
    return <>
        <CommanCourse targetCourses={["All"]} CTitle="Computer" /> <ScrollDownArrow />
    </>
}
