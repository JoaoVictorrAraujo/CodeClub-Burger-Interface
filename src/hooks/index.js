import React from "react";
import PropTypes from 'prop-types'
import { UserProvider } from "./UserContext";

const AppProvider = ({ children }) => (
    <UserProvider>
        {children}
    </UserProvider>
)


AppProvider.PropTypes = {
    children: PropTypes.node
}   

export default AppProvider