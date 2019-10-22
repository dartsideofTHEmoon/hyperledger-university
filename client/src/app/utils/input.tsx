import {useState} from "react";
import * as React from "react";

export const useInput = (type: string, name: string, placeholder:string) => {
    const [value, setValue] = useState("");
    const input =  (<input value={value} className="form-control" onChange={e => setValue(e.target.value)} type={type} placeholder={placeholder}/>)
    return [value, input];
}