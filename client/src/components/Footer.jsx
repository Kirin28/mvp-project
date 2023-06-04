import React from "react";

export default function Footer() {
    return (
        <div>
             <footer className="footer">
      <div className="container">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
   
    <div className="me-5 d-none d-lg-block">
      <span className="fw-semibold">Get connected with us:</span>
    </div>
    <div>
      <a href="#" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="#" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </section>
      <div className="text-center p-4 fw-semibold">
    &copy; {new Date().getFullYear()} Forever Active
  </div>
      </div>
    </footer>
        </div>
    )
};

