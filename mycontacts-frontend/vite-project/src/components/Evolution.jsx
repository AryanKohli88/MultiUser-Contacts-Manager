import React from "react";
function Evolution(props){
    console.log("Naam h bulla :: " + props.name)
    if(props.exists)
    {
    let q1 = `https://www.google.com/search?q=when+did+${props.name}+first+appear+in+pokemon+anime&oq=when+did+pikachu+first+appear+in+pokemon+anime`;
    let q2 = "https://www.google.com/search?q=who+was+the+first+trainer+shown+to+own+" + props.name +"+in+anime&oq=who+was+the+first+trainer+shown+to+own+pikachu+in+anime";
    let q3= "https://www.google.com/search?q=what+are+future+and+past+evolutions+of+" + props.name;
    return <div>
      <ul>
            <li><a href={q1} target="_blank"> First Appearance of {props.name} </a> </li>
            <li><a href={q2} target="_blank"> Who owned {props.name} first in anime? </a> </li>
            <li><a href={q3} target="_blank"> Evolutions of {props.name} </a> </li>
      </ul>
    </div>
    }
    else{
        return <div></div>
    }
    return (
        <div>kosa</div>
    )
}

export default Evolution;