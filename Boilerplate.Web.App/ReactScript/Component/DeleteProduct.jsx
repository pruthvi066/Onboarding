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

     

        let data = {
            Name: this.state.name,
            price: this.state.price,
            Id: this.state.id

            //this.props.createCustomer(customer),
            //this.props.showLoading(),
        }


        $.ajax({
            url: "http://localhost:61419/Products/DeleteProduct",
            type: "POST",
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
                        <Button color='black' onClick={this.handleClose}>cancel</Button>

                        <Button color='red'
                            icon="close"
                            labelPosition="right"
                            onClick={this.deleteproductForm} >
                            <Icon name='close' />
                            Delete</Button>

                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}