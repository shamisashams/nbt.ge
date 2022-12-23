import React from "react";

const Preloader = ({ loading }) => {
    return (
        <div
            className={`preloader fixed w-screen h-screen z-50 left-0 top-0 flex flex-col justify-center items-center ${
                loading ? "block" : "hidden"
            }`}
        >
            <div className="grid grid-cols-2 gap-2 mb-10">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
            <div className="uppercase bold">Page loading...</div>
        </div>
    );
};

export default Preloader;
