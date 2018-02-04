var scheme = {}

function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge)
		},false);
    }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
//	WVJBIframe.src = '';
	WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
}

setupWebViewJavascriptBridge(function(bridge) {
	//alert(bridge.init !== undefined)
	if(bridge.init !== undefined){
		bridge.init(function(message,responseCallback){
			responseCallback("")
		})
	}

	bridge.callHandler('verifyLBGamePage', {}, function(apis, responseCallback) {
//		alert(apis) 
		var apiList = apis.split(",")
		addBridgeAttr(bridge, apiList)
		responseCallback(apis)
	});
});

function addBridgeAttr(bridge, apiList) {
	//alert('registerScheme:' + apiList.length)
	if(apiList && apiList.length){
		apiList.map(function(attr) {
			if(scheme[attr]) return;
			scheme[attr] = function(params, cbk) {
				params = params || {}
				params.type = attr
//				alert(JSON.stringify(params))
				bridge.callHandler('openScheme', {
					url: 'ZYGame://bridge/?json_params=' + encodeURIComponent(JSON.stringify(params))
				}, cbk)
			}
		})

	}
}

window.Bridge = {
	login : function(data,cbk){
		//alert(scheme.login)
		if(scheme.login)
			scheme.login(data,cbk);
	},
	back : function(data,cbk){
		if(scheme.back)
			scheme.back(data,cbk);
	},
	openurl : function(data,cbk){
		if(scheme.openurl)
			scheme.openurl(data,cbk);
	},
	charge : function(data,cbk){
		if(scheme.charge)
			scheme.charge(data,cbk);
	},
	record : function(data,cbk){
		if(scheme.recode)
			scheme.recode(data,cbk);
	},
	getBalance : function(data,cbk){
		if(scheme.getBalance)
			scheme.getBalance(data,cbk);
	},
	getLocation : function(data,cbk){
		if(scheme.getLocation)
			scheme.getLocation(data,cbk);
	}
}






