import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';


import { Modal, Button, Form, Icon } from "semantic-ui-react";

export default class EditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            customer: props.data.customerId,
            store: props.data.storeId,
            product:props.data.productId,
            date:props.data.dateSold,

         
            modalOpen: false,

           
            salesdata:[]
        
        };
        this.submitEditSaleForm = this.submitEditSaleForm.bind(this);
    }

    handleClose = () =>
        this.setState(
            {
                modalOpen: false,
                complete: false,

              


            },

        );
    handleOpen = () =>
        this.setState({ modalOpen: true }, () => this.getSalesJson());
    successCallback = () => {
        this.setState({
            complete: true
        });
    };

    submitEditSaleForm = () => {




        let saledata = {
            Id: this.state.id,
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        }

        $.ajax({
            url: "/Sales/EditSale",
            type: "PUT",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(saledata),
            success: function (data) {
                this.setState({ saledata: data })
                window.location.reload()
            }.bind(this)
        });

    }

    getSalesJson = () => {
        $.ajax({
            url: "/Sales/GetDropdownJson",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(),
            success: function (data) {
                this.setState({ salesdata: data })
             
            }.bind(this)
        });

    }

    render() {
        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} color='yellow'>
                    <Icon name='edit' />Edit</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}>

                    <Modal.Header>Edit  new Sale</Modal.Header>
                    <Modal.Content>
                        {!this.state.complete ?
                            <Modal.Description>
                                <Form>
                                    <Form.Field>
                                        <Form.Input
                                            onChange={e => this.setState({ date: e.target.value })}
                                            label="DateSold"
                                            placeholder="Date..."
                                            type="date"
                                            value={this.state.date}
                                        />
                                    </Form.Field>
                                    <Form.Select
                                        fluid
                                        label="Customer"
                                        search
                                        selection
                                        options={this.state.salesdata.customer}
                                        placeholder="Customer"
                                        onChange={(e, { value }) => {
                                            this.setState({ customer: value })
                                        }}
                                            value = { this.state.customer }
                                            
                                       
                                    />
                                    <Form.Select
                                        fluid
                                        label="Store"
                                        search
                                        selection
                                        options={this.state.salesdata.store}
                                        placeholder="Store"
                                        onChange={(e, { value }) => {
                                            this.setState({ store: value })
                                        }}
                                        value={this.state.store}

                                    />
                                    <Form.Select
                                        fluid
                                        label="Product"
                                        search
                                        selection
                                        options={this.state.salesdata.product}
                                        placeholder="Product"
                                        onChange={(e, { value }) => {
                                            this.setState({ product: value })
                                        }}
                                        value={this.state.product}

                                    />
                                </Form>
                            </Modal.Description>
                            :
                            <div className='modal-complete'>

                                <p>Your Data saved sucessfully.</p>
                            </div>


                        }

                    </Modal.Content>
                    {!this.state.complete ?

                        <Modal.Actions>
                            <Button color="black" onClick={this.handleClose}>
                                Cancel
              </Button>
                            <Button
                                positive
                                icon="checkmark"
                                labelPosition="right"
                                content="Edit"
                                onClick={() => this.submitEditSaleForm()}
                            />
                        </Modal.Actions>

                        : null}
                </Modal>
            </div>
        )
    }
}
