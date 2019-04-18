import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import CreateCustomer from './CreateCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';
import EditCustomer from './EditCustomer.jsx';


export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          

            customer: []
        };
      

    }

    componentDidMount() {
        this.handleCustEvent();
    }


    handleCustEvent = () => {


        $.ajax({
            url: "http://localhost:61419/Customers/GetJsonResult",
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(),
            success: function (data) { this.setState({ customer: data }) }.bind(this)
        });
       
                
            
    }

    render() {
        const customer = this.state.customer;
        
            return (

                <div style={{ marginTop: 20, marginLeft: 20 }}>

                 
                    <CreateCustomer data={Customer} loadfun={this.handleCustEvent} />


                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customer.map(customer => (
                                <Table.Row key={customer.id} >
                     
                                    <Table.Cell>{customer.name}</Table.Cell>

                                    <Table.Cell>{customer.address}</Table.Cell>
                                    <Table.Cell selectable>


                                        <EditCustomer data={customer} loadfun={this.handleCustEvent}/></Table.Cell>

                                    <Table.Cell selectable>

                                        <DeleteCustomer data={customer}  loadfun={this.handleCustEvent} /></Table.Cell>



                                </Table.Row>
                            ))}

                           
                        </Table.Body>
                       
                    </Table>
                   

                </div>

            );

        }
    }
