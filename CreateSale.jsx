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
            customer: "",
            store: "",
            product: "",
            date: "",
           
            complete: false,
            modalOpen: false,
         
            isLoaded: false,
            salesdata: []
        };
    }

    handleClose = () =>
        this.setState(
            {
                modalOpen: false,
                complete: false,
               
               
               
                
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
      

       

        let Saledata = {
            CustomerId: this.state.customer,
            StoreId: this.state.store,
            ProductId: this.state.product,
            DateSold: this.state.date
        };

        fetch("http://localhost:61419/Sales/Create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Saledata)
        })
            .then(res => res.json())
            .then(body => {
                console.log(body);
            })
            .then(() => {
                this.successCallback();
            });
    };

    getSalesDetails = () => {
        fetch("http://localhost:61419/sales/GetDropdownJson")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        
                        salesdata: result
                    });
                }
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
              
            );
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
