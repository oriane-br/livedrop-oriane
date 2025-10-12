import{j as e}from"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";const z=({text:t="Loading...",fullScreen:O=!1})=>{const R=()=>e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"}),u=e.jsxs("div",{className:"flex flex-col items-center justify-center space-y-3",role:"status","aria-live":"polite","aria-label":t,children:[e.jsx(R,{}),t&&e.jsx("p",{className:"text-sm text-gray-600 font-medium",children:t})]});return O?e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm",children:u}):e.jsx("div",{className:"flex items-center justify-center py-8",children:u})};z.__docgenInfo={description:"",methods:[],displayName:"Loading",props:{text:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Loading...'",computed:!1}},fullScreen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const H={title:"Templates/Loading",component:z,parameters:{layout:"centered"},argTypes:{text:{control:"text"},fullScreen:{control:"boolean"}}},s={args:{},parameters:{docs:{description:{story:"Default inline loading spinner with default text."}}}},r={args:{text:"Loading content...",fullScreen:!1},parameters:{docs:{description:{story:"Inline loading spinner that can be used within page content."}}}},a={args:{text:"Please wait...",fullScreen:!0},parameters:{layout:"fullscreen",docs:{description:{story:"Full screen loading overlay with backdrop blur. Covers the entire viewport."}}}},n={args:{text:"Processing your request...",fullScreen:!1},parameters:{docs:{description:{story:"Loading spinner with custom text message."}}}},o={args:{text:"",fullScreen:!1},parameters:{docs:{description:{story:"Loading spinner without any text, just the animated spinner."}}}},l={args:{text:"",fullScreen:!0},parameters:{layout:"fullscreen",docs:{description:{story:"Full screen loading overlay without text, just the spinner."}}}},i={args:{text:"This is a longer loading message that might wrap to multiple lines",fullScreen:!1},parameters:{docs:{description:{story:"Loading spinner with longer text to test text wrapping and layout."}}}},c={args:{text:"Loading products...",fullScreen:!1},decorators:[t=>e.jsx("div",{className:"p-8 bg-gray-50 min-h-screen",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Product Catalog"}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-sm",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Featured Products"}),e.jsx(t,{})]})]})})],parameters:{docs:{description:{story:"Loading component used within a page context to show how it looks in real usage."}}}},d={args:{text:"Saving your changes...",fullScreen:!0},decorators:[t=>e.jsxs("div",{className:"p-8 bg-gray-50 min-h-screen",children:[e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Settings Page"}),e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-sm",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Account Settings"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"This is some content that would be covered by the full screen loading overlay."}),e.jsx("button",{className:"bg-blue-600 text-white px-4 py-2 rounded-md",children:"Save Changes"})]})]}),e.jsx(t,{})]})],parameters:{layout:"fullscreen",docs:{description:{story:"Full screen loading overlay shown over page content to demonstrate the overlay effect."}}}};var m,p,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default inline loading spinner with default text.'
      }
    }
  }
}`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var x,h,f;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    text: 'Loading content...',
    fullScreen: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline loading spinner that can be used within page content.'
      }
    }
  }
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,b,w;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'Please wait...',
    fullScreen: true
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay with backdrop blur. Covers the entire viewport.'
      }
    }
  }
}`,...(w=(b=a.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var v,S,N;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    text: 'Processing your request...',
    fullScreen: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner with custom text message.'
      }
    }
  }
}`,...(N=(S=n.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var j,L,T;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    text: '',
    fullScreen: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner without any text, just the animated spinner.'
      }
    }
  }
}`,...(T=(L=o.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var F,C,P;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    text: '',
    fullScreen: true
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay without text, just the spinner.'
      }
    }
  }
}`,...(P=(C=l.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var I,W,k;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    text: 'This is a longer loading message that might wrap to multiple lines',
    fullScreen: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner with longer text to test text wrapping and layout.'
      }
    }
  }
}`,...(k=(W=i.parameters)==null?void 0:W.docs)==null?void 0:k.source}}};var q,D,_;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    text: 'Loading products...',
    fullScreen: false
  },
  decorators: [Story => <div className="p-8 bg-gray-50 min-h-screen">\r
        <div className="max-w-4xl mx-auto">\r
          <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>\r
          <div className="bg-white p-6 rounded-lg shadow-sm">\r
            <h2 className="text-lg font-semibold mb-4">Featured Products</h2>\r
            <Story />\r
          </div>\r
        </div>\r
      </div>],
  parameters: {
    docs: {
      description: {
        story: 'Loading component used within a page context to show how it looks in real usage.'
      }
    }
  }
}`,...(_=(D=c.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};var A,E,V;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    text: 'Saving your changes...',
    fullScreen: true
  },
  decorators: [Story => <div className="p-8 bg-gray-50 min-h-screen">\r
        <div className="max-w-4xl mx-auto">\r
          <h1 className="text-2xl font-bold mb-4">Settings Page</h1>\r
          <div className="bg-white p-6 rounded-lg shadow-sm">\r
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>\r
            <p className="text-gray-600 mb-4">\r
              This is some content that would be covered by the full screen loading overlay.\r
            </p>\r
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">\r
              Save Changes\r
            </button>\r
          </div>\r
        </div>\r
        <Story />\r
      </div>],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full screen loading overlay shown over page content to demonstrate the overlay effect.'
      }
    }
  }
}`,...(V=(E=d.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};const J=["Default","InlineLoading","FullScreenLoading","WithCustomText","WithoutText","FullScreenWithoutText","LongText","InContext","FullScreenInContext"];export{s as Default,d as FullScreenInContext,a as FullScreenLoading,l as FullScreenWithoutText,c as InContext,r as InlineLoading,i as LongText,n as WithCustomText,o as WithoutText,J as __namedExportsOrder,H as default};
