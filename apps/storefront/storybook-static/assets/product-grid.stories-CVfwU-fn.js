import{j as r}from"./jsx-runtime-CDt2p4po.js";import{r as x}from"./index-GiUgBvb1.js";import{P as F}from"./product-card-IzCuKvjo.js";import"./card-DKgSboFx.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./badge-_4BIBrpX.js";import"./button-DmPhT7vC.js";const f=({products:t,onAddToCart:a,onProductClick:e,emptyStateMessage:m="No products found.",loading:g=!1})=>g?r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4",role:"list","aria-busy":"true",children:Array.from({length:8}).map((s,W)=>r.jsx("div",{role:"listitem",className:"animate-pulse w-full max-w-sm h-80 bg-gray-100 rounded-lg shadow-sm"},W))}):!t||t.length===0?r.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[300px] text-center py-12",children:[r.jsx("svg",{width:"56",height:"56",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"text-gray-300 mb-4",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3.978 9.728a2.25 2.25 0 002.228 1.897h9a2.25 2.25 0 002.228-1.897l.772-5.4A2.25 2.25 0 0016.775 11.4H7.225a2.25 2.25 0 00-2.205 2.328l.752 5.4z"})}),r.jsx("div",{className:"text-gray-600 font-medium mb-2",children:m})]}):r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4",role:"list",children:t.map(s=>r.jsx("div",{role:"listitem",className:"w-full flex",children:r.jsx(F,{product:s,onAddToCart:a,onClick:e})},s.id))});f.__docgenInfo={description:"",methods:[],displayName:"ProductGrid",props:{products:{required:!0,tsType:{name:"Array",elements:[{name:"Product"}],raw:"Product[]"},description:""},onAddToCart:{required:!1,tsType:{name:"signature",type:"function",raw:"(product: Product) => void",signature:{arguments:[{type:{name:"Product"},name:"product"}],return:{name:"void"}}},description:""},onProductClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(product: Product) => void",signature:{arguments:[{type:{name:"Product"},name:"product"}],return:{name:"void"}}},description:""},emptyStateMessage:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'No products found.'",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const J={title:"Organisms/ProductGrid",component:f,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{onAddToCart:{action:"added"},onProductClick:{action:"clicked"}}},o=t=>[...Array(t)].map((a,e)=>({id:`${e+1}`,title:`Sample Product ${e+1}`,price:20+e,image:"https://via.placeholder.com/300",tags:["demo","product",e%2?"tag1":"tag2"],stockQty:e%3===0?0:10+e})),d={args:{products:o(4)}},c={args:{products:o(8)}},n={args:{products:o(12)}},i={args:{products:[],emptyStateMessage:"Nothing to show!"}},u={args:{products:o(1)}},l={args:{loading:!0,products:[]}},p={render:()=>{const t=o(8),[a,e]=x.useState("none"),[m,g]=x.useState("none");return r.jsxs("div",{className:"space-y-4 w-full h-full",children:[r.jsx(f,{products:t,onAddToCart:s=>e(s.title),onProductClick:s=>g(s.title)}),r.jsxs("div",{className:"fixed bottom-2 left-4 text-xs bg-gray-50 border rounded px-3 py-1.5 shadow",children:[r.jsxs("div",{children:["Last Add to Cart: ",a]}),r.jsxs("div",{children:["Last Product Click: ",m]})]})]})}};var h,y,P;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    products: makeProducts(4)
  }
}`,...(P=(y=d.parameters)==null?void 0:y.docs)==null?void 0:P.source}}};var v,k,C;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    products: makeProducts(8)
  }
}`,...(C=(k=c.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var S,j,A;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    products: makeProducts(12)
  }
}`,...(A=(j=n.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var w,N,L;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    products: [],
    emptyStateMessage: 'Nothing to show!'
  }
}`,...(L=(N=i.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var T,b,E;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    products: makeProducts(1)
  }
}`,...(E=(b=u.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var _,q,G;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    loading: true,
    products: []
  }
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var M,V,H;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    const products = makeProducts(8);
    const [lastAdd, setLastAdd] = useState<string>('none');
    const [lastClick, setLastClick] = useState<string>('none');
    return <div className="space-y-4 w-full h-full">\r
        <ProductGrid products={products} onAddToCart={p => setLastAdd(p.title)} onProductClick={p => setLastClick(p.title)} />\r
        <div className="fixed bottom-2 left-4 text-xs bg-gray-50 border rounded px-3 py-1.5 shadow">\r
          <div>Last Add to Cart: {lastAdd}</div>\r
          <div>Last Product Click: {lastClick}</div>\r
        </div>\r
      </div>;
  }
}`,...(H=(V=p.parameters)==null?void 0:V.docs)==null?void 0:H.source}}};const K=["FourProducts","EightProducts","TwelveProducts","EmptyState","SingleProduct","LoadingState","WithHandlers"];export{c as EightProducts,i as EmptyState,d as FourProducts,l as LoadingState,u as SingleProduct,n as TwelveProducts,p as WithHandlers,K as __namedExportsOrder,J as default};
