import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';
import Product from './Product.jsx';
import Store from './store.jsx';
import Sale from './sale.jsx';




export default class App extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <NavBar />
                    <Route exact path="/" component={Customer} />
                    <Route exact path="/customer" component={Customer} />
                    <Route exact path="/product" component={Product} />
                    <Route exact path="/sales" component={Sale} />
                    <Route exact path="/store" component={Store} />

                </div>
            </Router>
           
            
            
         

            
        

        );
    }
}