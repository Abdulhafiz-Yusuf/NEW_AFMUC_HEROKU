import React from 'react'
import { Button } from 'reactstrap';
import { useReactToPrint } from 'react-to-print';
import Results from './Results';
//const ipcRenderer = window.require('electron').ipcRenderer;

function BackPrintBtn() {
    //buttons to disappear when clicked to print
    const [buttonDisplay, setbtnDisplay] = React.useState({ display: 'flex' })
    const print = useReactToPrint({
        content: Results,
    });
    // const onPrint = (e) => {
    //     e.preventDefault()
    //     setbtnDisplay({ display: 'none' })
    //     //SNIPPET FOR OUTPUTTING CURRENT WEB CONTENT TO PDF 
    //     // ipcRenderer.send('print-to-pdf');
    //     // ipcRenderer.on('wrote-pdf', (event, path) => {
    //     //     const message = `Wrote pdf to : ${path}`;
    //     //     alert(message);
    //     // })
    //     print()

    //     window.location = '/allclassSection';
    // }
    const backHandler = () => {
        //window.history.back()
        window.location = '/allclassSection'
    }
    return (
        < div className='mb-5 mt-5 align-self-center justify-content-lg-center' style={buttonDisplay}>
            <Button className='mr-4 text-light font-weight-bold'
                color='success'
                onClick={backHandler}>BACK</Button>
            <Button className='text-light font-weight-bold'
                color='success'
                onClick={print}>PRINT</Button>
        </div>
    )
}

export default BackPrintBtn
