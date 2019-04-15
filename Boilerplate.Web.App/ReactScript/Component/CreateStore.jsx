import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Redirect } from 'react-router-dom';
import store from './store.jsx';


export default class CreateStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',


            nameError: false,

            addressError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false,
            redirectToReferrer: false
        };
        //this.props.createCustomer(customer);

        this.createstoreForm = this.createstoreForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }





    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 1000);

        // this.props.showLoading();
        // this.props.hideLoading();
    }


    handleSubmit = () => this.setState({ modalOpen: false })
    handleClose = () => this.setState({ modalOpen: false, complete: false }, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })


    createstoreForm() {

        this.setState({
            redirectToReferrer: true
        })
        let error = false;

        if (this.state.name === '') {
            this.setState({ nameError: true })
            error = true

        } else {
            this.setState({ nameError: false })
            error = false
        }
        if (this.state.address === '') {
            this.setState({ addressError: true })
            error = true

        } else {
            this.setState({ addressError: false })
            error = false
        }

        if (error) {
            this.setState({ formError: true })
            return
        } else {
            this.setState({ formError: false })
        }

        let storedata = {
            Name: this.state.name,
            Address: this.state.address,



        }


        fetch("http://localhost:61419/Stores/Create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",

            },
            body: JSON.stringify(storedata)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })




    }


    formsuccess() {

        alert(" Data Sucessfully Saved");



    }







    render() {


        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} color="blue">New Store</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}>
                    <Modal.Header>Create Store</Modal.Header>
                    <Modal.Content>
                        {!this.state.complete ?
                            <Modal.Description>
                                <Form error={this.state.formError}>

                                    <Form.Field>
                                        <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..." error={this.state.nameError} />
                                    </Form.Field>

                                    <Form.Field>
                                        <Form.Input required={true} onChange={(e) => this.setState({ address: e.target.value })} label='Address' placeholder="Enter Address..." error={this.state.addressError} />
                                    </Form.Field>

                                </Form>
                            </Modal.Description>

                            :
                            <div className='modal-complete'>
                                <p>Your Data is submitted sucessfully.</p>


                            </div>
                        }
                    </Modal.Content>

                    {!this.state.complete ?
                        <Modal.Actions>
                            <Button color='black' onClick={this.handleClose}>Close</Button>

                            <Button positive icon='checkmark' labelPosition='right' type="submit" content="Create"
                                onClick={this.createstoreForm} onSubmit={this.formsuccess}>


                            </Button>

                        </Modal.Actions>
                        : null}
                </Modal>
            </div>

        )

    }
}