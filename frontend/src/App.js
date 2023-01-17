import React from "react";
import UserList from "./components/User";
import ProjectsList from "./components/Projects";
import ToDoTasksList from "./components/ToDoTasks";
import MenuList from "./components/Menu";
import AddFooter from "./components/Footer";
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todotasks': [],
            'menu_links': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users_for_staff/')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo-tasks/')
            .then(response => {
                const todotasks = response.data.results
                console.log(todotasks)
                this.setState(
                    {
                        'todotasks': todotasks
                    }
                )
            }).catch(error => console.log(error))

        const menu_links = [
            {
                'link_name': 'Main Page',
                'menu_link': 'http://localhost:3000/'
            },
            {
                'link_name': 'Users list',
                'menu_link': 'http://127.0.0.1:8000/api/users/'
            },
            {
                'link_name': 'Api',
                'menu_link': 'http://127.0.0.1:8000/api/'
            },
            {
                'link_name': 'Admin Panel',
                'menu_link': 'http://127.0.0.1:8000/admin/'
            },
            {
                'link_name': 'Api Auth',
                'menu_link': 'http://127.0.0.1:8000/api-auth/'
            },
        ]
        this.setState(
            {
                'menu_links': menu_links
            }
        )
    }

    render() {
        return (
            <div>
                <MenuList menu_links={this.state.menu_links}/>
                <UserList users={this.state.users}/>
                <ProjectsList projects={this.state.projects}/>
                <ToDoTasksList todotasks={this.state.todotasks}/>
                <AddFooter/>
            </div>
        )
    }
}

export default App;
