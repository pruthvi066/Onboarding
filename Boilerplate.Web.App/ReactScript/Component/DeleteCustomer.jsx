import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './Customer.jsx';
import { Table, Modal, Button, Checkbox, Form, Header, Menu, Image, Container, Icon } from 'semantic-ui-react';
import NavBar from './NavBar';



export default class DeleteCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            address: this.props.data.address,
            id: this.props.data.id,

            modalOpen: false
        };
        this.deletecustomerForm = this.deletecustomerForm.bind(this);
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

    deletecustomerForm() {

      
        let data = {
            Name: this.state.name,
            Address: this.state.address,
            Id: this.state.id,

          
        }


        $.ajax({
            url: "/Customers/DeleteCustomer",
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

                        <Button
                            color="red"
                            icon="cross"
                            labelPosition="right"
                            onClick={() => this.deletecustomerForm()} showDeleteModal={this.showDeleteModal} >
                            <Icon name="close" />
                            Delete</Button>
                           
                    </Modal.Actions>
                    : null}
            </Modal>
        )

    }
}