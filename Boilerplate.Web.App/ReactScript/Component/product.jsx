import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import CreateProduct from './CreateProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';
import EditProduct from './EditProduct.jsx';


export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

           product: []
        };


    }

    componentDidMount() {
        this.handleProductEvent(1);
    }


    handleProductEvent = (page) => {
        fetch("http://localhost:61419/Products/GetProduct/?page=" + page)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        product: result
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
        const { error, isLoaded, product } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

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
                            {product.items.map(product => (
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
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'></Table.HeaderCell>

                            <Button icon="arrow left"

                                onClick={() => this.handleProductEvent(this.state.product.metaData.pageNumber - 1)}
                                disabled={!product.metaData.hasPreviousPage} />


                            <Button icon="arrow right"

                                onClick={() => this.handleProductEvent(this.state.product.metaData.pageNumber + 1)}
                                disabled={!product.metaData.hasNextPage} />
                        </Table.Row>

                    </Table.Footer>

                </div>

            );

        }
    }
}