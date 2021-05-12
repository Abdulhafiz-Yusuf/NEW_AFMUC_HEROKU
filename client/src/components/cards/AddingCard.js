import React from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, Button } from 'reactstrap';



function AddingCard({ sectionName, addtype }) {
    console.log(sectionName)
    console.log(addtype)
    /**
     * This component serves two purposes:
     * 1. Display card showing 'Click here to add section" or 'click here to add class' 
     * depending on prop passed to it from "AllClassSection" component or "AllClasses" component.
     */
    const upperCaseAddtype = addtype.toLocaleUpperCase() //convert the upper case addtype props to Uppercase to be use in card 
    return (
        <div className='d-flex flex-column align-items-center '>
            {
                /**NB: sectionName is available only if there exist a section already and sectionName and addtype prop are the
                 * props passed from "AllClassSection" component display the card here
                 * the sectionName prop is used for the Link to the appropriate route (:sectionname/addclass) e.g(nursery/addclass) as in:
                 *<Route path="/:sectionname/addclass" exact component={addClassForm} />
                */
                sectionName ?
                    <Link className="nav-link active text-light" to={`/${sectionName}/add${addtype}`} >
                        <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                            <CardTitle className='d-flex justify-content-center align-items-center  mt-2' style={{ width: '100px', height: '100px' }}>
                                <h4 className='text-success mt-2 text-center font-weight-bold'>
                                    CLICK HERE TO ADD {upperCaseAddtype}</h4>
                            </CardTitle>
                            <h3 className='text-success font-weight-bold' style={{ fontSize: '60px' }}>+</h3>
                        </Button >
                    </Link >
                    :
                    /**if no Section Availabe and addtype is the only prop passed from "AllClassSection" component display the card here as in:
                     * <Route path="/addsection" exact component={AddClassSectionForm} />
                     */
                    <Link className="nav-link active text-light" to={`/add${addtype}`} >
                        <Button color='light' className='m-3 d-flex flex-column align-items-center text-success border border-success shadow' style={{ width: '170px', height: '200px' }}>
                            <CardTitle className='d-flex justify-content-center align-items-center  mt-2' style={{ width: '100px', height: '100px' }}>
                                <h4 className='text-success mt-2 text-center font-weight-bold'>
                                    CLICK HERE TO ADD {upperCaseAddtype}</h4>
                            </CardTitle>
                            <h3 className='text-success font-weight-bold' style={{ fontSize: '60px' }}>+</h3>
                        </Button >
                    </Link >
            }
        </div>
    )
}

export default AddingCard
