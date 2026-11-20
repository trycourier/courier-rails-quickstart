// @trycourier/courier-js@3.7.1 downloaded from https://ga.jspm.io/npm:@trycourier/courier-js@3.7.1/dist/index.mjs

var e=Object.defineProperty,t=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,n=(e,n,r)=>t(e,typeof n==`symbol`?n:n+``,r);const r=e=>Object.freeze({courier:Object.freeze({...e.courier}),inbox:Object.freeze({...e.inbox})}),i=e=>({courier:{...e.courier},inbox:{...e.inbox}}),a={us:r({courier:{rest:`https://api.courier.com`,graphql:`https://api.courier.com/client/q`},inbox:{graphql:`https://inbox.courier.com/q`,webSocket:`wss://realtime.courier.io`}}),eu:r({courier:{rest:`https://api.eu.courier.com`,graphql:`https://api.eu.courier.com/client/q`},inbox:{graphql:`https://inbox.eu.courier.io/q`,webSocket:`wss://realtime.eu.courier.io`}})},o=a.us,s=a.eu,c=(e=`us`)=>i(a[e]),l=e=>{let t=o;return{courier:{rest:(e==null?void 0:e.courier.rest)||t.courier.rest,graphql:(e==null?void 0:e.courier.graphql)||t.courier.graphql},inbox:{graphql:(e==null?void 0:e.inbox.graphql)||t.inbox.graphql,webSocket:(e==null?void 0:e.inbox.webSocket)||t.inbox.webSocket}}};var u=/* @__PURE__ */ (e=>(e.Subscribe=`subscribe`,e.Unsubscribe=`unsubscribe`,e.Pong=`pong`,e.Ping=`ping`,e.GetConfig=`get-config`,e))(u||{}),d=/* @__PURE__ */ (e=>(e.Ping=`ping`,e))(d||{}),f=/* @__PURE__ */ (e=>(e.NewMessage=`message`,e.Archive=`archive`,e.ArchiveAll=`archive-all`,e.ArchiveRead=`archive-read`,e.Clicked=`clicked`,e.MarkAllRead=`mark-all-read`,e.Opened=`opened`,e.Read=`read`,e.Unarchive=`unarchive`,e.Unopened=`unopened`,e.Unread=`unread`,e))(f||{});class Logger{constructor(e){n(this,`PREFIX`,`[COURIER]`),this.showLogs=e}warn(e,...t){this.showLogs&&console.warn(`${this.PREFIX} ${e}`,...t)}log(e,...t){this.showLogs&&console.log(`${this.PREFIX} ${e}`,...t)}error(e,...t){this.showLogs&&console.error(`${this.PREFIX} ${e}`,...t)}debug(e,...t){this.showLogs&&console.debug(`${this.PREFIX} ${e}`,...t)}info(e,...t){this.showLogs&&console.info(`${this.PREFIX} ${e}`,...t)}}const p=class _UUID{static nanoid(e=21){let t=``,n=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=_UUID.ALPHABET[n[e]&63];return t}};n(p,`ALPHABET`,`useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict`);let m=p;const h=`x-courier-ua`,g=`sdk`,_=`sdkv`,v=`cid`;class CourierRequestError extends Error{constructor(e,t,n){super(t),this.code=e,this.type=n,this.name=`CourierRequestError`}}function y(e,t,n,r){e.log(`
📡 New Courier ${n} Request: ${t}
URL: ${r.url}
${r.method?`Method: ${r.method}`:``}
${r.query?`Query: ${r.query}`:``}
${r.variables?`Variables: ${JSON.stringify(r.variables,null,2)}`:``}
Headers: ${JSON.stringify(r.headers,null,2)}
Body: ${r.body?JSON.stringify(r.body,null,2):`Empty`}
  `)}function b(e,t,n,r){e.log(`
📡 New Courier ${n} Response: ${t}
Status Code: ${r.status}
Response JSON: ${JSON.stringify(r.response,null,2)}
  `)}async function x(e){let t=e.validCodes??[200],n=e.options.showLogs?m.nanoid():void 0,r=e.options.courierUserAgent.toHttpHeaderValue(),i=new Request(e.url,{method:e.method,headers:{"Content-Type":`application/json`,[h]:r,...e.headers},body:e.body?JSON.stringify(e.body):void 0});n&&y(e.options.logger,n,`HTTP`,{url:i.url,method:i.method,headers:Object.fromEntries(i.headers.entries()),body:e.body});let a=await fetch(i);if(a.status===204)return;let o;try{o=await a.json()}catch(e){if(a.status===200)return;throw new CourierRequestError(a.status,`Failed to parse response as JSON`,`PARSE_ERROR`)}if(n&&b(e.options.logger,n,`HTTP`,{status:a.status,response:o}),!t.includes(a.status))throw new CourierRequestError(a.status,(o==null?void 0:o.message)||`Unknown Error`,o==null?void 0:o.type);return o}async function S(e){let t=e.options.showLogs?m.nanoid():void 0,n=e.options.courierUserAgent.toHttpHeaderValue();t&&y(e.options.logger,t,`GraphQL`,{url:e.url,headers:e.headers,query:e.query,variables:e.variables});let r=await fetch(e.url,{method:`POST`,headers:{"Content-Type":`application/json`,[h]:n,...e.headers},body:JSON.stringify({query:e.query,variables:e.variables})}),i;try{i=await r.json()}catch(e){throw new CourierRequestError(r.status,`Failed to parse response as JSON`,`PARSE_ERROR`)}if(t&&b(e.options.logger,t,`GraphQL`,{status:r.status,response:i}),!r.ok)throw new CourierRequestError(r.status,(i==null?void 0:i.message)||`Unknown Error`,i==null?void 0:i.type);return i}class Client{constructor(e){this.options=e}}class BrandClient extends Client{async getBrand(e){let t=`
      query GetBrand {
        brand(brandId: "${e.brandId}") {
          settings {
            colors {
              primary
              secondary
              tertiary
            }
            inapp {
              borderRadius
              disableCourierFooter
            }
          }
          logo {
            href
            image
          }
          links
        }
      }
    `;return(await S({options:this.options,url:this.options.apiUrls.courier.graphql,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`},query:t,variables:{brandId:e.brandId}})).data.brand}}const C=1e3,w=`v1`,T=class _CourierSocket{constructor(e){n(this,`webSocket`,null),n(this,`retryAttempt`,0),n(this,`retryTimeoutId`,null),n(this,`closeRequested`,!1),n(this,`url`),n(this,`options`),this.url=e.apiUrls.inbox.webSocket,this.options=e}async connect(){var e,t;return this.isConnecting||this.isOpen?((t=this.options.logger)==null||t.info(`Attempted to open a WebSocket connection, but one already exists in state '${(e=this.webSocket)==null?void 0:e.readyState}'.`),Promise.resolve()):(this.clearRetryTimeout(),this.closeRequested=!1,new Promise((e,t)=>{this.webSocket=new WebSocket(this.getWebSocketUrl()),this.webSocket.addEventListener(`open`,t=>{this.retryAttempt=0,this.onOpen(t),e()}),this.webSocket.addEventListener(`message`,async e=>{var t;try{let t=JSON.parse(e.data);if(`event`in t&&t.event===`reconnect`){this.close(C),await this.retryConnection(t.retryAfter*1e3);return}this.onMessageReceived(t)}catch(e){(t=this.options.logger)==null||t.error(`Error parsing socket message`,e)}}),this.webSocket.addEventListener(`close`,e=>{if(e.code!==C&&!this.closeRequested){let t=_CourierSocket.parseCloseEvent(e);t.retryAfterSeconds?this.retryConnection(t.retryAfterSeconds*1e3):this.retryConnection()}this.onClose(e)}),this.webSocket.addEventListener(`error`,e=>{this.closeRequested||this.retryConnection(),this.onError(e),t(e)})}))}close(e=C,t){this.webSocket!==null&&(this.closeRequested=!0,this.clearRetryTimeout(),this.retryAttempt=0,this.webSocket.close(e,t))}send(e){var t;if(this.webSocket===null||this.isConnecting){(t=this.options.logger)==null||t.info(`Attempted to send a message, but the WebSocket is not yet open.`);return}let n=JSON.stringify(e);this.webSocket.send(n)}get userId(){return this.options.userId}get subTenantId(){return this.options.tenantId}get logger(){return this.options.logger}get courierUserAgent(){return this.options.courierUserAgent}get isConnecting(){return this.webSocket!==null&&this.webSocket.readyState===WebSocket.CONNECTING}get isOpen(){return this.webSocket!==null&&this.webSocket.readyState===WebSocket.OPEN}getWebSocketUrl(){let e=this.options.accessToken,t=this.options.connectionId,n=this.userId,r=this.courierUserAgent.getUserAgentInfo().sdk,i=this.courierUserAgent.getUserAgentInfo()[_];return`${this.url}?auth=${e}&cid=${t}&iwpv=v1&userId=${n}&sdk=${r}&${_}=${i}`}static parseCloseEvent(e){if(e.reason===null||e.reason===``)return e;try{let t=JSON.parse(e.reason);if(!t[_CourierSocket.RETRY_AFTER_KEY])return e;let n=parseInt(t[_CourierSocket.RETRY_AFTER_KEY]);return Number.isNaN(n)||n<0?e:{...e,retryAfterSeconds:n}}catch(t){return e}}getBackoffTimeInMillis(){let e=_CourierSocket.BACKOFF_INTERVALS_IN_MILLIS[this.retryAttempt],t=e-e*_CourierSocket.BACKOFF_JITTER_FACTOR,n=e+e*_CourierSocket.BACKOFF_JITTER_FACTOR;return Math.floor(Math.random()*(n-t)+t)}async retryConnection(e){var t,n,r;if(this.retryTimeoutId!==null){(t=this.logger)==null||t.debug(`Skipping retry attempt because a previous retry is already scheduled.`);return}if(this.retryAttempt>=_CourierSocket.MAX_RETRY_ATTEMPTS){(n=this.logger)==null||n.error(`Max retry attempts (${_CourierSocket.MAX_RETRY_ATTEMPTS}) reached.`);return}let i=e??this.getBackoffTimeInMillis();this.retryTimeoutId=window.setTimeout(async()=>{try{await this.connect()}catch(e){}},i),(r=this.logger)==null||r.debug(`Retrying connection in ${Math.floor(i/1e3)}s. Retry attempt ${this.retryAttempt+1} of ${_CourierSocket.MAX_RETRY_ATTEMPTS}.`),this.retryAttempt++}clearRetryTimeout(){this.retryTimeoutId!==null&&(window.clearTimeout(this.retryTimeoutId),this.retryTimeoutId=null)}};n(T,`BACKOFF_JITTER_FACTOR`,.5),n(T,`MAX_RETRY_ATTEMPTS`,5),n(T,`BACKOFF_INTERVALS_IN_MILLIS`,[3e4,6e4,12e4,24e4,48e4]),n(T,`RETRY_AFTER_KEY`,`Retry-After`);let E=T;class TransactionManager{constructor(e=10){n(this,`outstandingRequestsMap`,/* @__PURE__ */ new Map),n(this,`completedTransactionsQueue`,[]),n(this,`completedTransactionsToKeep`),this.completedTransactionsToKeep=e}addOutstandingRequest(e,t){if(this.outstandingRequestsMap.has(e))throw Error(`Transaction [${e}] already has an outstanding request`);let n={transactionId:e,request:t,response:null,start:/* @__PURE__ */ new Date,end:null};this.outstandingRequestsMap.set(e,n)}addResponse(e,t){let n=this.outstandingRequestsMap.get(e);if(n===void 0)throw Error(`Transaction [${e}] does not have an outstanding request`);n.response=t,n.end=/* @__PURE__ */ new Date,this.outstandingRequestsMap.delete(e),this.addCompletedTransaction(n)}get outstandingRequests(){return Array.from(this.outstandingRequestsMap.values())}get completedTransactions(){return this.completedTransactionsQueue}clearOutstandingRequests(){this.outstandingRequestsMap.clear()}addCompletedTransaction(e){this.completedTransactionsQueue.push(e),this.completedTransactionsQueue.length>this.completedTransactionsToKeep&&this.completedTransactionsQueue.shift()}}function D(e){if(e.event===f.NewMessage){let t=e.data;return t.created||(t.created=(/* @__PURE__ */ new Date()).toISOString()),{...e,data:t}}return e}function O(e){return D(e)}const k=class _CourierInboxSocket extends E{constructor(e){super(e),n(this,`pingIntervalId`,null),n(this,`messageEventListeners`,[]),n(this,`config`,null),n(this,`pingTransactionManager`,new TransactionManager)}onOpen(e){return this.pingTransactionManager.clearOutstandingRequests(),this.restartPingInterval(),this.sendGetConfig(),this.sendSubscribe(),Promise.resolve()}onMessageReceived(e){if(`action`in e&&e.action===d.Ping){let t=e;this.sendPong(t)}if(`response`in e&&e.response===`pong`){let t=e;this.pingTransactionManager.addResponse(t.tid,t),this.pingTransactionManager.clearOutstandingRequests()}if(`response`in e&&e.response===`config`){let t=e;this.setConfig(t.data)}if(`event`in e&&_CourierInboxSocket.isInboxMessageEvent(e.event)){let t=O(e);for(let e of this.messageEventListeners)e(t)}return this.restartPingInterval(),Promise.resolve()}onClose(e){return this.clearPingInterval(),this.clearMessageEventListeners(),this.pingTransactionManager.clearOutstandingRequests(),Promise.resolve()}onError(e){return Promise.resolve()}sendSubscribe(){let e={channel:this.userId,event:`*`};this.subTenantId&&(e.accountId=this.subTenantId);let t={tid:m.nanoid(),action:u.Subscribe,data:e};this.send(t)}sendUnsubscribe(){let e={tid:m.nanoid(),action:u.Unsubscribe,data:{channel:this.userId}};this.send(e)}addMessageEventListener(e){return this.messageEventListeners.push(e),()=>{this.removeMessageEventListener(e)}}sendPing(){var e;if(this.pingTransactionManager.outstandingRequests.length>=this.maxOutstandingPings){(e=this.logger)==null||e.debug(`Max outstanding pings reached, retrying connection.`),this.close(C,`Max outstanding pings reached, retrying connection.`),this.retryConnection();return}let t={tid:m.nanoid(),action:u.Ping};this.send(t),this.pingTransactionManager.addOutstandingRequest(t.tid,t)}sendPong(e){let t={tid:e.tid,action:u.Pong};this.send(t)}sendGetConfig(){let e={tid:m.nanoid(),action:u.GetConfig};this.send(e)}restartPingInterval(){this.clearPingInterval(),this.pingIntervalId=window.setInterval(()=>{this.sendPing()},this.pingInterval)}clearPingInterval(){this.pingIntervalId&&window.clearInterval(this.pingIntervalId)}get pingInterval(){return this.config?this.config.pingInterval*1e3:_CourierInboxSocket.DEFAULT_PING_INTERVAL_MILLIS}get maxOutstandingPings(){return this.config?this.config.maxOutstandingPings:_CourierInboxSocket.DEFAULT_MAX_OUTSTANDING_PINGS}setConfig(e){this.config=e}clearMessageEventListeners(){for(;this.messageEventListeners.length>0;)this.messageEventListeners.pop()}removeMessageEventListener(e){let t=this.messageEventListeners.indexOf(e);t>-1&&this.messageEventListeners.splice(t,1)}static isInboxMessageEvent(e){return Object.values(f).includes(e)}};n(k,`DEFAULT_PING_INTERVAL_MILLIS`,6e4),n(k,`DEFAULT_MAX_OUTSTANDING_PINGS`,3);let A=k;class InboxClient extends Client{constructor(e){super(e),n(this,`socket`),this.socket=new A(e)}async getMessages(e){let t=(e==null?void 0:e.filter)||{},n=`
      query GetInboxMessages(
        $params: FilterParamsInput = ${this.createFilterParams(t)}
        $unreadCountParams: FilterParamsInput = ${this.createUnreadCountFilterParams(t)}
        $limit: Int = ${(e==null?void 0:e.paginationLimit)??24}
        $after: String ${e!=null&&e.startCursor?`= "${e.startCursor}"`:``}
      ) {
        count: count(params: $params)
        unreadCount: count(params: $unreadCountParams)
        messages(params: $params, limit: $limit, after: $after) {
          totalCount
          pageInfo {
            startCursor
            hasNextPage
          }
          nodes {
            messageId
            accountId
            read
            archived
            created
            opened
            title
            preview
            data
            tags
            trackingIds {
              clickTrackingId
            }
            actions {
              content
              data
              href
              background_color
              style
            }
          }
        }
      }
    `;return await S({options:this.options,query:n,headers:{"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`},url:this.options.apiUrls.inbox.graphql})}async getUnreadCounts(e){let t={},n={};for(let[r,i]of Object.entries(e))i.status===`read`?t[r]=0:n[r]=i;if(Object.keys(n).length===0)return t;let r=[],i=[],a={};for(let[e,t]of Object.entries(n)){let n=InboxClient.sanitizeGraphQLIdentifier(e);a[n]=e;let o=this.createUnreadCountFilterParams(t);r.push(`$${n}: FilterParamsInput = ${o}`),i.push(`${n}: count(params: $${n})`)}let o=`
      query GetUnreadCounts(
        ${r.join(`
`)}
      ) {
        ${i.join(`
`)}
      }
    `,s=await S({options:this.options,query:o,headers:{"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`},url:this.options.apiUrls.inbox.graphql});if(s.data)for(let[e,n]of Object.entries(a))t[n]=s.data[e]??0;return t}async getArchivedMessages(e){return this.getMessages({paginationLimit:e==null?void 0:e.paginationLimit,startCursor:e==null?void 0:e.startCursor,filter:{archived:!0}})}async getUnreadMessageCount(){var e;let t=`
      query GetMessages {
        count(params: { status: "unread" ${this.options.tenantId?`, accountId: "${this.options.tenantId}"`:``} })
      }
    `;return((e=(await S({options:this.options,query:t,headers:{"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`},url:this.options.apiUrls.inbox.graphql})).data)==null?void 0:e.count)??0}async click(e){let t=`
      mutation TrackEvent {
        clicked(messageId: "${e.messageId}", trackingId: "${e.trackingId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async read(e){let t=`
      mutation TrackEvent {
        read(messageId: "${e.messageId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async unread(e){let t=`
      mutation TrackEvent {
        unread(messageId: "${e.messageId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async open(e){let t=`
      mutation TrackEvent {
        opened(messageId: "${e.messageId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async batchOpen(e){if(e.length===0)return;if(e.length===1)return this.open({messageId:e[0]});let t=`
      mutation BatchTrackEvents {
        ${e.map((e,t)=>`open_${t}: opened(messageId: "${e}")`).join(`
        `)}
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async archive(e){let t=`
      mutation TrackEvent {
        archive(messageId: "${e.messageId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async unarchive(e){let t=`
      mutation TrackEvent {
        unarchive(messageId: "${e.messageId}")
      }
    `,n={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(n[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:t,headers:n,url:this.options.apiUrls.inbox.graphql})}async readAll(){let e=`
      mutation TrackEvent {
        markAllRead
      }
    `,t={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(t[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:`
      mutation TrackEvent {
        markAllRead
      }
    `,headers:t,url:this.options.apiUrls.inbox.graphql})}async archiveRead(){let e=`
      mutation TrackEvent {
        archiveRead
      }
    `,t={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(t[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:`
      mutation TrackEvent {
        archiveRead
      }
    `,headers:t,url:this.options.apiUrls.inbox.graphql})}async archiveAll(){let e=`
      mutation TrackEvent {
        archiveAll
      }
    `,t={"x-courier-user-id":this.options.userId,Authorization:`Bearer ${this.options.accessToken}`};this.options.connectionId&&(t[`x-courier-client-source-id`]=this.options.connectionId),await S({options:this.options,query:`
      mutation TrackEvent {
        archiveAll
      }
    `,headers:t,url:this.options.apiUrls.inbox.graphql})}createFilterParams(e){let t=[];return this.options.tenantId&&t.push(`accountId: "${this.options.tenantId}"`),e.tags&&t.push(`tags: [${e.tags.map(e=>`"${e}"`).join(`,`)}]`),e.status&&t.push(`status: "${e.status}"`),e.archived&&t.push(`archived: ${e.archived}`),e.from&&t.push(`from: "${e.from}"`),`{ ${t.join(`,`)} }`}createUnreadCountFilterParams(e){return e.status?this.createFilterParams(e):this.createFilterParams({...e,status:`unread`})}static sanitizeGraphQLIdentifier(e){return`id_${e.replace(/_/g,`__`).replace(/-/g,`_`)}`}}function j(e){let t=atob(e),n=new Uint8Array(t.length);for(let e=0;e<t.length;e++)n[e]=t.charCodeAt(e);return String.fromCharCode(...n)}function M(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return btoa(String.fromCharCode(...t))}class PreferenceClient extends Client{async getUserPreferences(e){var t,n;let r=`
      query GetRecipientPreferences {
        recipientPreferences${this.options.tenantId?`(accountId: "${this.options.tenantId}")`:``} {
          nodes {
            templateId
            templateName
            sectionId
            sectionName
            defaultStatus
            status
            hasCustomRouting
            routingPreferences
            digestSchedule
          }
        }
      }
    `;return{items:(((n=(t=(await S({options:this.options,url:this.options.apiUrls.courier.graphql,query:r,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`}})).data)==null?void 0:t.recipientPreferences)==null?void 0:n.nodes)||[]).map(e=>this.transformToTopic(e)),paging:{cursor:e==null?void 0:e.paginationCursor,more:!1}}}async getUserPreferenceTopic(e){var t;let n=`
      query GetRecipientPreferenceTopic {
        recipientPreference(templateId: "${e.topicId}"${this.options.tenantId?`, accountId: "${this.options.tenantId}"`:``}) {
          templateId
          templateName
          status
          hasCustomRouting
          routingPreferences
          digestSchedule
          sectionId
          sectionName
          defaultStatus
        }
      }
    `,r=(t=(await S({options:this.options,url:this.options.apiUrls.courier.graphql,query:n,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`}})).data)==null?void 0:t.recipientPreference;if(!r)throw Error(`Preference topic not found: ${e.topicId}`);return this.transformToTopic(r)}async putUserPreferenceTopic(e){var t;let n=e.customRouting.length>0?`[${e.customRouting.join(`, `)}]`:`[]`,r=e.digestSchedule==null?``:`
            digestSchedule: "${e.digestSchedule}"`,i=`
      mutation UpdateRecipientPreferenceV2 {
        updatePreferenceV2(
          templateId: "${e.topicId}",
          preferences: {
            status: ${e.status},
            hasCustomRouting: ${e.hasCustomRouting},
            routingPreferences: ${n}${r}
          }${this.options.tenantId?`, accountId: "${this.options.tenantId}"`:``}
        ) {
          templateId
          templateName
          status
          hasCustomRouting
          routingPreferences
          digestSchedule
          sectionId
          sectionName
          defaultStatus
        }
      }
    `,a=(t=(await S({options:this.options,url:this.options.apiUrls.courier.graphql,query:i,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`}})).data)==null?void 0:t.updatePreferenceV2;return this.transformToTopic(a)}async getPreferencePage(e){var t,n,r,i;let a=(e==null?void 0:e.accountId)??this.options.tenantId,o=e==null?void 0:e.brandId,s=(e==null?void 0:e.draft)??!1,c=a?`(accountId: "${a}")`:``,l=`
      query GetPreferencePage {
        ${s?`draftPreferencePage`:`preferencePage${c}`} {
          showCourierFooter
          heading
          description
          ${o?`
        brand(brandId: "${o}") {
          settings {
            colors {
              primary
            }
          }
          links
          logo {
            href
            image
          }
        }`:``}
          channelConfigs {
            channelLabels {
              channel
              name
            }
          }
          sections {
            nodes {
              name
              description
              sectionId
              routingOptions
              hasCustomRouting
              topics {
                nodes {
                  data
                  defaultStatus
                  description
                  templateName
                  templateId
                  digestSchedules
                }
              }
            }
          }
        }
        recipientPreferences${a?`(accountId: "${a}")`:``} {
          nodes {
            templateId
            status
            hasCustomRouting
            routingPreferences
            digestSchedule
          }
        }
      }
    `,u=await S({options:this.options,url:this.options.apiUrls.courier.graphql,query:l,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`}}),d=s?(t=u.data)==null?void 0:t.draftPreferencePage:(n=u.data)==null?void 0:n.preferencePage;if(!d)return null;let f=((i=(r=u.data)==null?void 0:r.recipientPreferences)==null?void 0:i.nodes)||[];return this.transformPreferencePage(d,f)}async getDigestSchedules(e){var t;let n=`
      query GetDigestSchedulesForTopic {
        digestSchedulesForTopic(templateId: "${e.topicId}") {
          scheduleId
          period
          recurrence
          repeat
          repetition
          start
          default
        }
      }
    `;return((t=(await S({options:this.options,url:this.options.apiUrls.courier.graphql,query:n,headers:{"x-courier-user-id":this.options.userId,"x-courier-client-key":`empty`,Authorization:`Bearer ${this.options.accessToken}`}})).data)==null?void 0:t.digestSchedulesForTopic)||[]}getNotificationCenterUrl(e){return this.options.logger.warn(`Courier Warning: The clientKey parameter in getNotificationCenterUrl is deprecated and will be removed in a future release.`),`https://view.notificationcenter.app/p/${M(`${j(e.clientKey)}#${this.options.userId}${this.options.tenantId?`#${this.options.tenantId}`:``}#false`)}`}transformToTopic(e){return{topicId:e.templateId,topicName:e.templateName||``,sectionId:e.sectionId||``,sectionName:e.sectionName||``,status:e.status||`UNKNOWN`,defaultStatus:e.defaultStatus||`UNKNOWN`,hasCustomRouting:e.hasCustomRouting||!1,customRouting:e.routingPreferences||[],digestSchedule:e.digestSchedule}}transformPreferencePage(e,t=[]){var n;let r=(((n=e==null?void 0:e.sections)==null?void 0:n.nodes)??[]).map(e=>{var t;let n=(((t=e==null?void 0:e.topics)==null?void 0:t.nodes)??[]).map(e=>({templateId:e.templateId,templateName:e.templateName??``,defaultStatus:e.defaultStatus??`UNKNOWN`,description:e.description??void 0,data:e.data,digestSchedules:e.digestSchedules??void 0}));return{sectionId:e.sectionId,name:e.name??``,description:e.description??void 0,hasCustomRouting:!!e.hasCustomRouting,routingOptions:e.routingOptions??[],topics:n}});return{showCourierFooter:!!(e!=null&&e.showCourierFooter),heading:(e==null?void 0:e.heading)??``,description:(e==null?void 0:e.description)??``,brand:(e==null?void 0:e.brand)??null,channelConfigs:(e==null?void 0:e.channelConfigs)??null,sections:r,recipientPreferences:t}}}class TokenClient extends Client{async putUserToken(e){let t={provider_key:e.provider,...e.device&&{device:{app_id:e.device.appId,ad_id:e.device.adId,device_id:e.device.deviceId,platform:e.device.platform,manufacturer:e.device.manufacturer,model:e.device.model}}};await x({options:this.options,url:`${this.options.apiUrls.courier.rest}/users/${this.options.userId}/tokens/${e.token}`,method:`PUT`,headers:{Authorization:`Bearer ${this.options.accessToken}`},body:t,validCodes:[200,204]})}async deleteUserToken(e){await x({options:this.options,url:`${this.options.apiUrls.courier.rest}/users/${this.options.userId}/tokens/${e.token}`,method:`DELETE`,headers:{Authorization:`Bearer ${this.options.accessToken}`},validCodes:[200,204]})}}class ListClient extends Client{async putSubscription(e){return this.options.logger.warn(`Courier Warning: The clientKey parameter in putSubscription is deprecated and will be removed in a future release.`),await x({url:`${this.options.apiUrls.courier.rest}/client/lists/${e.listId}/subscribe/${this.options.userId}`,options:this.options,method:`PUT`,headers:{"x-courier-client-key":e.clientKey,Authorization:`Bearer ${this.options.accessToken}`}})}async deleteSubscription(e){return this.options.logger.warn(`Courier Warning: The clientKey parameter in deleteSubscription is deprecated and will be removed in a future release.`),await x({url:`${this.options.apiUrls.courier.rest}/client/lists/${e.listId}/unsubscribe/${this.options.userId}`,options:this.options,method:`DELETE`,headers:{"x-courier-client-key":e.clientKey,Authorization:`Bearer ${this.options.accessToken}`}})}}class TrackingClient extends Client{async postInboundCourier(e){let{clientKey:t,...n}=e;return await x({url:`${this.options.apiUrls.courier.rest}/inbound/courier`,options:this.options,method:`POST`,headers:{"x-courier-client-key":t},body:{...n,userId:this.options.userId},validCodes:[200,202]})}async postTrackingUrl(e){return await x({url:e.url,options:this.options,method:`POST`,body:{event:e.event}})}}class CourierUserAgent{constructor(e,t,n){this.clientId=e,this.sdkName=t,this.sdkVersion=n}getUserAgentInfo(){return{sdk:this.sdkName,[_]:this.sdkVersion,cid:this.clientId}}toHttpHeaderValue(){return Object.entries(this.getUserAgentInfo()).map(([e,t])=>`${e}=${t}`).join(`,`)}}const N=class _CourierClient extends Client{constructor(e){var t,r;let i=e.showLogs===void 0?!1:e.showLogs,a=m.nanoid(),o={...e,showLogs:i,connectionId:a,apiUrls:e.apiUrls||c(`us`),accessToken:e.jwt??e.publicApiKey},s=new CourierUserAgent(a,e.courierUserAgentName||_CourierClient.COURIER_JS_NAME,e.courierUserAgentVersion||_CourierClient.COURIER_JS_VERSION);super({...o,logger:new Logger(o.showLogs),courierUserAgent:s,apiUrls:l(o.apiUrls)}),n(this,`tokens`),n(this,`brands`),n(this,`preferences`),n(this,`inbox`),n(this,`lists`),n(this,`tracking`),this.tokens=new TokenClient(this.options),this.brands=new BrandClient(this.options),this.preferences=new PreferenceClient(this.options),this.inbox=new InboxClient(this.options),this.lists=new ListClient(this.options),this.tracking=new TrackingClient(this.options),!this.options.jwt&&!this.options.publicApiKey&&this.options.logger.warn(`Courier Client initialized with no authentication method. Please provide a JWT or public API key.`),this.options.publicApiKey&&((t=this.options.logger)==null||t.warn(`Courier Warning: Public API Keys are for testing only. Please use JWTs for production.
You can generate a JWT with this endpoint: https://www.courier.com/docs/api-reference/authentication/create-jwt
This endpoint should be called from your backend server, not the SDK.`)),this.options.jwt&&this.options.publicApiKey&&((r=this.options.logger)==null||r.warn(`Courier Warning: Both a JWT and a Public API Key were provided. The Public API Key will be ignored.`))}};n(N,`COURIER_JS_NAME`,`courier-js`),n(N,`COURIER_JS_VERSION`,`3.7.1`);let P=N;class AuthenticationListener{constructor(e){n(this,`callback`),this.callback=e}remove(){I.shared.removeAuthenticationListener(this)}}const F=class _Courier{constructor(){n(this,`id`,m.nanoid()),n(this,`instanceClient`),n(this,`courierUserAgentName`),n(this,`courierUserAgentVersion`),n(this,`_paginationLimit`,24),n(this,`authenticationListeners`,[])}get paginationLimit(){return this._paginationLimit}set paginationLimit(e){this._paginationLimit=Math.min(Math.max(e,1),100)}get client(){return this.instanceClient}static get shared(){return _Courier.instance||(_Courier.instance=new _Courier),_Courier.instance}signIn(e){this.instanceClient&&(this.instanceClient.options.logger.warn(`Sign in called but there is already a user signed in. Signing out the current user.`),this.signOut()),this.instanceClient=new P({...e,courierUserAgentName:this.courierUserAgentName,courierUserAgentVersion:this.courierUserAgentVersion}),this.notifyAuthenticationListeners({userId:e.userId})}signOut(){var e,t;(t=(e=this.instanceClient)==null?void 0:e.inbox.socket)==null||t.close(),this.instanceClient=void 0,this.notifyAuthenticationListeners({userId:void 0})}addAuthenticationListener(e){var t;(t=this.instanceClient)==null||t.options.logger.info(`Adding authentication listener`);let n=new AuthenticationListener(e);return this.authenticationListeners.push(n),n}removeAuthenticationListener(e){var t;(t=this.instanceClient)==null||t.options.logger.info(`Removing authentication listener`),this.authenticationListeners=this.authenticationListeners.filter(t=>t!==e)}notifyAuthenticationListeners(e){this.authenticationListeners.forEach(t=>t.callback(e))}};n(F,`instance`);let I=F;export{BrandClient,I as Courier,P as CourierClient,o as DEFAULT_COURIER_API_URLS,s as EU_COURIER_API_URLS,InboxClient,f as InboxMessageEvent,ListClient,PreferenceClient,TokenClient,TrackingClient,l as getCourierApiUrls,c as getCourierApiUrlsForRegion};

