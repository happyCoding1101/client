import React from "react";

// set the defaults
const UserContext = React.createContext({
  role: '',
  setLanguage: () => {}
});

export default UserContext;