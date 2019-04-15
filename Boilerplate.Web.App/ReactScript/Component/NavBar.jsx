import { Menu } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import Product from './product.jsx';



export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'customer'
           
            
        };
    }
    
    handleItemClick = (e, { name }) =>
        this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
        return (
            <div>
            <Menu inverted>
               
                    <Menu.Item
                        as={Link} to='customer'
                        name='customer'
                        active={activeItem === 'customer'}
                        onClick={this.handleItemClick} color={'black'}
                    />
                      
                                   
          
                
           
                        <Menu.Item
                            as={Link} to='product'
                            name='product'
                            active={activeItem === 'product'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            as={Link} to='store'
                            name='store'
                            active={activeItem === 'store'}
                            onClick={this.handleItemClick}
                        />
                                     
     
                   
                        <Menu.Item
                            as={Link} to='sales'
                            name='sales'
                            active={activeItem === 'sales'}
                            onClick={this.handleItemClick}
                        />
                                   
    
                 
                </Menu>
            </div>
            )
    }
}