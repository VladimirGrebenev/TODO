import React from 'react'


const AddFooter = ({footer}) => {
    let today = new Date();
    let yyyy = today.getFullYear();

    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    <strong>TODOS</strong> by <a href="https://www.veneberg81.ru/">Veneberg81</a>.  © {yyyy}
                </p>
            </div>
        </footer>
    )
}

export default AddFooter