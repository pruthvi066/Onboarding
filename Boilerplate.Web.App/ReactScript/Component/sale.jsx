// ./src/common/main.component.jsx
import React, { Component } from "react";
//import PutSales from "./PutSales.jsx";
//import DeleteSales from "./DeleteSales.jsx";
import CreateSale from "./CreateSale.jsx";
import { Table, Button, Label, Dropdown, Container } from "semantic-ui-react";
import EditSale from './EditSale.jsx';
import DeleteSale from './Deletesale.jsx';


export default class Sale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            sales: []

        };
    }
    componentDidMount() {
        this.fetchSales();
    }

    fetchSales = () => {
      
        $.ajax({
            url: "/Sales/GetSalesJson",
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(),
            success: function (data) {
                this.setState({ sales: data })
               
            }.bind(this)
        });
                }
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.

            
    
    render() {

        const sales = this.state.sales;
        return (
            <div style={{ marginTop: 20, marginLeft: 20 }}>

                <CreateSale loadfun={this.fetchSales} />
              
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sales.map(sale => (
                            <Table.Row key={sale.id} >
                                <Table.Cell>{sale.customerName}</Table.Cell>
                                <Table.Cell>{sale.productName}</Table.Cell>
                                <Table.Cell>{sale.storeName}</Table.Cell>
                                <Table.Cell>{sale.dateSold}</Table.Cell>
                                <Table.Cell selectable>
                                    <EditSale loadfun={this.fetchSales} data={sale} />
                                </Table.Cell>
                                <Table.Cell selectable>
                                    <DeleteSale loadfun={this.fetchSales} data={sale} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>



                </Table>

            </div>
        );
    }

}
