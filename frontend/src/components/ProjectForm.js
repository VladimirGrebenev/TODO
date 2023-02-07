import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', users: [], repo_link: '' }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.title)
        console.log(this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">title</label>
                    <input type="text" className="form-control" name="title"
                           value={this.state.title} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label for="users">users</label>
                    <input type="number" className="form-control" name="users"
                           value={this.state.users} onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectForm