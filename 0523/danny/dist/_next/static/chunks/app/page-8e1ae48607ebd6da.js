(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7915:function(e,t,s){Promise.resolve().then(s.bind(s,1766))},1766:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return j}});var n=s(7437);s(594),s(9252);var l=s(2265);s(269);var a=s(6446),r=s(9997),o=function(e){let{role:t,content:s}=e;return(0,n.jsxs)("div",{className:"assistant"===t?"d-flex flex-row ai-chat-box border p-2 m-1 rounded":"d-flex flex-row user-chat-box border p-2 m-1 rounded",children:[(0,n.jsx)("div",{className:"chat-icon px-1",children:"assistant"===t?(0,n.jsx)("i",{className:"bi bi-robot"}):(0,n.jsx)("i",{className:"bi bi-person-circle"})}),(0,n.jsx)(a.U,{remarkPlugins:[r.Z],className:"chat-text mx-1",children:s})]})},i=s(4746),c=function(e){let{chat:t}=e,s=(0,l.useRef)(null),a=(0,l.useRef)(null),[r,c]=(0,l.useState)(!0),[u,d]=(0,l.useState)(!1),[x,h]=(0,l.useState)(""),[m,p]=(0,l.useState)(!1),j=()=>{s.current&&s.current.scrollIntoView({behavior:"smooth"})};return(0,l.useEffect)(()=>{r&&(j(),p(!0))},[t,r,m]),(0,n.jsxs)("div",{className:" p-3 chat-list",ref:a,onScroll:()=>{if(a.current){let{scrollTop:e,clientHeight:t,scrollHeight:s}=a.current;d(s-e>t+15)}},children:[t.map((e,t)=>(0,n.jsx)(o,{role:e.role,content:e.content},t)),(0,n.jsx)("div",{className:"scrool-button",children:u&&(0,n.jsx)(i.Z,{className:"rounded-pill btn-secondary",onClick:()=>{c(!0)},children:(0,n.jsx)("i",{className:"bi bi-arrow-down"})})}),(0,n.jsx)("div",{ref:s})]})},u=s(2824),d=s(358),x=s(6712),h=s(8473),m=s(2368),p=function(e){let{message:t,setMessage:s,sendMessage:l,apiUrl:a,setApiUrl:r,apiToken:o,setApiToken:i,model:c,setModel:p,clearChat:j}=e;return(0,n.jsx)("div",{className:"input-area",children:(0,n.jsxs)(u.Z,{fluid:!0,children:[(0,n.jsx)(d.Z,{className:"my-1",children:(0,n.jsx)(x.Z,{children:(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(m.Z.Control,{as:"textarea",rows:3,value:t,onChange:s,onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),l())}}),(0,n.jsxs)("div",{className:"d-flex flex-column",children:[(0,n.jsx)("button",{className:"btn btn-outline-primary m-2",onClick:l,children:(0,n.jsx)("i",{className:"bi bi-send-fill"})}),(0,n.jsx)("button",{className:"btn btn-outline-primary m-2",onClick:j,children:(0,n.jsx)("i",{className:"bi bi-x-octagon"})})]})]})})}),(0,n.jsxs)(d.Z,{children:[(0,n.jsx)(x.Z,{md:6,className:"my-1",children:(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(h.Z.Text,{children:"API URL"}),(0,n.jsx)(m.Z.Control,{type:"text",list:"api-url-list",value:a,onChange:r}),(0,n.jsxs)("datalist",{id:"api-url-list",children:[(0,n.jsx)("option",{value:"https://api.openai.com/v1/chat/completions"}),(0,n.jsx)("option",{value:"http://localhost:11434/v1/chat/completions"})]})]})}),(0,n.jsx)(x.Z,{md:3,className:"my-1",children:(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(h.Z.Text,{children:"API Token"}),(0,n.jsx)(m.Z.Control,{type:"text",value:o,onChange:i})]})}),(0,n.jsx)(x.Z,{md:3,className:"my-1",children:(0,n.jsxs)(h.Z,{children:[(0,n.jsx)(h.Z.Text,{children:"Model"}),(0,n.jsx)(m.Z.Control,{type:"text",list:"model-list",value:c,onChange:p}),(0,n.jsxs)("datalist",{id:"model-list",children:[(0,n.jsx)("option",{value:"gpt-3.5-turbo"}),(0,n.jsx)("option",{value:"gpt-4-turbo"}),(0,n.jsx)("option",{value:"gpt-4o"}),(0,n.jsx)("option",{value:"gemma:7b"}),(0,n.jsx)("option",{value:"llama3:8b"})]})]})})]})]})})};function j(){let[e,t]=(0,l.useState)(""),[s,a]=(0,l.useState)([]),[r,o]=(0,l.useState)("http://localhost:11434/v1/chat/completions"),[i,u]=(0,l.useState)("iloveyourtoken"),[d,x]=(0,l.useState)("gemma:7b"),h=(0,l.useRef)(s),m=async()=>{let n={role:"user",content:e};t(""),a(e=>{let t=[...e,n];return h.current=t,t}),console.log(h.current);let l=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(i)},body:JSON.stringify({messages:[...s,n],model:d,stream:!0})});if(!l.ok){console.error("Failed to send message");return}let o=l.body.getReader(),c=new TextDecoder,u=e=>{let{done:t,value:s}=e;if(t)return;let n=c.decode(s,{stream:!0});return console.log(n),n.split("\n").forEach(e=>{let t=e.replace("data: ","");if("[DONE]"!==t&&t.length>0){console.log(t);let e=JSON.parse(t+"\n");"user"===h.current[h.current.length-1].role?a(t=>{let s=[...t,e.choices[0].delta];return h.current=s,s}):(console.log("append:",e.choices[0].delta.content),h.current[h.current.length-1].content+=e.choices[0].delta.content,a([...h.current]))}}),o.read().then(u)};o.read().then(u)};return(0,n.jsxs)("main",{className:"d-flex flex-column h-100",children:[(0,n.jsx)(c,{chat:s}),(0,n.jsx)(p,{message:e,setMessage:e=>t(e.target.value),sendMessage:m,apiUrl:r,setApiUrl:e=>o(e.target.value),apiToken:i,setApiToken:e=>u(e.target.value),model:d,setModel:e=>x(e.target.value),clearChat:()=>{a([])}})]})}},269:function(){}},function(e){e.O(0,[610,51,983,441,971,23,744],function(){return e(e.s=7915)}),_N_E=e.O()}]);