import React from "react";
import UserList from "./components/User";
import ProjectsList from "./components/Projects";
import ToDoTasksList from "./components/ToDoTasks";
import MenuList from "./components/Menu";
import AddFooter from "./components/Footer";
import ProjectDetails from "./components/ProjectDetails";
import LoginForm from "./components/Auth";
import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import UserProjects from "./components/UserProjects";
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todotasks': [],
            'menu_links': [],
            'token': '',
            'email': '',
            'authorized_user': '',
        }
    }

    set_token(token, email = '') {
        const cookies = new Cookies()
        cookies.set('token', token, {maxAge: 3600})
        cookies.set('email', email, {maxAge: 3600})
        this.setState({'token': token, 'email': email}, () => this.load_data())
        // window.location.href="/"
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
        window.location.reload();
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const email = cookies.get('email')
        this.setState({'token': token, 'email': email}, () => this.load_data())
    }

    get_token(email, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: email, password: password})
            .then(response => {
                this.set_token(response.data['token'], email)
                alert('Вы авторизовались по почте: ' + email)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers();

        axios.get('http://127.0.0.1:8000/api/users_for_staff/', {headers})
            .then(response => {
                this.setState({users: response.data.results});
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/todo-tasks/', {headers})
            .then(response => {
                this.setState({todotasks: response.data.results})
            }).catch(error => console.log(error));

        this.load_menu();
    }

    // get_auth_user_name() {
    //     const headers = this.get_headers();
    //     axios.get('http://127.0.0.1:8000/api/users_for_staff/', {headers})
    //         .then(response => {
    //             const all_users = response.data.results
    //             const auth_user = all_users.find((user) => user.email === this.state.email)?.user_name;
    //             this.setState({'authorized_user': auth_user})
    //         }).catch(error => console.log(error));
    // }

    get_login_link() {
        if (this.is_authenticated()) {
            // this.get_auth_user_name()
            return (
                <p>
                    <button className="button is-primary">{this.state.email}</button>
                    <button className="button is-light" onClick={() => this.logout()}>Log out</button>
                </p>
            )
        } else {
            return (
                <p>
                    <button className="button is-primary">гость</button>
                    <Link to="/login" className="button is-link">Log in</Link>
                </p>
            );
        }
    }

    load_menu() {
        let is_auth_link = this.get_login_link()
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
            {'menu_links': menu_links, 'is_auth_link': is_auth_link}
        )
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }

    // createProject(title, users, repo_link) {
    //     const headers = this.get_headers()
    //     const data = {title: title, users: users, repo_link: repo_link}
    //     axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
    //         .then(response => {
    //             let new_project = response.data
    //             const title = this.state.title.filter((item) => item.id ===
    //                 new_project.author)[0]
    //             new_book.author = author
    //             this.setState({books: [...this.state.books, new_book]})
    //         }).catch(error => console.log(error))
    // }

    createToDo(description, project) {
        const headers = this.get_headers()
        const author = this.state.users.filter((item) => item.email ===
                    this.state.email)[0]
        const data = {description: description, project: project, author: author}
        axios.post(`http://127.0.0.1:8000/api/todo-tasks/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id ===
                    new_todo.project)[0]
                new_todo.project = project
                this.setState({todotasks: [...this.state.todotasks, new_todo]})
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <MenuList menu_links={this.state.menu_links} is_auth={this.state.is_auth_link}/>
                    <Switch>
                        <Route exact path='/projects'
                               component={() => <ProjectsList projects={this.state.projects}
                                                              delete_project={(id) => this.delete_project(id)}/>}/>
                        <Route exact path='/todos' component={() => <ToDoTasksList todotasks={this.state.todotasks}/>}/>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route exact path='/project/:id'
                               component={() => <ProjectDetails todotasks={this.state.todotasks}
                                                                projects={this.state.projects}/>}/>
                        <Route exact path='/user/:id'
                               component={() => <UserProjects users={this.state.users}
                                                              projects={this.state.projects}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm/>}/>
                        <Route exact path='/todos/create'
                               component={() => <ToDoForm projects={this.state.projects}
                                   createToDo={(description, project) =>
                                   this.createToDo(description, project)} />}/>
                        <Redirect from='/' to='/projects'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
                <AddFooter/>
            </div>
        )
    }
}

export default App;
