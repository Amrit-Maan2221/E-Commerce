import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import './styles/Footer.scss'

const Footer = () => {
  return (
    <>
      <section id='footer'>
        <section className="contact-short">
          <div className="grid grid-two-column">
            <div>
              <h3>Ready to get started?</h3>
              <h3>Talk to us today</h3>
            </div>

            <div>
              <button className="btn hireme-btn">
                <NavLink to="/"> Get Started </NavLink>
              </button>
            </div>
          </div>
        </section>
        {/* footer section */}

        <footer>
          <div className="container grid grid-four-column">
            <div className="footer-about">
              <h3>A-Plus</h3>
              <p>Get Products with A+ Quality</p>
            </div>
            <div className="footer-subscribe">
              <h3>Subscribe to get important updates</h3>
              <form action="#">
                <input type="email" name="email" placeholder="YOUR E-MAIL" />
                <input type="submit" value="subscribe" />
              </form>
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="footer-social--icons">
                <div>
                  <FaFacebook className="icons" />
                </div>
                <div>
                  <FaInstagram className="icons" />
                </div>
                <div>
                  <a
                    href=""
                    target="_blank">
                    <FaYoutube className="icons" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <h3>Call Us</h3>
              <h3>+1 226988xxxx</h3>
            </div>
          </div>

          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p>
              &copy; {new Date().getFullYear()} Amrit Maan. All Rights Reserved
              </p>
              <div>
                <ul>
                  <li>PRIVACY POLICY</li>
                  <li>TERMS & CONDITIONS</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};


export default Footer;