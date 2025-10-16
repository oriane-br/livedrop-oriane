import{j as e}from"./jsx-runtime-CDt2p4po.js";import{I as s}from"./image-DnMFrjA_.js";import"./index-GiUgBvb1.js";const Z={title:"Atoms/Image",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{aspectRatio:{control:{type:"select"},options:["1/1","4/3","16/9","auto"]},objectFit:{control:{type:"select"},options:["cover","contain","fill"]},lazy:{control:{type:"boolean"}}}},a={args:{src:"https://picsum.photos/400/300",alt:"Random image"}},t={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-4 w-96",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Square (1:1)"}),e.jsx(s,{src:"https://picsum.photos/300/300",alt:"Square image",aspectRatio:"1/1"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"4:3"}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"4:3 image",aspectRatio:"4/3"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"16:9"}),e.jsx(s,{src:"https://picsum.photos/800/450",alt:"16:9 image",aspectRatio:"16/9"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Auto"}),e.jsx(s,{src:"https://picsum.photos/400/600",alt:"Auto aspect image",aspectRatio:"auto"})]})]})},r={render:()=>e.jsxs("div",{className:"grid grid-cols-3 gap-4 w-96",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Cover"}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Cover image",aspectRatio:"1/1",objectFit:"cover"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Contain"}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Contain image",aspectRatio:"1/1",objectFit:"contain"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Fill"}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Fill image",aspectRatio:"1/1",objectFit:"fill"})]})]})},o={args:{src:"https://invalid-url-that-will-fail.jpg",alt:"Image with fallback",fallbackSrc:"https://picsum.photos/400/300"}},c={args:{src:"https://picsum.photos/400/300?delay=2000",alt:"Loading image"}},i={args:{src:"https://invalid-url-that-will-fail.jpg",alt:"Error image"}},m={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsx("div",{className:"h-96 bg-gray-100 flex items-center justify-center",children:e.jsx("p",{className:"text-gray-500",children:"Scroll down to see lazy loaded images"})}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Lazy loaded image 1",lazy:!0}),e.jsx("div",{className:"h-96 bg-gray-100 flex items-center justify-center",children:e.jsx("p",{className:"text-gray-500",children:"More content"})}),e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Lazy loaded image 2",lazy:!0})]})},l={render:()=>e.jsxs("div",{className:"w-64 border rounded-lg overflow-hidden shadow-sm",children:[e.jsx(s,{src:"https://picsum.photos/400/300",alt:"Product image",aspectRatio:"4/3",objectFit:"cover"}),e.jsxs("div",{className:"p-4",children:[e.jsx("h3",{className:"font-medium text-gray-900",children:"Product Name"}),e.jsx("p",{className:"text-sm text-gray-500",children:"$29.99"})]})]})},n={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-2 w-96",children:[e.jsx(s,{src:"https://picsum.photos/200/200",alt:"Gallery image 1",aspectRatio:"1/1",objectFit:"cover"}),e.jsx(s,{src:"https://picsum.photos/200/300",alt:"Gallery image 2",aspectRatio:"1/1",objectFit:"cover"}),e.jsx(s,{src:"https://picsum.photos/300/200",alt:"Gallery image 3",aspectRatio:"1/1",objectFit:"cover"}),e.jsx(s,{src:"https://picsum.photos/250/250",alt:"Gallery image 4",aspectRatio:"1/1",objectFit:"cover"})]})},p={render:()=>e.jsx("div",{className:"w-full max-w-4xl",children:e.jsx(s,{src:"https://picsum.photos/1200/600",alt:"Hero image",aspectRatio:"16/9",objectFit:"cover",className:"rounded-lg"})})},d={render:()=>e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(s,{src:"https://picsum.photos/100/100",alt:"User avatar",aspectRatio:"1/1",objectFit:"cover",className:"w-12 h-12 rounded-full"}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"John Doe"}),e.jsx("p",{className:"text-sm text-gray-500",children:"Software Developer"})]})]})},h={args:{src:"https://picsum.photos/400/300",alt:"Interactive image",onLoadError:()=>console.log("Image failed to load"),onLoad:()=>console.log("Image loaded successfully")}};var g,u,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Random image'
  }
}`,...(v=(u=a.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};var x,j,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4 w-96">\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">Square (1:1)</h3>\r
        <Image src="https://picsum.photos/300/300" alt="Square image" aspectRatio="1/1" />\r
      </div>\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">4:3</h3>\r
        <Image src="https://picsum.photos/400/300" alt="4:3 image" aspectRatio="4/3" />\r
      </div>\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">16:9</h3>\r
        <Image src="https://picsum.photos/800/450" alt="16:9 image" aspectRatio="16/9" />\r
      </div>\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">Auto</h3>\r
        <Image src="https://picsum.photos/400/600" alt="Auto aspect image" aspectRatio="auto" />\r
      </div>\r
    </div>
}`,...(f=(j=t.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};var y,N,b;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-3 gap-4 w-96">\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">Cover</h3>\r
        <Image src="https://picsum.photos/400/300" alt="Cover image" aspectRatio="1/1" objectFit="cover" />\r
      </div>\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">Contain</h3>\r
        <Image src="https://picsum.photos/400/300" alt="Contain image" aspectRatio="1/1" objectFit="contain" />\r
      </div>\r
      <div>\r
        <h3 className="text-sm font-medium mb-2">Fill</h3>\r
        <Image src="https://picsum.photos/400/300" alt="Fill image" aspectRatio="1/1" objectFit="fill" />\r
      </div>\r
    </div>
}`,...(b=(N=r.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var R,I,F;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    alt: 'Image with fallback',
    fallbackSrc: 'https://picsum.photos/400/300'
  }
}`,...(F=(I=o.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var w,S,L;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/400/300?delay=2000',
    alt: 'Loading image'
  }
}`,...(L=(S=c.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var z,C,G;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    alt: 'Error image'
  }
}`,...(G=(C=i.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var A,E,k;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      <div className="h-96 bg-gray-100 flex items-center justify-center">\r
        <p className="text-gray-500">Scroll down to see lazy loaded images</p>\r
      </div>\r
      <Image src="https://picsum.photos/400/300" alt="Lazy loaded image 1" lazy={true} />\r
      <div className="h-96 bg-gray-100 flex items-center justify-center">\r
        <p className="text-gray-500">More content</p>\r
      </div>\r
      <Image src="https://picsum.photos/400/300" alt="Lazy loaded image 2" lazy={true} />\r
    </div>
}`,...(k=(E=m.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var D,P,q;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="w-64 border rounded-lg overflow-hidden shadow-sm">\r
      <Image src="https://picsum.photos/400/300" alt="Product image" aspectRatio="4/3" objectFit="cover" />\r
      <div className="p-4">\r
        <h3 className="font-medium text-gray-900">Product Name</h3>\r
        <p className="text-sm text-gray-500">$29.99</p>\r
      </div>\r
    </div>
}`,...(q=(P=l.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var H,O,J;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-2 w-96">\r
      <Image src="https://picsum.photos/200/200" alt="Gallery image 1" aspectRatio="1/1" objectFit="cover" />\r
      <Image src="https://picsum.photos/200/300" alt="Gallery image 2" aspectRatio="1/1" objectFit="cover" />\r
      <Image src="https://picsum.photos/300/200" alt="Gallery image 3" aspectRatio="1/1" objectFit="cover" />\r
      <Image src="https://picsum.photos/250/250" alt="Gallery image 4" aspectRatio="1/1" objectFit="cover" />\r
    </div>
}`,...(J=(O=n.parameters)==null?void 0:O.docs)==null?void 0:J.source}}};var M,U,W;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => <div className="w-full max-w-4xl">\r
      <Image src="https://picsum.photos/1200/600" alt="Hero image" aspectRatio="16/9" objectFit="cover" className="rounded-lg" />\r
    </div>
}`,...(W=(U=p.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};var _,$,T;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="flex items-center space-x-4">\r
      <Image src="https://picsum.photos/100/100" alt="User avatar" aspectRatio="1/1" objectFit="cover" className="w-12 h-12 rounded-full" />\r
      <div>\r
        <h4 className="font-medium">John Doe</h4>\r
        <p className="text-sm text-gray-500">Software Developer</p>\r
      </div>\r
    </div>
}`,...(T=($=d.parameters)==null?void 0:$.docs)==null?void 0:T.source}}};var B,K,Q;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Interactive image',
    onLoadError: () => console.log('Image failed to load'),
    onLoad: () => console.log('Image loaded successfully')
  }
}`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};const ee=["Default","AspectRatios","ObjectFit","WithFallback","LoadingState","ErrorState","LazyLoading","ProductCard","Gallery","HeroImage","Avatar","Interactive"];export{t as AspectRatios,d as Avatar,a as Default,i as ErrorState,n as Gallery,p as HeroImage,h as Interactive,m as LazyLoading,c as LoadingState,r as ObjectFit,l as ProductCard,o as WithFallback,ee as __namedExportsOrder,Z as default};
