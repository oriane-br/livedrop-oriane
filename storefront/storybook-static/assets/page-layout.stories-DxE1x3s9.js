import{j as r}from"./jsx-runtime-CDt2p4po.js";import{r as o}from"./index-GiUgBvb1.js";import{H as qe}from"./header-Dz2dxrJD.js";import{C as Ie}from"./cart-drawer-D2iIcUaZ.js";import{A as Ee}from"./ask-support-panel-DzsHgRRq.js";import"./badge-_4BIBrpX.js";import"./button-DmPhT7vC.js";import"./cart-line-item-cGjWA6cl.js";import"./image-DnMFrjA_.js";import"./price-CVEKLbfW.js";import"./iframe-Dzl_Srex.js";/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function M(){return M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},M.apply(this,arguments)}var I;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(I||(I={}));function h(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ce(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substr(a),e=e.substr(0,a));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}var E;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(E||(E={}));function Te(e,t){t===void 0&&(t="/");let{pathname:a,search:n="",hash:s=""}=typeof e=="string"?Ce(e):e;return{pathname:a?a.startsWith("/")?a:Ve(a,t):t,search:Ae(n),hash:Fe(s)}}function Ve(e,t){let a=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?a.length>1&&a.pop():s!=="."&&a.push(s)}),a.length>1?a.join("/"):"/"}function R(e,t,a,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+a+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function De(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function _e(e,t){let a=De(e);return t?a.map((n,s)=>s===a.length-1?n.pathname:n.pathnameBase):a.map(n=>n.pathnameBase)}function Be(e,t,a,n){n===void 0&&(n=!1);let s;typeof e=="string"?s=Ce(e):(s=M({},e),h(!s.pathname||!s.pathname.includes("?"),R("?","pathname","search",s)),h(!s.pathname||!s.pathname.includes("#"),R("#","pathname","hash",s)),h(!s.search||!s.search.includes("#"),R("#","search","hash",s)));let i=e===""||s.pathname==="",l=i?"/":s.pathname,p;if(l==null)p=a;else{let m=t.length-1;if(!n&&l.startsWith("..")){let f=l.split("/");for(;f[0]==="..";)f.shift(),m-=1;s.pathname=f.join("/")}p=m>=0?t[m]:"/"}let g=Te(s,p),d=l&&l!=="/"&&l.endsWith("/"),u=(i||l===".")&&a.endsWith("/");return!g.pathname.endsWith("/")&&(d||u)&&(g.pathname+="/"),g}const ze=e=>e.join("/").replace(/\/\/+/g,"/"),Ae=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Fe=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,Se=["post","put","patch","delete"];new Set(Se);const Je=["get",...Se];new Set(Je);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},k.apply(this,arguments)}const je=o.createContext(null),Ne=o.createContext(null),Pe=o.createContext(null),q=o.createContext({outlet:null,matches:[],isDataRoute:!1});function We(){return o.useContext(Pe)!=null}function $e(){return We()||h(!1),o.useContext(Pe).location}function Le(e){o.useContext(Ne).static||o.useLayoutEffect(e)}function Qe(){let{isDataRoute:e}=o.useContext(q);return e?Ze():Ge()}function Ge(){We()||h(!1);let e=o.useContext(je),{basename:t,future:a,navigator:n}=o.useContext(Ne),{matches:s}=o.useContext(q),{pathname:i}=$e(),l=JSON.stringify(_e(s,a.v7_relativeSplatPath)),p=o.useRef(!1);return Le(()=>{p.current=!0}),o.useCallback(function(d,u){if(u===void 0&&(u={}),!p.current)return;if(typeof d=="number"){n.go(d);return}let m=Be(d,JSON.parse(l),i,u.relative==="path");e==null&&t!=="/"&&(m.pathname=m.pathname==="/"?t:ze([t,m.pathname])),(u.replace?n.replace:n.push)(m,u.state,u)},[t,n,l,i,e])}var Ue=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Ue||{}),Oe=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Oe||{});function Ke(e){let t=o.useContext(je);return t||h(!1),t}function Xe(e){let t=o.useContext(q);return t||h(!1),t}function Ye(e){let t=Xe(),a=t.matches[t.matches.length-1];return a.route.id||h(!1),a.route.id}function Ze(){let{router:e}=Ke(Ue.UseNavigateStable),t=Ye(Oe.UseNavigateStable),a=o.useRef(!1);return Le(()=>{a.current=!0}),o.useCallback(function(s,i){i===void 0&&(i={}),a.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,k({fromRouteId:t},i)))},[e,t])}new Promise(()=>{});const He=o.createContext(void 0);function et(){const e=o.useContext(He);if(e===void 0)throw new Error("useCart must be used within a CartProvider");return e}const tt={sm:"max-w-3xl",md:"max-w-5xl",lg:"max-w-7xl",xl:"max-w-screen-2xl",full:"w-full"},Re=({children:e,showHeader:t=!0,maxWidth:a="lg",className:n=""})=>{const[s,i]=o.useState(!1),[l,p]=o.useState(!1),g=Qe(),d=et(),u=tt[a],m=()=>{i(!1),g("/checkout")},f=(O,ke)=>{d.updateQuantity(O,ke)},Me=O=>{d.removeItem(O)};return r.jsxs("div",{className:`min-h-screen flex flex-col bg-gray-50 ${n}`,children:[r.jsx("a",{href:"#main-content",className:"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50",children:"Skip to main content"}),t&&r.jsx(qe,{cartItemCount:d.itemCount,onCartClick:()=>i(!0),onSupportClick:()=>p(!0)}),r.jsx("main",{id:"main-content",role:"main",className:"flex-1",children:r.jsx("div",{className:`mx-auto px-4 sm:px-6 lg:px-8 py-6 ${u}`,children:e})}),r.jsx("footer",{className:"bg-white border-t border-gray-200 py-4",children:r.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:r.jsx("div",{className:"text-center text-sm text-gray-600",children:"© 2025 Shoplite. All rights reserved."})})}),r.jsx(Ie,{isOpen:s,onClose:()=>i(!1),items:d.items,onUpdateQuantity:f,onRemove:Me,onCheckout:m}),r.jsx(Ee,{isOpen:l,onClose:()=>p(!1)})]})};Re.__docgenInfo={description:"",methods:[],displayName:"PageLayout",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},showHeader:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},maxWidth:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg' | 'xl' | 'full'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'full'"}]},description:"",defaultValue:{value:"'lg'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const ht={title:"Templates/PageLayout",component:Re,parameters:{layout:"fullscreen"},argTypes:{showHeader:{control:"boolean"},maxWidth:{control:"select",options:["sm","md","lg","xl","full"]},className:{control:"text"}}},c=()=>r.jsxs("div",{className:"space-y-6",children:[r.jsx("h1",{className:"text-3xl font-bold text-gray-900",children:"Page Title"}),r.jsx("p",{className:"text-lg text-gray-600",children:"This is sample content to demonstrate the page layout. The content is contained within the specified max-width and has proper spacing and typography."}),r.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Array.from({length:6},(e,t)=>r.jsxs("div",{className:"bg-white p-4 rounded-lg shadow-sm border",children:[r.jsxs("h3",{className:"font-semibold text-gray-900",children:["Card ",t+1]}),r.jsx("p",{className:"text-sm text-gray-600 mt-2",children:"This is a sample card to show how content looks within the layout."})]},t))})]}),at=()=>r.jsxs("div",{className:"space-y-8",children:[r.jsx("h1",{className:"text-4xl font-bold text-gray-900",children:"Long Content Page"}),Array.from({length:10},(e,t)=>r.jsxs("section",{className:"bg-white p-6 rounded-lg shadow-sm border",children:[r.jsxs("h2",{className:"text-2xl font-semibold text-gray-900 mb-4",children:["Section ",t+1]}),r.jsx("p",{className:"text-gray-600 leading-relaxed",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}),r.jsx("p",{className:"text-gray-600 leading-relaxed mt-4",children:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."})]},t))]}),x={args:{children:r.jsx(c,{})},parameters:{docs:{description:{story:"Default page layout with header, main content area, and footer. Includes cart and support functionality."}}}},y={args:{children:r.jsx(c,{}),showHeader:!1},parameters:{docs:{description:{story:"Page layout without header. Useful for landing pages or special layouts."}}}},v={args:{children:r.jsx(c,{}),maxWidth:"sm"},parameters:{docs:{description:{story:"Page layout with small max-width (max-w-3xl). Good for focused content like blog posts."}}}},w={args:{children:r.jsx(c,{}),maxWidth:"md"},parameters:{docs:{description:{story:"Page layout with medium max-width (max-w-5xl). Balanced for most content types."}}}},b={args:{children:r.jsx(c,{}),maxWidth:"lg"},parameters:{docs:{description:{story:"Page layout with large max-width (max-w-7xl). Default size for most pages."}}}},C={args:{children:r.jsx(c,{}),maxWidth:"xl"},parameters:{docs:{description:{story:"Page layout with extra large max-width (max-w-screen-2xl). For wide content like dashboards."}}}},S={args:{children:r.jsx(c,{}),maxWidth:"full"},parameters:{docs:{description:{story:"Page layout with full width (no max-width). For full-screen layouts."}}}},j={args:{children:r.jsx(at,{}),maxWidth:"lg"},parameters:{docs:{description:{story:"Page layout with long content to test scrolling behavior and layout stability."}}}},N={args:{children:r.jsx(c,{}),className:"bg-gradient-to-br from-blue-50 to-indigo-100"},parameters:{docs:{description:{story:"Page layout with custom background styling applied to the main container."}}}},P={args:{children:r.jsx(c,{})},parameters:{docs:{description:{story:"Interactive demo. Try clicking the cart button, support button, or any interactive elements to see the layout behavior."}}}},W={args:{children:r.jsx(c,{})},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Page layout on mobile devices. Shows responsive behavior and mobile-optimized layout."}}}},L={args:{children:r.jsx(c,{})},parameters:{viewport:{defaultViewport:"tablet"},docs:{description:{story:"Page layout on tablet devices. Shows intermediate responsive behavior."}}}},U={args:{children:r.jsx(c,{})},parameters:{viewport:{defaultViewport:"desktop"},docs:{description:{story:"Page layout on desktop devices. Shows full desktop layout with all features."}}}};var T,V,D;x.parameters={...x.parameters,docs:{...(T=x.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />
  },
  parameters: {
    docs: {
      description: {
        story: 'Default page layout with header, main content area, and footer. Includes cart and support functionality.'
      }
    }
  }
}`,...(D=(V=x.parameters)==null?void 0:V.docs)==null?void 0:D.source}}};var _,B,z;y.parameters={...y.parameters,docs:{...(_=y.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    showHeader: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout without header. Useful for landing pages or special layouts.'
      }
    }
  }
}`,...(z=(B=y.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var A,F,J;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    maxWidth: 'sm'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with small max-width (max-w-3xl). Good for focused content like blog posts.'
      }
    }
  }
}`,...(J=(F=v.parameters)==null?void 0:F.docs)==null?void 0:J.source}}};var $,Q,G;w.parameters={...w.parameters,docs:{...($=w.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    maxWidth: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with medium max-width (max-w-5xl). Balanced for most content types.'
      }
    }
  }
}`,...(G=(Q=w.parameters)==null?void 0:Q.docs)==null?void 0:G.source}}};var K,X,Y;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    maxWidth: 'lg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with large max-width (max-w-7xl). Default size for most pages.'
      }
    }
  }
}`,...(Y=(X=b.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,H,ee;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    maxWidth: 'xl'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with extra large max-width (max-w-screen-2xl). For wide content like dashboards.'
      }
    }
  }
}`,...(ee=(H=C.parameters)==null?void 0:H.docs)==null?void 0:ee.source}}};var te,ae,re;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    maxWidth: 'full'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with full width (no max-width). For full-screen layouts.'
      }
    }
  }
}`,...(re=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};var ne,se,oe;j.parameters={...j.parameters,docs:{...(ne=j.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    children: <LongContent />,
    maxWidth: 'lg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with long content to test scrolling behavior and layout stability.'
      }
    }
  }
}`,...(oe=(se=j.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var ie,le,ce;N.parameters={...N.parameters,docs:{...(ie=N.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />,
    className: 'bg-gradient-to-br from-blue-50 to-indigo-100'
  },
  parameters: {
    docs: {
      description: {
        story: 'Page layout with custom background styling applied to the main container.'
      }
    }
  }
}`,...(ce=(le=N.parameters)==null?void 0:le.docs)==null?void 0:ce.source}}};var de,ue,me;P.parameters={...P.parameters,docs:{...(de=P.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo. Try clicking the cart button, support button, or any interactive elements to see the layout behavior.'
      }
    }
  }
}`,...(me=(ue=P.parameters)==null?void 0:ue.docs)==null?void 0:me.source}}};var pe,he,ge;W.parameters={...W.parameters,docs:{...(pe=W.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Page layout on mobile devices. Shows responsive behavior and mobile-optimized layout.'
      }
    }
  }
}`,...(ge=(he=W.parameters)==null?void 0:he.docs)==null?void 0:ge.source}}};var fe,xe,ye;L.parameters={...L.parameters,docs:{...(fe=L.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Page layout on tablet devices. Shows intermediate responsive behavior.'
      }
    }
  }
}`,...(ye=(xe=L.parameters)==null?void 0:xe.docs)==null?void 0:ye.source}}};var ve,we,be;U.parameters={...U.parameters,docs:{...(ve=U.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  args: {
    children: <SampleContent />
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: 'Page layout on desktop devices. Shows full desktop layout with all features.'
      }
    }
  }
}`,...(be=(we=U.parameters)==null?void 0:we.docs)==null?void 0:be.source}}};const gt=["Default","WithoutHeader","SmallMaxWidth","MediumMaxWidth","LargeMaxWidth","ExtraLargeMaxWidth","FullWidth","LongContentStory","WithCustomClass","Interactive","MobileView","TabletView","DesktopView"];export{x as Default,U as DesktopView,C as ExtraLargeMaxWidth,S as FullWidth,P as Interactive,b as LargeMaxWidth,j as LongContentStory,w as MediumMaxWidth,W as MobileView,v as SmallMaxWidth,L as TabletView,N as WithCustomClass,y as WithoutHeader,gt as __namedExportsOrder,ht as default};
