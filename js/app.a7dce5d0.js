(function(t){function e(e){for(var a,r,o=e[0],u=e[1],c=e[2],p=0,d=[];p<o.length;p++)r=o[p],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&d.push(i[r][0]),i[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(t[a]=u[a]);l&&l(e);while(d.length)d.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var u=n[o];0!==i[u]&&(a=!1)}a&&(s.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},i={app:0},s=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],u=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var l=u;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"09e3":function(t,e,n){t.exports=n.p+"img/staked.7a592956.svg"},1:function(t,e){},10:function(t,e){},11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},15:function(t,e){},16:function(t,e){},17:function(t,e){},18:function(t,e){},19:function(t,e){},"1ac9":function(t,e,n){var a={"./error.svg":"5158","./fail.svg":"c6ff","./pending.svg":"a5e1","./success.svg":"b2c2"};function i(t){var e=s(t);return n(e)}function s(t){if(!n.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}i.keys=function(){return Object.keys(a)},i.resolve=s,t.exports=i,i.id="1ac9"},2:function(t,e){},20:function(t,e){},21:function(t,e){},"21e2":function(t){t.exports=JSON.parse('[{"inputs":[{"internalType":"contract ERC20","name":"_dora","type":"address"},{"internalType":"address[]","name":"_initUserList","type":"address[]"},{"internalType":"uint256[]","name":"_initPOSList","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_parent","type":"address"},{"indexed":true,"internalType":"address","name":"_child","type":"address"}],"name":"Activate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_totalAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_endTime","type":"uint256"}],"name":"Stake","type":"event"},{"inputs":[],"name":"ACTIVATION_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DORAYAKI","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FORCE_QUIT_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FORCE_QUIT_THRESHOLD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_STORED_POS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_AUTH_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_AUTH_STAKING","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newUser","type":"address"}],"name":"activate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"childOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"childrenSizeOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forceQuit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"parentOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"proofOf","outputs":[{"internalType":"uint256","name":"proof","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"},{"internalType":"uint256","name":"_tip","type":"uint256"},{"internalType":"address","name":"_entrusted","type":"address"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"statusOf","outputs":[{"internalType":"bool","name":"authenticated","type":"bool"},{"internalType":"uint256","name":"stakingAmount","type":"uint256"},{"internalType":"uint256","name":"stakingEndTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"tipOf","outputs":[{"internalType":"uint256","name":"tip","type":"uint256"},{"internalType":"address","name":"entrusted","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_endTime","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"}]')},22:function(t,e){},23:function(t,e){},24:function(t,e){},25:function(t,e){},26:function(t,e){},27:function(t,e){},28:function(t,e){},29:function(t,e){},"2e8a":function(t,e,n){"use strict";n("6208")},"2f24":function(t,e,n){},"2f47":function(t,e,n){t.exports=n.p+"img/locked.a04f8d3d.svg"},3:function(t,e){},30:function(t,e){},"333d":function(t,e,n){t.exports=n.p+"img/amount.aec89281.svg"},4:function(t,e){},4576:function(t,e,n){"use strict";n("2f24")},"4e36":function(t,e,n){},"4fc1":function(t,e,n){},5:function(t,e){},5158:function(t,e,n){t.exports=n.p+"img/error.8c70801a.svg"},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t.logined?n("Home"):n("Login",{attrs:{netError:t.networkError}})],1)},s=[],r=n("5530"),o=n("2f62"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[t._m(0),a("div",{staticClass:"home-container main-width"},[a("div",{staticClass:"dora-account",attrs:{"not-certified":!t.status.authed}},[a("p",[t.status.authed?a("img",{attrs:{src:n("c5b3")}}):a("img",{attrs:{src:n("e377")}}),a("span",[t._v(t._s(t.status.authed?"Certified":"Not Certified"))])]),a("div",{staticClass:"addr"},[t._v(t._s(t.account))])]),a("div",{staticClass:"dora-states"},[a("p",{staticClass:"title"},[t._v("DORA Balance")]),a("p",{staticClass:"amount"},[t._v(t._s(t.status.balance))]),a("p",{staticClass:"unit"},[t._v("DORA")])]),a("div",{staticClass:"dora-states"},[a("p",{staticClass:"title"},[t._v("Staking Amount")]),a("p",{staticClass:"amount"},[t._v(t._s(t.status.stakingAmount))]),a("p",{staticClass:"unit"},[t._v("DORA")])]),a("div",{staticClass:"dora-states"},[a("p",{staticClass:"title"},[t._v("Staking Status")]),a("StakingTime",{attrs:{locked:t.locked,endTime:t.status.stakingEndTime},on:{"update:locked":function(e){t.locked=e}}}),a("p",{staticClass:"unit"},[t._v(t._s(t.locked?"Locked":"Unlocked"))])],1),a("div",{staticClass:"dora-feature",attrs:{foucs:t.toStaking}},[a("i",{on:{click:t.stop}}),a("div",{staticClass:"container"},[t._m(1),a("Staking")],1)]),a("div",{staticClass:"dora-feature"},[t._m(2),a("Withdraw")],1),a("div",{staticClass:"dora-feature",attrs:{foucs:t.toCertify}},[a("i",{on:{click:t.stop}}),a("div",{staticClass:"container"},[t._m(3),a("Activate")],1)]),a("div",{staticClass:"tx-log"},[t._m(4),0===t.txList.length?a("div",{staticClass:"no-txs"},[t._v("Empty")]):t._e(),a("transition-group",{attrs:{name:"slide",tag:"div"}},t._l(t.txList,(function(t){return a("TxLog",{key:t.txHash,attrs:{tx:t}})})),1)],1)])])},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",[a("div",{staticClass:"main-width"},[a("img",{attrs:{height:"40px",src:n("9b19"),alt:"logo"}})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("span",[t._v("Stake")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("span",[t._v("Withdraw")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title"},[n("span",[t._v("Certify")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-container"},[n("p",{staticClass:"title"},[t._v("History")]),n("span",[t._v("save only in current session")])])}],l=n("1da1"),p=(n("96cf"),n("2ca0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"staking-status"},[t.locked?a("span",[t._v(t._s(t.timeLeft))]):t._e(),t.locked?a("img",{attrs:{src:n("62d7")}}):a("img",{attrs:{src:n("ef81")}})])}),d=[],m=(n("a9e3"),n("99af"),{name:"StakingTime",props:{endTime:{type:Number,default:0},locked:{type:Boolean,default:!0}},data:function(){return{interval:0,timeLeft:""}},watch:{endTime:function(){this.update()}},mounted:function(){var t=this;this.interval=setInterval((function(){t.update()}),1e3)},beforeDestroy:function(){clearInterval(this.interval)},methods:{update:function(){var t=Date.now();if(t>this.endTime)return this.timeLeft="",void this.$emit("update:locked",!1);this.locked||this.$emit("update:locked",!0);var e=this.endTime-t,n=Math.floor(e/864e5),a=Math.floor(e%864e5/36e5),i=Math.floor(e%36e5/6e4),s=Math.floor(e%6e4/1e3),r="";r=n?"".concat(n,"days ").concat(a,"h"):a?"".concat(a,"h ").concat(i,"min"):i?"".concat(i,"min ").concat(s,"sec"):"".concat(s,"sec"),this.timeLeft=r}}}),f=m,h=(n("4576"),n("2877")),v=Object(h["a"])(f,p,d,!1,null,"929666dc",null),y=v.exports,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dora-form"},[n("div",{staticClass:"form-item"},[t._m(0),n("div",{staticClass:"check-box",attrs:{selected:t.all},on:{click:t.toggleAll}},[n("div"),n("span",[t._v("All")])])]),n("div",{staticClass:"input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],attrs:{type:"number",placeholder:"0",disabled:t.all||t.specified},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}}),n("hr"),n("span",[t._v("DORA")])]),n("hr"),n("div",{staticClass:"form-item form-item-inline"},[t._m(1),n("div",{staticClass:"input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.period,expression:"period"}],attrs:{type:"number",placeholder:t.minStakingDays,disabled:t.specified,error:t.inputPeriodError},domProps:{value:t.period},on:{input:[function(e){e.target.composing||(t.period=e.target.value)},function(e){t.inputPeriodError=!1}]}}),n("hr"),n("span",[t._v("Days")])])]),n("hr"),t.needApprove?n("div",{staticClass:"form-button",attrs:{active:""},on:{click:t.approve}},[t._v("Approve")]):n("div",{staticClass:"form-button",attrs:{active:t.active},on:{click:t.stake}},[t._v("Confirm")])])},g=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"label"},[a("img",{attrs:{src:n("333d")}}),a("span",[t._v("Add Staking Amount")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"label"},[a("img",{attrs:{src:n("62fd")}}),a("span",[t._v("All Staking Period")])])}],_=(n("ac1f"),n("466d"),n("d3b7"),n("25f0"),n("b680"),{name:"Staking",data:function(){return{all:!1,amount:"",period:"",inputPeriodError:!1}},computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["account","route","chain","status"])),{},{needApprove:function(){return 0===this.status.allowance},minStakingDays:function(){var t=Math.max(this.status.stakingEndTime-Date.now(),0);return Math.ceil(t/864e5)},active:function(){return!(!Number(this.amount)&&!Number(this.period))},specified:function(){var t=this.route.match(/\?a=([0-9.]+)&d=([0-9]+)/);return t&&t.length?{amount:t[1],ddl:1e3*Number(t[2])}:null}}),watch:{status:function(){this.updateRq()}},methods:{toggleAll:function(){this.all=!this.all,this.all?this.amount=this.status.balance:this.amount=""},updateRq:function(){if(this.specified){this.amount=Math.max(0,Number((Number(this.specified.amount)-Number(this.status.stakingAmount)||0).toFixed(4))).toString();var t=Date.now(),e=Math.max(0,Math.ceil((this.status.stakingEndTime-t)/864e5)),n=Math.ceil((this.specified.ddl-t)/864e5);this.period=n>e?n.toString():""}},approve:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.needApprove){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.chain.approve(t.account);case 4:if(n=e.sent,n){e.next=7;break}return e.abrupt("return",t.$toast.warning("Transaction not sent!"));case 7:t.$toast.success("Transaction sent, please wait patiently."),t.$store.commit("PUSH_TX",{txHash:n,type:"Approve"});case 9:case"end":return e.stop()}}),e)})))()},stake:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.active){e.next=2;break}return e.abrupt("return");case 2:if(n=t.amount||"0",a=t.period?Date.now()+864e5*Number(t.period):t.status.stakingEndTime,!(a<t.status.stakingEndTime)){e.next=7;break}return t.inputPeriodError=!0,e.abrupt("return",t.$toast.error("You can't set the staking time to a smaller time than the current."));case 7:return e.next=9,t.chain.stake(t.account,n,a);case 9:if(i=e.sent,i){e.next=12;break}return e.abrupt("return",t.$toast.warning("Transaction not sent!"));case 12:t.$toast.success("Transaction sent, please wait patiently."),t.amount="",t.period="",t.$store.commit("UPDATE_ROUTE",""),t.$store.commit("PUSH_TX",{txHash:i,type:"Stake"});case 17:case"end":return e.stop()}}),e)})))()}}}),T=_,w=Object(h["a"])(T,b,g,!1,null,null,null),k=w.exports,x=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dora-form"},[t.disabled?[t._m(0),n("div",{staticClass:"form-item"},[t._m(1),n("div",[t._v(t._s(t.date))])]),n("div",{staticClass:"form-item"},[t._m(2),n("div",[t._v(t._s(t.timeLeft))])])]:[n("div",{staticClass:"form-item"},[t._m(3),n("div",{staticClass:"check-box",attrs:{selected:t.all},on:{click:t.toggleAll}},[n("div"),n("span",[t._v("All")])])]),n("div",{staticClass:"input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],attrs:{type:"number",placeholder:"0",disabled:t.all},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}}),n("hr"),n("span",[t._v("DORA")])]),n("hr"),t._m(4),n("hr",{staticStyle:{opacity:"0"}})],n("div",{staticClass:"form-button",attrs:{disabled:t.disabled,active:t.active},on:{click:t.unstake}},[t._v("Confirm")])],2)},C=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"staked"},[a("img",{attrs:{src:n("09e3")}}),t._v(" Staked ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"label"},[a("img",{attrs:{src:n("2f47")}}),a("span",[t._v("Unlocked time")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"label"},[a("img",{attrs:{src:n("61ad")}}),a("span",[t._v("Left staking period")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"label"},[a("img",{attrs:{src:n("333d")}}),a("span",[t._v("Withdraw staking amount")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"form-item form-item-inline"},[a("a",{staticClass:"label",attrs:{target:"_blank",href:"https://testnet.bscscan.com/address/0x53262b47178797eF8E777C6F0b0AE09eA85d9e33#writeContract"}},[a("img",{attrs:{src:n("62fd")}}),a("span",[t._v("Advanced feature")])])])}],E={name:"Withdraw",computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["account","route","chain","status"])),{},{disabled:function(){return Date.now()<this.status.stakingEndTime},active:function(){return!!Number(this.amount)},date:function(){return new Date(this.status.stakingEndTime).toLocaleDateString()}}),data:function(){return{all:!1,interval:0,timeLeft:"",amount:""}},mounted:function(){var t=this;this.update(),this.interval=setInterval((function(){t.update()}),1e3)},beforeDestroy:function(){clearInterval(this.interval)},methods:{toggleAll:function(){this.all=!this.all,this.all?this.amount=this.status.stakingAmount:this.amount=""},update:function(){var t=Date.now();if(t>this.status.stakingEndTime)return this.timeLeft="",void this.$store.commit("REFRESH");var e=this.status.stakingEndTime-t,n=Math.floor(e/864e5),a=Math.floor(e%864e5/36e5),i=Math.floor(e%36e5/6e4),s=Math.floor(e%6e4/1e3),r="";r=n?"".concat(n,"days ").concat(a,"h"):a?"".concat(a,"h ").concat(i,"min"):i?"".concat(i,"min ").concat(s,"sec"):"".concat(s,"sec"),this.timeLeft=r},unstake:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.active){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.chain.unstake(t.account,t.amount);case 4:if(n=e.sent,n){e.next=7;break}return e.abrupt("return",t.$toast.warning("Transaction not sent!"));case 7:t.$toast.success("Transaction sent, please wait patiently."),t.amount="",t.$store.commit("UPDATE_ROUTE",""),t.$store.commit("PUSH_TX",{txHash:n,type:"Withdraw"});case 11:case"end":return e.stop()}}),e)})))()}}},O=E,A=(n("2e8a"),Object(h["a"])(O,x,C,!1,null,"2685b05e",null)),S=A.exports,R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dora-form"},[t.toCertify?a("div",[a("div",{attrs:{blur:!t.status.authed}},[a("div",{staticClass:"to-cretify"},[a("p",[t._v("Please kindly help:")]),a("p",{staticStyle:{color:"#5f2eea"}},[t._v(t._s(t.aim))]),a("p",[t._v("certify the account")]),a("hr"),a("p",{attrs:{error:!t.status.proof}},[a("b",[t._v("Current POS")]),a("span",[t._v(t._s(t.status.proof)+" "),a("i",[t._v("times certify")])])])]),a("div",{staticClass:"form-buttons"},[a("div",{staticClass:"form-button-n",on:{click:t.stop}},[t._v("No")]),a("div",{staticClass:"form-button",attrs:{active:t.status.proof},on:{click:t.activate}},[t._v("Confirm")])])]),t.status.authed?t._e():a("div",{staticClass:"mask"},[a("p",{staticClass:"sub-title"},[t._v("Can not certify others account!")]),a("hr"),a("p",[t._v("The current account is not authenticated. Only authenticated users can operate.")]),a("div",{staticClass:"form-button-n",staticStyle:{"margin-top":"32px"},on:{click:t.stop}},[t._v("I See")])])]):t.status.authed?a("div",{staticClass:"certified"},[a("img",{attrs:{width:"60px",src:n("e367")}}),a("span",[t._v("You've Certified")])]):a("div",[a("div",{attrs:{blur:!t.enoughAmount||!t.enoughPeriod}},[t._m(0),a("div",{staticClass:"form-button",attrs:{active:""},on:{click:t.copy}},[t._v("Copy My Link")])]),a("transition",{attrs:{name:"fade"}},[t.enoughAmount&&t.enoughPeriod?t._e():a("div",{staticClass:"mask"},[a("p",{staticClass:"sub-title"},[t._v("Not meet the verification requirements")]),a("hr"),a("p",{attrs:{error:!t.enoughAmount}},[t._v("Required Staking Amount "),a("span",[t._v("> 10 DORA")])]),a("p",{attrs:{error:!t.enoughPeriod}},[t._v("Required Staking Period "),a("span",[t._v("> 30 Days")])])])])],1)])},D=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"certify-bg"},[a("img",{attrs:{src:n("f3d2")}})])}],P={name:"Activate",computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["account","route","chain","status"])),{},{enoughAmount:function(){return Number(this.status.stakingAmount)>=10},enoughPeriod:function(){return this.status.stakingEndTime-Date.now()>=2592e6},toCertify:function(){return this.route.startsWith("#a?t=")},aim:function(){var t=this.route.match(/0x[a-fA-F0-9]{40}/);return t&&t.length?t[0]:""}}),methods:{toggle:function(){this.status.authed||(this.opened?this.$store.commit("UPDATE_ROUTE",""):this.$store.commit("UPDATE_ROUTE","#activate"))},copy:function(){var t=document.createElement("input");document.body.appendChild(t),t.value=location.origin+location.pathname+"#a?t="+this.account.toLowerCase(),t.select(),document.execCommand("copy"),document.body.removeChild(t),this.$toast.success("Link copied!")},stop:function(){this.$store.commit("UPDATE_ROUTE","")},activate:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.status.proof){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,t.chain.activate(t.account,t.aim);case 4:if(n=e.sent,n){e.next=7;break}return e.abrupt("return",t.$toast.warning("Transaction not sent!"));case 7:t.$toast.success("Transaction sent, please wait patiently."),t.amount="",t.endTime="",t.$store.commit("UPDATE_ROUTE",""),t.$store.commit("PUSH_TX",{txHash:n,type:"Activate"});case 12:case"end":return e.stop()}}),e)})))()}}},j=P,M=(n("7953"),Object(h["a"])(j,R,D,!1,null,"66714b92",null)),U=M.exports,N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tx-log",class:"tx-log-"+t.tx.status.toLowerCase()},[a("span",{staticClass:"type"},[t._v(t._s(t.tx.type))]),a("span",{staticClass:"hash"},[t._v(" TxHash: "),a("a",{attrs:{target:"_blank",href:"https://etherscan.io/tx/"+t.tx.txHash}},[t._v(" "+t._s(t.tx.txHash)+" ")])]),a("span",{staticClass:"status"},[a("img",{attrs:{src:n("1ac9")("./"+t.tx.status.toLowerCase()+".svg")}}),t._v(" "+t._s(t.tx.status)+" ")])])},$=[],L={name:"TxLog",props:{tx:{type:Object,default:function(){return{txHash:"0x0000000000000000000000000000000000000000000000000000000000000000",type:"UnDefined",status:"Error"}}}}},I=L,H=(n("ece1"),Object(h["a"])(I,N,$,!1,null,"77afbe80",null)),W=H.exports,F={name:"Home",components:{StakingTime:y,Staking:k,Withdraw:S,Activate:U,TxLog:W},computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["account","route","chain","status","txList"])),{},{toCertify:function(){return this.route.startsWith("#a?t=")},toStaking:function(){return/\?a=[0-9.]+&d=[0-9]+/.test(this.route)}}),data:function(){return{balance:"--",authed:!1,stakingAmount:"--",stakingEndTime:0,locked:!0,timer:[0,0]}},mounted:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.timer[0]=setInterval((function(){t.$store.dispatch("UPDATE")}),1e4),t.timer[1]=setInterval((function(){t.$store.dispatch("UPDATE_TXLIST")}),1e3);case 2:case"end":return e.stop()}}),e)})))()},beforeDestroy:function(){clearInterval(this.timer[0]),clearInterval(this.timer[1])},methods:{logOut:function(){this.$store.dispatch("DISCONNECT")},stop:function(){this.$store.commit("UPDATE_ROUTE","")}}},q=F,B=(n("c219"),Object(h["a"])(q,u,c,!1,null,null,null)),X=B.exports,K=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"login"}},[a("div",{staticClass:"login-box"},[a("img",{attrs:{src:n("9b19"),alt:"logo"}}),a("p",{staticClass:"notice"},[t._v("Please connect wallet to login")]),t.netError?a("div",{staticClass:"net-error"},[t._v("Network Error. expect ETH Main Net")]):a("div",{staticClass:"login-button",on:{click:t.login}})])])},J=[],Q={name:"Login",props:{netError:{type:Boolean,default:!1}},methods:{login:function(){this.$store.dispatch("CONNECT")}}},V=Q,Y=(n("b911"),Object(h["a"])(V,K,J,!1,null,"7dfb51eb",null)),z=Y.exports,G=1,Z={name:"App",components:{Home:X,Login:z},computed:Object(r["a"])(Object(r["a"])({},Object(o["b"])(["account","network"])),{},{logined:function(){return!(!this.account||this.network!==G)},networkError:function(){return!(!this.account||this.network===G)}}),created:function(){this.$store.dispatch("CONNECT")}},tt=Z,et=(n("7faf"),Object(h["a"])(tt,i,s,!1,null,null,null)),nt=et.exports,at=n("b85c"),it=n("3835"),st=(n("4ec9"),n("3ca3"),n("ddb0"),n("d81d"),n("d4ec")),rt=n("bee2"),ot=(n("caad"),n("2532"),n("1276"),n("a15b"),n("99e5")),ut=n.n(ot),ct=n("da5d"),lt=n("21e2"),pt="0xbc4171f45EF0EF66E76F979dF021a34B46DCc81d",dt="0xA8f56d0506738c7f4400Ae9d8811538A85907287",mt="10000000000000000000000000",ft=6e21,ht=function(){function t(){Object(st["a"])(this,t),this.web3=null}return Object(rt["a"])(t,[{key:"updateProvider",value:function(t){this.web3?this.web3.setProvider(t):this._initWeb3(t)}},{key:"fromWei",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:18;if(!this.web3)throw new Error("Web3 is not ready!");var n=this.web3.utils.fromWei(t);if(n.includes(".")){var a=n.split(".");a[1]=a[1].substr(0,e),n=a.join(".")}return n}},{key:"ready",get:function(){return!!this.web3}},{key:"getTxStatus",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.web3.eth.getTransactionReceipt(e);case 2:if(n=t.sent,n){t.next=7;break}return t.abrupt("return","Pending");case 7:if(!n.status){t.next=11;break}return t.abrupt("return","Success");case 11:return t.abrupt("return","Fail");case 12:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getDoraBalance",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.dora.methods["balanceOf"](e).call().then((function(t){return n.fromWei(t,2)})).catch((function(){return"0"})));case 1:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getAllowance",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",this.dora.methods["allowance"](e,dt).call().then((function(t){return n.fromWei(t)})).catch((function(){return"0"})));case 1:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"getStatus",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",Promise.all([this.doraId.methods["proofOf"](e).call(),this.doraId.methods["statusOf"](e).call()]).then((function(t){var e=Object(it["a"])(t,2),a=e[0],i=e[1],s=1e3*Number(i.stakingEndTime);return{proof:Math.floor(Number(a)/ft),authenticated:i.authenticated,stakingAmount:n.fromWei(i.stakingAmount,2),stakingEndTime:s<Date.now()?0:s}})).catch((function(){return{proof:0,authenticated:!1,stakingAmount:"0",stakingEndTime:0}})));case 1:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"approve",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=this.dora.methods["approve"](dt,mt).encodeABI(),a={from:e,to:pt,data:n},t.abrupt("return",window.ethereum.request({method:"eth_sendTransaction",params:[a]}).catch((function(t){return console.error(t.message||t),!1})));case 3:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"stake",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e,n,a){var i,s,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=this.web3.utils.toWei(n),s=Math.floor(a/1e3),r=this.doraId.methods["stake"](i,s).encodeABI(),o={from:e,to:dt,data:r},t.abrupt("return",window.ethereum.request({method:"eth_sendTransaction",params:[o]}).catch((function(t){return console.error(t.message||t),!1})));case 5:case"end":return t.stop()}}),t,this)})));function e(e,n,a){return t.apply(this,arguments)}return e}()},{key:"unstake",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e,n){var a,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=this.web3.utils.toWei(n),i=this.doraId.methods["unstake"](a).encodeABI(),s={from:e,to:dt,data:i},t.abrupt("return",window.ethereum.request({method:"eth_sendTransaction",params:[s]}).catch((function(t){return console.error(t.message||t),!1})));case 4:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"activate",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e,n){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=this.doraId.methods["activate"](n).encodeABI(),i={from:e,to:dt,data:a},t.abrupt("return",window.ethereum.request({method:"eth_sendTransaction",params:[i]}).catch((function(t){return console.error(t.message||t),!1})));case 3:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}()},{key:"_initWeb3",value:function(t){this.web3=new ut.a(t),this.dora=new this.web3.eth.Contract(ct,pt),this.doraId=new this.web3.eth.Contract(lt,dt)}}]),t}();a["a"].use(o["a"]);var vt=new Map,yt=5,bt=new o["a"].Store({state:{chain:new ht,network:0,account:"",status:{loading:!0,balance:"--",allowance:0,authed:!1,stakingAmount:"--",stakingEndTime:0,proof:0},txList:[],route:location.hash},mutations:{UPDATE_PROVIDER:function(t,e){t.chain.updateProvider(e)},SET_ACCOUNT:function(t,e){t.account=e},SET_NETWORK:function(t,e){t.network=e,localStorage.setItem("network",e)},UPDATE_STATUS:function(t,e){t.status=Object(r["a"])(Object(r["a"])({},t.status),{},{loading:!1},e)},REFRESH:function(t){t.status=Object(r["a"])({},t.status)},PUSH_TX:function(t,e){if(t.txList.unshift(Object(r["a"])(Object(r["a"])({},e),{},{status:"Pending"})),t.txList.length>yt){var n=t.txList.pop();vt.delete(n.txHash)}vt.set(e.txHash,{interval:3e3,lastCheck:Date.now()+3e3})},UPDATE_TX:function(t,e){var n=e.tx,a=e.status;t.txList=t.txList.map((function(t){return t===n?Object(r["a"])(Object(r["a"])({},n),{},{status:a}):t}))},UPDATE_ROUTE:function(t,e){t.route=e,history.pushState(null,"",location.pathname+e)}},actions:{CONNECT:function(t){var e=t.commit,n=t.dispatch;return"undefined"!==typeof window.ethereum&&window.ethereum.request({method:"eth_requestAccounts"}).then((function(t){return e("UPDATE_PROVIDER",window.ethereum),e("SET_ACCOUNT",t[0]),n("UPDATE"),e("SET_NETWORK",Number(window.ethereum.chainId)),window.ethereum.on("accountsChanged",(function(t){e("SET_ACCOUNT",t[0]),e("UPDATE_STATUS",{loading:!0}),n("UPDATE")})),window.ethereum.on("chainChanged",(function(t){e("SET_NETWORK",Number(t))})),!0})).catch((function(){return!1}))},UPDATE:function(t){var e=t.state,n=t.commit;e.chain.ready&&e.account&&Promise.all([e.chain.getDoraBalance(e.account),e.chain.getAllowance(e.account),e.chain.getStatus(e.account)]).then((function(t){var e=Object(it["a"])(t,3),a=e[0],i=e[1],s=e[2],r={balance:a,allowance:Number(i),proof:s.proof,authed:s.authenticated,stakingAmount:s.stakingAmount,stakingEndTime:s.stakingEndTime};n("UPDATE_STATUS",r)}))},UPDATE_TXLIST:function(t){var e=t.state,n=t.commit,a=t.dispatch;if(e.chain.ready){var i,s=Date.now(),r=Object(at["a"])(e.txList);try{var o=function(){var t=i.value,r=vt.get(t.txHash);"Pending"===t.status&&s>=r.lastCheck&&(r.interval=Math.min(15e3,Math.floor(1.2*r.interval)),r.lastCheck=s+r.interval,e.chain.getTxStatus(t.txHash).then((function(e){n("UPDATE_TX",{tx:t,status:e}),e&&a("UPDATE")})))};for(r.s();!(i=r.n()).done;)o()}catch(u){r.e(u)}finally{r.f()}}},DISCONNECT:function(t){var e=t.commit;e("SET_ACCOUNT",""),e("SET_NETWORK",0)}},modules:{}}),gt=n("b079"),_t=n.n(gt);n("4238");a["a"].use(_t.a,{duration:6e3,position:"top"}),a["a"].config.productionTip=!1,new a["a"]({store:bt,render:function(t){return t(nt)}}).$mount("#app")},6:function(t,e){},"61ad":function(t,e,n){t.exports=n.p+"img/timeleft.d71245b4.svg"},6208:function(t,e,n){},"62d7":function(t,e,n){t.exports=n.p+"img/off.21557a0f.svg"},"62fd":function(t,e,n){t.exports=n.p+"img/period.9193acce.svg"},"69a6":function(t,e,n){},7:function(t,e){},7953:function(t,e,n){"use strict";n("b601")},"7faf":function(t,e,n){"use strict";n("b8ff")},8:function(t,e){},9:function(t,e){},"9b19":function(t,e,n){t.exports=n.p+"img/logo.5dd110e5.svg"},a5e1:function(t,e,n){t.exports=n.p+"img/pending.329d6fbd.svg"},b2c2:function(t,e,n){t.exports=n.p+"img/success.ba81794d.svg"},b601:function(t,e,n){},b8ff:function(t,e,n){},b911:function(t,e,n){"use strict";n("4e36")},c219:function(t,e,n){"use strict";n("4fc1")},c5b3:function(t,e,n){t.exports=n.p+"img/certified.8ae0c87f.svg"},c6ff:function(t,e,n){t.exports=n.p+"img/fail.8c70801a.svg"},da5d:function(t){t.exports=JSON.parse('[{"inputs":[{"internalType":"address","name":"_founder","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"supply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]')},e367:function(t,e,n){t.exports=n.p+"img/logo-s.5350c341.svg"},e377:function(t,e,n){t.exports=n.p+"img/not-certified.f709f161.svg"},ece1:function(t,e,n){"use strict";n("69a6")},ef81:function(t,e,n){t.exports=n.p+"img/on.a9ca78f8.svg"},f3d2:function(t,e,n){t.exports=n.p+"img/certify.e08c98c7.svg"}});
//# sourceMappingURL=app.a7dce5d0.js.map