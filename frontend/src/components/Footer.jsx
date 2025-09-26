import React from 'react';

export default function Footer({sections, images}){
  const footImg = images.find(i=> i.name && i.name.toLowerCase().includes('footer'));
  return (
    <footer className="bg-[#1f4bd6] text-white py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
               <div className="w-36">
  <img
    src="/images/logo.png"   // 👈 replace with your actual image path
    alt="logo"
    className="w-full"
  />
  <div className="text-xl font-bold">PetPalooza</div>
</div>
 {/*  */}
        {sections.map(s => (
          <div key={s.id}>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <div dangerouslySetInnerHTML={{__html: s.content}} />
          </div>
        ))}
      </div>
    </footer>
  )
}
