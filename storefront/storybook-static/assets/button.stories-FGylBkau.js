import{j as r}from"./jsx-runtime-CDt2p4po.js";import{B as e}from"./button-DmPhT7vC.js";import"./index-GiUgBvb1.js";const $={title:"Atoms/Button",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","outline","ghost","danger"]},size:{control:{type:"select"},options:["sm","md","lg"]},isLoading:{control:{type:"boolean"}},disabled:{control:{type:"boolean"}}}},n={args:{children:"Button"}},a={args:{variant:"primary",children:"Primary Button"}},t={args:{variant:"secondary",children:"Secondary Button"}},s={args:{variant:"outline",children:"Outline Button"}},o={args:{variant:"ghost",children:"Ghost Button"}},i={args:{variant:"danger",children:"Danger Button"}},d={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{size:"sm",children:"Small"}),r.jsx(e,{size:"md",children:"Medium"}),r.jsx(e,{size:"lg",children:"Large"})]})},c={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{leftIcon:r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),children:"Add Item"}),r.jsx(e,{rightIcon:r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),children:"Continue"}),r.jsx(e,{leftIcon:r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),rightIcon:r.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:r.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})}),children:"Both Icons"})]})},l={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{isLoading:!0,children:"Loading Primary"}),r.jsx(e,{variant:"secondary",isLoading:!0,children:"Loading Secondary"}),r.jsx(e,{variant:"outline",isLoading:!0,children:"Loading Outline"}),r.jsx(e,{variant:"ghost",isLoading:!0,children:"Loading Ghost"}),r.jsx(e,{variant:"danger",isLoading:!0,children:"Loading Danger"})]})},u={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{disabled:!0,children:"Disabled Primary"}),r.jsx(e,{variant:"secondary",disabled:!0,children:"Disabled Secondary"}),r.jsx(e,{variant:"outline",disabled:!0,children:"Disabled Outline"}),r.jsx(e,{variant:"ghost",disabled:!0,children:"Disabled Ghost"}),r.jsx(e,{variant:"danger",disabled:!0,children:"Disabled Danger"})]})},m={args:{children:"Click me",onClick:()=>alert("Button clicked!")}},g={render:()=>r.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"danger",children:"Danger"}),r.jsx(e,{variant:"primary",disabled:!0,children:"Primary Disabled"}),r.jsx(e,{variant:"secondary",disabled:!0,children:"Secondary Disabled"}),r.jsx(e,{variant:"outline",disabled:!0,children:"Outline Disabled"}),r.jsx(e,{variant:"ghost",disabled:!0,children:"Ghost Disabled"}),r.jsx(e,{variant:"danger",disabled:!0,children:"Danger Disabled"})]})};var h,p,v;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(v=(p=n.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};var B,x,j;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}`,...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var y,b,L;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}`,...(L=(b=t.parameters)==null?void 0:b.docs)==null?void 0:L.source}}};var k,D,S;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
}`,...(S=(D=s.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var f,N,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...(w=(N=o.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var I,C,O;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Danger Button'
  }
}`,...(O=(C=i.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var G,P,M;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Button size="sm">Small</Button>\r
      <Button size="md">Medium</Button>\r
      <Button size="lg">Large</Button>\r
    </div>
}`,...(M=(P=d.parameters)==null?void 0:P.docs)==null?void 0:M.source}}};var W,z,A;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Button leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />\r
          </svg>}>\r
        Add Item\r
      </Button>\r
      <Button rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />\r
          </svg>}>\r
        Continue\r
      </Button>\r
      <Button leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />\r
          </svg>} rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />\r
          </svg>}>\r
        Both Icons\r
      </Button>\r
    </div>
}`,...(A=(z=c.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var H,E,V;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Button isLoading>Loading Primary</Button>\r
      <Button variant="secondary" isLoading>Loading Secondary</Button>\r
      <Button variant="outline" isLoading>Loading Outline</Button>\r
      <Button variant="ghost" isLoading>Loading Ghost</Button>\r
      <Button variant="danger" isLoading>Loading Danger</Button>\r
    </div>
}`,...(V=(E=l.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var _,R,T;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Button disabled>Disabled Primary</Button>\r
      <Button variant="secondary" disabled>Disabled Secondary</Button>\r
      <Button variant="outline" disabled>Disabled Outline</Button>\r
      <Button variant="ghost" disabled>Disabled Ghost</Button>\r
      <Button variant="danger" disabled>Disabled Danger</Button>\r
    </div>
}`,...(T=(R=u.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var q,F,J;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    children: 'Click me',
    onClick: () => alert('Button clicked!')
  }
}`,...(J=(F=m.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};var K,Q,U;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4">\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>\r
      <Button variant="outline">Outline</Button>\r
      <Button variant="ghost">Ghost</Button>\r
      <Button variant="danger">Danger</Button>\r
      <Button variant="primary" disabled>Primary Disabled</Button>\r
      <Button variant="secondary" disabled>Secondary Disabled</Button>\r
      <Button variant="outline" disabled>Outline Disabled</Button>\r
      <Button variant="ghost" disabled>Ghost Disabled</Button>\r
      <Button variant="danger" disabled>Danger Disabled</Button>\r
    </div>
}`,...(U=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const rr=["Default","Primary","Secondary","Outline","Ghost","Danger","Sizes","WithIcons","LoadingStates","Disabled","Interactive","AllVariants"];export{g as AllVariants,i as Danger,n as Default,u as Disabled,o as Ghost,m as Interactive,l as LoadingStates,s as Outline,a as Primary,t as Secondary,d as Sizes,c as WithIcons,rr as __namedExportsOrder,$ as default};
