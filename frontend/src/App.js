import React from "react";
import UserList from "./components/User";
import ProjectsList from "./components/Projects";
import ToDoTasksList from "./components/ToDoTasks";
import MenuList from "./components/Menu";
import AddFooter from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
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
                this.setState(
                    {
                        'todotasks': todotasks
                    }
                )
            }).catch(error => console.log(error))

        const menu_links = [
            {
                'link_name': 'Проекты',
                'menu_link': '/projects'
            },
            {
                'link_name': 'Задачи',
                'menu_link': '/todos'
            },
            {
                'link_name': 'Пользователи',
                'menu_link': '/users'
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
            <div className="App">
                <BrowserRouter>
                    <MenuList menu_links={this.state.menu_links}/>
                    <Switch>
                        <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <ToDoTasksList todotasks={this.state.todotasks}/>}/>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/project/:id'
                               component={() => <ProjectDetails todotasks={this.state.todotasks}/>}/>
                        <Redirect from='/' to='/projects'/>
                    </Switch>
                </BrowserRouter>
                <AddFooter/>
            </div>
        )
    }
}

export default App;
