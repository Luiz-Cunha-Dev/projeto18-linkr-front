import { ThreeDots } from "react-loader-spinner";
import React from "react";

export default function Loading() {
    return (
        
        <ThreeDots 
            color="#FFFFFF" 
            height='40'
            width='40'
            ariaLabel="three dots loading"
            wrapperStyle={{}}
            visible={true}
        />
    );
}