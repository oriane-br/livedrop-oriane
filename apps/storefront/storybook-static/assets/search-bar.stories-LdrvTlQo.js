import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as n}from"./index-GiUgBvb1.js";import{I as ce}from"./input-C_ekPQ_w.js";const o=({value:a,onChange:s,onSearch:t,placeholder:N="Search products...",className:S=""})=>{const[r,c]=n.useState(a);n.useEffect(()=>{const l=setTimeout(()=>{r!==a&&s(r)},300);return()=>clearTimeout(l)},[r,s,a]),n.useEffect(()=>{c(a)},[a]);const ae=n.useCallback(l=>{c(l.target.value)},[]),re=n.useCallback(l=>{l.key==="Enter"&&t&&t(r)},[t,r]),se=n.useCallback(()=>{c(""),s("")},[s]),te=e.jsx("svg",{className:"w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})}),ne=e.jsx("button",{type:"button",onClick:se,"aria-label":"Clear search",className:"p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200",children:e.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})});return e.jsx("div",{className:`relative w-full ${S}`,children:e.jsx(ce,{type:"search",value:r,onChange:ae,onKeyDown:re,placeholder:N,"aria-label":"Search products",leftIcon:te,rightIcon:r?ne:void 0,className:"w-full"})})};o.__docgenInfo={description:"",methods:[],displayName:"SearchBar",props:{value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onSearch:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search products...'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const de={title:"Molecules/SearchBar",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onChange:{action:"changed"},onSearch:{action:"searched"}}},i={args:{value:"",onChange:()=>{}}},d={args:{value:"wireless headphones",onChange:()=>{}}},h={args:{value:"",onChange:()=>{},placeholder:"Search for electronics, clothing, books..."}},m={args:{value:"gaming keyboard",onChange:()=>{},onSearch:a=>{console.log("Searching for:",a),alert(`Searching for: ${a}`)}}},u={render:()=>{const[a,s]=n.useState("");return e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsx(o,{value:a,onChange:s,onSearch:t=>{console.log("Searching for:",t),alert(`Searching for: ${t}`)},placeholder:"Search products..."}),e.jsxs("div",{className:"text-sm text-gray-600",children:["Current value: ",e.jsx("span",{className:"font-mono",children:a||"(empty)"})]}),e.jsx("div",{className:"text-xs text-gray-500",children:"Type to see debounced onChange, press Enter to trigger onSearch"})]})}},p={render:()=>e.jsx("div",{className:"bg-white shadow-sm border-b border-gray-200 p-4",children:e.jsx("div",{className:"max-w-4xl mx-auto",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-8",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-900",children:"Storefront"}),e.jsxs("nav",{className:"hidden md:flex space-x-6",children:[e.jsx("a",{href:"#",className:"text-gray-600 hover:text-gray-900",children:"Products"}),e.jsx("a",{href:"#",className:"text-gray-600 hover:text-gray-900",children:"Categories"}),e.jsx("a",{href:"#",className:"text-gray-600 hover:text-gray-900",children:"Deals"})]})]}),e.jsx("div",{className:"flex-1 max-w-md mx-8",children:e.jsx(o,{value:"",onChange:()=>{},onSearch:a=>alert(`Searching for: ${a}`),placeholder:"Search products..."})}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("button",{className:"text-gray-600 hover:text-gray-900",children:"Cart (0)"}),e.jsx("button",{className:"text-gray-600 hover:text-gray-900",children:"Account"})]})]})})})},x={render:()=>e.jsx("div",{className:"bg-gray-50 p-6 w-80",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Search & Filters"}),e.jsx(o,{value:"",onChange:()=>{},onSearch:a=>alert(`Searching for: ${a}`),placeholder:"Search products..."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Categories"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Electronics"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Clothing"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Books"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Price Range"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("input",{type:"range",className:"w-full",min:"0",max:"1000",defaultValue:"500"}),e.jsxs("div",{className:"flex justify-between text-xs text-gray-500",children:[e.jsx("span",{children:"$0"}),e.jsx("span",{children:"$1000"})]})]})]})]})})},g={render:()=>e.jsx("div",{className:"bg-white p-4 w-80",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-lg font-bold text-gray-900",children:"Storefront"}),e.jsx("button",{className:"text-gray-600",children:"☰"})]}),e.jsx(o,{value:"",onChange:()=>{},onSearch:a=>alert(`Searching for: ${a}`),placeholder:"Search products..."}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("button",{className:"p-2 text-sm bg-gray-100 rounded-md",children:"Categories"}),e.jsx("button",{className:"p-2 text-sm bg-gray-100 rounded-md",children:"Filters"})]})]})}),parameters:{viewport:{defaultViewport:"mobile1"}}},v={args:{value:"",onChange:()=>{},placeholder:"Search for electronics, clothing, books, home & garden, sports, and more..."}},y={args:{value:"ultra-premium professional wireless noise-cancelling bluetooth headphones with advanced audio technology",onChange:()=>{}}},f={render:()=>{const[a,s]=n.useState(""),[t,N]=n.useState([]),S=r=>{r.trim()&&(N(c=>[r,...c.slice(0,4)]),alert(`Searching for: ${r}`))};return e.jsxs("div",{className:"space-y-6 w-96",children:[e.jsx(o,{value:a,onChange:s,onSearch:S,placeholder:"Search products..."}),t.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Recent Searches"}),e.jsx("div",{className:"space-y-1",children:t.map((r,c)=>e.jsx("button",{onClick:()=>s(r),className:"block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1",children:r},c))})]}),e.jsxs("div",{className:"text-xs text-gray-500",children:[e.jsx("p",{children:"• Type to see debounced onChange (300ms delay)"}),e.jsx("p",{children:"• Press Enter to trigger onSearch"}),e.jsx("p",{children:"• Click X to clear the input"})]})]})}};var b,j,w;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: '',
    onChange: () => {}
  }
}`,...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var C,k,V;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    value: 'wireless headphones',
    onChange: () => {}
  }
}`,...(V=(k=d.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var $,E,I;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Search for electronics, clothing, books...'
  }
}`,...(I=(E=h.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var B,L,T;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    value: 'gaming keyboard',
    onChange: () => {},
    onSearch: value => {
      console.log('Searching for:', value);
      alert(\`Searching for: \${value}\`);
    }
  }
}`,...(T=(L=m.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var W,H,P;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    return <div className="space-y-4 w-96">\r
        <SearchBar value={searchValue} onChange={setSearchValue} onSearch={value => {
        console.log('Searching for:', value);
        alert(\`Searching for: \${value}\`);
      }} placeholder="Search products..." />\r
        \r
        <div className="text-sm text-gray-600">\r
          Current value: <span className="font-mono">{searchValue || '(empty)'}</span>\r
        </div>\r
        \r
        <div className="text-xs text-gray-500">\r
          Type to see debounced onChange, press Enter to trigger onSearch\r
        </div>\r
      </div>;
  }
}`,...(P=(H=u.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var D,M,q;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="bg-white shadow-sm border-b border-gray-200 p-4">\r
      <div className="max-w-4xl mx-auto">\r
        <div className="flex items-center justify-between">\r
          <div className="flex items-center space-x-8">\r
            <h1 className="text-xl font-bold text-gray-900">Storefront</h1>\r
            <nav className="hidden md:flex space-x-6">\r
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>\r
              <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>\r
              <a href="#" className="text-gray-600 hover:text-gray-900">Deals</a>\r
            </nav>\r
          </div>\r
          \r
          <div className="flex-1 max-w-md mx-8">\r
            <SearchBar value="" onChange={() => {}} onSearch={value => alert(\`Searching for: \${value}\`)} placeholder="Search products..." />\r
          </div>\r
          \r
          <div className="flex items-center space-x-4">\r
            <button className="text-gray-600 hover:text-gray-900">Cart (0)</button>\r
            <button className="text-gray-600 hover:text-gray-900">Account</button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(q=(M=p.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var R,F,_;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="bg-gray-50 p-6 w-80">\r
      <div className="space-y-6">\r
        <div>\r
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filters</h2>\r
          \r
          <SearchBar value="" onChange={() => {}} onSearch={value => alert(\`Searching for: \${value}\`)} placeholder="Search products..." />\r
        </div>\r
        \r
        <div>\r
          <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>\r
          <div className="space-y-2">\r
            <label className="flex items-center">\r
              <input type="checkbox" className="mr-2" />\r
              <span className="text-sm text-gray-600">Electronics</span>\r
            </label>\r
            <label className="flex items-center">\r
              <input type="checkbox" className="mr-2" />\r
              <span className="text-sm text-gray-600">Clothing</span>\r
            </label>\r
            <label className="flex items-center">\r
              <input type="checkbox" className="mr-2" />\r
              <span className="text-sm text-gray-600">Books</span>\r
            </label>\r
          </div>\r
        </div>\r
        \r
        <div>\r
          <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>\r
          <div className="space-y-2">\r
            <input type="range" className="w-full" min="0" max="1000" defaultValue="500" />\r
            <div className="flex justify-between text-xs text-gray-500">\r
              <span>$0</span>\r
              <span>$1000</span>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(_=(F=x.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var A,K,X;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-4 w-80">\r
      <div className="space-y-4">\r
        <div className="flex items-center justify-between">\r
          <h1 className="text-lg font-bold text-gray-900">Storefront</h1>\r
          <button className="text-gray-600">☰</button>\r
        </div>\r
        \r
        <SearchBar value="" onChange={() => {}} onSearch={value => alert(\`Searching for: \${value}\`)} placeholder="Search products..." />\r
        \r
        <div className="grid grid-cols-2 gap-2">\r
          <button className="p-2 text-sm bg-gray-100 rounded-md">Categories</button>\r
          <button className="p-2 text-sm bg-gray-100 rounded-md">Filters</button>\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(X=(K=g.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var z,O,G;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Search for electronics, clothing, books, home & garden, sports, and more...'
  }
}`,...(G=(O=v.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var J,Q,U;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    value: 'ultra-premium professional wireless noise-cancelling bluetooth headphones with advanced audio technology',
    onChange: () => {}
  }
}`,...(U=(Q=y.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Y,Z,ee;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const handleSearch = (value: string) => {
      if (value.trim()) {
        setSearchHistory(prev => [value, ...prev.slice(0, 4)]);
        alert(\`Searching for: \${value}\`);
      }
    };
    return <div className="space-y-6 w-96">\r
        <SearchBar value={searchValue} onChange={setSearchValue} onSearch={handleSearch} placeholder="Search products..." />\r
        \r
        {searchHistory.length > 0 && <div>\r
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Searches</h3>\r
            <div className="space-y-1">\r
              {searchHistory.map((term, index) => <button key={index} onClick={() => setSearchValue(term)} className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1">\r
                  {term}\r
                </button>)}\r
            </div>\r
          </div>}\r
        \r
        <div className="text-xs text-gray-500">\r
          <p>• Type to see debounced onChange (300ms delay)</p>\r
          <p>• Press Enter to trigger onSearch</p>\r
          <p>• Click X to clear the input</p>\r
        </div>\r
      </div>;
  }
}`,...(ee=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};const he=["Empty","WithValue","WithPlaceholder","WithSearchHandler","ControlledComponent","InHeader","InSidebar","MobileLayout","WithLongPlaceholder","WithLongValue","InteractiveDemo"];export{u as ControlledComponent,i as Empty,p as InHeader,x as InSidebar,f as InteractiveDemo,g as MobileLayout,v as WithLongPlaceholder,y as WithLongValue,h as WithPlaceholder,m as WithSearchHandler,d as WithValue,he as __namedExportsOrder,de as default};
