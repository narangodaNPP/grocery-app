import {useState, useEffect} from 'react';
import axios from 'axios';

export default function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [history, setHistory] = useState([])
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        if(token) {
            const getUser = async () => {
                try {   
                    const res = await axios.get('/user/information', {headers: {Authorization: token}})
                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    setCart(res.data.cart)
                    
                } catch (err) {
                    alert(err.response.data.msg);
                }       
            }
            getUser();
        }
    }, [token])
    
    const addCart = async(product) => {
        if(!isLogged) return alert("Please Sign-in or Sign-up first")

        const checkCart = cart.every(item => {
            return item._id !== product._id
        })

        if(checkCart){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {headers: {Authorization: token}})

        }else{
            alert("Product already added")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}


