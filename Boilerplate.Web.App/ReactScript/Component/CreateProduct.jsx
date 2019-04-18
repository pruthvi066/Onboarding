import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Redirect } from 'react-router-dom';
import { isBoolean } from 'util';


export default class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',


          
            complete: false,
            modalOpen: false,
            
        };
        //this.props.createCustomer(customer);

        this.createProductForm = this.createProductForm.bind(this);
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
    handleClose = () => this.setState({ modalOpen: false, complete: false }, () => this.props.loadfun())
    handleOpen = () => this.setState({ modalOpen: true })


    createProductForm() {

     
    

        let productdata = {
            Name: this.state.name,
            Price: this.state.price



        }


        $.ajax({
            url: "http://localhost:61419/Products/Create",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(productdata),
            success: function (data) {
                this.setState({ productdata: data })
                window.location.reload()
            }.bind(this)
        });




    }


    formsuccess() {

        alert(" Data Sucessfully Saved");



    }







    render() {


        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} color="blue">New Product</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}>
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
                        {!this.state.complete ?
                            <Modal.Description>
                                <Form >

                                    <Form.Field>
                                        <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..."  />
                                    </Form.Field>

                                    <Form.Field>
                                        <Form.Input required={true} onChange={(e) => this.setState({ price: e.target.value })} label='Price' placeholder="Enter Price..."  />
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
                            <Button color='black' onClick={this.handleClose}>Cancel</Button>

                            <Button positive icon='checkmark' labelPosition='right' type="submit" content="Create"
                                onClick={this.createProductForm} onSubmit={this.formsuccess}>


                            </Button>

                        </Modal.Actions>
                        : null}
                </Modal>
            </div>

        )

    }
}