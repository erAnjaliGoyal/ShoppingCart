import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: []
            },
            products
        }
    }
    modifyCart = (product,modify) => {
        let stateCopy = Object.assign({}, this.state);
        let existingItem = stateCopy.cart.items.find(el=>el.item === product.name)

        if (existingItem && existingItem.item === product.name) {
            if (existingItem.quantity === 1 && modify === '-') { 
                stateCopy.cart.items = stateCopy.cart.items.filter(el=>el.item !== product.name)
                existingItem.quantity --
                // stateCopy.cart.items.splice(existingItem,1) 
            } else { 
                modify === '-' ? existingItem.quantity -- : existingItem.quantity ++
            }
            stateCopy.products.find(el => el.name === product.name).cartQuantity = existingItem.quantity
        } else {
            let obj = {'item': product.name, 'quantity': 1 }
            stateCopy.cart.items.push(obj);
            stateCopy.products.forEach(el => el.name === obj.item ? el.cartQuantity = 1 : '')
        }
        this.setState(stateCopy)
    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList products={this.state.products} modifyCart={this.modifyCart}/>
                    <Cart cart={this.state.cart}/>
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
