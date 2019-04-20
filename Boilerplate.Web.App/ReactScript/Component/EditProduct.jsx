import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Product from './product';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            price: this.props.data.price,
            id: this.props.data.id,

         
            modalOpen: false
        };
        this.EditProductForm = this.EditProductForm.bind(this);
        this.successCallback = this.successCallback.bind(this);
    }



    successCallback() {
        this.setState({
            complete: true
        })
        setTimeout(() => { this.setState({ modalOpen: false }) }, 1000);
        //this.props.hideLoading();
    }

    handleClose = () => this.setState({ modalOpen: false, complete: false }, () => this.props.loadfun())
    handleOpen = () => this.setState({ modalOpen: true })

    EditProductForm() {



        let data = {
            Name: this.state.name,
            price: this.state.price,
            Id: this.state.id

            //this.props.createCustomer(customer),
            //this.props.showLoading(),
        }


        $.ajax({
            url: "/Products/EditProduct",
            type: "PUT",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (data) {
                this.setState({ data: data })
                window.location.reload()
            }.bind(this)
        });
    }





    render() {

        return (

            <Modal trigger={<Button color='yellow' onClick={this.handleOpen} >
                <Icon name='edit' />Edit</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header> Edit Product</Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <Form>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ name: e.target.value })} label='Name' placeholder="Enter Name..."  value={this.state.name} />
                                </Form.Field>

                                <Form.Field>
                                    <Form.Input required={true} onChange={(e) => this.setState({ price: e.target.value })} label='price' placeholder="Enter price..."  value={this.state.price} />
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
                        <Button color='black' onClick={this.handleClose}>Cancle</Button>
                        <Button positive icon='checkmark' labelPosition='right' content="Edit" onClick={this.EditProductForm} />
                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}