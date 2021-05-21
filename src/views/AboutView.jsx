import { Component } from "react";
import "./AboutView.sass";
import logo from "../assets/logoE&PA.svg";
import logoIsche from "../assets/logo_ische.svg";
import data from "../assets/about.json";
console.log(data);
export default class HomeView extends Component {
  render() {
    return (
      <div className="about-view">
        <div className="container">
          <div className="row">
            <div className="col-12 offset-0 offset-md-1 col-md-6">
              <img src={logo} alt="logo" className="img-fluid mb-4 mt-5" />
              <h3 className="text-black-50">
                Web Archive on Educations and Pandemics: Past and Present
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="offset-md-1 col-md-7 border-end-responsive">
              <p className="lead mt-3">{data.intro}</p>
            </div>

            <div className="col-md-3">
              <a href="https://www.ische.org/" target="_blank" rel="noreferrer">
                <img className="my-3" src={logoIsche} alt="logo-ische" />
              </a>
              <p className="">{data.about}</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 offset-0 offset-md-1 col-md-10 border border-dark">
              <h5 className="text-uppercase my-3">{data.explore.title}</h5>
              <div className="row border-top border-dark">
                {data.explore.sections.map((section) => {
                  return (
                    <div className="explore col-md-4" key={section.title}>
                      <h3 className="fs-5 my-2">{section.title}</h3>
                      <p>{section.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 offset-0 offset-md-1 col-md-10 border border-dark">
              <h5 className="text-uppercase my-3">{data.sources.title}</h5>
            </div>
            <div className="offset-md-1 col-md-5 border-start border-bottom border-end border-dark">
              <p className="col-md-6 col-12 mt-2">{data.sources.desc}</p>
            </div>
            <div className="col-md-5 border border-top-0 border-dark">
              {data.sources.links.map((link) => {
                return (
                  <div key={link.title} className="mt-2">
                    <a href={link.url} target="_blank">
                      {link.title}
                    </a>
                    <p>{link.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row mt-5 mb-3">
            <div className="offset-md-1 col-md-10 border border-dark">
              <h5 className="text-uppercase my-3">contacts</h5>
            </div>
            <div className="offset-md-1 col-md-10 border-start border-end border-dark">
              <p className="col-md-6 col-12 my-3">{data.contacts.desc}</p>
            </div>
            <div className="offset-md-1 col-md-10 border border-top-0 border-dark">
              <div className="row">
                {data.contacts.people.map((person) => {
                  return (
                    <div
                      className="col-md-3 mb-2 border-end-responsive"
                      key={person.title}
                    >
                      <h6>{person.title}</h6>
                      <p>{person.mail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}