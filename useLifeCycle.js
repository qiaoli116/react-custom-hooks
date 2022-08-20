import React from "react";
const useLifeCycle = ({
    didMount = () =>{console.log("didMount undefined");}, 
    willUpdate = () =>{console.log("willUpdate undefined");},
    didUpdate = () =>{console.log("didUpdate undefined");}, 
    willUnmount = () =>{console.log("willUnmount undefined");}
}={}) => {
    const isInitialMount = React.useRef(true);
    const isUnmount = React.useRef(false);
    React.useEffect(() => {
        didMount();
        return ()=>{
            willUnmount();
            isUnmount.current = true;
        }; 
    }, []);
    
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            didUpdate();
        }
        return ()=>{
            if(!isUnmount.current){
                willUpdate();
            };
        } 
    });
}

export default useLifeCycle;