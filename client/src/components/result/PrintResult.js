import React, { useRef } from 'react'
//import Results from './Results';
import ResultClassBased from './ResultClassBased'
import { useReactToPrint } from 'react-to-print';
import { Button } from 'reactstrap';

function PrintResult(props) {
    const uid = props.user.uid
    const [buttonDisplay, setbtnDisplay] = React.useState({ display: 'flex', marginTop: '-120px' })

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const backHandler = () => {

        window.location = '/resultsgenerator'
    }

    return (
        <div>
            < div className='mb-5 align-self-center justify-content-lg-center' style={buttonDisplay}>
                <Button className='mr-4 text-light font-weight-bold'
                    style={{ width: '50vh', height: '10vh' }}
                    color='success'
                    onClick={backHandler}>BACK</Button>
                <Button className='text-light font-weight-bold'
                    style={{ width: '50vh' }}
                    color='success'
                    onClick={handlePrint}>PRINT</Button>
            </div >
            <ResultClassBased ref={componentRef} style={{ buttonDisplay }} uid={uid} />
        </div>

    );
};



export default PrintResult