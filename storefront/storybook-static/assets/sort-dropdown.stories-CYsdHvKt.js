import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as j}from"./index-GiUgBvb1.js";const a=({value:s,onChange:r,label:c="Sort by:"})=>{const N=b=>{r(b.target.value)};return e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("label",{htmlFor:"sort-dropdown",className:"text-sm font-medium text-gray-700",children:c}),e.jsxs("select",{id:"sort-dropdown",name:"sort",value:s,onChange:N,className:"px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none cursor-pointer min-w-[180px]",children:[e.jsx("option",{value:"price-asc",children:"Price: Low to High"}),e.jsx("option",{value:"price-desc",children:"Price: High to Low"}),e.jsx("option",{value:"name-asc",children:"Name: A to Z"}),e.jsx("option",{value:"name-desc",children:"Name: Z to A"})]})]})};a.__docgenInfo={description:"",methods:[],displayName:"SortDropdown",props:{value:{required:!0,tsType:{name:"union",raw:"'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'",elements:[{name:"literal",value:"'price-asc'"},{name:"literal",value:"'price-desc'"},{name:"literal",value:"'name-asc'"},{name:"literal",value:"'name-desc'"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: SortOption) => void",signature:{arguments:[{type:{name:"union",raw:"'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'",elements:[{name:"literal",value:"'price-asc'"},{name:"literal",value:"'price-desc'"},{name:"literal",value:"'name-asc'"},{name:"literal",value:"'name-desc'"}]},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Sort by:'",computed:!1}}}};const de={title:"Molecules/SortDropdown",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onChange:{action:"changed"}}},o={args:{value:"price-asc",onChange:()=>{}}},n={args:{value:"price-desc",onChange:()=>{}}},l={args:{value:"name-asc",onChange:()=>{}}},i={args:{value:"name-desc",onChange:()=>{}}},d={args:{value:"price-asc",onChange:()=>{},label:""}},m={args:{value:"price-asc",onChange:()=>{},label:"Order by:"}},p={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"text-sm font-medium text-gray-700 mb-2",children:"All Sort Options:"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(a,{value:"price-asc",onChange:()=>{}}),e.jsx(a,{value:"price-desc",onChange:()=>{}}),e.jsx(a,{value:"name-asc",onChange:()=>{}}),e.jsx(a,{value:"name-desc",onChange:()=>{}})]})]})},u={render:()=>{const[s,r]=j.useState("price-asc");return e.jsxs("div",{className:"space-y-4 w-80",children:[e.jsx(a,{value:s,onChange:r}),e.jsxs("div",{className:"text-sm text-gray-600",children:["Current sort: ",e.jsx("span",{className:"font-mono",children:s})]}),e.jsx("div",{className:"text-xs text-gray-500",children:"Select different options to see the value change"})]})}},x={render:()=>e.jsx("div",{className:"bg-white p-6 w-full max-w-4xl",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Products"}),e.jsx("p",{className:"text-gray-600",children:"Showing 24 products"})]}),e.jsx("div",{className:"flex flex-col sm:flex-row items-start sm:items-center gap-4",children:e.jsx(a,{value:"price-asc",onChange:s=>console.log("Sort changed to:",s)})})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",children:Array.from({length:8}).map((s,r)=>e.jsx("div",{className:"bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center",children:e.jsxs("span",{className:"text-gray-500",children:["Product ",r+1]})},r))})]})})},g={render:()=>e.jsx("div",{className:"bg-gray-50 p-6 w-80",children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Filters & Sort"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Sort"}),e.jsx(a,{value:"price-asc",onChange:s=>console.log("Sort changed to:",s)})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Categories"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Electronics"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Clothing"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Books"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Price Range"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("input",{type:"range",className:"w-full",min:"0",max:"1000",defaultValue:"500"}),e.jsxs("div",{className:"flex justify-between text-xs text-gray-500",children:[e.jsx("span",{children:"$0"}),e.jsx("span",{children:"$1000"})]})]})]})]})]})})})},h={render:()=>e.jsx("div",{className:"bg-white p-4 w-80",children:e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h1",{className:"text-lg font-bold text-gray-900",children:"Products"}),e.jsx("button",{className:"text-gray-600",children:"☰"})]}),e.jsx("div",{className:"flex flex-col gap-2",children:e.jsx(a,{value:"price-asc",onChange:s=>console.log("Sort changed to:",s)})}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("button",{className:"p-2 text-sm bg-gray-100 rounded-md",children:"Categories"}),e.jsx("button",{className:"p-2 text-sm bg-gray-100 rounded-md",children:"Filters"})]})]})}),parameters:{viewport:{defaultViewport:"mobile1"}}},v={render:()=>{const[s,r]=j.useState("price-asc"),[c,N]=j.useState([]),b=t=>{r(t),N(f=>[t,...f.slice(0,4)]),console.log("Sort changed to:",t)};return e.jsxs("div",{className:"space-y-6 w-96",children:[e.jsx(a,{value:s,onChange:b}),c.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Recent Sorts"}),e.jsx("div",{className:"space-y-1",children:c.map((t,f)=>e.jsx("button",{onClick:()=>r(t),className:"block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1",children:t},f))})]}),e.jsxs("div",{className:"text-xs text-gray-500",children:[e.jsx("p",{children:"• Select different sort options to see them in action"}),e.jsx("p",{children:"• Recent sorts are tracked and can be clicked to restore"})]})]})}},y={render:()=>e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsxs("div",{className:"text-sm text-gray-600",children:[e.jsx("p",{children:"This dropdown has proper accessibility features:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsx("li",{children:"Label associated with select via htmlFor/id"}),e.jsx("li",{children:"Proper name attribute for form submission"}),e.jsx("li",{children:"Keyboard navigation support"}),e.jsx("li",{children:"Focus states for visual feedback"})]})]}),e.jsx(a,{value:"price-asc",onChange:s=>console.log("Sort changed to:",s)}),e.jsx("div",{className:"text-xs text-gray-500",children:e.jsx("p",{children:"Try using Tab to focus and Arrow keys to navigate"})})]})};var S,w,C;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 'price-asc',
    onChange: () => {}
  }
}`,...(C=(w=o.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var D,k,V;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    value: 'price-desc',
    onChange: () => {}
  }
}`,...(V=(k=n.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var P,A,O;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    value: 'name-asc',
    onChange: () => {}
  }
}`,...(O=(A=l.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var F,H,L;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    value: 'name-desc',
    onChange: () => {}
  }
}`,...(L=(H=i.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};var T,I,R;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    value: 'price-asc',
    onChange: () => {},
    label: ''
  }
}`,...(R=(I=d.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var _,E,$;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    value: 'price-asc',
    onChange: () => {},
    label: 'Order by:'
  }
}`,...($=(E=m.parameters)==null?void 0:E.docs)==null?void 0:$.source}}};var q,M,B;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div className="text-sm font-medium text-gray-700 mb-2">All Sort Options:</div>\r
      <div className="space-y-2">\r
        <SortDropdown value="price-asc" onChange={() => {}} />\r
        <SortDropdown value="price-desc" onChange={() => {}} />\r
        <SortDropdown value="name-asc" onChange={() => {}} />\r
        <SortDropdown value="name-desc" onChange={() => {}} />\r
      </div>\r
    </div>
}`,...(B=(M=p.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var G,K,W;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => {
    const [sortValue, setSortValue] = useState<SortOption>('price-asc');
    return <div className="space-y-4 w-80">\r
        <SortDropdown value={sortValue} onChange={setSortValue} />\r
        \r
        <div className="text-sm text-gray-600">\r
          Current sort: <span className="font-mono">{sortValue}</span>\r
        </div>\r
        \r
        <div className="text-xs text-gray-500">\r
          Select different options to see the value change\r
        </div>\r
      </div>;
  }
}`,...(W=(K=u.parameters)==null?void 0:K.docs)==null?void 0:W.source}}};var Z,z,J;x.parameters={...x.parameters,docs:{...(Z=x.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-6 w-full max-w-4xl">\r
      <div className="space-y-6">\r
        {/* Header with search and sort */}\r
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">\r
          <div>\r
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>\r
            <p className="text-gray-600">Showing 24 products</p>\r
          </div>\r
          \r
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">\r
            <SortDropdown value="price-asc" onChange={value => console.log('Sort changed to:', value)} />\r
          </div>\r
        </div>\r
        \r
        {/* Product grid placeholder */}\r
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">\r
          {Array.from({
          length: 8
        }).map((_, i) => <div key={i} className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">\r
              <span className="text-gray-500">Product {i + 1}</span>\r
            </div>)}\r
        </div>\r
      </div>\r
    </div>
}`,...(J=(z=x.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var Q,U,X;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="bg-gray-50 p-6 w-80">\r
      <div className="space-y-6">\r
        <div>\r
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters & Sort</h2>\r
          \r
          <div className="space-y-4">\r
            <div>\r
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sort</h3>\r
              <SortDropdown value="price-asc" onChange={value => console.log('Sort changed to:', value)} />\r
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
        </div>\r
      </div>\r
    </div>
}`,...(X=(U=g.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,ee,se;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-4 w-80">\r
      <div className="space-y-4">\r
        <div className="flex items-center justify-between">\r
          <h1 className="text-lg font-bold text-gray-900">Products</h1>\r
          <button className="text-gray-600">☰</button>\r
        </div>\r
        \r
        <div className="flex flex-col gap-2">\r
          <SortDropdown value="price-asc" onChange={value => console.log('Sort changed to:', value)} />\r
        </div>\r
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
}`,...(se=(ee=h.parameters)==null?void 0:ee.docs)==null?void 0:se.source}}};var ae,re,te;v.parameters={...v.parameters,docs:{...(ae=v.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => {
    const [sortValue, setSortValue] = useState<SortOption>('price-asc');
    const [sortHistory, setSortHistory] = useState<SortOption[]>([]);
    const handleSortChange = (value: SortOption) => {
      setSortValue(value);
      setSortHistory(prev => [value, ...prev.slice(0, 4)]);
      console.log('Sort changed to:', value);
    };
    return <div className="space-y-6 w-96">\r
        <SortDropdown value={sortValue} onChange={handleSortChange} />\r
        \r
        {sortHistory.length > 0 && <div>\r
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Sorts</h3>\r
            <div className="space-y-1">\r
              {sortHistory.map((sort, index) => <button key={index} onClick={() => setSortValue(sort)} className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1">\r
                  {sort}\r
                </button>)}\r
            </div>\r
          </div>}\r
        \r
        <div className="text-xs text-gray-500">\r
          <p>• Select different sort options to see them in action</p>\r
          <p>• Recent sorts are tracked and can be clicked to restore</p>\r
        </div>\r
      </div>;
  }
}`,...(te=(re=v.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ce,oe,ne;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-96">\r
      <div className="text-sm text-gray-600">\r
        <p>This dropdown has proper accessibility features:</p>\r
        <ul className="list-disc list-inside mt-2 space-y-1">\r
          <li>Label associated with select via htmlFor/id</li>\r
          <li>Proper name attribute for form submission</li>\r
          <li>Keyboard navigation support</li>\r
          <li>Focus states for visual feedback</li>\r
        </ul>\r
      </div>\r
      \r
      <SortDropdown value="price-asc" onChange={value => console.log('Sort changed to:', value)} />\r
      \r
      <div className="text-xs text-gray-500">\r
        <p>Try using Tab to focus and Arrow keys to navigate</p>\r
      </div>\r
    </div>
}`,...(ne=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};const me=["Default","PriceDescending","NameAscending","NameDescending","WithoutLabel","CustomLabel","AllSortOptions","ControlledComponent","InProductGrid","InFilterSidebar","MobileLayout","InteractiveDemo","AccessibilityDemo"];export{y as AccessibilityDemo,p as AllSortOptions,u as ControlledComponent,m as CustomLabel,o as Default,g as InFilterSidebar,x as InProductGrid,v as InteractiveDemo,h as MobileLayout,l as NameAscending,i as NameDescending,n as PriceDescending,d as WithoutLabel,me as __namedExportsOrder,de as default};
