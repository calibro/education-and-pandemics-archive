import React from "react";
import "./SubmitView.sass";
import data from "../assets/submit.json";

const SubmitView = () => {
  return (
    <div className="submit-view">
      <div className="container my-4">
        <div className="row">
          <div className="offset-0 offset-md-3 col-12 col-md-6">
            <h2 className="text-center my-4">{data.title}</h2>
            <p className="lead">{data.desc}</p>
            <div className="text-center my-5">
              <a
                className="btn btn-lg btn-outline-primary text-uppercase"
                href="https://airtable.com/shrJkmXkg9D7FRXT7"
                role="button"
                target="_blank"
                rel="noreferrer"
              >
                submit
              </a>
            </div>
          </div>
          <div className="offset-0 offset-md-1 col-12 col-md-10">
            <h4 className="text-uppercase border border-dark m-0 p-3">
              {data.guidelines.title}
            </h4>
            <ul className="border-bottom border-start border-end border-dark mb-0 p-3 ps-5">
              {data.before.map((d) => {
                return <li>{d}</li>;
              })}
            </ul>
            <div className="row g-0">
              {data.guidelines.sections.map((section) => {
                return (
                  <div className="col-12 col-md-4 box p-3" key={section.title}>
                    <h3 className="fs-5">{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offset-0 offset-md-1 col-12 col-md-10 mt-5">
            <h4 className="text-uppercase border border-dark m-0 p-3">
              {data.expect.title}
            </h4>
            <div className="row g-0">
              {data.expect.sections.map((section) => {
                return (
                  <div
                    className="col-12 border-bottom border-end border-start border-dark p-3"
                    key={section.title}
                  >
                    <p className="m-0">{section}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubmitView;
