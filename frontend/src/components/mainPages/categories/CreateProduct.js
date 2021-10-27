import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import {useHistory, useParams} from 'react-router-dom';

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    category: '',
    _id: '',
}

export default function CreateProduct() {
    const state = useContext(GlobalState);
    const [product, setProduct] = useState(initialState);
    const [categories] = state.categoriesAPI.categories;
    const [images, setImages] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin;
    const [token] = state.token;
    const history = useHistory();
    const params = useParams();
    const [products, setProducts] = state.productAPI.products;
    const [onEdit, setOnEdit] = useState(false);
    const [callback, setCallback] = state.productAPI.callback;

    useEffect(() => {
        if(params.id){
            setOnEdit(true);
            products.forEach(product =>{
                if(product.id === params.id) {
                    setProduct(product);
                    setImages(product.images);
                }
            })

        }else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
           
    }, [params.id, products])

    const handleUpload = async (e) => {
        e.preventDefault();
        try{
            if(!isAdmin) return alert("Not Admin");
            const file = e.target.files[0];
            
            if(!file) return alert("File not exists");

            if(file.size > 1024*1024){
                return alert("Size too large");
            }

            if(file.type !== "image/jepg" && file.type !== "image/png"){
                return alert("type not acceptable");
            }

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/api/upload', formData, {headers: {'content-type': `multipart/form-data`, Authorization: token}})
            setImages(res.data)
        }
        catch(err){
            alert(err.response.data.msg)
        }
    
    }

    const handleRemove = async (e) => {
        e.preventDefault();
        if(!isAdmin) return alert("Not admin");
        await axios.post('/api/remove', {public_id: images.public_id}, {headers: {Authorization: token}});
        setImages(false);
    }

    const handleChangeInput = async (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!isAdmin) return alert("Not Admin");
            if(!images) return alert("No image");

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, { headers: {Authorization: token}})
            }else{
                await axios.post('/api/products', {...product, images}, { headers: {Authorization: token}})
            }
            setCallback(!callback);
            // setImages(false);
            // setProduct(initialState);
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    return (
        <div>
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange = {handleUpload}/>
                {
                    <div id="file_img">
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleRemove}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                    value={product.product_id} onChange={handleChangeInput} disabled={product._id}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput}/>
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} >
                        <option value="">Select category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}


