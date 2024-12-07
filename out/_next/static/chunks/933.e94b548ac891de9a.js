"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[933],{6933:function(e,t,s){s.r(t),s.d(t,{default:function(){return n}});var a=s(7437),l=s(9298),r=s(2265);function n(e){let{isOpen:t,onClose:s,onSubmitSuccess:n}=e,[i,o]=(0,r.useState)("신랑"),[d,c]=(0,r.useState)("참석"),[u,m]=(0,r.useState)(1),[x,b]=(0,r.useState)(""),[f,g]=(0,r.useState)(""),h=async e=>{if(e.preventDefault(),"참석"===d&&(!u||u<1)){alert("참석 인원은 최소 1명 이상이어야 합니다.");return}try{let e=new Date,t=e.getTimezoneOffset(),a=new Date(e.getTime()+6e4*(540+t)).toISOString();if(!(await fetch("/.netlify/functions/submitRsvp",{method:"POST",body:JSON.stringify({name:x,side:i,attendance:d,numberOfGuests:u,message:f,submittedAt:a})})).ok)throw Error("제출 중 오류가 발생했습니다");n({name:x,message:f,submittedAt:a}),s(),alert("참석 여부가 성공적으로 전달되었습니다.")}catch(e){console.error("Error:",e),alert("제출 중 오류가 발생했습니다.")}};return(0,a.jsxs)(l.Vq,{open:t,onClose:s,className:"relative z-50",children:[(0,a.jsx)("div",{className:"fixed inset-0 bg-black/50","aria-hidden":"true"}),(0,a.jsx)("div",{className:"fixed inset-0 flex items-center justify-center p-4",children:(0,a.jsxs)(l.Vq.Panel,{className:"bg-white rounded-lg w-full max-w-md p-6",children:[(0,a.jsx)(l.Vq.Title,{className:"text-center mb-6 font-serif italic",children:"R.S.V.P"}),(0,a.jsxs)("div",{className:"flex mb-6",children:[(0,a.jsx)("button",{type:"button",className:"flex-1 py-2 border-b ".concat("신랑"===i?"bg-[#B4A89F] text-white":""),onClick:()=>o("신랑"),children:"신랑측 하객"}),(0,a.jsx)("button",{type:"button",className:"flex-1 py-2 border-b ".concat("신부"===i?"bg-[#B4A89F] text-white":""),onClick:()=>o("신부"),children:"신부측 하객"})]}),(0,a.jsxs)("form",{onSubmit:h,className:"space-y-4",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"성함"}),(0,a.jsx)("input",{type:"text",value:x,onChange:e=>b(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2",required:!0,placeholder:"성함을 입력해 주세요"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"참석 여부"}),(0,a.jsx)("div",{className:"flex gap-2 mt-1",children:[{value:"참석",label:"참석하겠습니다"},{value:"미정",label:"미정입니다"},{value:"미참",label:"참석이 어렵습니다"}].map(e=>(0,a.jsx)("button",{type:"button",className:"flex-1 py-1.5 rounded text-xs ".concat(d===e.value?"bg-[#B4A89F] text-white":"border hover:bg-gray-50"),onClick:()=>c(e.value),children:e.label},e.value))})]}),"참석"===d&&(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"참석 인원"}),(0,a.jsx)("input",{type:"number",min:"1",max:"50",value:u,onChange:e=>{m(""===e.target.value?"":parseInt(e.target.value))},onBlur:()=>{(!u||u<1)&&m(1)},className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("label",{className:"block text-sm font-medium text-gray-700",children:"축하 메시지"}),(0,a.jsx)("textarea",{value:f,onChange:e=>g(e.target.value),className:"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2",rows:3,placeholder:"축하 메시지를 남겨주세요 (선택사항)"})]}),(0,a.jsxs)("div",{className:"flex justify-end space-x-2 pt-4",children:[(0,a.jsx)("button",{type:"button",onClick:s,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200",children:"닫기"}),(0,a.jsx)("button",{type:"submit",disabled:!x.trim(),className:"px-4 py-2 text-sm font-medium rounded-md ".concat(x.trim()?"bg-[#B4A89F] text-white hover:bg-[#a39689]":"bg-gray-300 text-gray-500 cursor-not-allowed"),children:"제출하기"})]})]})]})})]})}}}]);