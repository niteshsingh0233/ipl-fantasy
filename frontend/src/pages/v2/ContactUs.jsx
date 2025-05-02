import { useEffect } from "react";
import FadeInWrapper from "./FadeInWrapper";

function ContactUs() {

   
    useEffect(() => {
      document.title = "Contact Us - SeriesX";
    }, []);
  
    return (
       <FadeInWrapper>
          <h2>Contact Us</h2>
          <p>Email: support@leagueforge.com</p>
          <p>Phone: +1 (800) 123-4567</p>
        </FadeInWrapper>
      );
  }


  export default ContactUs