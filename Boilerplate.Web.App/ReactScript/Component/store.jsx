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
        this.handleStoreEvent(1);
    }


    handleStoreEvent = (page) => {
        fetch("http://localhost:61419/stores/GetStore/?page=" + page)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        store: result
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
        const { error, isLoaded, store } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

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
                            {store.items.map(store=> (
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
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'></Table.HeaderCell>

                            <Button icon="arrow left"

                                onClick={() => this.handleStoreEvent(this.state.store.metaData.pageNumber - 1)}
                                disabled={!store.metaData.hasPreviousPage} />


                            <Button icon="arrow right"

                                onClick={() => this.handleStoreEvent(this.state.store.metaData.pageNumber + 1)}
                                disabled={!store.metaData.hasNextPage} />
                        </Table.Row>

                    </Table.Footer>

                </div>

            );

        }
    }
}