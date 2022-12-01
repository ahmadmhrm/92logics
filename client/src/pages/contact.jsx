import React, { useState, useEffect } from "react";
import "../css/contact.css";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import { useSelector, useDispatch } from "react-redux";
import { createMessage, clearErrors } from "../actions/contactAction";
import { NEW_MESSAGE_RESET } from "../constants/contactConstant";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import Loader from "../components/loader";

const Contact = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, success } = useSelector(
    (state) => state.createMessage
  );

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const createContactSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("fname", fname);
    myForm.set("lname", lname);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("message", message);
    dispatch(createMessage(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Message Send Successfully");
      history.push("");
      dispatch({ type: NEW_MESSAGE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="contact">
          <MetaData title="92 logics - contact" />
          <Navbar />
          <div className="box-wrapper">
            <div className="info-wrap">
              <h2 className="info-title">Contact Information</h2>
              <h3 className="info-sub-title">
                Fill up the form and our Team will get back to you within 24
                hours
              </h3>
              <ul className="info-details">
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>Phone:</span>{" "}
                  <a href="tel:+ 1235 2355 98">+92 523307006</a>
                </li>
                <li>
                  <i className="fas fa-paper-plane"></i>
                  <span>Email:</span>
                  <a href="mailto:ahmadmhrm2@gmail.com" target="_blank">
                    qmmughal@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fas fa-globe"></i>
                  <span>Website:</span>
                  <a href="http://www.92logics.info/" target="_blank">
                    92logics.info
                  </a>
                </li>
              </ul>
              <ul className="social-icons">
                <li>
                  <a href="https://facebook.com/92logicsPK" target="_blank">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/92logicsPK" target="_blank">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/92logicsPK"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="form-wrap">
              <form
                action="#"
                method="POST"
                onSubmit={createContactSubmitHandler}
              >
                <h2 className="form-title">Send us a message</h2>
                <div className="form-fields">
                  <div className="form-group">
                    <input
                      type="text"
                      className="fname"
                      placeholder="First Name"
                      onChange={(e) => setFname(e.target.value)}
                      value={fname}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="lname"
                      placeholder="Last Name"
                      onChange={(e) => setLname(e.target.value)}
                      value={lname}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="email"
                      placeholder="Working Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      className="phone"
                      placeholder="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id=""
                      placeholder="Write your message"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      required
                    ></textarea>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Send Message"
                  className="submit-button"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
