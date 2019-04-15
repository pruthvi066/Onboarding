﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './Customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            address: this.props.data.address,
            id: this.props.data.id,

            nameError: false,

            addressError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.EditcustomerForm = this.EditcustomerForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 1000);
        //this.props.hideLoading();
    }

    handleClose = () => this.setState({ modalOpen: false, complete: false }, () => this.props.loadfun(1))
    handleOpen = () => this.setState({ modalOpen: true })

    EditcustomerForm() {

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

        let data = {
            Name: this.state.name,
            Address: this.state.address,
            Id: this.state.id,

            //this.props.createCustomer(customer),
            //this.props.showLoading(),
        }


        fetch("http://localhost:61419/Customers/EditCustomer", {
            method: "PUT",
            headers: {
                Accept: "application/json",



                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(function (body) {
                console.log(body)
            }).then(() => { this.successCallback(); })

    }





    render() {

        return (

            <Modal trigger={<Button color='yellow' onClick={this.handleOpen} >
                <Icon name='edit' />Edit</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header> Edit Customer</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form error={this.state.formError}>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..." error={this.state.nameError} value={this.state.name} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ address: e.target.value })} label='Address' placeholder="Enter Address..." error={this.state.addressError} value={this.state.address} />
                                </Form.Field>

                            </Form>
                        </Modal.Description>

                        :
                        <div className='modal-complete'>

                            <p>Your Data is updated sucessfully.</p>
                        </div>
                    }
                </Modal.Content>

                {!this.state.complete ?
                    <Modal.Actions>
                        <Button color='black' onClick={this.handleClose}>Close</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Edit" onClick={this.
                            EditcustomerForm} />
                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}