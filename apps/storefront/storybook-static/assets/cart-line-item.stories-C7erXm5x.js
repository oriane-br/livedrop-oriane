import{j as o}from"./jsx-runtime-CDt2p4po.js";import{C as n}from"./cart-line-item-cGjWA6cl.js";import"./index-GiUgBvb1.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./button-DmPhT7vC.js";const rt={title:"Molecules/CartLineItem",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onUpdateQuantity:{action:"updateQuantity"},onRemove:{action:"remove"}}},a={product:{id:"1",title:"Wireless Bluetooth Headphones",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop",tags:["electronics","audio"],stockQty:25},quantity:2},r={args:{item:a}},i={args:{item:{...a,quantity:1}}},s={args:{item:{...a,quantity:25}}},c={args:{item:{...a,quantity:5}}},p={args:{item:{product:{...a.product,title:"Gaming Mechanical Keyboard",price:149.99,image:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop",stockQty:3},quantity:2}}},d={args:{item:{product:{...a.product,title:"Premium Smartphone",price:899.99,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop",stockQty:0},quantity:1}}},m={args:{item:{product:{...a.product,title:"Professional Camera Lens",price:1299.99,image:"https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=64&h=64&fit=crop",stockQty:5},quantity:1}}},u={args:{item:{product:{...a.product,title:"USB Cable",price:9.99,image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop",stockQty:100},quantity:3}}},l={args:{item:{product:{...a.product,title:"Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology",price:299.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop",stockQty:15},quantity:1}}},h={args:{item:a,onUpdateQuantity:(t,e)=>{console.log("Updated quantity:",t,e),alert(`Updated quantity to ${e}`)},onRemove:t=>{console.log("Removed product:",t),alert("Item removed from cart")}}},g={render:()=>o.jsxs("div",{className:"space-y-4 w-full max-w-2xl",children:[o.jsx(n,{item:{product:{id:"1",title:"Wireless Headphones",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop",tags:["electronics","audio"],stockQty:25},quantity:2},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)}),o.jsx(n,{item:{product:{id:"2",title:"Gaming Keyboard",price:149.99,image:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop",tags:["gaming","keyboard"],stockQty:8},quantity:1},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)}),o.jsx(n,{item:{product:{id:"3",title:"Smartphone",price:899.99,image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop",tags:["smartphone","premium"],stockQty:0},quantity:1},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)}),o.jsx(n,{item:{product:{id:"4",title:"Fitness Tracker",price:79.99,image:"https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=64&h=64&fit=crop",tags:["fitness","wearable"],stockQty:50},quantity:3},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)}),o.jsx(n,{item:{product:{id:"5",title:"USB Cable",price:9.99,image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop",tags:["cable","usb"],stockQty:100},quantity:5},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)})]})},y={render:()=>o.jsxs("div",{className:"w-80 space-y-4",children:[o.jsx(n,{item:{product:{id:"1",title:"Wireless Bluetooth Headphones with Noise Cancellation",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop",tags:["electronics","audio"],stockQty:25},quantity:2},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)}),o.jsx(n,{item:{product:{id:"2",title:"Gaming Mechanical Keyboard RGB",price:149.99,image:"https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop",tags:["gaming","keyboard"],stockQty:8},quantity:1},onUpdateQuantity:(t,e)=>alert(`Updated ${t} to ${e}`),onRemove:t=>alert(`Removed ${t}`)})]}),parameters:{viewport:{defaultViewport:"mobile1"}}};var f,I,q;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    item: defaultCartItem
  }
}`,...(q=(I=r.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var v,Q,$;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    item: {
      ...defaultCartItem,
      quantity: 1
    }
  }
}`,...($=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:$.source}}};var w,b,U;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    item: {
      ...defaultCartItem,
      quantity: 25 // Same as stockQty
    }
  }
}`,...(U=(b=s.parameters)==null?void 0:b.docs)==null?void 0:U.source}}};var k,R,C;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    item: {
      ...defaultCartItem,
      quantity: 5
    }
  }
}`,...(C=(R=c.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var S,x,L;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Gaming Mechanical Keyboard',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
        stockQty: 3
      },
      quantity: 2
    }
  }
}`,...(L=(x=p.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var M,j,B;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Premium Smartphone',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop',
        stockQty: 0
      },
      quantity: 1
    }
  }
}`,...(B=(j=d.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var G,N,P;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Professional Camera Lens',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=64&h=64&fit=crop',
        stockQty: 5
      },
      quantity: 1
    }
  }
}`,...(P=(N=m.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var H,T,W;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'USB Cable',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop',
        stockQty: 100
      },
      quantity: 3
    }
  }
}`,...(W=(T=u.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var E,K,O;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
        stockQty: 15
      },
      quantity: 1
    }
  }
}`,...(O=(K=l.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var A,D,F;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    item: defaultCartItem,
    onUpdateQuantity: (productId, quantity) => {
      console.log('Updated quantity:', productId, quantity);
      alert(\`Updated quantity to \${quantity}\`);
    },
    onRemove: productId => {
      console.log('Removed product:', productId);
      alert('Item removed from cart');
    }
  }
}`,...(F=(D=h.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var V,_,z;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-full max-w-2xl">\r
      <CartLineItem item={{
      product: {
        id: '1',
        title: 'Wireless Headphones',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
        tags: ['electronics', 'audio'],
        stockQty: 25
      },
      quantity: 2
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
      \r
      <CartLineItem item={{
      product: {
        id: '2',
        title: 'Gaming Keyboard',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
        tags: ['gaming', 'keyboard'],
        stockQty: 8
      },
      quantity: 1
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
      \r
      <CartLineItem item={{
      product: {
        id: '3',
        title: 'Smartphone',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop',
        tags: ['smartphone', 'premium'],
        stockQty: 0
      },
      quantity: 1
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
      \r
      <CartLineItem item={{
      product: {
        id: '4',
        title: 'Fitness Tracker',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=64&h=64&fit=crop',
        tags: ['fitness', 'wearable'],
        stockQty: 50
      },
      quantity: 3
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
      \r
      <CartLineItem item={{
      product: {
        id: '5',
        title: 'USB Cable',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop',
        tags: ['cable', 'usb'],
        stockQty: 100
      },
      quantity: 5
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
    </div>
}`,...(z=(_=g.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var J,X,Y;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="w-80 space-y-4">\r
      <CartLineItem item={{
      product: {
        id: '1',
        title: 'Wireless Bluetooth Headphones with Noise Cancellation',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
        tags: ['electronics', 'audio'],
        stockQty: 25
      },
      quantity: 2
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
      \r
      <CartLineItem item={{
      product: {
        id: '2',
        title: 'Gaming Mechanical Keyboard RGB',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
        tags: ['gaming', 'keyboard'],
        stockQty: 8
      },
      quantity: 1
    }} onUpdateQuantity={(productId, quantity) => alert(\`Updated \${productId} to \${quantity}\`)} onRemove={productId => alert(\`Removed \${productId}\`)} />\r
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(Y=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const it=["Default","MinimumQuantity","MaximumQuantity","MultipleQuantities","LowStock","OutOfStock","ExpensiveItem","CheapItem","LongTitle","InteractiveExample","CartList","MobileLayout"];export{g as CartList,u as CheapItem,r as Default,m as ExpensiveItem,h as InteractiveExample,l as LongTitle,p as LowStock,s as MaximumQuantity,i as MinimumQuantity,y as MobileLayout,c as MultipleQuantities,d as OutOfStock,it as __namedExportsOrder,rt as default};
