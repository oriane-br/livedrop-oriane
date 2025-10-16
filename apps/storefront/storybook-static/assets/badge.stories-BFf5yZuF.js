import{j as e}from"./jsx-runtime-CDt2p4po.js";import{B as a}from"./badge-_4BIBrpX.js";import"./index-GiUgBvb1.js";const W={title:"Atoms/Badge",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["default","success","warning","danger","info"]},size:{control:{type:"select"},options:["sm","md","lg"]},rounded:{control:{type:"boolean"}}}},r={args:{children:"Default Badge"}},s={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"warning",children:"Warning"}),e.jsx(a,{variant:"danger",children:"Danger"}),e.jsx(a,{variant:"info",children:"Info"})]})},n={render:()=>e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})},d={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{icon:e.jsx("span",{children:"✓"}),children:"Success"}),e.jsx(a,{variant:"warning",icon:e.jsx("span",{children:"⚠"}),children:"Warning"}),e.jsx(a,{variant:"danger",icon:e.jsx("span",{children:"✕"}),children:"Error"}),e.jsx(a,{variant:"info",icon:e.jsx("span",{children:"ℹ"}),children:"Info"})]})},i={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{children:"Default Rounded"}),e.jsx(a,{rounded:!0,children:"Fully Rounded"}),e.jsx(a,{variant:"success",children:"Default Success"}),e.jsx(a,{variant:"success",rounded:!0,children:"Rounded Success"})]})},c={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-4",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700",children:"Variants"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"success",children:"Success"}),e.jsx(a,{variant:"warning",children:"Warning"}),e.jsx(a,{variant:"danger",children:"Danger"}),e.jsx(a,{variant:"info",children:"Info"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700",children:"Sizes"}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx(a,{size:"sm",children:"Small"}),e.jsx(a,{size:"md",children:"Medium"}),e.jsx(a,{size:"lg",children:"Large"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700",children:"With Icons"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{icon:e.jsx("span",{children:"✓"}),children:"Complete"}),e.jsx(a,{variant:"warning",icon:e.jsx("span",{children:"⚠"}),children:"Pending"}),e.jsx(a,{variant:"danger",icon:e.jsx("span",{children:"✕"}),children:"Failed"})]})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700",children:"Rounded"}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx(a,{children:"Default"}),e.jsx(a,{rounded:!0,children:"Rounded"}),e.jsx(a,{variant:"success",rounded:!0,children:"Success Rounded"})]})]})]})};var l,t,o;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    children: 'Default Badge'
  }
}`,...(o=(t=r.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var g,m,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">\r
      <Badge variant="default">Default</Badge>\r
      <Badge variant="success">Success</Badge>\r
      <Badge variant="warning">Warning</Badge>\r
      <Badge variant="danger">Danger</Badge>\r
      <Badge variant="info">Info</Badge>\r
    </div>
}`,...(x=(m=s.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var p,u,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-2">\r
      <Badge size="sm">Small</Badge>\r
      <Badge size="md">Medium</Badge>\r
      <Badge size="lg">Large</Badge>\r
    </div>
}`,...(f=(u=n.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var v,h,B;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">\r
      <Badge icon={<span>✓</span>}>Success</Badge>\r
      <Badge variant="warning" icon={<span>⚠</span>}>Warning</Badge>\r
      <Badge variant="danger" icon={<span>✕</span>}>Error</Badge>\r
      <Badge variant="info" icon={<span>ℹ</span>}>Info</Badge>\r
    </div>
}`,...(B=(h=d.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var j,N,w;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2">\r
      <Badge>Default Rounded</Badge>\r
      <Badge rounded>Fully Rounded</Badge>\r
      <Badge variant="success">Default Success</Badge>\r
      <Badge variant="success" rounded>Rounded Success</Badge>\r
    </div>
}`,...(w=(N=i.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var S,y,D;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">\r
      <div className="space-y-2">\r
        <h3 className="text-sm font-medium text-gray-700">Variants</h3>\r
        <div className="flex flex-wrap gap-2">\r
          <Badge variant="default">Default</Badge>\r
          <Badge variant="success">Success</Badge>\r
          <Badge variant="warning">Warning</Badge>\r
          <Badge variant="danger">Danger</Badge>\r
          <Badge variant="info">Info</Badge>\r
        </div>\r
      </div>\r
      \r
      <div className="space-y-2">\r
        <h3 className="text-sm font-medium text-gray-700">Sizes</h3>\r
        <div className="flex flex-wrap items-center gap-2">\r
          <Badge size="sm">Small</Badge>\r
          <Badge size="md">Medium</Badge>\r
          <Badge size="lg">Large</Badge>\r
        </div>\r
      </div>\r
      \r
      <div className="space-y-2">\r
        <h3 className="text-sm font-medium text-gray-700">With Icons</h3>\r
        <div className="flex flex-wrap gap-2">\r
          <Badge icon={<span>✓</span>}>Complete</Badge>\r
          <Badge variant="warning" icon={<span>⚠</span>}>Pending</Badge>\r
          <Badge variant="danger" icon={<span>✕</span>}>Failed</Badge>\r
        </div>\r
      </div>\r
      \r
      <div className="space-y-2">\r
        <h3 className="text-sm font-medium text-gray-700">Rounded</h3>\r
        <div className="flex flex-wrap gap-2">\r
          <Badge>Default</Badge>\r
          <Badge rounded>Rounded</Badge>\r
          <Badge variant="success" rounded>Success Rounded</Badge>\r
        </div>\r
      </div>\r
    </div>
}`,...(D=(y=c.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const E=["Default","AllVariants","AllSizes","WithIcons","RoundedVsDefault","CompleteExample"];export{n as AllSizes,s as AllVariants,c as CompleteExample,r as Default,i as RoundedVsDefault,d as WithIcons,E as __namedExportsOrder,W as default};
