import React from "react";
import { useEffect } from "react";
import FadeInWrapper from "./FadeInWrapper";

function PrivacyPolicy() {

    

    useEffect(() => {
      document.title = "Privacy Policy - SeriesX";
    }, []);
  
    return (
        <FadeInWrapper>
          <h2>Privacy Policy</h2>
          <p>We value your privacy. Your personal information is protected and never shared without consent.</p>
          </FadeInWrapper>
      );
    
  }

export default PrivacyPolicy