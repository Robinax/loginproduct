import { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const location = useLocation();
    const history = useHistory();


   async function getProducts() {
        await fetch('http://localhost:8080/product/all',{
            method:"Get",
            headers:{
                "token":location.state.usertoken
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            });
    }
    useEffect(() => {
        getProducts();
    }, []);


   async function handleLogout() {
        const result = await fetch("http://localhost:8080/user/logout",{
         method:'Post',
         headers:{
             "token":location.state.usertoken
         }});
         
         history.push('/login')
    
    }




    return (
        <div>
            <h3>Products done.</h3>
        <div>
        <ul>
                {products.map((product, index) => {
                    return (<li key={index}>
                       Name: {product.name} | Price: {product.price}
                    </li>);
                })}
            </ul>
        </div>
         <div>

                <label>Namn</label>
                <input value={productName} onChange={event => setProductName(event.target.value)}/>
                <label>Pris</label>
                <input value={productPrice} onChange={event => setProductPrice(event.target.value)}/>
                <br/>
                <button onClick={() => {

                    let price = Number.parseInt(productPrice);
                    if (Number.isNaN(price)) {
                        alert("Priset måste vara ett nummer.");
                        return;
                    }

                    fetch('http://localhost:8080/product/create', {
                        method: 'PUT',

                        headers: {
                            token:location.state.usertoken,
                          'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                          name: productName,
                          price: price,
                        })
                    }).then(response => {
                        getProducts();
                    });

                }}>Skapa Produkt</button>

            </div>

        <div>
            Welcome Users <br/>
            <input
            type="button"
            value="Logout"
            onClick={handleLogout}
            />
        </div>
        </div>
    )

}

export default Dashboard;