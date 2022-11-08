import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import * as THREE from 'three'
import  ArrowRight from 'react-bootstrap-icons/dist/icons/arrow-right'





export default function Startscreen() {
  AOS.init();

  // You can also pass an optional settings object
  // below listed default settings
  AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    initClassName: "aos-init", // class applied after initialization
    animatedClassName: "aos-animate", // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: "ease", // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: "top-bottom" // defines which position of the element regarding to window should trigger the animation
  });
  return (
    <div className="start-container">
      <section
        className="section1 sec"
        data-aos="fade-up"
        data-os-offset="200"
        data-os-delay="3000"
        
      >
        <div className="hero-section-one">
          <h1>
            CASTLE OF FLOWERS
          </h1>
        <p >
          Supply a feeling of rush to all your out-standing moments.
        </p>
        </div>
        <div className='btn-hero-secton'>
          <button className='hero-Section-btn'>
            <Link to='/shop' className="btn-link">
            View all arangements
            <span className="arrow"><ArrowRight /></span>
            </Link>
           </button>
        </div>
      </section>
      <section className="section2 sec">
        <div className="box-element">
          <img className="sec-two-images" src="/images/p1.jpg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p2.jpeg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p1.jpg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p2.jpeg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p1.jpg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p2.jpeg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p1.jpg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p2.jpeg"/>
        </div>
        <div className="box-element">
        <img className="sec-two-images" src="/images/p1.jpg"/>
        </div>
      </section>
      <section className="section3 sec"> section three</section>
      <section className="section4 sec"> section four</section>
    </div>
  );
}
