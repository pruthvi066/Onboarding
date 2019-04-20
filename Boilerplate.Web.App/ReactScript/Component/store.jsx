import React, { Component } from 'react';
import { Table, Modal, Button, Checkbox, Form, Header, Image } from 'semantic-ui-react';
import CreateStore from './CreateStore.jsx';
import DeleteStore from './DeleteStore.jsx';
import EditStore from './EditStore.jsx';


export default class store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

            store: []
        };


    }

    componentDidMount() {
        this.handleStoreEvent();
    }


    handleStoreEvent = () => {
        $.ajax({
            url: "/stores/GetStore",
            type: "POST",
            contentType: 'applicatio/json',
            dataType: 'json',
            data: JSON.stringify(),
            success: function (data) { this.setState({ store: data }) }.bind(this)
        });

    }

    render() {
        const store = this.state.store;


        return (

            <div style={{ marginTop: 20, marginLeft: 20 }}>


                <CreateStore dat={store} loadfun={this.handleStoreEvent} />


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
                        {store.map(store => (
                            <Table.Row key={store.id}>

                                <Table.Cell>{store.name}</Table.Cell>

                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell selectable>


                                    <EditStore data={store} loadfun={this.handleStoreEvent} /></Table.Cell>

                                <Table.Cell selectable>

                                    <DeleteStore data={store} loadfun={this.handleStoreEvent} /></Table.Cell>



                            </Table.Row>
                        ))}


                    </Table.Body>

                </Table>
               

            </div>

        );

    }
    
}