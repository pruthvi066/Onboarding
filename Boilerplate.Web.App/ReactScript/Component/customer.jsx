import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import CreateCustomer from './CreateCustomer.jsx';
import DeleteCustomer from './DeleteCustomer.jsx';
import EditCustomer from './EditCustomer.jsx';


export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

            customer: []
        };
      

    }

    componentDidMount() {
        this.handleCustEvent(1);
    }


        handleCustEvent = (page) => {
        fetch("http://localhost:61419/Customers/GetJsonResult/?page="+page)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        customer: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, customer } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (

                <div style={{ marginTop: 20, marginLeft: 20 }}>

                 
                    <CreateCustomer dat={Customer} loadfun={this.handleCustEvent} />


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
                            {customer.items.map(customer => (
                                <Table.Row>
                     
                                    <Table.Cell>{customer.name}</Table.Cell>

                                    <Table.Cell>{customer.address}</Table.Cell>
                                    <Table.Cell selectable>

                                   
                                    <EditCustomer data={customer} loadfun={this.handleCustEvent} /></Table.Cell>

                                    <Table.Cell selectable>

                                        <DeleteCustomer data={customer} loadfun={this.handleCustEvent}/></Table.Cell>



                                </Table.Row>
                            ))}

                           
                        </Table.Body>
                       
                    </Table>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'></Table.HeaderCell>

                            <Button icon="arrow left"
                               
                                onClick={() => this.handleCustEvent(this.state.customer.metaData.pageNumber - 1)}
                                disabled={!customer.metaData.hasPreviousPage}/>
                           
                           
                            <Button icon="arrow right"
                              
                                onClick={() => this.handleCustEvent(this.state.customer.metaData.pageNumber + 1)}
                                disabled={!customer.metaData.hasNextPage} />
                        </Table.Row>
                        
                    </Table.Footer>

                </div>

            );

        }
    }
}