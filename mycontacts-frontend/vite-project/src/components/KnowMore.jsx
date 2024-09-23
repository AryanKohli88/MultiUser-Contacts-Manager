import React from "react";
import Evolution from './Evolution.jsx'
function KnowMore(props){
    return <div>
        <Evolution name={props.name} exists={props.exists} />
    </div>
}

export default KnowMore;