import{H as z}from"./header-Dz2dxrJD.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./badge-_4BIBrpX.js";import"./button-DmPhT7vC.js";const P={title:"Organisms/Header",component:z,parameters:{layout:"fullscreen"},argTypes:{cartItemCount:{control:{type:"number",min:0,max:150}},onCartClick:{action:"cart clicked"},onSupportClick:{action:"support clicked"}}},e={args:{cartItemCount:0},parameters:{docs:{description:{story:"Default header with no items in cart. Badge is hidden when count is 0."}}}},t={args:{cartItemCount:5},parameters:{docs:{description:{story:"Header with items in cart. Badge shows the count and is visible."}}}},r={args:{cartItemCount:42},parameters:{docs:{description:{story:"Header with many items in cart. Badge shows the exact count."}}}},a={args:{cartItemCount:150},parameters:{docs:{description:{story:'Header with more than 99 items. Badge shows "99+" to prevent overflow.'}}}},s={args:{cartItemCount:3},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Header on mobile devices. Text labels are hidden, only icons are shown. Mobile navigation is visible."}}}},o={args:{cartItemCount:7},parameters:{viewport:{defaultViewport:"tablet"},docs:{description:{story:"Header on tablet devices. Shows a balanced layout with some text labels."}}}},n={args:{cartItemCount:12},parameters:{viewport:{defaultViewport:"desktop"},docs:{description:{story:"Header on desktop devices. Full layout with all text labels and navigation visible."}}}},i={args:{cartItemCount:8},parameters:{docs:{description:{story:"Interactive header. Try clicking the cart button, support button, or navigation links. The logo also links to the homepage."}}}},c={args:{cartItemCount:0},parameters:{docs:{description:{story:"Header with empty cart. No badge is displayed when cart is empty."}}}},d={args:{cartItemCount:1},parameters:{docs:{description:{story:'Header with exactly one item in cart. Badge shows "1".'}}}};var m,p,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    cartItemCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Default header with no items in cart. Badge is hidden when count is 0.'
      }
    }
  }
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,g,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    cartItemCount: 5
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with items in cart. Badge shows the count and is visible.'
      }
    }
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var w,y,b;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    cartItemCount: 42
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with many items in cart. Badge shows the exact count.'
      }
    }
  }
}`,...(b=(y=r.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var v,I,C;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    cartItemCount: 150
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with more than 99 items. Badge shows "99+" to prevent overflow.'
      }
    }
  }
}`,...(C=(I=a.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};var H,f,k;s.parameters={...s.parameters,docs:{...(H=s.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    cartItemCount: 3
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header on mobile devices. Text labels are hidden, only icons are shown. Mobile navigation is visible.'
      }
    }
  }
}`,...(k=(f=s.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var S,x,V;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    cartItemCount: 7
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Header on tablet devices. Shows a balanced layout with some text labels.'
      }
    }
  }
}`,...(V=(x=o.parameters)==null?void 0:x.docs)==null?void 0:V.source}}};var B,T,D;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    cartItemCount: 12
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Header on desktop devices. Full layout with all text labels and navigation visible.'
      }
    }
  }
}`,...(D=(T=n.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var M,O,E;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    cartItemCount: 8
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive header. Try clicking the cart button, support button, or navigation links. The logo also links to the homepage.'
      }
    }
  }
}`,...(E=(O=i.parameters)==null?void 0:O.docs)==null?void 0:E.source}}};var F,N,W;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    cartItemCount: 0
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with empty cart. No badge is displayed when cart is empty.'
      }
    }
  }
}`,...(W=(N=c.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var _,j,q;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    cartItemCount: 1
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with exactly one item in cart. Badge shows "1".'
      }
    }
  }
}`,...(q=(j=d.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const Q=["Default","WithCartItems","ManyCartItems","OverflowCartItems","MobileView","TabletView","DesktopView","Interactive","EmptyCart","SingleItem"];export{e as Default,n as DesktopView,c as EmptyCart,i as Interactive,r as ManyCartItems,s as MobileView,a as OverflowCartItems,d as SingleItem,o as TabletView,t as WithCartItems,Q as __namedExportsOrder,P as default};
