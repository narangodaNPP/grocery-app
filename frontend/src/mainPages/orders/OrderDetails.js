import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';

export default function OrderDetails() {
    const state = useContext(GlobalState);
    const [history] = state.userAPI.history;
    const [orderDetails, setOrderDetails] = useState([]);

    const params = useParams()

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])


    if(orderDetails.length === 0) 
        return null;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.first_name}</td>
                        <td>{orderDetails.last_name}</td>
                        <td>{orderDetails.address.houseNo + ", " + orderDetails.address.street + ", " +orderDetails.address.city}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>$ {item.price * item.quantity}</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}
