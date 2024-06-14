import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { contact } from '../../portfolio'
import { SERVICE_ID, TEMPLATE_ID, USER_ID } from '../../config';
import './Contact.css'

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: USER_ID,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 5000); // Hide the message after 5 seconds
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  if (!contact.email) return null

  return (
    <section className='section contact center' id='contact'>

      <h2 className='section__title'>Let's get in touch</h2>
      {submitted && <div className="success-message">Your message has been sent successfully!</div>}

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="user_name" placeholder="Name" />
        <input type="email" placeholder="Email" name="user_email" />
        <textarea name="message" placeholder="Message" />
        <button id='text-behavior' type='submit' className='btn btn--outline'>
          Email me
        </button>
      </form>

    </section>
  )
}

export default Contact
