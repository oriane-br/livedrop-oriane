import{C as E}from"./cart-drawer-D2iIcUaZ.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./cart-line-item-cGjWA6cl.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./button-DmPhT7vC.js";const $={title:"Organisms/CartDrawer",component:E,parameters:{layout:"fullscreen"},argTypes:{isOpen:{control:"boolean"},onClose:{action:"closed"},onUpdateQuantity:{action:"quantity updated"},onRemove:{action:"item removed"},onCheckout:{action:"checkout clicked"}}},n=[{product:{id:"1",title:"Wireless Headphones",price:199.99,image:"/api/placeholder/300/300",tags:["electronics","audio"],stockQty:10},quantity:2},{product:{id:"2",title:"Smart Watch",price:299.99,image:"/api/placeholder/300/300",tags:["electronics","wearables"],stockQty:5},quantity:1},{product:{id:"3",title:"Bluetooth Speaker",price:89.99,image:"/api/placeholder/300/300",tags:["electronics","audio"],stockQty:15},quantity:3}],Q=Array.from({length:15},(D,i)=>({product:{id:`item-${i}`,title:`Product ${i+1}`,price:29.99+i*10,image:"/api/placeholder/300/300",tags:["electronics"],stockQty:20},quantity:Math.floor(Math.random()*3)+1})),e={args:{isOpen:!0,items:n}},t={args:{isOpen:!0,items:[]}},r={args:{isOpen:!1,items:n}},s={args:{isOpen:!0,items:Q}},a={args:{isOpen:!0,items:[n[0]]}},o={args:{isOpen:!0,items:n},parameters:{docs:{description:{story:"Try interacting with the cart - update quantities, remove items, or checkout. Use ESC key or click outside to close."}}}};var c,m,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    items: sampleItems
  }
}`,...(p=(m=e.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,d,l;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    items: []
  }
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var g,y,h;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    items: sampleItems
  }
}`,...(h=(y=r.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var O,k,I;s.parameters={...s.parameters,docs:{...(O=s.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    items: manyItems
  }
}`,...(I=(k=s.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};var S,f,C;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    items: [sampleItems[0]]
  }
}`,...(C=(f=a.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var q,v,w;o.parameters={...o.parameters,docs:{...(q=o.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    isOpen: true,
    items: sampleItems
  },
  parameters: {
    docs: {
      description: {
        story: 'Try interacting with the cart - update quantities, remove items, or checkout. Use ESC key or click outside to close.'
      }
    }
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const A=["Default","Empty","Closed","ManyItems","SingleItem","Interactive"];export{r as Closed,e as Default,t as Empty,o as Interactive,s as ManyItems,a as SingleItem,A as __namedExportsOrder,$ as default};
