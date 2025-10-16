import{A as D}from"./ask-support-panel-DzsHgRRq.js";import"./iframe-Dzl_Srex.js";import"./jsx-runtime-CDt2p4po.js";import"./index-GiUgBvb1.js";import"./button-DmPhT7vC.js";import"./badge-_4BIBrpX.js";const F={title:"Organisms/AskSupportPanel",component:D,parameters:{layout:"fullscreen"},argTypes:{isOpen:{control:"boolean"},onClose:{action:"closed"}}},e={args:{isOpen:!0}},s={args:{isOpen:!0},parameters:{docs:{description:{story:"Initial state with empty question input and helper text."}}}},r={args:{isOpen:!1}},t={args:{isOpen:!0},parameters:{docs:{description:{story:"Panel with a sample question and answer displayed. Try asking a question to see the response format."}}}},n={args:{isOpen:!0},parameters:{docs:{description:{story:"Shows the loading state while processing a question. This state appears when the support engine is processing."}}}},o={args:{isOpen:!0},parameters:{docs:{description:{story:"Shows the error state when the support engine cannot find a relevant answer to the question."}}}},a={args:{isOpen:!0},parameters:{docs:{description:{story:"Example of a response that includes order status information with proper citation."}}}},i={args:{isOpen:!0},parameters:{docs:{description:{story:"Panel showing multiple Q&A pairs in the history section. Previous questions are displayed below the current response."}}}},p={args:{isOpen:!0},parameters:{docs:{description:{story:"Interactive demo. Try asking questions about orders, returns, or policies. Use Ctrl+Enter to submit quickly, or click the submit button. Use ESC or click outside to close."}}}};var c,u,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    isOpen: true
  }
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var m,l,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial state with empty question input and helper text.'
      }
    }
  }
}`,...(h=(l=s.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var g,y,O;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    isOpen: false
  }
}`,...(O=(y=r.parameters)==null?void 0:y.docs)==null?void 0:O.source}}};var w,S,f;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel with a sample question and answer displayed. Try asking a question to see the response format.'
      }
    }
  }
}`,...(f=(S=t.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var q,k,b;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading state while processing a question. This state appears when the support engine is processing.'
      }
    }
  }
}`,...(b=(k=n.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var A,E,v;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the error state when the support engine cannot find a relevant answer to the question.'
      }
    }
  }
}`,...(v=(E=o.parameters)==null?void 0:E.docs)==null?void 0:v.source}}};var P,C,T;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of a response that includes order status information with proper citation.'
      }
    }
  }
}`,...(T=(C=a.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var x,I,W;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel showing multiple Q&A pairs in the history section. Previous questions are displayed below the current response.'
      }
    }
  }
}`,...(W=(I=i.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var Q,R,U;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    isOpen: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo. Try asking questions about orders, returns, or policies. Use Ctrl+Enter to submit quickly, or click the submit button. Use ESC or click outside to close.'
      }
    }
  }
}`,...(U=(R=p.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};const G=["Default","Empty","Closed","WithQuestionAndAnswer","LoadingState","OutOfScopeResponse","WithOrderStatusResponse","WithHistory","Interactive"];export{r as Closed,e as Default,s as Empty,p as Interactive,n as LoadingState,o as OutOfScopeResponse,i as WithHistory,a as WithOrderStatusResponse,t as WithQuestionAndAnswer,G as __namedExportsOrder,F as default};
