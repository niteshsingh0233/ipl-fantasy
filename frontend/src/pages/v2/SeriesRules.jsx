import FadeInWrapper from "./FadeInWrapper";
import { useEffect } from "react";

function SeriesRules() {

     useEffect(() => {
        document.title = "Rules - SeriesX"
    
      }, [])

    return (
      <FadeInWrapper>
        <h2>Series Game Rules</h2>
        <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", fontSize: "1rem" }}>
  _Formation:_
  - 5 Batsmen
  - 5 Bowlers
  - 1 Wicket-Keeper
  - All-rounders can play as batsmen or bowlers
  - Wicket-keeper can play as a batsman (no points for wickets)
  
  _Player Restrictions:_
  - Maximum 4 overseas players in Playing XI
  
  _Points System:_
  - 1 run = 1 point
  - 1 wicket = 25 points
  - 1 catch = 10 points
  - 1 stumping = 20 points (only for designated wicket-keeper)
  - Not Out = 10 points
  - 25 runs = x1.5 points
  - 50 runs = double points
  - 75 runs = triple points
  - 100 runs = ×4
  - 2 wicket = ×1.5
  - 3 wickets = double points
  - 4 wickets = triple points
  - 5 wickets+ = x4 points
  - Maiden over = 50 points
  - Wicket maiden = 100 points
  - Hat-trick = 200 points
  - Duck (batsmen) = -50 points
  - Economy 12 and above (bowlers) = -50 points (min 2 overs)
  - Man of the Match = 50 points
  - Man of the Match (finals) = 100 points
  - Captain = double points
  - Vice-Captain = ×1.5 points
  - Team winning = 100 points
  - Match abandoned/draw = 50 points each team
  
  _Penalty Caps:_
  - Maximum deduction per match: 300 points
  
  _Swaps:_
  - 20 player swaps allowed
  - 5 captain swaps allowed
  - 5 vice-captain swaps allowed
  - Maximum 4 foreigners in Playing XI
  
  _Team Ownership:_
  - Max 2 co-owners per team
  - Co-owners declared before auction
  - No changes in co-ownership post auction
  
  _Important Rules:_
  1. Impact Player must be in Playing XI.
  2. Late scoring: -30 points per instance.
  3. Double headers: scoring after both matches.
  4. No automatic captain swap.
  5. Replacement player takes original position.
  6. Team bidding starts at 100 points.
  7. Deleting/editing messages: -300 points (capped).
  8. First match:
     - Teams must submit Playing XI before toss.
     - Failure = -50 points.
  9. Formation errors uncorrected by 2nd match:
     - Additional -300 points.
  
  _Retention Rules:_
  1. Inform by February 22, 11:59 pm
  2. 10% increase from last year’s selling price
  3. Rounding-off:
     - Second digit 1-9 → round up
     - (e.g., 11→20, 97→100, 112→120)
  
  _Bonus Points:_
  - Champion: 400 points
  - Runner-up: 300 points
  - Second Qualifier Loser: 200 points
  - Eliminator Loser: 100 points
  - Highest run scorer: 500
  - Second highest: 400
  - Highest wicket taker: 500
  - Second highest: 400
  - Max 4s/6s: 150
  - Max catches: 100
        </pre>
      </FadeInWrapper>
    );
  }


  export default SeriesRules