import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import CreateProduct from './CreateProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';
import EditProduct from './EditProduct.jsx';


export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
           

           product: []
        };


    }

    componentDidMount() {
        this.handleProductEvent();
    }


    handleProductEvent = () => {
        $.ajax({
            url: "http://localhost:61419/Products/GetProduct",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(),
            success: function (data) {
                this.setState({ product: data })
            }.bind(this)
        });
    }

    render() {
        const product = this.state.product;

      

            return (

                <div style={{ marginTop: 20, marginLeft: 20 }}>


                    <CreateProduct data={product} loadfun={this.handleProductEvent} />


                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                               
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {product.map(product => (
                                <Table.Row key={product.id}>

                                    <Table.Cell>{product.name}</Table.Cell>

                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell selectable>


                                        <EditProduct data={product} loadfun={this.handleProductEvent} /></Table.Cell>
                                    <Table.Cell selectable>


                                        <DeleteProduct data={product} loadfun={this.handleProductEvent} /></Table.Cell>

                                   



                                </Table.Row>
                            ))}


                        </Table.Body>

                    </Table>
                   

                </div>

            );

        
    }
}