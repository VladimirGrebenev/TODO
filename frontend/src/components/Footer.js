import React from 'react'


const AddFooter = ({footer}) => {
    let today = new Date();
    let yyyy = today.getFullYear();

    return (
        <div className="footer">
                © {yyyy} Your Company Name. All rights reserved.
        </div>
    )
}

export default AddFooter