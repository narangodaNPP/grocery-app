import {useState, useEffect} from 'react';
import axios from 'axios';

export default function ProductAPI() {

    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [result, setResult] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
          const res = await axios.get('/api/products')
          setProducts(res.data.products);
          setResult(res.data.result);
        }
        getProducts();
      }, [callback, category,])

    return { 
      products: [products, setProducts],
      callback: [callback, setCallback],
      category: [category, setCategory],
      result: [result, setResult]
    }
}

// not finished still in some confusion with search implementation