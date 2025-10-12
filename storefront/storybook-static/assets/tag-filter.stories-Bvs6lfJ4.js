import{j as e}from"./jsx-runtime-CDt2p4po.js";import{r as k}from"./index-GiUgBvb1.js";import{B as me}from"./badge-_4BIBrpX.js";const i=({availableTags:s,selectedTags:o,onToggleTag:c,label:n="Filter by tags"})=>{const r=o.length,a=r>0,g=()=>{o.forEach(t=>{c(t)})},d=t=>{c(t)};return e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-sm font-medium text-gray-700",children:[n," ",a&&`(${r} selected)`]}),a&&e.jsx("button",{onClick:g,"aria-label":"Clear all selected tags",className:"text-xs text-blue-600 hover:text-blue-800 underline",children:"Clear all"})]}),e.jsx("div",{className:"flex flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible",children:s.map(t=>{const w=o.includes(t);return e.jsx(me,{variant:w?"success":"default",size:"sm",className:"cursor-pointer hover:opacity-80 transition-opacity duration-200",onClick:()=>d(t),role:"button","aria-pressed":w,"aria-label":`Filter by ${t}`,children:t},t)})})]})};i.__docgenInfo={description:"",methods:[],displayName:"TagFilter",props:{availableTags:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},selectedTags:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onToggleTag:{required:!0,tsType:{name:"signature",type:"function",raw:"(tag: string) => void",signature:{arguments:[{type:{name:"string"},name:"tag"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Filter by tags'",computed:!1}}}};const ue={title:"Molecules/TagFilter",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onToggleTag:{action:"toggled"}}},l=["electronics","clothing","books","home","sports"],m={args:{availableTags:l,selectedTags:[],onToggleTag:()=>{}}},p={args:{availableTags:l,selectedTags:["electronics","books"],onToggleTag:()=>{}}},T={args:{availableTags:l,selectedTags:l,onToggleTag:()=>{}}},x={args:{availableTags:["electronics","clothing","books","home","sports","automotive","beauty","toys","garden","office","health","food","travel","music","movies","games","fitness","baby","pet","jewelry"],selectedTags:["electronics","books","sports"],onToggleTag:()=>{}}},u={args:{availableTags:["electronics"],selectedTags:["electronics"],onToggleTag:()=>{}}},v={args:{availableTags:[],selectedTags:[],onToggleTag:()=>{}}},h={args:{availableTags:l,selectedTags:["electronics"],onToggleTag:()=>{},label:"Filter by category"}},b={render:()=>{const[s,o]=k.useState(["electronics","books"]),c=n=>{o(r=>r.includes(n)?r.filter(a=>a!==n):[...r,n])};return e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsx(i,{availableTags:l,selectedTags:s,onToggleTag:c}),e.jsxs("div",{className:"text-sm text-gray-600",children:["Selected tags: ",e.jsx("span",{className:"font-mono",children:s.join(", ")||"none"})]}),e.jsx("div",{className:"text-xs text-gray-500",children:'Click tags to toggle selection, or use "Clear all" to remove all selections'})]})}},y={render:()=>e.jsx("div",{className:"bg-gray-50 p-6 w-80",children:e.jsx("div",{className:"space-y-6",children:e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:"Filters"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(i,{availableTags:["electronics","clothing","books","home","sports"],selectedTags:["electronics","books"],onToggleTag:s=>console.log("Tag toggled:",s)}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Price Range"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("input",{type:"range",className:"w-full",min:"0",max:"1000",defaultValue:"500"}),e.jsxs("div",{className:"flex justify-between text-xs text-gray-500",children:[e.jsx("span",{children:"$0"}),e.jsx("span",{children:"$1000"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Brand"}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Apple"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Samsung"})]}),e.jsxs("label",{className:"flex items-center",children:[e.jsx("input",{type:"checkbox",className:"mr-2"}),e.jsx("span",{className:"text-sm text-gray-600",children:"Google"})]})]})]})]})]})})})},N={render:()=>e.jsx("div",{className:"bg-white p-4 w-80",children:e.jsxs("div",{className:"space-y-4",children:[e.jsx("h1",{className:"text-lg font-bold text-gray-900",children:"Product Filters"}),e.jsx(i,{availableTags:["electronics","clothing","books","home","sports","automotive","beauty","toys","garden","office","health","food","travel"],selectedTags:["electronics","books","sports"],onToggleTag:s=>console.log("Tag toggled:",s)}),e.jsx("div",{className:"text-xs text-gray-500",children:"Tags are horizontally scrollable on mobile devices"})]})}),parameters:{viewport:{defaultViewport:"mobile1"}}},f={render:()=>{const[s,o]=k.useState(["electronics"]),[c,n]=k.useState(["electronics"]),r=a=>{const g=s.includes(a)?s.filter(d=>d!==a):[...s,a];o(g),n(d=>[a,...d.slice(0,9)]),console.log("Tag toggled:",a)};return e.jsxs("div",{className:"space-y-6 w-96",children:[e.jsx(i,{availableTags:l,selectedTags:s,onToggleTag:r}),c.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-2",children:"Recent Actions"}),e.jsx("div",{className:"space-y-1",children:c.slice(0,5).map((a,g)=>e.jsxs("div",{className:"text-sm text-gray-600",children:["Toggled: ",e.jsx("span",{className:"font-mono",children:a})]},g))})]}),e.jsxs("div",{className:"text-xs text-gray-500",children:[e.jsx("p",{children:"• Click tags to toggle selection"}),e.jsx("p",{children:'• Use "Clear all" to remove all selections'}),e.jsx("p",{children:"• Recent actions are tracked"})]})]})}},j={render:()=>e.jsxs("div",{className:"space-y-4 w-96",children:[e.jsxs("div",{className:"text-sm text-gray-600",children:[e.jsx("p",{children:"This tag filter has proper accessibility features:"}),e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsx("li",{children:'Tags are buttons with role="button"'}),e.jsx("li",{children:'Selected tags have aria-pressed="true"'}),e.jsx("li",{children:"Each tag has descriptive aria-label"}),e.jsx("li",{children:"Clear all button has aria-label"}),e.jsx("li",{children:"Keyboard navigation support"})]})]}),e.jsx(i,{availableTags:l,selectedTags:["electronics","books"],onToggleTag:s=>console.log("Tag toggled:",s)}),e.jsx("div",{className:"text-xs text-gray-500",children:e.jsx("p",{children:"Try using Tab to navigate and Enter/Space to activate tags"})})]})},S={args:{availableTags:["electronics","clothing and accessories","books and media","home and garden","sports and outdoor","automotive and tools","beauty and personal care","toys and games","office supplies","health and wellness"],selectedTags:["clothing and accessories","books and media"],onToggleTag:()=>{}}};var C,F,A;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    availableTags: defaultTags,
    selectedTags: [],
    onToggleTag: () => {}
  }
}`,...(A=(F=m.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var E,H,R;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    availableTags: defaultTags,
    selectedTags: ['electronics', 'books'],
    onToggleTag: () => {}
  }
}`,...(R=(H=p.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var P,$,I;T.parameters={...T.parameters,docs:{...(P=T.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    availableTags: defaultTags,
    selectedTags: defaultTags,
    onToggleTag: () => {}
  }
}`,...(I=($=T.parameters)==null?void 0:$.docs)==null?void 0:I.source}}};var M,V,q;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    availableTags: ['electronics', 'clothing', 'books', 'home', 'sports', 'automotive', 'beauty', 'toys', 'garden', 'office', 'health', 'food', 'travel', 'music', 'movies', 'games', 'fitness', 'baby', 'pet', 'jewelry'],
    selectedTags: ['electronics', 'books', 'sports'],
    onToggleTag: () => {}
  }
}`,...(q=(V=x.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var B,D,L;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    availableTags: ['electronics'],
    selectedTags: ['electronics'],
    onToggleTag: () => {}
  }
}`,...(L=(D=u.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var _,z,G;v.parameters={...v.parameters,docs:{...(_=v.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    availableTags: [],
    selectedTags: [],
    onToggleTag: () => {}
  }
}`,...(G=(z=v.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};var K,U,O;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    availableTags: defaultTags,
    selectedTags: ['electronics'],
    onToggleTag: () => {},
    label: 'Filter by category'
  }
}`,...(O=(U=h.parameters)==null?void 0:U.docs)==null?void 0:O.source}}};var J,Q,W;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['electronics', 'books']);
    const handleToggleTag = (tag: string) => {
      setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };
    return <div className="space-y-4 w-96">\r
        <TagFilter availableTags={defaultTags} selectedTags={selectedTags} onToggleTag={handleToggleTag} />\r
        \r
        <div className="text-sm text-gray-600">\r
          Selected tags: <span className="font-mono">{selectedTags.join(', ') || 'none'}</span>\r
        </div>\r
        \r
        <div className="text-xs text-gray-500">\r
          Click tags to toggle selection, or use "Clear all" to remove all selections\r
        </div>\r
      </div>;
  }
}`,...(W=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="bg-gray-50 p-6 w-80">\r
      <div className="space-y-6">\r
        <div>\r
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>\r
          \r
          <div className="space-y-4">\r
            <TagFilter availableTags={['electronics', 'clothing', 'books', 'home', 'sports']} selectedTags={['electronics', 'books']} onToggleTag={tag => console.log('Tag toggled:', tag)} />\r
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
            \r
            <div>\r
              <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>\r
              <div className="space-y-2">\r
                <label className="flex items-center">\r
                  <input type="checkbox" className="mr-2" />\r
                  <span className="text-sm text-gray-600">Apple</span>\r
                </label>\r
                <label className="flex items-center">\r
                  <input type="checkbox" className="mr-2" />\r
                  <span className="text-sm text-gray-600">Samsung</span>\r
                </label>\r
                <label className="flex items-center">\r
                  <input type="checkbox" className="mr-2" />\r
                  <span className="text-sm text-gray-600">Google</span>\r
                </label>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,ae;N.parameters={...N.parameters,docs:{...(ee=N.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <div className="bg-white p-4 w-80">\r
      <div className="space-y-4">\r
        <h1 className="text-lg font-bold text-gray-900">Product Filters</h1>\r
        \r
        <TagFilter availableTags={['electronics', 'clothing', 'books', 'home', 'sports', 'automotive', 'beauty', 'toys', 'garden', 'office', 'health', 'food', 'travel']} selectedTags={['electronics', 'books', 'sports']} onToggleTag={tag => console.log('Tag toggled:', tag)} />\r
        \r
        <div className="text-xs text-gray-500">\r
          Tags are horizontally scrollable on mobile devices\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(ae=(se=N.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var te,re,le;f.parameters={...f.parameters,docs:{...(te=f.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['electronics']);
    const [tagHistory, setTagHistory] = useState<string[]>(['electronics']);
    const handleToggleTag = (tag: string) => {
      const newSelectedTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
      setTagHistory(prev => [tag, ...prev.slice(0, 9)]);
      console.log('Tag toggled:', tag);
    };
    return <div className="space-y-6 w-96">\r
        <TagFilter availableTags={defaultTags} selectedTags={selectedTags} onToggleTag={handleToggleTag} />\r
        \r
        {tagHistory.length > 0 && <div>\r
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Actions</h3>\r
            <div className="space-y-1">\r
              {tagHistory.slice(0, 5).map((tag, index) => <div key={index} className="text-sm text-gray-600">\r
                  Toggled: <span className="font-mono">{tag}</span>\r
                </div>)}\r
            </div>\r
          </div>}\r
        \r
        <div className="text-xs text-gray-500">\r
          <p>• Click tags to toggle selection</p>\r
          <p>• Use "Clear all" to remove all selections</p>\r
          <p>• Recent actions are tracked</p>\r
        </div>\r
      </div>;
  }
}`,...(le=(re=f.parameters)==null?void 0:re.docs)==null?void 0:le.source}}};var oe,ce,ne;j.parameters={...j.parameters,docs:{...(oe=j.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => <div className="space-y-4 w-96">\r
      <div className="text-sm text-gray-600">\r
        <p>This tag filter has proper accessibility features:</p>\r
        <ul className="list-disc list-inside mt-2 space-y-1">\r
          <li>Tags are buttons with role="button"</li>\r
          <li>Selected tags have aria-pressed="true"</li>\r
          <li>Each tag has descriptive aria-label</li>\r
          <li>Clear all button has aria-label</li>\r
          <li>Keyboard navigation support</li>\r
        </ul>\r
      </div>\r
      \r
      <TagFilter availableTags={defaultTags} selectedTags={['electronics', 'books']} onToggleTag={tag => console.log('Tag toggled:', tag)} />\r
      \r
      <div className="text-xs text-gray-500">\r
        <p>Try using Tab to navigate and Enter/Space to activate tags</p>\r
      </div>\r
    </div>
}`,...(ne=(ce=j.parameters)==null?void 0:ce.docs)==null?void 0:ne.source}}};var ie,ge,de;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    availableTags: ['electronics', 'clothing and accessories', 'books and media', 'home and garden', 'sports and outdoor', 'automotive and tools', 'beauty and personal care', 'toys and games', 'office supplies', 'health and wellness'],
    selectedTags: ['clothing and accessories', 'books and media'],
    onToggleTag: () => {}
  }
}`,...(de=(ge=S.parameters)==null?void 0:ge.docs)==null?void 0:de.source}}};const ve=["NoTagsSelected","SomeTagsSelected","AllTagsSelected","ManyTags","SingleTag","EmptyTags","CustomLabel","ControlledComponent","InProductFilters","MobileScrollable","InteractiveDemo","AccessibilityDemo","LongTagNames"];export{j as AccessibilityDemo,T as AllTagsSelected,b as ControlledComponent,h as CustomLabel,v as EmptyTags,y as InProductFilters,f as InteractiveDemo,S as LongTagNames,x as ManyTags,N as MobileScrollable,m as NoTagsSelected,u as SingleTag,p as SomeTagsSelected,ve as __namedExportsOrder,ue as default};
