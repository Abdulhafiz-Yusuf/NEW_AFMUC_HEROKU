import * as React from 'react';
import { NaijaStates, NaijaLGA, bgData } from '../data';
import { Collapse, Card, Button, FormGroup, Label, Input } from 'reactstrap';

function SearchBar(props) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const locToggle = () => setIsOpen(!isOpen);
    const bgToggle = () => setIsOpen2(!isOpen2);


    const [searchText, setSearchText] = React.useState({
        loc_state: 'Select',
        loc_lga: NaijaLGA['Abia'][0]
    })

    let LGAs = NaijaLGA[searchText.loc_state]


    const lochandleChange = (e) => {
        const value = e.target.value
        console.log(e.target.id)

        setSearchText({
            ...searchText,
            [e.target.name]: value
        })

        props.locSearchHandler(value)
    }

    const bgHanleChange = (e) => {
        const value = e.target.value
        props.bgHanleChange(value)
    }
    return (

        < div className='d-flex flex-row justify-content-between' >
            {/* Search by Location */}
            < div className='w-50 ' >
                <Card >
                    <Button color="danger" onClick={locToggle} style={{ marginBottom: '1rem' }}> Search by Location</Button>
                    <Collapse isOpen={isOpen} className='border' >
                        <div className='d-flex flex-row justify-content-between' >
                            <FormGroup className='w-50 pl-1 pr-1'>
                                <Label for="exampleSelect">State</Label>
                                <Input className='' type="select" name="loc_state" value={searchText.loc_state} onChange={lochandleChange} >
                                    {NaijaStates.map((state, index) => (
                                        <option id={index} value={state}>{state}</option>
                                    ))
                                    }
                                </Input>
                            </FormGroup>

                            <FormGroup className='w-50 pl-2 pr-2'>
                                <Label for="state">L.G.A</Label>
                                <Input type="select" name="loc_lga" value={searchText.loc_lga} onChange={lochandleChange}>
                                    {LGAs.map((lga, index) => (
                                        <option key={index} value={lga}> {lga}</option>
                                    ))
                                    }
                                </Input>
                            </FormGroup>


                        </div>
                    </Collapse>
                </Card>
            </div >

            {/* Search by Blood Group */}
            < div style={{ width: '520px' }
            } >
                <Card  >
                    <Button color="danger" onClick={bgToggle} style={{ marginBottom: '1rem' }}> Search by Blood Group</Button>
                    <Collapse isOpen={isOpen2}>
                        <FormGroup tag="fieldset" >
                            <div className='d-flex flex-row flex-wrap justify-content-between pl-5 pr-5' >
                                {bgData.map((bg, index) => {
                                    return (
                                        <FormGroup check >
                                            <Label check className='pl-5'>
                                                <Input id={index} type="radio" name="{bg.bg}" value={bg.id} onChange={bgHanleChange} />
                                                {bg.bg}<sup>{bg.pn}</sup>
                                            </Label>
                                        </FormGroup>
                                    )
                                })
                                }
                            </div>

                        </FormGroup>
                    </Collapse>
                </Card>
            </div >
        </div >
    )
}

export default SearchBar
