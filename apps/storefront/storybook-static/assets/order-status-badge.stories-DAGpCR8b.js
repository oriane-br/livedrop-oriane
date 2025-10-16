import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as oe}from"./badge-_4BIBrpX.js";import"./index-GiUgBvb1.js";const s=({status:h,carrier:f,eta:y,size:ce="md"})=>{const r=(N=>{switch(N){case"Placed":return{variant:"info",icon:"📦",label:"Placed",ariaLabel:"Order placed"};case"Packed":return{variant:"warning",icon:"📋",label:"Packed",ariaLabel:"Order packed"};case"Shipped":return{variant:"success",icon:"🚚",label:"Shipped",ariaLabel:"Order shipped"};case"Delivered":return{variant:"success",icon:"✅",label:"Delivered",ariaLabel:"Order delivered"};default:return{variant:"default",icon:"📦",label:N,ariaLabel:`Order ${N.toLowerCase()}`}}})(h),me=(h==="Shipped"||h==="Delivered")&&(f||y);return e.jsxs("div",{className:"flex flex-col items-start gap-1",children:[e.jsx(oe,{variant:r.variant,size:ce,icon:e.jsx("span",{children:r.icon}),"aria-label":r.ariaLabel,children:r.label}),me&&e.jsxs("div",{className:"text-xs text-gray-600 space-y-0.5","data-testid":"carrier-info",children:[f&&e.jsxs("div",{children:["Carrier: ",f]}),y&&e.jsxs("div",{children:["ETA: ",y]})]})]})};s.__docgenInfo={description:"",methods:[],displayName:"OrderStatusBadge",props:{status:{required:!0,tsType:{name:"union",raw:"'Placed' | 'Packed' | 'Shipped' | 'Delivered'",elements:[{name:"literal",value:"'Placed'"},{name:"literal",value:"'Packed'"},{name:"literal",value:"'Shipped'"},{name:"literal",value:"'Delivered'"}]},description:""},carrier:{required:!1,tsType:{name:"string"},description:""},eta:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}}}};const ge={title:"Molecules/OrderStatusBadge",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{status:{control:{type:"select"},options:["Placed","Packed","Shipped","Delivered"]},size:{control:{type:"select"},options:["sm","md","lg"]}}},a={args:{status:"Placed"}},t={args:{status:"Packed"}},i={args:{status:"Shipped",carrier:"DHL Express",eta:"2024-01-15"}},d={args:{status:"Delivered",carrier:"UPS",eta:"2024-01-10"}},n={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"text-sm font-medium text-gray-700 mb-2",children:"All Order Statuses:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{status:"Placed"}),e.jsx(s,{status:"Packed"}),e.jsx(s,{status:"Shipped",carrier:"DHL Express",eta:"2024-01-15"}),e.jsx(s,{status:"Delivered",carrier:"UPS",eta:"2024-01-10"})]})]})},l={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"text-sm font-medium text-gray-700 mb-2",children:"Different Sizes:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1",children:"Small"}),e.jsx(s,{status:"Shipped",size:"sm",carrier:"FedEx",eta:"2024-01-20"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1",children:"Medium (Default)"}),e.jsx(s,{status:"Shipped",size:"md",carrier:"FedEx",eta:"2024-01-20"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1",children:"Large"}),e.jsx(s,{status:"Shipped",size:"lg",carrier:"FedEx",eta:"2024-01-20"})]})]})]})},c={args:{status:"Shipped",carrier:"DHL Express"}},m={args:{status:"Shipped",eta:"2024-01-25"}},o={args:{status:"Delivered",carrier:"UPS"}},x={render:()=>e.jsx("div",{className:"bg-white p-6 w-full max-w-2xl",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Order History"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-medium text-gray-900",children:"Order #ORD1234567890"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Placed on Jan 5, 2024"})]}),e.jsx(s,{status:"Placed"})]}),e.jsxs("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-medium text-gray-900",children:"Order #ORD1234567891"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Placed on Jan 3, 2024"})]}),e.jsx(s,{status:"Packed"})]}),e.jsxs("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-medium text-gray-900",children:"Order #ORD1234567892"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Placed on Jan 1, 2024"})]}),e.jsx(s,{status:"Shipped",carrier:"DHL Express",eta:"2024-01-15"})]}),e.jsxs("div",{className:"flex items-center justify-between p-4 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-medium text-gray-900",children:"Order #ORD1234567893"}),e.jsx("p",{className:"text-sm text-gray-600",children:"Placed on Dec 28, 2023"})]}),e.jsx(s,{status:"Delivered",carrier:"UPS",eta:"2024-01-10"})]})]})]})})},p={render:()=>e.jsx("div",{className:"bg-white p-6 w-full max-w-2xl",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Order Details"}),e.jsx(s,{status:"Shipped",size:"lg",carrier:"DHL Express",eta:"2024-01-15"})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Order Information"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Order ID:"}),e.jsx("span",{className:"font-mono",children:"ORD1234567890"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Order Date:"}),e.jsx("span",{children:"Jan 5, 2024"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Total:"}),e.jsx("span",{className:"font-semibold",children:"$199.99"})]})]})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Shipping Information"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Carrier:"}),e.jsx("span",{children:"DHL Express"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Tracking:"}),e.jsx("span",{className:"font-mono",children:"1234567890"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"ETA:"}),e.jsx("span",{children:"Jan 15, 2024"})]})]})]})]})]})})},u={render:()=>e.jsx("div",{className:"bg-white p-4 w-80",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("h1",{className:"text-lg font-bold text-gray-900",children:"Order Status"})}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"p-3 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-sm font-medium",children:"Order #1234"}),e.jsx(s,{status:"Shipped",size:"sm"})]}),e.jsxs("div",{className:"text-xs text-gray-600",children:[e.jsx("div",{children:"Carrier: DHL Express"}),e.jsx("div",{children:"ETA: 2024-01-15"})]})]}),e.jsxs("div",{className:"p-3 border border-gray-200 rounded-lg",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-sm font-medium",children:"Order #1235"}),e.jsx(s,{status:"Delivered",size:"sm"})]}),e.jsxs("div",{className:"text-xs text-gray-600",children:[e.jsx("div",{children:"Carrier: UPS"}),e.jsx("div",{children:"Delivered: 2024-01-10"})]})]})]})]})}),parameters:{viewport:{defaultViewport:"mobile1"}}},v={render:()=>e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsxs("div",{className:"text-sm text-gray-600",children:[e.jsx("p",{children:"This order status badge has proper accessibility features:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsx("li",{children:"Status has descriptive aria-label"}),e.jsx("li",{children:"Icons provide visual context"}),e.jsx("li",{children:"Carrier and ETA information is clearly labeled"}),e.jsx("li",{children:"Proper semantic structure"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{status:"Shipped",carrier:"DHL Express",eta:"2024-01-15"}),e.jsx(s,{status:"Delivered",carrier:"UPS",eta:"2024-01-10"})]}),e.jsx("div",{className:"text-xs text-gray-500",children:e.jsx("p",{children:"Screen readers will announce the full status information"})})]})},g={render:()=>e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsx("div",{className:"text-sm font-medium text-gray-700 mb-2",children:"Order Status Progression:"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold",children:"1"}),e.jsx(s,{status:"Placed"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-semibold",children:"2"}),e.jsx(s,{status:"Packed"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold",children:"3"}),e.jsx(s,{status:"Shipped",carrier:"DHL Express",eta:"2024-01-15"})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold",children:"4"}),e.jsx(s,{status:"Delivered",carrier:"UPS",eta:"2024-01-10"})]})]})]})};var j,b,S;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    status: 'Placed'
  }
}`,...(S=(b=a.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var O,w,D;t.parameters={...t.parameters,docs:{...(O=t.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    status: 'Packed'
  }
}`,...(D=(w=t.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var P,E,L;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    status: 'Shipped',
    carrier: 'DHL Express',
    eta: '2024-01-15'
  }
}`,...(L=(E=i.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var B,H,T;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    status: 'Delivered',
    carrier: 'UPS',
    eta: '2024-01-10'
  }
}`,...(T=(H=d.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};var k,z,C;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div className="text-sm font-medium text-gray-700 mb-2">All Order Statuses:</div>\r
      <div className="space-y-3">\r
        <OrderStatusBadge status="Placed" />\r
        <OrderStatusBadge status="Packed" />\r
        <OrderStatusBadge status="Shipped" carrier="DHL Express" eta="2024-01-15" />\r
        <OrderStatusBadge status="Delivered" carrier="UPS" eta="2024-01-10" />\r
      </div>\r
    </div>
}`,...(C=(z=n.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var A,I,U;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div className="text-sm font-medium text-gray-700 mb-2">Different Sizes:</div>\r
      <div className="space-y-3">\r
        <div>\r
          <div className="text-xs text-gray-500 mb-1">Small</div>\r
          <OrderStatusBadge status="Shipped" size="sm" carrier="FedEx" eta="2024-01-20" />\r
        </div>\r
        <div>\r
          <div className="text-xs text-gray-500 mb-1">Medium (Default)</div>\r
          <OrderStatusBadge status="Shipped" size="md" carrier="FedEx" eta="2024-01-20" />\r
        </div>\r
        <div>\r
          <div className="text-xs text-gray-500 mb-1">Large</div>\r
          <OrderStatusBadge status="Shipped" size="lg" carrier="FedEx" eta="2024-01-20" />\r
        </div>\r
      </div>\r
    </div>
}`,...(U=(I=l.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};var R,J,F;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    status: 'Shipped',
    carrier: 'DHL Express'
  }
}`,...(F=(J=c.parameters)==null?void 0:J.docs)==null?void 0:F.source}}};var W,M,q;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    status: 'Shipped',
    eta: '2024-01-25'
  }
}`,...(q=(M=m.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var _,V,$;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    status: 'Delivered',
    carrier: 'UPS'
  }
}`,...($=(V=o.parameters)==null?void 0:V.docs)==null?void 0:$.source}}};var G,K,Q;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-6 w-full max-w-2xl">\r
      <div className="space-y-4">\r
        <h1 className="text-xl font-bold text-gray-900">Order History</h1>\r
        \r
        <div className="space-y-4">\r
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">\r
            <div className="flex-1">\r
              <h3 className="font-medium text-gray-900">Order #ORD1234567890</h3>\r
              <p className="text-sm text-gray-600">Placed on Jan 5, 2024</p>\r
            </div>\r
            <OrderStatusBadge status="Placed" />\r
          </div>\r
          \r
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">\r
            <div className="flex-1">\r
              <h3 className="font-medium text-gray-900">Order #ORD1234567891</h3>\r
              <p className="text-sm text-gray-600">Placed on Jan 3, 2024</p>\r
            </div>\r
            <OrderStatusBadge status="Packed" />\r
          </div>\r
          \r
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">\r
            <div className="flex-1">\r
              <h3 className="font-medium text-gray-900">Order #ORD1234567892</h3>\r
              <p className="text-sm text-gray-600">Placed on Jan 1, 2024</p>\r
            </div>\r
            <OrderStatusBadge status="Shipped" carrier="DHL Express" eta="2024-01-15" />\r
          </div>\r
          \r
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">\r
            <div className="flex-1">\r
              <h3 className="font-medium text-gray-900">Order #ORD1234567893</h3>\r
              <p className="text-sm text-gray-600">Placed on Dec 28, 2023</p>\r
            </div>\r
            <OrderStatusBadge status="Delivered" carrier="UPS" eta="2024-01-10" />\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(Q=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-6 w-full max-w-2xl">\r
      <div className="space-y-6">\r
        <div className="flex items-center justify-between">\r
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>\r
          <OrderStatusBadge status="Shipped" size="lg" carrier="DHL Express" eta="2024-01-15" />\r
        </div>\r
        \r
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\r
          <div>\r
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>\r
            <div className="space-y-2">\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">Order ID:</span>\r
                <span className="font-mono">ORD1234567890</span>\r
              </div>\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">Order Date:</span>\r
                <span>Jan 5, 2024</span>\r
              </div>\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">Total:</span>\r
                <span className="font-semibold">$199.99</span>\r
              </div>\r
            </div>\r
          </div>\r
          \r
          <div>\r
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>\r
            <div className="space-y-2">\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">Carrier:</span>\r
                <span>DHL Express</span>\r
              </div>\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">Tracking:</span>\r
                <span className="font-mono">1234567890</span>\r
              </div>\r
              <div className="flex justify-between">\r
                <span className="text-gray-600">ETA:</span>\r
                <span>Jan 15, 2024</span>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,re;u.parameters={...u.parameters,docs:{...(ee=u.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-4 w-80">\r
      <div className="space-y-4">\r
        <div className="flex items-center justify-between">\r
          <h1 className="text-lg font-bold text-gray-900">Order Status</h1>\r
        </div>\r
        \r
        <div className="space-y-3">\r
          <div className="p-3 border border-gray-200 rounded-lg">\r
            <div className="flex items-center justify-between mb-2">\r
              <span className="text-sm font-medium">Order #1234</span>\r
              <OrderStatusBadge status="Shipped" size="sm" />\r
            </div>\r
            <div className="text-xs text-gray-600">\r
              <div>Carrier: DHL Express</div>\r
              <div>ETA: 2024-01-15</div>\r
            </div>\r
          </div>\r
          \r
          <div className="p-3 border border-gray-200 rounded-lg">\r
            <div className="flex items-center justify-between mb-2">\r
              <span className="text-sm font-medium">Order #1235</span>\r
              <OrderStatusBadge status="Delivered" size="sm" />\r
            </div>\r
            <div className="text-xs text-gray-600">\r
              <div>Carrier: UPS</div>\r
              <div>Delivered: 2024-01-10</div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(re=(se=u.parameters)==null?void 0:se.docs)==null?void 0:re.source}}};var ae,te,ie;v.parameters={...v.parameters,docs:{...(ae=v.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-96">\r
      <div className="text-sm text-gray-600">\r
        <p>This order status badge has proper accessibility features:</p>\r
        <ul className="list-disc list-inside mt-2 space-y-1">\r
          <li>Status has descriptive aria-label</li>\r
          <li>Icons provide visual context</li>\r
          <li>Carrier and ETA information is clearly labeled</li>\r
          <li>Proper semantic structure</li>\r
        </ul>\r
      </div>\r
      \r
      <div className="space-y-3">\r
        <OrderStatusBadge status="Shipped" carrier="DHL Express" eta="2024-01-15" />\r
        <OrderStatusBadge status="Delivered" carrier="UPS" eta="2024-01-10" />\r
      </div>\r
      \r
      <div className="text-xs text-gray-500">\r
        <p>Screen readers will announce the full status information</p>\r
      </div>\r
    </div>
}`,...(ie=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ie.source}}};var de,ne,le;g.parameters={...g.parameters,docs:{...(de=g.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-96">\r
      <div className="text-sm font-medium text-gray-700 mb-2">Order Status Progression:</div>\r
      \r
      <div className="space-y-3">\r
        <div className="flex items-center gap-3">\r
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">1</div>\r
          <OrderStatusBadge status="Placed" />\r
        </div>\r
        \r
        <div className="flex items-center gap-3">\r
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-semibold">2</div>\r
          <OrderStatusBadge status="Packed" />\r
        </div>\r
        \r
        <div className="flex items-center gap-3">\r
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">3</div>\r
          <OrderStatusBadge status="Shipped" carrier="DHL Express" eta="2024-01-15" />\r
        </div>\r
        \r
        <div className="flex items-center gap-3">\r
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">4</div>\r
          <OrderStatusBadge status="Delivered" carrier="UPS" eta="2024-01-10" />\r
        </div>\r
      </div>\r
    </div>
}`,...(le=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:le.source}}};const he=["Placed","Packed","Shipped","Delivered","AllStatuses","DifferentSizes","ShippedWithCarrierOnly","ShippedWithETAOnly","DeliveredWithCarrierOnly","InOrderList","InOrderDetail","MobileLayout","AccessibilityDemo","StatusProgression"];export{v as AccessibilityDemo,n as AllStatuses,d as Delivered,o as DeliveredWithCarrierOnly,l as DifferentSizes,p as InOrderDetail,x as InOrderList,u as MobileLayout,t as Packed,a as Placed,i as Shipped,c as ShippedWithCarrierOnly,m as ShippedWithETAOnly,g as StatusProgression,he as __namedExportsOrder,ge as default};
