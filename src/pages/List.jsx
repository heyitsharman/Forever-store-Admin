import React,{useEffect, useState} from 'react'
import { backendURL } from '../components/Login';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list,setList] = useState([]);
  
  const fetchList = async()=>{
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
      } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendURL + '/api/product/remove', {id}, {headers: {token}});
      if(response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  
  return (
   <>
    <p className='mb-2 text-lg font-medium'>All Products List</p>
    <div className='flex flex-col gap-2'>
      {/* Header Row */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-base'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/* Product List */}
      {list.map((item, index) => (
        <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-base'>
          <img className='w-16 h-16 object-cover rounded' src={item.images[0]} alt="" />
          <p className='font-medium'>{item.name}</p>
          <p>{item.category}</p>
          <p className='hidden md:block font-semibold'>₹{item.price}</p>
          <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-xl text-red-500 hover:text-red-700'>✕</p>
        </div>
      ))}
    </div>
   </>
  )
}

export default List
