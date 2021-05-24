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
                href="/"
                role="button"
              >
                submit
              </a>
            </div>
          </div>
          <div className="offset-0 offset-md-1 col-12 col-md-10">
            <h4 className="text-uppercase border border-dark m-0 p-3">
              {data.guidelines.title}
            </h4>
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
        </div>
      </div>
    </div>
  );
};
export default SubmitView;
