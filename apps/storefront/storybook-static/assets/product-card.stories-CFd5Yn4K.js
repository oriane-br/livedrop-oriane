import{j as o}from"./jsx-runtime-CDt2p4po.js";import{P as r}from"./product-card-IzCuKvjo.js";import"./index-GiUgBvb1.js";import"./card-DKgSboFx.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./badge-_4BIBrpX.js";import"./button-DmPhT7vC.js";const ot={title:"Molecules/ProductCard",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onAddToCart:{action:"addToCart"},onClick:{action:"click"}}},e={id:"1",title:"Wireless Bluetooth Headphones",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",tags:["electronics","audio","wireless"],stockQty:25},a={args:{product:e}},s={args:{product:{...e,title:"Gaming Mechanical Keyboard",price:149.99,image:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",tags:["gaming","keyboard"],stockQty:8}}},c={args:{product:{...e,title:"Premium Smartphone",price:899.99,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",tags:["smartphone","premium"],stockQty:0}}},i={args:{product:e,onClick:t=>alert(`Navigating to ${t.title}`)}},n={args:{product:{...e,title:"Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology and Long Battery Life",price:299.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",tags:["premium","noise-cancelling"],stockQty:15}}},d={args:{product:{...e,title:"Smart Fitness Tracker",price:79.99,image:"https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop",tags:["fitness","wearable","health","smart","tracker","sports"],stockQty:50}}},p={args:{product:{...e,title:"Basic USB Cable",price:9.99,image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",tags:["cable","usb"],stockQty:150}}},l={args:{product:{...e,title:"Professional Camera Lens",price:1299.99,image:"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",tags:["camera","lens","professional"],stockQty:3}}},m={args:{product:{...e,title:"Phone Case",price:4.99,image:"https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",tags:["case","protection"],stockQty:200}}},u={args:{product:e,onAddToCart:t=>{console.log("Added to cart:",t.title),alert(`Added ${t.title} to cart!`)},onClick:t=>{console.log("Clicked product:",t.title),alert(`Viewing details for ${t.title}`)}}},g={render:()=>o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-100",children:[o.jsx(r,{product:{id:"1",title:"Wireless Headphones",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",tags:["electronics","audio"],stockQty:25},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)}),o.jsx(r,{product:{id:"2",title:"Gaming Keyboard",price:149.99,image:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",tags:["gaming","keyboard"],stockQty:8},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)}),o.jsx(r,{product:{id:"3",title:"Smartphone",price:899.99,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",tags:["smartphone","premium"],stockQty:0},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)}),o.jsx(r,{product:{id:"4",title:"Fitness Tracker",price:79.99,image:"https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop",tags:["fitness","wearable"],stockQty:50},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)}),o.jsx(r,{product:{id:"5",title:"USB Cable",price:9.99,image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",tags:["cable","usb"],stockQty:150},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)}),o.jsx(r,{product:{id:"6",title:"Camera Lens",price:1299.99,image:"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",tags:["camera","lens"],stockQty:3},onAddToCart:t=>alert(`Added ${t.title} to cart`),onClick:t=>alert(`Viewing ${t.title}`)})]})};var h,f,k;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    product: defaultProduct
  }
}`,...(k=(f=a.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var C,w,b;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Gaming Mechanical Keyboard',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      tags: ['gaming', 'keyboard'],
      stockQty: 8
    }
  }
}`,...(b=(w=s.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var y,P,A;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Premium Smartphone',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      tags: ['smartphone', 'premium'],
      stockQty: 0
    }
  }
}`,...(A=(P=c.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var $,Q,S;i.parameters={...i.parameters,docs:{...($=i.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    product: defaultProduct,
    onClick: product => alert(\`Navigating to \${product.title}\`)
  }
}`,...(S=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:S.source}}};var T,x,V;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology and Long Battery Life',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      tags: ['premium', 'noise-cancelling'],
      stockQty: 15
    }
  }
}`,...(V=(x=n.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var L,v,B;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Smart Fitness Tracker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop',
      tags: ['fitness', 'wearable', 'health', 'smart', 'tracker', 'sports'],
      stockQty: 50
    }
  }
}`,...(B=(v=d.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var j,H,W;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Basic USB Cable',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
      tags: ['cable', 'usb'],
      stockQty: 150
    }
  }
}`,...(W=(H=p.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var E,G,N;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Professional Camera Lens',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
      tags: ['camera', 'lens', 'professional'],
      stockQty: 3
    }
  }
}`,...(N=(G=l.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var U,M,O;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    product: {
      ...defaultProduct,
      title: 'Phone Case',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      tags: ['case', 'protection'],
      stockQty: 200
    }
  }
}`,...(O=(M=m.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};var F,K,D;u.parameters={...u.parameters,docs:{...(F=u.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    product: defaultProduct,
    onAddToCart: product => {
      console.log('Added to cart:', product.title);
      alert(\`Added \${product.title} to cart!\`);
    },
    onClick: product => {
      console.log('Clicked product:', product.title);
      alert(\`Viewing details for \${product.title}\`);
    }
  }
}`,...(D=(K=u.parameters)==null?void 0:K.docs)==null?void 0:D.source}}};var I,_,R;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-100">\r
      <ProductCard product={{
      id: '1',
      title: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      tags: ['electronics', 'audio'],
      stockQty: 25
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
      \r
      <ProductCard product={{
      id: '2',
      title: 'Gaming Keyboard',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      tags: ['gaming', 'keyboard'],
      stockQty: 8
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
      \r
      <ProductCard product={{
      id: '3',
      title: 'Smartphone',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      tags: ['smartphone', 'premium'],
      stockQty: 0
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
      \r
      <ProductCard product={{
      id: '4',
      title: 'Fitness Tracker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop',
      tags: ['fitness', 'wearable'],
      stockQty: 50
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
      \r
      <ProductCard product={{
      id: '5',
      title: 'USB Cable',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
      tags: ['cable', 'usb'],
      stockQty: 150
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
      \r
      <ProductCard product={{
      id: '6',
      title: 'Camera Lens',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
      tags: ['camera', 'lens'],
      stockQty: 3
    }} onAddToCart={product => alert(\`Added \${product.title} to cart\`)} onClick={product => alert(\`Viewing \${product.title}\`)} />\r
    </div>
}`,...(R=(_=g.parameters)==null?void 0:_.docs)==null?void 0:R.source}}};const rt=["Default","LowStock","OutOfStock","WithClickHandler","LongTitle","MultipleTags","HighStock","ExpensiveProduct","CheapProduct","InteractiveExample","ProductGrid"];export{m as CheapProduct,a as Default,l as ExpensiveProduct,p as HighStock,u as InteractiveExample,n as LongTitle,s as LowStock,d as MultipleTags,c as OutOfStock,g as ProductGrid,i as WithClickHandler,rt as __namedExportsOrder,ot as default};
