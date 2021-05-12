import React from 'react'

function Header() {
    return (
        <div>
            {/* THE DIV BELOW SERVE AS TOP PADDING   */}
            <div style={{ height: '50px', width: '150px' }} ></div>
            {/* HEADER HERE */}
            <div className='d-flex flex-column align-items-center mb-5'>
                <h2 className='text-success text-center' >AFMUC INTERNATIONAL MISSIONARY SCHOOL</h2>
                <h4 className='text-success text-center' >STUDENT RESULT MANAGEMENT SYSTEM</h4>


            </div>
        </div>

    )
}

export default Header
