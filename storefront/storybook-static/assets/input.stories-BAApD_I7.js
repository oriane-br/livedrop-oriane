import{j as e}from"./jsx-runtime-CDt2p4po.js";import{I as r}from"./input-C_ekPQ_w.js";import"./index-GiUgBvb1.js";const X={title:"Atoms/Input",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:{type:"text"}},error:{control:{type:"text"}},helperText:{control:{type:"text"}},isRequired:{control:{type:"boolean"}},disabled:{control:{type:"boolean"}},type:{control:{type:"select"},options:["text","email","password","number","tel","url"]}}},a={args:{placeholder:"Enter text..."}},s={args:{label:"Email Address",type:"email",placeholder:"Enter your email"}},l={args:{label:"Email Address",type:"email",placeholder:"Enter your email",error:"Please enter a valid email address"}},t={args:{label:"Password",type:"password",placeholder:"Enter your password",helperText:"Must be at least 8 characters long"}},o={args:{label:"Search",placeholder:"Search products...",leftIcon:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),rightIcon:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}},n={args:{label:"Full Name",placeholder:"Enter your full name",isRequired:!0}},d={args:{label:"Disabled Input",placeholder:"This input is disabled",disabled:!0,value:"Cannot edit this"}},i={render:()=>e.jsxs("div",{className:"space-y-4 w-80",children:[e.jsx(r,{label:"Text",type:"text",placeholder:"Enter text"}),e.jsx(r,{label:"Email",type:"email",placeholder:"Enter email"}),e.jsx(r,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(r,{label:"Number",type:"number",placeholder:"Enter number"}),e.jsx(r,{label:"Phone",type:"tel",placeholder:"Enter phone number"})]})},c={render:()=>e.jsxs("div",{className:"space-y-6 w-80",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Normal"}),e.jsx(r,{label:"Normal Input",placeholder:"Normal state"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"With Helper Text"}),e.jsx(r,{label:"With Helper",placeholder:"Has helper text",helperText:"This is helper text"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"With Error"}),e.jsx(r,{label:"With Error",placeholder:"Has error",error:"This field has an error"})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Required"}),e.jsx(r,{label:"Required Field",placeholder:"Required field",isRequired:!0})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-2",children:"Disabled"}),e.jsx(r,{label:"Disabled Input",placeholder:"Disabled",disabled:!0,value:"Cannot edit"})]})]})},p={render:()=>e.jsxs("form",{className:"space-y-4 w-80",children:[e.jsx(r,{label:"First Name",placeholder:"Enter first name",isRequired:!0}),e.jsx(r,{label:"Last Name",placeholder:"Enter last name",isRequired:!0}),e.jsx(r,{label:"Email Address",type:"email",placeholder:"Enter email address",isRequired:!0,helperText:"We'll never share your email"}),e.jsx(r,{label:"Phone Number",type:"tel",placeholder:"Enter phone number",leftIcon:e.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"})})})]})},m={args:{label:"Interactive Input",placeholder:"Type something...",onChange:J=>console.log("Input changed:",J.target.value)}};var u,h,x;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(x=(h=a.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var b,g,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email'
  }
}`,...(y=(g=s.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var v,E,j;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address'
  }
}`,...(j=(E=l.parameters)==null?void 0:E.docs)==null?void 0:j.source}}};var I,N,f;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long'
  }
}`,...(f=(N=t.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var w,k,T;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Search products...',
    leftIcon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />\r
      </svg>,
    rightIcon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />\r
      </svg>
  }
}`,...(T=(k=o.parameters)==null?void 0:k.docs)==null?void 0:T.source}}};var W,R,q;n.parameters={...n.parameters,docs:{...(W=n.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    isRequired: true
  }
}`,...(q=(R=n.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var L,S,C;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this'
  }
}`,...(C=(S=d.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var D,H,M;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-80">\r
      <Input label="Text" type="text" placeholder="Enter text" />\r
      <Input label="Email" type="email" placeholder="Enter email" />\r
      <Input label="Password" type="password" placeholder="Enter password" />\r
      <Input label="Number" type="number" placeholder="Enter number" />\r
      <Input label="Phone" type="tel" placeholder="Enter phone number" />\r
    </div>
}`,...(M=(H=i.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var P,A,F;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="space-y-6 w-80">\r
      <div>\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Normal</h3>\r
        <Input label="Normal Input" placeholder="Normal state" />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Helper Text</h3>\r
        <Input label="With Helper" placeholder="Has helper text" helperText="This is helper text" />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">With Error</h3>\r
        <Input label="With Error" placeholder="Has error" error="This field has an error" />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Required</h3>\r
        <Input label="Required Field" placeholder="Required field" isRequired />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-sm font-medium text-gray-700 mb-2">Disabled</h3>\r
        <Input label="Disabled Input" placeholder="Disabled" disabled value="Cannot edit" />\r
      </div>\r
    </div>
}`,...(F=(A=c.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var B,z,V;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <form className="space-y-4 w-80">\r
      <Input label="First Name" placeholder="Enter first name" isRequired />\r
      <Input label="Last Name" placeholder="Enter last name" isRequired />\r
      <Input label="Email Address" type="email" placeholder="Enter email address" isRequired helperText="We'll never share your email" />\r
      <Input label="Phone Number" type="tel" placeholder="Enter phone number" leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />\r
          </svg>} />\r
    </form>
}`,...(V=(z=p.parameters)==null?void 0:z.docs)==null?void 0:V.source}}};var _,O,G;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Interactive Input',
    placeholder: 'Type something...',
    onChange: e => console.log('Input changed:', e.target.value)
  }
}`,...(G=(O=m.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};const Y=["Default","WithLabel","WithError","WithHelperText","WithIcons","Required","Disabled","InputTypes","AllStates","FormExample","Interactive"];export{c as AllStates,a as Default,d as Disabled,p as FormExample,i as InputTypes,m as Interactive,n as Required,l as WithError,t as WithHelperText,o as WithIcons,s as WithLabel,Y as __namedExportsOrder,X as default};
