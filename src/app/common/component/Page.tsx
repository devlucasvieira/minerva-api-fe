import React from "react";
import { BlockUI } from "primereact/blockui";
import { ProgressBar } from "primereact/progressbar";
import "./Page.css";
import { BreadCrumbGov } from "./BreadCrumbGov";

export interface IPage {
  title: string;
  breadCrumb?: string | string[];
  children?: JSX.Element;
  loading?: boolean;
}

export const Page = (props: IPage) => {
  return (
    <BlockUI blocked={props.loading} fullScreen>
      {props.loading && (
        <ProgressBar
          mode="indeterminate"
          style={{ height: "6px", zIndex: 999 }}
        />
      )}
      {!props.loading && <div style={{ height: "6px" }} />}
      <div className="container-fluid">
        <BreadCrumbGov
          breadCrumb={
            props.breadCrumb instanceof Array
              ? props.breadCrumb
              : [props.breadCrumb]
          }
          home={{ icon: "pi pi-home", url: "#" }}
        />

        <div className="p-bg-light">
          <h3 className="p-text-center p-mt-5 title">{props.title}</h3>
          <div className=" p-mb-5" />
          {props.children}
        </div>
      </div>
    </BlockUI>
  );
};
