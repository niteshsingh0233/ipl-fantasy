import { useEffect } from "react";
import FadeInWrapper from "./FadeInWrapper";

function TermsAndConditions() {

  const fadeIn = {
    animation: "fadeIn 1s ease-in-out",
  };
  
  const fadeInStyle = {
    ...fadeIn,
    opacity: 0,
    animationFillMode: "forwards",
  };

  useEffect(() => {
    document.title = "Terms and Conditions - SeriesX";
  }, []);

  return (
    <FadeInWrapper>
      <h2>Terms and Conditions</h2>
      <p>By using LeagueForge, you agree to abide by our platform's fair use and competition rules.</p>
      </FadeInWrapper>
  );
}

  export default TermsAndConditions
