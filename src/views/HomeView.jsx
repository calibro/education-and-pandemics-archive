import { Component } from "react";
import "./HomeView.sass";
import { base, MAIN_TABLE } from "../utils/airtable";
import { Link } from "react-router-dom";
import ResourcesSlider from "../components/ResourcesSlider";
import { Spinner } from "react-bootstrap";
import logo from "../assets/logoE&PA.svg";
import logoIsche from "../assets/logo_ische.svg";
import AnimatedLink from "../components/commons/AnimatedLink";

export default class HomeView extends Component {
  state = {
    archiveItems: [],
    loading: false,
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    var self = this;
    self.setState({
      loading: true,
    });

    //OR(RECORD_ID() = ‘recRjdJSziwMjfhO8’, RECORD_ID() = ‘recdRonUzKAIMPOxb’)
    base(MAIN_TABLE)
      .select({
        maxRecords: 20,
        view: "Table",
        filterByFormula: 'REGEX_MATCH({Status}, "Published")',
      })
      .firstPage(function (err, records) {
        if (err) {
          console.error(err);
          return;
        }
        self.setState({
          archiveItems: records,
          loading: false,
        });
      });
  }
  render() {
    return (
      <div className="h-100 home-container">
        <div className="container-fluid p-0">
          <div className="row border-bottom border-dark g-0">
            <div className="col-12 col-md-6">
              <div className="logo-block p-3 p-md-5 border-dark">
                <img src={logo} alt="logo" className="img-fluid mb-4" />
                <div>
                  <h3 className="text-black-50">
                    Web Archive on Educations and Pandemics: Past and Present
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="about-block d-flex flex-column h-100">
                <Link
                  to="/explore"
                  className="big-link border-bottom border-dark flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center"
                >
                  <AnimatedLink text="EXPLORE THE ARCHIVE"></AnimatedLink>
                </Link>
                <Link
                  to="/about"
                  className="big-link border-bottom border-dark flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center"
                >
                  <AnimatedLink text="DISCOVER THE PROJECT"></AnimatedLink>
                </Link>
                <a
                  href="#"
                  className="big-link flex-grow-1 flex-shrink-1 d-flex align-items-center justify-content-center"
                >
                  <AnimatedLink text="CONTRIBUTE TO THE ARCHIVE"></AnimatedLink>
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h5 className="text-center text-uppercase my-4 text-black-50">
                Latest updates
              </h5>
              <div className="slider-container position-relative">
                {this.state.loading ? (
                  <div className="loading">
                    <Spinner animation="border" />
                    Loading resources
                  </div>
                ) : this.state.archiveItems.length > 0 ? (
                  <ResourcesSlider
                    items={this.state.archiveItems}
                    infinite={true}
                  ></ResourcesSlider>
                ) : (
                  <div>No resources</div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-12">
              <div className="my-5 text-black-50">
                <p className="text-center lead">
                  A project by{" "}
                  <a
                    href="https://www.ische.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={logoIsche} alt="logo-ische" className="ms-2" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
