var C="iffco-shell-2",SH=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(SH.map(function(u){return c.add(new Request(u,{cache:"reload"})).catch(function(){})}))}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return/^iffco-shell-/.test(k)&&k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
 if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-store"}).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put("./",cp)});return res}).catch(function(){return caches.match("./").then(function(m){return m||caches.match("index.html")})}));return}
 if(/\.(png|webmanifest)$/.test(u.pathname)){e.respondWith(caches.match(r).then(function(m){return m||fetch(r)}))}});
