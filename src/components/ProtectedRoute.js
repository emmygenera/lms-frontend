import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const history = useHistory();

    const { logedIn } = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!logedIn) history.push("/access-denied");
    }, [0]);

    return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
