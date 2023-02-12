import {Tooltip} from "primereact/tooltip";
import React from "react";
import "./InfoIcon.css";

interface InfoProps {
    className: string;
    info: string;
}

export const InfoIcon = (props: InfoProps) => {
    const {className, info} = props;

    return <span
        className={className}
        data-pr-tooltip={info}>
        <Tooltip target={'.' + className}/>
        <span className=' pi pi-question-circle info'></span>
    </span>;
}