import{j as e}from"./jsx-runtime-CDt2p4po.js";import{P as x}from"./product-card-IzCuKvjo.js";import"./index-GiUgBvb1.js";import"./card-DKgSboFx.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./badge-_4BIBrpX.js";import"./button-DmPhT7vC.js";const Z=({products:$,title:g="Related Products",onAddToCart:y,onProductClick:w})=>{const h=$.slice(0,3);return h.length===0?e.jsx("section",{className:"bg-gray-50 py-8","aria-label":"Related products",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-6",children:g}),e.jsxs("div",{className:"text-center py-12",children:[e.jsx("svg",{className:"w-12 h-12 text-gray-300 mx-auto mb-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})}),e.jsx("p",{className:"text-gray-500 text-sm",children:"No related products available"})]})]})}):e.jsx("section",{className:"bg-gray-50 py-8","aria-label":"Related products",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-6",children:g}),e.jsx("div",{className:"hidden md:grid md:grid-cols-3 md:gap-6",children:h.map(r=>e.jsx("div",{className:"w-full",children:e.jsx(x,{product:r,onAddToCart:y,onClick:w})},r.id))}),e.jsx("div",{className:"md:hidden",children:e.jsx("div",{className:"flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4",children:h.map(r=>e.jsx("div",{className:"flex-shrink-0 w-64 snap-start",children:e.jsx(x,{product:r,onAddToCart:y,onClick:w})},r.id))})})]})})};Z.__docgenInfo={description:"",methods:[],displayName:"RelatedProducts",props:{products:{required:!0,tsType:{name:"Array",elements:[{name:"Product"}],raw:"Product[]"},description:""},title:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Related Products'",computed:!1}},onAddToCart:{required:!1,tsType:{name:"signature",type:"function",raw:"(product: Product) => void",signature:{arguments:[{type:{name:"Product"},name:"product"}],return:{name:"void"}}},description:""},onProductClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(product: Product) => void",signature:{arguments:[{type:{name:"Product"},name:"product"}],return:{name:"void"}}},description:""}}};const le={title:"Organisms/RelatedProducts",component:Z,parameters:{layout:"padded"},argTypes:{onAddToCart:{action:"add to cart"},onProductClick:{action:"product clicked"}}},t=[{id:"1",title:"Wireless Headphones",price:199.99,image:"/api/placeholder/300/300",tags:["electronics","audio"],stockQty:10},{id:"2",title:"Smart Watch",price:299.99,image:"/api/placeholder/300/300",tags:["electronics","wearables"],stockQty:5},{id:"3",title:"Bluetooth Speaker",price:89.99,image:"/api/placeholder/300/300",tags:["electronics","audio"],stockQty:15}],ee=t.slice(0,2),te=t.slice(0,1),s={args:{products:t},parameters:{docs:{description:{story:"Default related products section with 3 products. Shows grid layout on desktop and horizontal scroll on mobile."}}}},o={args:{products:t,title:"You Might Also Like"},parameters:{docs:{description:{story:"Related products with custom title and exactly 3 products."}}}},a={args:{products:ee,title:"Similar Products"},parameters:{docs:{description:{story:"Related products with only 2 products available. Still shows proper layout."}}}},n={args:{products:te,title:"Recommended"},parameters:{docs:{description:{story:"Related products with only 1 product available."}}}},c={args:{products:[],title:"Related Products"},parameters:{docs:{description:{story:"Empty state when no related products are available. Shows a helpful message and icon."}}}},d={args:{products:t,title:"Customers Also Bought"},parameters:{docs:{description:{story:"Related products with a custom section title."}}}},i={args:{products:t,title:"Interactive Demo"},parameters:{docs:{description:{story:"Interactive demo with click handlers. Try clicking on products or the add to cart buttons."}}}},l={args:{products:t},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Related products on mobile devices. Shows horizontal scroll with snap points."}}}},p={args:{products:t},parameters:{viewport:{defaultViewport:"tablet"},docs:{description:{story:"Related products on tablet devices. Shows grid layout."}}}},u={args:{products:t},parameters:{viewport:{defaultViewport:"desktop"},docs:{description:{story:"Related products on desktop devices. Shows 3-column grid layout."}}}},m={args:{products:[...t,{id:"4",title:"Gaming Mouse",price:79.99,image:"/api/placeholder/300/300",tags:["electronics","gaming"],stockQty:20},{id:"5",title:"Mechanical Keyboard",price:149.99,image:"/api/placeholder/300/300",tags:["electronics","gaming"],stockQty:8}],title:"More Products"},parameters:{docs:{description:{story:"Related products with more than 3 products available. Only shows the first 3 products."}}}};var v,P,b;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    products: sampleProducts
  },
  parameters: {
    docs: {
      description: {
        story: 'Default related products section with 3 products. Shows grid layout on desktop and horizontal scroll on mobile.'
      }
    }
  }
}`,...(b=(P=s.parameters)==null?void 0:P.docs)==null?void 0:b.source}}};var f,k,S;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    products: sampleProducts,
    title: 'You Might Also Like'
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with custom title and exactly 3 products.'
      }
    }
  }
}`,...(S=(k=o.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var R,j,T;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    products: twoProducts,
    title: 'Similar Products'
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with only 2 products available. Still shows proper layout.'
      }
    }
  }
}`,...(T=(j=a.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var N,M,V;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    products: oneProduct,
    title: 'Recommended'
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with only 1 product available.'
      }
    }
  }
}`,...(V=(M=n.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var W,C,D;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    products: [],
    title: 'Related Products'
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no related products are available. Shows a helpful message and icon.'
      }
    }
  }
}`,...(D=(C=c.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var Q,A,E;d.parameters={...d.parameters,docs:{...(Q=d.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    products: sampleProducts,
    title: 'Customers Also Bought'
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with a custom section title.'
      }
    }
  }
}`,...(E=(A=d.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var O,I,L;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    products: sampleProducts,
    title: 'Interactive Demo'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click handlers. Try clicking on products or the add to cart buttons.'
      }
    }
  }
}`,...(L=(I=i.parameters)==null?void 0:I.docs)==null?void 0:L.source}}};var q,z,B;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    products: sampleProducts
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Related products on mobile devices. Shows horizontal scroll with snap points.'
      }
    }
  }
}`,...(B=(z=l.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var _,H,F;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    products: sampleProducts
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Related products on tablet devices. Shows grid layout.'
      }
    }
  }
}`,...(F=(H=p.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var G,K,Y;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    products: sampleProducts
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Related products on desktop devices. Shows 3-column grid layout.'
      }
    }
  }
}`,...(Y=(K=u.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};var J,U,X;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    products: [...sampleProducts, {
      id: '4',
      title: 'Gaming Mouse',
      price: 79.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics', 'gaming'],
      stockQty: 20
    }, {
      id: '5',
      title: 'Mechanical Keyboard',
      price: 149.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics', 'gaming'],
      stockQty: 8
    }],
    title: 'More Products'
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with more than 3 products available. Only shows the first 3 products.'
      }
    }
  }
}`,...(X=(U=m.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};const pe=["Default","WithThreeProducts","WithFewerThanThree","WithOneProduct","EmptyState","CustomTitle","WithHandlers","MobileView","TabletView","DesktopView","ManyProducts"];export{d as CustomTitle,s as Default,u as DesktopView,c as EmptyState,m as ManyProducts,l as MobileView,p as TabletView,a as WithFewerThanThree,i as WithHandlers,n as WithOneProduct,o as WithThreeProducts,pe as __namedExportsOrder,le as default};
