import React from 'react'
import { Label, Spinner } from 'reactstrap';

function LoadScreen({ size, text }) {
    return (
        <div style={styles.container} >
            <Label style={{ fontWeight: 'bold', }}>{text ? text : 'Loading ....'}
            </Label>
            <Spinner size={size || "large"} color="primary" />
        </div>

    );
};



const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

}
export default LoadScreen;