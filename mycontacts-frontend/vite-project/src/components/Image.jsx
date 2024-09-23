import React from "react";

function Image(props) {
  // let p_id = -1;
  // p_id = props.id; 
  if(!props.exists){
    return (<div>Please check spelling</div>)
  }
  let url; // = 
  if(props.id === -1) {
    url =  "../../public/placeholder_image.jpeg"
  }
  else{
    url = `https://www.serebii.net/art/th/${props.id}.png`
  }
  return (
    <div>
      {/* <h2>Pokedex #<%=id%></h2> */}
      {/* {id === -1 ? (<div class="image"><img src="../../public/placeholder_image.jpeg" aria-label="For screen readers" /></div>):(<div class="image"><img src={url} aria-label="For screen readers" /></div>)} */}
      <div className="image"><img src={url} aria-label="For screen readers" /></div>
    </div>
  );
}

export default Image;
