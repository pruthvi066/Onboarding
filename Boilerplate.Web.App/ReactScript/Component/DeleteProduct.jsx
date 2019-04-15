import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './Customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            price: this.props.data.price,
            id: this.props.data.id,

            nameError: false,

            priceError: false,
            formError: false,
            errorMessage: 'Please complete all required fields.',
            complete: false,
            modalOpen: false
        };
        this.deleteproductForm = this.deleteproductForm.bind(this);
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

    deleteproductForm() {

        let error = false;

        if (this.state.name === '') {
            this.setState({ nameError: true })
            error = true
        } else {
            this.setState({ nameError: false })
            error = false
        }
        if (this.state.price === '') {
            this.setState({ priceError: true })
            error = true
        } else {
            this.setState({ priceError: false })
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
            price: this.state.price,
            Id: this.state.id,

            //this.props.createCustomer(customer),
            //this.props.showLoading(),
        }


        fetch("http://localhost:61419/Products/DeleteProduct", {
            method: "POST",
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

            <Modal trigger={<Button color='red' onClick={this.handleOpen} >
                <Icon name='trash alternate' />Delete</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon={true}>
                <Modal.Header>Delete Customer </Modal.Header>
                <Modal.Content>
                    {!this.state.complete ?
                        <Modal.Description>
                            <p>Are you Sure?</p>
                        </Modal.Description>

                        :
                        <div className='modal-complete'>

                            <p>Your Data is Deleted sucessfully.</p>
                        </div>
                    }
                </Modal.Content>

                {!this.state.complete ?
                    <Modal.Actions>
                        <Button color='black' onClick={this.handleClose}>cancle</Button>

                        <Button color='red' onClick={this.deleteproductForm} >
                            <Icon name='close' />
                            Delete</Button>

                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}