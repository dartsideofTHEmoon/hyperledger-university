import {apiTokenStore} from "./apiStore";
import * as React from "react";

const isAuthenticated = () => {
    return apiTokenStore.get()
}

export default isAuthenticated