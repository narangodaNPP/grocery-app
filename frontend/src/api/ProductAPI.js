import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ProductAPI() {

    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    // const [category, setCategory] = useState('')

    useEffect(() => {
        const getProducts = async () => {
          const res = await axios.get('/api/products')
          setProducts(res.data.products)
        }
        getProducts();
      }, [callback])

    return { 
        products: [products, setProducts],
        callback: [callback, setCallback]
    }
}

// not finished still in some confusion