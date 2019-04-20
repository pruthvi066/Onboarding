import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';


import { Modal, Button, Form, Icon } from "semantic-ui-react";

export default class DeleteSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            customer: props.data.customerId,
            store: props.data.storeId,
            product: props.data.productId,
            date: props.data.dateSold,

         
            modalOpen: false,

         
            salesdata: []

        };
        this.submitDeleteSaleForm = this.submitDeleteSaleForm.bind(this);
    }

    handleClose = () =>
        this.setState(
            {
                modalOpen: false,
                complete: false,




            },

        );
    handleOpen = () =>
        this.setState({ modalOpen: true });
    successCallback = () => {
        this.setState({
            complete: true
        });
    };

    submitDeleteSaleForm = () => {




        let saledata = {
            Id: this.state.id,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        }
        $.ajax({
            url: "/Sales/DeleteSale",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(saledata),
            success: function (data) {
                this.setState({ saledata: data })
                window.location.reload()
            }.bind(this)
        });



    }

   

    render() {
        return (
            <div>
                <Modal trigger={<Button color='red' onClick={this.handleOpen} >
                    <Icon name='trash alternate' />Delete</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}>

                    <Modal.Header>Delete  new Sale</Modal.Header>
                    <Modal.Content>
                        {!this.state.complete ?
                            <Modal.Description>
                               <p>  Are You Sure?</p>
                            </Modal.Description>
                            :
                            <div className='modal-complete'>

                                <p>Your Data deleted sucessfully.</p>
                            </div>


                        }

                    </Modal.Content>
                    {!this.state.complete ?

                        <Modal.Actions>
                            <Button color="black" onClick={this.handleClose}>
                                Cancel
              </Button>
                            <Button
                                color='red'
                                icon="close"
                                labelPosition="right"
                                onClick={() => this.submitDeleteSaleForm()}>
                                <Icon name="close"/>
                                Delete</Button>

                              
                       
                          
                        </Modal.Actions>

                        : null}
                </Modal>
            </div>
        )
    }
}
