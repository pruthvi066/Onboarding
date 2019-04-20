import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Customer from './customer.jsx';


import { Modal, Button, Form } from "semantic-ui-react";

export default class CreateSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer:"" ,
            store:"" ,
            product: "",
            date: "",
          
            modalOpen: false,
         
         
            salesdata: []
        };
    }

    handleClose = () =>
        this.setState(
            {
                modalOpen: false,
                
               
               
               
                
            },
           
        );
    handleOpen = () =>
        this.setState({ modalOpen: true }, () => this.getSalesDetails());
    successCallback = () => {
        this.setState({
            complete: true
        });
    };

    submitCreateSaleForm = () => {
      

       

        let saledata = {
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        };

        $.ajax({
            url: "http://localhost:61419/Sales/Create",
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

    getSalesDetails = () => {
        $.ajax({
            url: "http://localhost:61419/Sales/GetDropdoWnJson",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(),
            success: function (data) {
                this.setState({ salesdata: data })
                
            }.bind(this)
        });

    };

    render() {
        return (
            <div>
                <Modal trigger={<Button onClick={this.handleOpen} color="blue"> New Sale
            </Button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}>
                
                    <Modal.Header>Add  new Sale</Modal.Header>
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

                                    />
                                </Form>
                        </Modal.Description>
                        :
                        <div className='modal-complete'>

                            <p>Your Data is added sucessfully.</p>
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
                                content="Create"
                                onClick={() => this.submitCreateSaleForm()}
                            />
                        </Modal.Actions>

                        : null}
                </Modal>
            </div>
        )
    }
}
