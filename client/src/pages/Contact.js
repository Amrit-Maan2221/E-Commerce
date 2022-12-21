import { useEffect, useState } from "react";
import { useUser } from "../auth/useUser";
import { axoisInstance } from "../util/ApiBaseUrlInstance.js";

const Contact = () => {
  const user = useUser();
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState('');
  const [message, setMessage] = useState('');
  const [userFeedbackMessage, setUserFeedbackMessage] = useState('');

  useEffect(() => {
    if (user) {
      setUsernameValue(user.username);
      setEmailValue(user.email);
    }
  }, [user])

  const sendMessage = async (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      url: '/contact',
      data: {
        email: emailValue,
        username: usernameValue,
        userMessage: message
      }
    };
    try {
      const response = await axoisInstance.request(options);
      setUserFeedbackMessage("We have sent query to our Team! They may contact you soon for more information!");
      setTimeout(() => {
        setUserFeedbackMessage("");
      }, 5000);
    } catch (err) {
      setUserFeedbackMessage("Failed to process your request.");
      setTimeout(() => {
        setUserFeedbackMessage("");
      }, 5000);
    }
  }


  return (
    <section className="contact-section">
      <h2 className="common-heading">Contact page</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.2125045578887!2d-80.52952738450726!3d43.49790227912692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf3c150436563%3A0x8cb23273c3533e86!2sConestoga%20Mall!5e0!3m2!1sen!2sca!4v1671598314931!5m2!1sen!2sca"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
      
      

      <div className="container">
        <div className="feedback">{userFeedbackMessage}</div>
        <div className="contact-form">
          <div className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={usernameValue}
              onChange={e => setUsernameValue(e.target.value)}
              required
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={emailValue}
              onChange={e => setEmailValue(e.target.value)}
              required
            />

            <textarea
              name="Message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input onClick={sendMessage} type="submit" value="send" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;