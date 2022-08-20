import React from "react";
const useLifeCycle = ({
    didMount = () => {
        console.log("didMount undefined");
    },
    willUpdate = () => {
        console.log("willUpdate undefined");
    },
    didUpdate = () => {
        console.log("didUpdate undefined");
    },
    willUnmount = () => {
        console.log("willUnmount undefined");
    }
} = {}) => {
    const isInitialMount = React.useRef(true);
    const isUnmount = React.useRef(false);
    React.useEffect(() => {
        // isUnmount.current = false;
        // it runs after the first render
        didMount();
        // todo: this line exists because on codesandbox.io
        // https://codesandbox.io/s/ql-react-custom-hooks-demo-gohsb9
        // component got mounted > unmounted > mounted when mounted for the first time.
        // because unmounted was called for some reason, isUnmount.current was set to true.
        // so i have to set isUnmount.current to false using the line below.
        // but do not know why.
        isUnmount.current = false;
        return () => {
            // React performs the cleanup when the component unmounts
            willUnmount();
            isUnmount.current = true;
        };
    }, []);

    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
        // it runs after every update.
            didUpdate();
        }
        return () => {
            if (!isUnmount.current) {
                // This is why React also cleans up effects from the previous render before running the effects next time.
                willUpdate();
            }
        };
    });
};

export default useLifeCycle;
