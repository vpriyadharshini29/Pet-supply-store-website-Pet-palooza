import React, {useEffect, useState} from 'react';
import api from '../api';

export default function CategoryList(){
  const [cats, setCats] = useState([]);
  useEffect(()=>{
    api.get('categories/').then(res=> setCats(res.data)).catch(()=>{});
  },[]);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        {cats.map(c=> (
          <div key={c.id} className="bg-white text-black p-4 rounded">
            {c.image ? <img src={c.image} alt={c.name} className="w-full h-36 object-cover mb-2"/> : null}
            <div className="font-semibold">{c.name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
