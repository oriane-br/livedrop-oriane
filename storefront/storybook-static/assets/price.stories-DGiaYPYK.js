import{j as e}from"./jsx-runtime-CDt2p4po.js";import{P as s}from"./price-CVEKLbfW.js";import"./index-GiUgBvb1.js";const O={title:"Atoms/Price",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{amount:{control:{type:"number"}},currency:{control:{type:"select"},options:["USD","EUR","GBP","JPY","CAD"]},size:{control:{type:"select"},options:["sm","md","lg","xl"]},showCurrency:{control:{type:"boolean"}},strikethrough:{control:{type:"boolean"}}}},r={args:{amount:99.99}},a={render:()=>e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(s,{amount:99.99,size:"sm"}),e.jsx(s,{amount:99.99,size:"md"}),e.jsx(s,{amount:99.99,size:"lg"}),e.jsx(s,{amount:99.99,size:"xl"})]})},t={render:()=>e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(s,{amount:.99}),e.jsx(s,{amount:12.5}),e.jsx(s,{amount:99.99}),e.jsx(s,{amount:1299.99}),e.jsx(s,{amount:123456789e-2})]})},n={render:()=>e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"With Currency"}),e.jsx(s,{amount:99.99,showCurrency:!0})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Without Currency"}),e.jsx(s,{amount:99.99,showCurrency:!1})]})]})},c={render:()=>e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsx(s,{amount:99.99,currency:"USD"}),e.jsx(s,{amount:99.99,currency:"EUR"}),e.jsx(s,{amount:99.99,currency:"GBP"}),e.jsx(s,{amount:99.99,currency:"JPY"}),e.jsx(s,{amount:99.99,currency:"CAD"})]})},m={render:()=>e.jsxs("div",{className:"flex flex-col items-center gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Original Price"}),e.jsx(s,{amount:149.99,strikethrough:!0})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Sale Price"}),e.jsx(s,{amount:99.99,size:"lg"})]})]})},i={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{amount:149.99,strikethrough:!0}),e.jsx(s,{amount:99.99,size:"lg"})]})},l={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Product Pricing"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"Small:"}),e.jsx(s,{amount:19.99,size:"sm"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"Medium:"}),e.jsx(s,{amount:49.99,size:"md"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"Large:"}),e.jsx(s,{amount:99.99,size:"lg"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"Premium:"}),e.jsx(s,{amount:199.99,size:"xl"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"Sale Items"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{amount:149.99,strikethrough:!0}),e.jsx(s,{amount:99.99,size:"lg"}),e.jsx("span",{className:"text-sm text-green-600 font-medium",children:"Save $50!"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(s,{amount:79.99,strikethrough:!0}),e.jsx(s,{amount:59.99,size:"lg"}),e.jsx("span",{className:"text-sm text-green-600 font-medium",children:"25% Off"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:"International Pricing"}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600 w-12",children:"USD:"}),e.jsx(s,{amount:99.99,currency:"USD"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600 w-12",children:"EUR:"}),e.jsx(s,{amount:99.99,currency:"EUR"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"text-sm text-gray-600 w-12",children:"GBP:"}),e.jsx(s,{amount:99.99,currency:"GBP"})]})]})]})]})};var o,x,d;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    amount: 99.99
  }
}`,...(d=(x=r.parameters)==null?void 0:x.docs)==null?void 0:d.source}}};var u,p,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">\r
      <Price amount={99.99} size="sm" />\r
      <Price amount={99.99} size="md" />\r
      <Price amount={99.99} size="lg" />\r
      <Price amount={99.99} size="xl" />\r
    </div>
}`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,f,N;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">\r
      <Price amount={0.99} />\r
      <Price amount={12.50} />\r
      <Price amount={99.99} />\r
      <Price amount={1299.99} />\r
      <Price amount={1234567.89} />\r
    </div>
}`,...(N=(f=t.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var v,j,y;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">\r
      <div className="text-center">\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Currency</h3>\r
        <Price amount={99.99} showCurrency={true} />\r
      </div>\r
      <div className="text-center">\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Without Currency</h3>\r
        <Price amount={99.99} showCurrency={false} />\r
      </div>\r
    </div>
}`,...(y=(j=n.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var P,S,z;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">\r
      <Price amount={99.99} currency="USD" />\r
      <Price amount={99.99} currency="EUR" />\r
      <Price amount={99.99} currency="GBP" />\r
      <Price amount={99.99} currency="JPY" />\r
      <Price amount={99.99} currency="CAD" />\r
    </div>
}`,...(z=(S=c.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var C,b,D;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-center gap-4">\r
      <div className="text-center">\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Original Price</h3>\r
        <Price amount={149.99} strikethrough={true} />\r
      </div>\r
      <div className="text-center">\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sale Price</h3>\r
        <Price amount={99.99} size="lg" />\r
      </div>\r
    </div>
}`,...(D=(b=m.parameters)==null?void 0:b.docs)==null?void 0:D.source}}};var U,w,E;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Price amount={149.99} strikethrough={true} />\r
      <Price amount={99.99} size="lg" />\r
    </div>
}`,...(E=(w=i.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var A,k,R;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      <div className="space-y-4">\r
        <h3 className="text-lg font-semibold text-gray-900">Product Pricing</h3>\r
        <div className="flex flex-col gap-2">\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600">Small:</span>\r
            <Price amount={19.99} size="sm" />\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600">Medium:</span>\r
            <Price amount={49.99} size="md" />\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600">Large:</span>\r
            <Price amount={99.99} size="lg" />\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600">Premium:</span>\r
            <Price amount={199.99} size="xl" />\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div className="space-y-4">\r
        <h3 className="text-lg font-semibold text-gray-900">Sale Items</h3>\r
        <div className="flex flex-col gap-2">\r
          <div className="flex items-center gap-2">\r
            <Price amount={149.99} strikethrough={true} />\r
            <Price amount={99.99} size="lg" />\r
            <span className="text-sm text-green-600 font-medium">Save $50!</span>\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <Price amount={79.99} strikethrough={true} />\r
            <Price amount={59.99} size="lg" />\r
            <span className="text-sm text-green-600 font-medium">25% Off</span>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div className="space-y-4">\r
        <h3 className="text-lg font-semibold text-gray-900">International Pricing</h3>\r
        <div className="flex flex-col gap-2">\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600 w-12">USD:</span>\r
            <Price amount={99.99} currency="USD" />\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600 w-12">EUR:</span>\r
            <Price amount={99.99} currency="EUR" />\r
          </div>\r
          <div className="flex items-center gap-2">\r
            <span className="text-sm text-gray-600 w-12">GBP:</span>\r
            <Price amount={99.99} currency="GBP" />\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(R=(k=l.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};const I=["Default","AllSizes","DifferentAmounts","WithAndWithoutCurrency","DifferentCurrencies","SalePrice","SalePriceComparison","CompleteExample"];export{a as AllSizes,l as CompleteExample,r as Default,t as DifferentAmounts,c as DifferentCurrencies,m as SalePrice,i as SalePriceComparison,n as WithAndWithoutCurrency,I as __namedExportsOrder,O as default};
