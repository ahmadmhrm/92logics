import React from "react";
import "../css/ourServices.css";
import Wave from "react-wavify";
import { Link } from "react-tiger-transition";

const OurServices = (props) => {
  return (
    <div className="what-we" id="what-we">
      <div className="container">
        <h1>{props.title}</h1>
        <div className="what-we-box">
          <div className="what-we-boxes">
            <Link to="/website-design-and-development" transition="glide-left">
              <div className="do-img do-img-green">
                <img src="/assets/web-design-service-1.png" />
              </div>
              <div className="do-content do-content-green">
                <h2>Web Design and Development</h2>
                <p>
                  Here you will find talented web & graphic designers having
                  skills HTML5,CSS3, Bootstrap, JQuery and Here you will find
                  talented developers of C#, VB.Net, ASP.Net, MVC, Core,
                  JavaScript, AngularJS, NativeScript.
                </p>
              </div>
            </Link>
          </div>

          <div className="what-we-boxes blue">
            <Link to="/migration-expert" transition="glide-right">
              <div className="do-content do-content-blue">
                <h2>Migrations experts</h2>
                <p>
                  We convert your exsting applications to new web layout with
                  modern standards using latest web technol ogies, android & ios
                  technologies and desktop technologies.
                </p>
              </div>
              <div className="do-img do-img-blue">
                <img src="/assets/branding-design-service.png" />
              </div>
            </Link>
          </div>

          <div className="what-we-boxes red">
            <Link to="/database-consultancy" transition="glide-left">
              <div className="do-img do-img-red">
                <img src="/assets/database.png" />
              </div>
              <div className="do-content">
                <h2>Database consultancy</h2>
                <p>
                  We provide database consultants, administrators, SQL and NoSQL
                  databases implemenations, System testing and Operational
                  acceptance.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Wave
          fill="#0784B0"
          opacity="0.2"
          paused={false}
          options={{
            height: 100,
            amplitude: 15,
            speed: 0.5,
            points: 6,
          }}
        />
      </div>
    </div>
  );
};
export default OurServices;
