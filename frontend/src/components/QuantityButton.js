import React,{useState} from "react";

const QuantityButton = () =>{
    const[count, setCount] = useState(0);
const addClick = () =>{
    setCount(count +1);
} ;
const removeClick = () =>{
    if ( count > 0){
        setCount(count - 1);
    } 
} ;
return(
    <div>
         <button onClick={removeClick}> - </button> 
          <p>{count}</p>
          <button onClick={addClick}> + </button><br></br>
    </div>
);

};
export default QuantityButton ;
