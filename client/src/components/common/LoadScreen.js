import React from 'react'
import { Label, Spinner } from 'reactstrap';

function LoadScreen({ size, text, height }) {
    return (
        <div
            style={{ height: height }}
            className='container d-flex flex-column justify-content-center align-items-center' >
            <Label style={{ fontWeight: 'bold', }}>{text ? text : 'Loading ....'}
            </Label>
            <Spinner size={size || "large"} color="primary" />
        </div>

    );
};




export default LoadScreen;