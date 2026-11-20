// @trycourier/courier-ui-core@2.5.2 downloaded from https://ga.jspm.io/npm:@trycourier/courier-ui-core@2.5.2/dist/index.mjs

var e=Object.defineProperty,t=e=>{throw TypeError(e)},n=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,r=(e,t,r)=>n(e,typeof t==`symbol`?t:t+``,r),i=(e,n,r)=>n.has(e)||t(`Cannot `+r),a=(e,t,n)=>(i(e,t,`read from private field`),n?n.call(e):t.get(e)),o=(e,n,r)=>n.has(e)?t(`Cannot add the same private member more than once`):n instanceof WeakSet?n.add(e):n.set(e,r),s=(e,t,n,r)=>(i(e,t,`write to private field`),r?r.call(e,n):t.set(e,n),n),c;function l(e){let t=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());if(!t)return!0;let n=t[1];n.length===3&&(n=n.split(``).map(e=>e+e).join(``));let r=parseInt(n.substring(0,2),16),i=parseInt(n.substring(2,4),16),a=parseInt(n.substring(4,6),16);return(.299*r+.587*i+.114*a)/255<.5}function u(e,t){let n=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());if(!n)return;let r=n[1];r.length===3&&(r=r.split(``).map(e=>e+e).join(``));let i=l(e)?255:0,a=e=>{let n=parseInt(r.substring(e,e+2),16);return Math.round(n+(i-n)*t).toString(16).padStart(2,`0`)};return`#${a(0)}${a(2)}${a(4)}`.toUpperCase()}const d={black:{400:`#0A0A0A`,500:`#171717`,50010:`#1717171A`,50020:`#17171733`},gray:{200:`#F5F5F5`,400:`#3A3A3A`,500:`#E5E5E5`,600:`#737373`,650:`#585858`,700:`#454545`,800:`#2E2E2E`},white:{500:`#FFFFFF`,50010:`#FFFFFF1A`,50020:`#FFFFFF33`},blue:{300:`#93C5FD`,400:`#60A5FA`,500:`#2563EB`,600:`#1D4ED8`}},f=d.blue[500],p={light:{colors:{primary:d.black[500],secondary:d.white[500],border:d.gray[500],link:d.blue[500],icon:d.black[500]},button:{cornerRadius:`4px`}},dark:{colors:{primary:d.white[500],secondary:d.black[500],border:d.gray[400],link:d.blue[400],icon:d.white[500]},button:{cornerRadius:`4px`}}},m=()=>typeof window>`u`?`light`:window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`,h=e=>{if(typeof window>`u`)return()=>{};let t=window.matchMedia(`(prefers-color-scheme: dark)`),n=t=>{e(t.matches?`dark`:`light`)};return t.addEventListener(`change`,n),()=>{t.removeEventListener(`change`,n)}},g=(()=>{try{return typeof HTMLElement>`u`?class{}:HTMLElement}catch{return class{}}})();class CourierBaseElement extends g{constructor(){super(...arguments),o(this,c,!1)}static get id(){return`courier-base-element`}connectedCallback(){var e;a(this,c)||(s(this,c,!0),(e=this.onComponentMounted)==null||e.call(this))}disconnectedCallback(){var e;s(this,c,!1),(e=this.onComponentUnmounted)==null||e.call(this)}onComponentMounted(){}onComponentUnmounted(){}}c=/* @__PURE__ */ new WeakMap;class CourierSystemThemeElement extends CourierBaseElement{constructor(){super(),r(this,`_currentSystemTheme`),r(this,`_systemThemeCleanup`),this._currentSystemTheme=m(),this._systemThemeCleanup=h(e=>{this._currentSystemTheme=e,this.onSystemThemeChange(e)})}static get id(){return`courier-system-theme-element`}get currentSystemTheme(){return this._currentSystemTheme}onComponentUnmounted(){var e;(e=this._systemThemeCleanup)==null||e.call(this),super.onComponentUnmounted()}onSystemThemeChange(e){}}const _=`1px solid transparent`,v={borderRadius:`4px`,fontSize:`14px`,padding:`6px 10px`,textDecoration:`none`},y={primary:e=>({...v,backgroundColor:p[e].colors.secondary,textColor:p[e].colors.primary,fontWeight:`500`,hoverBackgroundColor:e===`light`?d.gray[200]:d.gray[800],activeBackgroundColor:e===`light`?d.gray[500]:d.gray[700],border:`1px solid ${p[e].colors.border}`,shadow:e===`light`?`0px 1px 2px 0px rgba(0, 0, 0, 0.06)`:`0px 1px 2px 0px rgba(255, 255, 255, 0.1)`}),secondary:e=>({...v,backgroundColor:p[e].colors.secondary,textColor:p[e].colors.primary,fontWeight:`500`,hoverBackgroundColor:e===`light`?d.gray[200]:d.gray[800],activeBackgroundColor:e===`light`?d.gray[500]:d.gray[700],border:`1px solid ${e===`light`?d.gray[600]:d.gray[650]}`,shadow:`none`}),tertiary:e=>({...v,backgroundColor:p[e].colors.primary,textColor:p[e].colors.secondary,fontWeight:`500`,hoverBackgroundColor:e===`light`?d.gray[800]:d.gray[200],activeBackgroundColor:e===`light`?d.gray[700]:d.gray[500],border:_,shadow:`none`}),link:e=>({...v,backgroundColor:`transparent`,textColor:p[e].colors.link,fontWeight:`500`,border:`none`,shadow:`none`,padding:`0px`,textDecoration:`underline`,hoverBackgroundColor:`transparent`,hoverTextColor:e===`light`?d.blue[600]:d.blue[300]})};class CourierButton extends CourierSystemThemeElement{constructor(e){super(),r(this,`_button`),r(this,`_style`),r(this,`_props`),this._props=e;let t=this.attachShadow({mode:`open`});this._button=document.createElement(`button`),this._button.setAttribute(`part`,`button`),this._style=document.createElement(`style`),this._style.textContent=this.getStyles(e),t.appendChild(this._style),t.appendChild(this._button),this.updateButton(e),this._button.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),e.onClick&&e.onClick()})}static get id(){return`courier-button`}getStyles(e){let t=e.mode===`system`?this.currentSystemTheme:e.mode,n=y[e.variant??`primary`](t),r=e.backgroundColor===`transparent`?void 0:e.backgroundColor,i=!!r&&r!==n.backgroundColor,a=i?u(r,.12):void 0,o=i?u(r,.22):void 0,s=e.hoverBackgroundColor??(i?a:n.hoverBackgroundColor),c=e.activeBackgroundColor??(i?o:n.activeBackgroundColor),l=!!e.textColor&&e.textColor!==n.textColor,d=e.hoverTextColor??(l?void 0:n.hoverTextColor);return`
      :host {
        display: inline-block;
      }

      button {
        border: none;
        border-radius: ${e.borderRadius??n.borderRadius};
        font-weight: ${e.fontWeight??n.fontWeight};
        font-family: ${e.fontFamily??`inherit`};
        font-size: ${e.fontSize??n.fontSize};
        padding: ${e.padding??n.padding};
        cursor: pointer;
        width: 100%;
        height: 100%;
        background-color: ${e.backgroundColor??n.backgroundColor};
        color: ${e.textColor??n.textColor};
        border: ${e.border??n.border};
        box-shadow: ${e.shadow??n.shadow};
        text-decoration: ${e.textDecoration??n.textDecoration};
        touch-action: manipulation;
      }

      button:hover {
        ${s?`background-color: ${s};`:`filter: brightness(0.9);`}
        ${d?`color: ${d};`:``}
      }

      button:active {
        ${c?`background-color: ${c};`:`filter: brightness(0.8);`}
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}updateButton(e){this._props=e,e.text&&(this._button.textContent=e.text),this._style.textContent=this.getStyles(e)}onSystemThemeChange(e){this._props.mode===`system`&&(this._style.textContent=this.getStyles(this._props))}}const b={inbox:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 14.5V17C5.5 17.2812 5.71875 17.5 6 17.5H18C18.25 17.5 18.5 17.2812 18.5 17V14.5H15.9375L15.2812 15.8125C15.0938 16.25 14.6562 16.5 14.1875 16.5H9.78125C9.3125 16.5 8.875 16.25 8.6875 15.8125L8.03125 14.5H5.5ZM18.1875 13L16.6562 6.90625C16.5938 6.65625 16.4062 6.5 16.1875 6.5H7.8125C7.5625 6.5 7.375 6.65625 7.3125 6.90625L5.78125 13H8.1875C8.65625 13 9.09375 13.2812 9.3125 13.7188L9.9375 15H14.0312L14.6875 13.7188C14.875 13.2812 15.3125 13 15.7812 13H18.1875ZM4 14.25C4 14.0938 4 13.9375 4.03125 13.7812L5.84375 6.53125C6.09375 5.625 6.875 5 7.8125 5H16.1875C17.0938 5 17.9062 5.625 18.125 6.53125L19.9375 13.7812C19.9688 13.9375 20 14.0938 20 14.25V17C20 18.125 19.0938 19 18 19H6C4.875 19 4 18.125 4 17V14.25Z" fill="currentColor"/>
</svg>`,archive:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 6.5V8H18.5V6.5H5.5ZM5 5H19C19.5312 5 20 5.46875 20 6V8.5C20 9.0625 19.5312 9.5 19 9.5H5C4.4375 9.5 4 9.0625 4 8.5V6C4 5.46875 4.4375 5 5 5ZM9 11.75C9 11.3438 9.3125 11 9.75 11H14.25C14.6562 11 15 11.3438 15 11.75C15 12.1875 14.6562 12.5 14.25 12.5H9.75C9.3125 12.5 9 12.1875 9 11.75ZM5 17V10.5H6.5V17C6.5 17.2812 6.71875 17.5 7 17.5H17C17.25 17.5 17.5 17.2812 17.5 17V10.5H19V17C19 18.125 18.0938 19 17 19H7C5.875 19 5 18.125 5 17Z" fill="currentColor"/>
</svg>`,check:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.793 7.33203C19.0742 7.64453 19.0742 8.11328 18.793 8.39453L10.543 16.6445C10.2305 16.957 9.76172 16.957 9.48047 16.6445L5.23047 12.3945C4.91797 12.1133 4.91797 11.6445 5.23047 11.3633C5.51172 11.0508 5.98047 11.0508 6.26172 11.3633L9.98047 15.082L17.7305 7.33203C18.0117 7.05078 18.4805 7.05078 18.7617 7.33203H18.793Z" fill="currentColor"/>
</svg>`,filter:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 7C5 6.59375 5.3125 6.25 5.75 6.25H18.25C18.6562 6.25 19 6.59375 19 7C19 7.4375 18.6562 7.75 18.25 7.75H5.75C5.3125 7.75 5 7.4375 5 7ZM7 12C7 11.5938 7.3125 11.25 7.75 11.25H16.25C16.6562 11.25 17 11.5938 17 12C17 12.4375 16.6562 12.75 16.25 12.75H7.75C7.3125 12.75 7 12.4375 7 12ZM14 17C14 17.4375 13.6562 17.75 13.25 17.75H10.75C10.3125 17.75 10 17.4375 10 17C10 16.5938 10.3125 16.25 10.75 16.25H13.25C13.6562 16.25 14 16.5938 14 17Z" fill="currentColor"/>
</svg>`,right:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 12.547L13.25 17.797C12.9375 18.0783 12.4688 18.0783 12.1875 17.7658C11.9062 17.4533 11.9062 16.9845 12.2188 16.7033L16.375 12.7345H5.75C5.3125 12.7345 5 12.422 5 11.9845C5 11.5783 5.3125 11.2345 5.75 11.2345H16.375L12.2188 7.29703C11.9062 7.01578 11.9062 6.51578 12.1875 6.23453C12.4688 5.92203 12.9688 5.92203 13.25 6.20328L18.75 11.4533C18.9062 11.6095 19 11.797 19 11.9845C19 12.2033 18.9062 12.3908 18.75 12.547Z" fill="currentColor"/>
</svg>`,remove:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7969 8.27344L13.0469 12.0234L16.7656 15.7422C17.0781 16.0234 17.0781 16.4922 16.7656 16.7734C16.4844 17.0859 16.0156 17.0859 15.7344 16.7734L11.9844 13.0547L8.26562 16.7734C7.98438 17.0859 7.51562 17.0859 7.23438 16.7734C6.92188 16.4922 6.92188 16.0234 7.23438 15.7109L10.9531 11.9922L7.23438 8.27344C6.92188 7.99219 6.92188 7.52344 7.23438 7.21094C7.51562 6.92969 7.98438 6.92969 8.29688 7.21094L12.0156 10.9609L15.7344 7.24219C16.0156 6.92969 16.4844 6.92969 16.7969 7.24219C17.0781 7.52344 17.0781 7.99219 16.7969 8.27344Z" fill="currentColor"/>
</svg>`,overflow:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5117 11.9883C18.5117 12.5508 18.1992 13.0195 17.7617 13.3008C17.293 13.582 16.6992 13.582 16.2617 13.3008C15.793 13.0195 15.5117 12.5508 15.5117 11.9883C15.5117 11.457 15.793 10.9883 16.2617 10.707C16.6992 10.4258 17.293 10.4258 17.7617 10.707C18.1992 10.9883 18.5117 11.457 18.5117 11.9883ZM13.5117 11.9883C13.5117 12.5508 13.1992 13.0195 12.7617 13.3008C12.293 13.582 11.6992 13.582 11.2617 13.3008C10.793 13.0195 10.5117 12.5508 10.5117 11.9883C10.5117 11.457 10.793 10.9883 11.2617 10.707C11.6992 10.4258 12.293 10.4258 12.7617 10.707C13.1992 10.9883 13.5117 11.457 13.5117 11.9883ZM7.01172 13.4883C6.44922 13.4883 5.98047 13.207 5.69922 12.7383C5.41797 12.3008 5.41797 11.707 5.69922 11.2383C5.98047 10.8008 6.44922 10.4883 7.01172 10.4883C7.54297 10.4883 8.01172 10.8008 8.29297 11.2383C8.57422 11.707 8.57422 12.3008 8.29297 12.7383C8.01172 13.207 7.54297 13.4883 7.01172 13.4883Z" fill="currentColor"/>
</svg>`,read:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 6.5C6.71875 6.5 6.5 6.75 6.5 7V17C6.5 17.2812 6.71875 17.5 7 17.5H17C17.25 17.5 17.5 17.2812 17.5 17V7C17.5 6.75 17.25 6.5 17 6.5H7ZM5 7C5 5.90625 5.875 5 7 5H17C18.0938 5 19 5.90625 19 7V17C19 18.125 18.0938 19 17 19H7C5.875 19 5 18.125 5 17V7ZM15.5312 10.5312L11.5312 14.5312C11.2188 14.8438 10.75 14.8438 10.4688 14.5312L8.46875 12.5312C8.15625 12.25 8.15625 11.7812 8.46875 11.5C8.75 11.1875 9.21875 11.1875 9.53125 11.5L11 12.9688L14.4688 9.46875C14.75 9.1875 15.2188 9.1875 15.5 9.46875C15.8125 9.78125 15.8125 10.25 15.5 10.5312H15.5312Z" fill="currentColor"/>
</svg>`,archiveRead:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 6.5V15.25H16.5V6.5H7.5ZM6 15.25V6.5C6 5.6875 6.65625 5 7.5 5H16.5C17.3125 5 18 5.6875 18 6.5V15.25C18.4062 15.25 18.75 15.5938 18.75 16C18.75 16.4375 18.4062 16.75 18 16.75H6C5.5625 16.75 5.25 16.4375 5.25 16C5.25 15.5938 5.5625 15.25 6 15.25ZM5 13V14.5H4.5V17.5H19.5V14.5H19V13H19.5C20.3125 13 21 13.6875 21 14.5V17.5C21 18.3438 20.3125 19 19.5 19H4.5C3.65625 19 3 18.3438 3 17.5V14.5C3 13.6875 3.65625 13 4.5 13H5ZM15.0312 9.625L11.6875 12.9688C11.5312 13.0938 11.3438 13.1875 11.1562 13.1875C10.9375 13.1875 10.75 13.0938 10.625 12.9688L8.96875 11.2812C8.65625 11 8.65625 10.5312 8.96875 10.25C9.25 9.9375 9.71875 9.9375 10 10.25L11.1562 11.375L13.9688 8.5625C14.25 8.28125 14.7188 8.28125 15 8.5625C15.3125 8.875 15.3125 9.34375 15 9.625H15.0312Z" fill="currentColor"/>
</svg>`,unread:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 6.5H7C6.71875 6.5 6.5 6.75 6.5 7V17C6.5 17.2812 6.71875 17.5 7 17.5H17C17.25 17.5 17.5 17.2812 17.5 17V7C17.5 6.75 17.25 6.5 17 6.5ZM7 5H17C18.0938 5 19 5.90625 19 7V17C19 18.125 18.0938 19 17 19H7C5.875 19 5 18.125 5 17V7C5 5.90625 5.875 5 7 5Z" fill="currentColor"/>
</svg>`,unarchive:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 11C5.0625 11 4.75 10.6875 4.75 10.25V5.75C4.75 5.34375 5.0625 5 5.5 5C5.90625 5 6.25 5.34375 6.25 5.75V8.28125L6.875 7.53125C8.15625 6 10.0625 5 12.25 5C16.0938 5 19.25 8.15625 19.25 12C19.25 15.875 16.0938 19 12.25 19C10.6562 19 9.21875 18.5 8.03125 17.625C7.71875 17.375 7.625 16.9062 7.875 16.5625C8.125 16.2188 8.59375 16.1562 8.9375 16.4062C9.84375 17.0938 11 17.5 12.25 17.5C15.2812 17.5 17.75 15.0625 17.75 12C17.75 8.96875 15.2812 6.5 12.25 6.5C10.5312 6.5 9.03125 7.28125 8 8.5L7.15625 9.5H10C10.4062 9.5 10.75 9.84375 10.75 10.25C10.75 10.6875 10.4062 11 10 11H5.5Z" fill="currentColor"/>
</svg>`,chevronDown:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15.5C11.8125 15.5 11.6562 15.4375 11.5312 15.3125L6.28125 10.0625C5.96875 9.78125 5.96875 9.3125 6.28125 9.03125C6.5625 8.71875 7.03125 8.71875 7.3125 9.03125L12 13.6875L16.6562 9.03125C16.9375 8.71875 17.4062 8.71875 17.6875 9.03125C18 9.3125 18 9.78125 17.6875 10.0625L12.4375 15.3125C12.3125 15.4375 12.1562 15.5 12 15.5Z" fill="currentColor"/>
</svg>`};class CourierIcon extends CourierBaseElement{constructor(e,t,n){super(),r(this,`_color`),r(this,`_svg`),r(this,`_size`),r(this,`_iconContainer`),r(this,`_style`),this._color=e??d.black[500],this._svg=t,this._size=n??`24px`;let i=this.attachShadow({mode:`open`});this._iconContainer=document.createElement(`div`),i.appendChild(this._iconContainer),this._style=document.createElement(`style`),this._style.textContent=this.getStyles(),i.appendChild(this._style),this.refresh()}static get id(){return`courier-icon`}getStyles(){return`
      :host {
        display: inline-block;
        line-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      svg {
        width: ${this._size};
        height: ${this._size};
        color: ${this._color};
      }
    `}refresh(){this._svg&&(this._iconContainer.innerHTML=this._svg),this._style.textContent=this.getStyles()}updateColor(e){this._color=e,this.refresh()}updateSVG(e){this._svg=e,this.refresh()}updateSize(e){this._size=e,this.refresh()}}class CourierLink extends CourierBaseElement{constructor(){super(),r(this,`link`);let e=this.attachShadow({mode:`open`});this.link=document.createElement(`a`),this.link.setAttribute(`part`,`link`);let t=document.createElement(`style`);t.textContent=`
      :host {
        display: inline-block;
      }

      a {
        text-decoration: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
        font-family: var(--courier-link-font-family, inherit);
        font-size: var(--courier-link-font-size, inherit);
      }

      /* Variants */
      a[data-variant="primary"][data-mode="light"] {
        color: var(--courier-link-color, ${p.light.colors.link});
      }

      a[data-variant="primary"][data-mode="light"]:hover {
        opacity: 0.8;
      }

      a[data-variant="primary"][data-mode="light"]:active {
        opacity: 0.6;
      }

      a[data-variant="primary"][data-mode="dark"] {
        color: var(--courier-link-color, ${p.dark.colors.link});
      }

      a[data-variant="primary"][data-mode="dark"]:hover {
        opacity: 0.8;
      }

      a[data-variant="primary"][data-mode="dark"]:active {
        opacity: 0.6;
      }

      a[data-underline="true"] {
        text-decoration: underline;
      }

      a:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
      }
    `,e.appendChild(t),e.appendChild(this.link),this.updateVariant(),this.updateUnderline(),this.updateMode()}static get id(){return`courier-link`}connectedCallback(){let e=document.createElement(`slot`);this.link.appendChild(e),this.updateHref()}attributeChangedCallback(e,t,n){if(t!==n)switch(e){case`href`:this.updateHref();break;case`variant`:case`mode`:this.updateVariant();break;case`disabled`:this.link.style.pointerEvents=this.hasAttribute(`disabled`)?`none`:`auto`,this.link.style.opacity=this.hasAttribute(`disabled`)?`0.6`:`1`;break;case`color`:this.updateColor();break;case`underline`:this.updateUnderline();break;case`target`:this.updateTarget();break;case`font-family`:this.updateFontFamily();break;case`font-size`:this.updateFontSize();break}}updateHref(){let e=this.getAttribute(`href`);e&&(this.link.href=e)}updateVariant(){let e=this.getAttribute(`variant`)||`primary`,t=this.getAttribute(`mode`)||`light`;this.link.setAttribute(`data-variant`,e),this.link.setAttribute(`data-mode`,t)}updateColor(){let e=this.getAttribute(`color`);e?this.link.style.setProperty(`--courier-link-color`,e):this.link.style.removeProperty(`--courier-link-color`)}updateUnderline(){let e=this.getAttribute(`underline`)===`true`;this.link.setAttribute(`data-underline`,e.toString())}updateMode(){let e=this.getAttribute(`mode`)||`light`;this.link.setAttribute(`data-mode`,e)}updateTarget(){let e=this.getAttribute(`target`);e&&(this.link.target=e)}updateFontFamily(){let e=this.getAttribute(`font-family`);e?this.link.style.setProperty(`--courier-link-font-family`,e):this.link.style.removeProperty(`--courier-link-font-family`)}updateFontSize(){let e=this.getAttribute(`font-size`);e?this.link.style.setProperty(`--courier-link-font-size`,e):this.link.style.removeProperty(`--courier-link-font-size`)}}r(CourierLink,`observedAttributes`,[`href`,`variant`,`disabled`,`color`,`underline`,`mode`,`target`,`font-family`,`font-size`]);class CourierFactoryElement extends CourierSystemThemeElement{constructor(){super()}build(e){if(e===null){this.replaceChildren();return}let t=e??this.defaultElement();t.hasAttribute(`data-react-root`)&&(t.style.display=`contents`),this.replaceChildren(t)}defaultElement(){let e=document.createElement(`div`);return e.textContent=`Default Element Factory`,e.style.cssText=`
      background-color: red;
      text-align: center;
      padding: 12px;
    `,e}}class CourierInfoState extends CourierFactoryElement{constructor(e){super(),r(this,`_props`),r(this,`_title`),r(this,`_button`),r(this,`_style`),this._props=e}static get id(){return`courier-info-state`}defaultElement(){var e;let t=document.createElement(`div`);return this._title=document.createElement(`h2`),(e=this._props.title)!=null&&e.text&&(this._title.textContent=this._props.title.text),this._button=new CourierButton(this._props.button??y.secondary(this.currentSystemTheme)),this._style=document.createElement(`style`),this._style.textContent=this.getStyles(this._props),t.className=`container`,t.appendChild(this._style),t.appendChild(this._title),t.appendChild(this._button),this.appendChild(t),t}onSystemThemeChange(e){this.updateStyles(this._props)}getStyles(e){var t,n,r,i;let a=CourierInfoState.id;return`
      ${a} {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      }

      ${a} .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        text-align: center;
        padding: 24px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }

      ${a} .container h2 {
        margin: 0;
        color: ${((t=e.title)==null?void 0:t.textColor)??`red`};
        font-size: ${((n=e.title)==null?void 0:n.fontSize)??`16px`};
        font-weight: ${((r=e.title)==null?void 0:r.fontWeight)??`500`};
        font-family: ${((i=e.title)==null?void 0:i.fontFamily)??`inherit`};
      }
    `}updateStyles(e){this._props=e,this._style&&(this._style.textContent=this.getStyles(e)),this._button&&this._button.updateButton(e.button)}}class CourierIconButton extends CourierBaseElement{constructor(e,t,n,i,a,o,s,c,l){super(),r(this,`_backgroundColor`),r(this,`_hoverBackgroundColor`),r(this,`_activeBackgroundColor`),r(this,`_borderRadius`),r(this,`_height`),r(this,`_width`),r(this,`_style`),r(this,`_button`),r(this,`_icon`),this._borderRadius=o,this._backgroundColor=n,this._hoverBackgroundColor=i,this._activeBackgroundColor=a,this._height=s,this._width=c;let u=this.attachShadow({mode:`open`});this._button=document.createElement(`button`),this._button.setAttribute(`part`,`button`),this._icon=new CourierIcon(t,e,l),this._style=document.createElement(`style`),this.refresh(),u.appendChild(this._style),this._button.appendChild(this._icon),u.appendChild(this._button)}static get id(){return`courier-icon-button`}refresh(){this._style.textContent=this.getStyles()}getStyles(){return`
      :host {
        display: inline-block;
        border-radius: ${this._borderRadius??`50%`};
      }

      button {
        border: none;
        border-radius: ${this._borderRadius??`50%`};
        cursor: pointer;
        width: ${this._width??`36px`};
        height: ${this._height??`36px`};
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${this._backgroundColor??`transparent`};
        transition: background-color 0.2s ease;
        touch-action: manipulation;
      }

      button:hover {
        background-color: ${this._hoverBackgroundColor??`red`};
      }

      button:active {
        background-color: ${this._activeBackgroundColor??`red`};
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      [part="icon"] {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
      }
    `}updateIconColor(e){this._icon.updateColor(e)}updateIconSVG(e){this._icon.updateSVG(e)}updateBackgroundColor(e){this._backgroundColor=e,this.refresh()}updateHoverBackgroundColor(e){this._hoverBackgroundColor=e,this.refresh()}updateActiveBackgroundColor(e){this._activeBackgroundColor=e,this.refresh()}updateIconSize(e){this._icon.updateSize(e)}}function x(e){typeof window<`u`&&!customElements.get(e.id)&&customElements.define(e.id,e)}function S(e,t){let n=`style[data-${e}]`,r=document.querySelector(n);if(!r){let n=document.createElement(`style`);return n.setAttribute(`data-${e}`,``),n.textContent=t,document.head.appendChild(n),n}return r}const C=`courier-radio`,w=`
  courier-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
  }
  courier-radio .courier-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
    transition: all 150ms ease;
  }
  courier-radio .courier-radio svg {
    display: block;
  }
  courier-radio .courier-radio-ring {
    transition: stroke 150ms ease;
  }
  courier-radio .courier-radio-dot {
    opacity: 0;
    transform: scale(0.5);
    transform-origin: center;
    transform-box: fill-box;
    transition:
      opacity 200ms cubic-bezier(0.2, 0, 0.13, 1.5),
      transform 200ms cubic-bezier(0.2, 0, 0.13, 1.5);
  }
  courier-radio .courier-radio[aria-checked="true"] .courier-radio-dot {
    opacity: 1;
    transform: scale(1);
  }
`,T=`#D4D4D4`,E=f;class CourierRadio extends CourierBaseElement{constructor(){super(...arguments),r(this,`_checked`,!1),r(this,`_ringColor`,T),r(this,`_checkedColor`,E),r(this,`_rootEl`),r(this,`_ringEl`),r(this,`_dotEl`),r(this,`_mounted`,!1)}static get id(){return`courier-radio`}set checked(e){this._checked=e,this._applyState()}get checked(){return this._checked}set ringColor(e){this._ringColor=e||T,this._applyState()}set checkedColor(e){this._checkedColor=e||E,this._applyState()}onComponentMounted(){S(`courier-radio`,`
  courier-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
  }
  courier-radio .courier-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
    transition: all 150ms ease;
  }
  courier-radio .courier-radio svg {
    display: block;
  }
  courier-radio .courier-radio-ring {
    transition: stroke 150ms ease;
  }
  courier-radio .courier-radio-dot {
    opacity: 0;
    transform: scale(0.5);
    transform-origin: center;
    transform-box: fill-box;
    transition:
      opacity 200ms cubic-bezier(0.2, 0, 0.13, 1.5),
      transform 200ms cubic-bezier(0.2, 0, 0.13, 1.5);
  }
  courier-radio .courier-radio[aria-checked="true"] .courier-radio-dot {
    opacity: 1;
    transform: scale(1);
  }
`),this._build(),this._mounted=!0}onComponentUnmounted(){this._mounted=!1,this._rootEl=void 0,this._ringEl=void 0,this._dotEl=void 0}_build(){this.innerHTML=``;let e=document.createElement(`span`);e.className=`courier-radio`,e.setAttribute(`role`,`radio`);let t=`http://www.w3.org/2000/svg`,n=document.createElementNS(t,`svg`);n.setAttribute(`width`,`16`),n.setAttribute(`height`,`16`),n.setAttribute(`viewBox`,`0 0 16 16`),n.setAttribute(`fill`,`none`);let r=document.createElementNS(t,`circle`);r.setAttribute(`cx`,`8`),r.setAttribute(`cy`,`8`),r.setAttribute(`r`,`7`),r.setAttribute(`stroke-width`,`1.5`),r.setAttribute(`fill`,`none`),r.setAttribute(`class`,`courier-radio-ring`),n.appendChild(r);let i=document.createElementNS(t,`circle`);i.setAttribute(`cx`,`8`),i.setAttribute(`cy`,`8`),i.setAttribute(`r`,`4`),i.setAttribute(`class`,`courier-radio-dot`),n.appendChild(i),e.appendChild(n),this.appendChild(e),this._rootEl=e,this._ringEl=r,this._dotEl=i,this._applyState()}_applyState(){!this._mounted||!this._rootEl||!this._ringEl||!this._dotEl||(this._rootEl.setAttribute(`aria-checked`,String(this._checked)),this._ringEl.setAttribute(`stroke`,this._checked?this._checkedColor:this._ringColor),this._dotEl.setAttribute(`fill`,this._checkedColor))}}x(CourierRadio);const D=`courier-checkbox`,O=`
  courier-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
  }
  courier-checkbox .courier-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1.5px;
    background-color: transparent;
    box-sizing: border-box;
    transition: background-color 150ms ease, border-color 150ms ease;
  }
  courier-checkbox .courier-checkbox[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  courier-checkbox .courier-checkbox-mark {
    display: block;
    width: 10px;
    height: 10px;
    opacity: 0;
    transform: scale(0.5);
    transform-origin: center;
    transform-box: fill-box;
    transition:
      opacity 200ms cubic-bezier(0.2, 0, 0.13, 1.5),
      transform 200ms cubic-bezier(0.2, 0, 0.13, 1.5);
  }
  courier-checkbox .courier-checkbox[aria-checked="true"] .courier-checkbox-mark {
    opacity: 1;
    transform: scale(1);
  }
`,k=`M13.8125 3.3125C14.2188 3.6875 14.2188 4.34375 13.8125 4.71875L5.8125 12.7188C5.4375 13.125 4.78125 13.125 4.40625 12.7188L0.40625 8.71875C0 8.34375 0 7.6875 0.40625 7.3125C0.78125 6.90625 1.4375 6.90625 1.8125 7.3125L5.125 10.5938L12.4062 3.3125C12.7812 2.90625 13.4375 2.90625 13.8125 3.3125Z`,A=`#D4D4D4`,j=f,M=`#FFFFFF`;class CourierCheckbox extends CourierBaseElement{constructor(){super(...arguments),r(this,`_checked`,!1),r(this,`_disabled`,!1),r(this,`_checkedColor`,j),r(this,`_rootEl`),r(this,`_markPathEl`),r(this,`_mounted`,!1)}static get id(){return`courier-checkbox`}set checked(e){this._checked=e,this._applyState()}get checked(){return this._checked}set disabled(e){this._disabled=e,this._applyState()}set checkedColor(e){this._checkedColor=e||j,this._applyState()}onComponentMounted(){S(`courier-checkbox`,`
  courier-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    line-height: 0;
  }
  courier-checkbox .courier-checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1.5px;
    background-color: transparent;
    box-sizing: border-box;
    transition: background-color 150ms ease, border-color 150ms ease;
  }
  courier-checkbox .courier-checkbox[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  courier-checkbox .courier-checkbox-mark {
    display: block;
    width: 10px;
    height: 10px;
    opacity: 0;
    transform: scale(0.5);
    transform-origin: center;
    transform-box: fill-box;
    transition:
      opacity 200ms cubic-bezier(0.2, 0, 0.13, 1.5),
      transform 200ms cubic-bezier(0.2, 0, 0.13, 1.5);
  }
  courier-checkbox .courier-checkbox[aria-checked="true"] .courier-checkbox-mark {
    opacity: 1;
    transform: scale(1);
  }
`),this._build(),this._mounted=!0}onComponentUnmounted(){this._mounted=!1,this._rootEl=void 0,this._markPathEl=void 0}_build(){this.innerHTML=``;let e=document.createElement(`span`);e.className=`courier-checkbox`,e.setAttribute(`role`,`checkbox`);let t=`http://www.w3.org/2000/svg`,n=document.createElementNS(t,`svg`);n.setAttribute(`class`,`courier-checkbox-mark`),n.setAttribute(`viewBox`,`0 0 15 16`),n.setAttribute(`fill`,`none`);let r=document.createElementNS(t,`path`);r.setAttribute(`d`,`M13.8125 3.3125C14.2188 3.6875 14.2188 4.34375 13.8125 4.71875L5.8125 12.7188C5.4375 13.125 4.78125 13.125 4.40625 12.7188L0.40625 8.71875C0 8.34375 0 7.6875 0.40625 7.3125C0.78125 6.90625 1.4375 6.90625 1.8125 7.3125L5.125 10.5938L12.4062 3.3125C12.7812 2.90625 13.4375 2.90625 13.8125 3.3125Z`),n.appendChild(r),e.appendChild(n),this.appendChild(e),this._rootEl=e,this._markPathEl=r,this._applyState()}_applyState(){!this._mounted||!this._rootEl||!this._markPathEl||(this._rootEl.setAttribute(`aria-checked`,String(this._checked)),this._rootEl.setAttribute(`aria-disabled`,String(this._disabled)),this._rootEl.style.borderColor=this._checked?this._checkedColor:`#D4D4D4`,this._rootEl.style.backgroundColor=this._checked?this._checkedColor:`transparent`,this._markPathEl.setAttribute(`fill`,l(this._checkedColor)?`#FFFFFF`:`#171717`))}}x(CourierCheckbox);const N=/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;function P(e){if(!e)return;let t=e.trim();return t===``||t.includes(`{`)||t.includes(`}`)?void 0:t}const F=/* @__PURE__ */ new Set([`#ffffff`,`#fff`,`white`]);function I(e){return F.has((e??``).trim().toLowerCase())}function L(e){if(!(e==null||e===``))return typeof e==`number`||/^-?\d+(\.\d+)?$/.test(e)?`${e}px`:e}function R(e){if(!(!e||!N.test(e.trim())))return l(e)?d.white[500]:d.black[500]}function z(e,t){var n,r,i,a,o,s,c,l,u,d,f,p,m;let h=(n=e.style)==null?void 0:n.trim().toLowerCase(),g=h===`link`&&I(e.background_color),v=h===`link`&&!g,y=h===`secondary`||g,b=h===`tertiary`,x=v?t==null?void 0:t.link:y?t==null?void 0:t.secondary:b?t==null?void 0:t.tertiary:t==null?void 0:t.button,S={...t==null?void 0:t.font,...x==null?void 0:x.font},C=v?{...x,font:S}:{...t,...x,font:S};if(v)return{variant:`link`,backgroundColor:C.backgroundColor,hoverBackgroundColor:C.hoverBackgroundColor,activeBackgroundColor:C.activeBackgroundColor,border:C.border,borderRadius:C.borderRadius,shadow:C.shadow,textDecoration:C.textDecoration,fontFamily:(r=C.font)==null?void 0:r.family,fontSize:((i=C.font)==null?void 0:i.size)??L(e.font_size),fontWeight:(a=C.font)==null?void 0:a.weight,textColor:((o=C.font)==null?void 0:o.color)??P(e.color),padding:C.padding??e.padding};let w=g?void 0:P(e.background_color),T=L(e.border_size??((s=e.border)==null?void 0:s.size)),E=P((c=e.border)==null?void 0:c.color),D=E&&(T||(l=e.border)!=null&&l.enabled)?`${T??`1px`} solid ${E}`:void 0,O=y&&w?`${T??`1px`} solid ${w}`:D,k=!!(w||O);return{variant:y?`secondary`:b?`tertiary`:`primary`,backgroundColor:b?C.backgroundColor??w:y?C.backgroundColor??`transparent`:C.backgroundColor??w??`transparent`,hoverBackgroundColor:C.hoverBackgroundColor,activeBackgroundColor:C.activeBackgroundColor,border:C.border??O??(w?_:void 0),borderRadius:C.borderRadius??L(e.border_radius??((u=e.border)==null?void 0:u.radius)),shadow:C.shadow??(k?`none`:void 0),textDecoration:C.textDecoration,fontFamily:(d=C.font)==null?void 0:d.family,fontSize:((f=C.font)==null?void 0:f.size)??L(e.font_size),fontWeight:(p=C.font)==null?void 0:p.weight,textColor:((m=C.font)==null?void 0:m.color)??P(e.color)??(y?w:R(w)),padding:C.padding??e.padding}}class CourierThemeManager{constructor(e){r(this,`_theme`),r(this,`_lightTheme`),r(this,`_darkTheme`),r(this,`_target`),r(this,`_subscriptions`,[]),r(this,`_userMode`),r(this,`_systemMode`),r(this,`_systemThemeCleanup`),this._theme=e,this._target=new EventTarget,this._userMode=`system`,this._systemMode=m(),this.setLightTheme(this.getDefaultLightTheme()),this.setDarkTheme(this.getDefaultDarkTheme()),this._systemThemeCleanup=h(e=>{this._systemMode=e,this.updateTheme()})}setLightTheme(e){this._lightTheme=e,this._systemMode===`light`&&this.updateTheme()}setDarkTheme(e){this._darkTheme=e,this._systemMode===`dark`&&this.updateTheme()}get currentSystemTheme(){return this._systemMode}getTheme(){return this._theme}updateTheme(){let e=this._userMode===`system`?this._systemMode:this._userMode,t=e===`light`?this._lightTheme:this._darkTheme,n=this.mergeTheme(e,t);this.setTheme(n)}setTheme(e){e!==this._theme&&(this._theme=e,this._target.dispatchEvent(new CustomEvent(this.THEME_CHANGE_EVENT,{detail:{theme:e}})))}setMode(e){this._userMode=e,this.updateTheme()}get mode(){return this._userMode}subscribe(e){let t=new AbortController;this._target.addEventListener(this.THEME_CHANGE_EVENT,t=>{e(t.detail.theme)},{signal:t.signal});let n={manager:this,unsubscribe:()=>{t.abort();let e=this._subscriptions.indexOf(n);e>-1&&this._subscriptions.splice(e,1)}};return this._subscriptions.push(n),n}cleanup(){this._systemThemeCleanup&&this._systemThemeCleanup(),this._subscriptions.forEach(e=>e.unsubscribe()),this._subscriptions=[]}}x(CourierButton),x(CourierIcon),x(CourierLink),x(CourierInfoState),x(CourierIconButton),x(CourierSystemThemeElement),x(CourierRadio),x(CourierCheckbox);export{f as COURIER_DEFAULT_PRIMARY_COLOR,CourierBaseElement,CourierButton,y as CourierButtonVariants,CourierCheckbox,d as CourierColors,CourierFactoryElement,CourierIcon,CourierIconButton,b as CourierIconSVGs,CourierInfoState,CourierLink,CourierRadio,CourierSystemThemeElement,CourierThemeManager,_ as TRANSPARENT_BORDER,h as addSystemThemeModeListener,z as courierActionButtonProps,m as getSystemThemeMode,S as injectGlobalStyle,l as isDarkColor,R as readableTextColor,x as registerElement,u as shadeTowardMiddle,p as theme};

