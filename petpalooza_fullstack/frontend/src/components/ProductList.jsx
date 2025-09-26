import React, {useEffect, useState} from 'react';
import api from '../api';

export default function ProductList(){
  const [prods, setProds] = useState([]);
  useEffect(()=>{
    api.get('products/').then(res=> setProds(res.data)).catch(()=>{});
  },[]);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {prods.map(p=> (
          <div key={p.id} className="bg-white text-black p-4 rounded">
            {p.image ? <img src={p.image} alt={p.name} className="w-full h-36 object-cover mb-2"/> : null}
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm">{p.category && p.category.name}</div>
            <div className="text-lg font-bold">₹{p.price}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
