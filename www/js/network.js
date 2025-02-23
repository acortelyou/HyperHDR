$(document).ready( function() {
	performTranslation();
	
	var BOBLIGHT_ENABLED = window.comps.find(element => element.name == "BOBLIGHTSERVER");
	
	var conf_editor = null;
	var conf_editor_net = null;
	var conf_editor_json = null;
	var conf_editor_proto = null;
	var conf_editor_fbs = null;
	var conf_editor_bobl = null;
	var conf_editor_forw = null;
	var conf_editor_rawUdp = null;
	var conf_editor_mqtt = null;
	
	{
		$('#conf_cont').append(createOptPanel('fa-wrench', $.i18n("edt_conf_webc_heading_title"), 'editor_container', 'btn_submit_www'));
		$('#conf_cont').append(createHelpTable(window.schema.webConfig.properties, $.i18n("edt_conf_webc_heading_title")));
		
		//network
		$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_net_heading_title"), 'editor_container_net', 'btn_submit_net'));
		$('#conf_cont').append(createHelpTable(window.schema.network.properties, $.i18n("edt_conf_net_heading_title")));

		//jsonserver
		$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_js_heading_title"), 'editor_container_jsonserver', 'btn_submit_jsonserver'));
		$('#conf_cont').append(createHelpTable(window.schema.jsonServer.properties, $.i18n("edt_conf_js_heading_title")));

		//flatbufserver
		$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_fbs_heading_title"), 'editor_container_fbserver', 'btn_submit_fbserver'));
		$('#conf_cont').append(createHelpTable(window.schema.flatbufServer.properties, $.i18n("edt_conf_fbs_heading_title")));

		$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_mqtt_heading_title"), 'editor_container_mqtt', 'btn_submit_mqtt'));
		$('#conf_cont').append(createHelpTable(window.schema.mqtt.properties, $.i18n("edt_conf_mqtt_heading_title")));
		
		if (window.serverInfo.hasPROTOBUF == 1)
		{
			//protoserver
			$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_pbs_heading_title"), 'editor_container_protoserver', 'btn_submit_protoserver'));
			$('#conf_cont').append(createHelpTable(window.schema.protoServer.properties, $.i18n("edt_conf_pbs_heading_title")));
		}

		$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("general_comp_RAWUDPSERVER"), 'editor_container_rawUdpServer', 'btn_submit_rawUdpServer'));
		$('#conf_cont').append(createHelpTable(window.schema.rawUdpServer.properties, $.i18n("general_comp_RAWUDPSERVER")));
			
		//boblight
		if (BOBLIGHT_ENABLED)
		{
			$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_bobls_heading_title"), 'editor_container_boblightserver', 'btn_submit_boblightserver'));
			$('#conf_cont').append(createHelpTable(window.schema.boblightServer.properties, $.i18n("edt_conf_bobls_heading_title")));
		}

		//forwarder
		if(storedAccess != 'default')
		{
			$('#conf_cont').append(createOptPanel('fa-sitemap', $.i18n("edt_conf_fw_heading_title"), 'editor_container_forwarder', 'btn_submit_forwarder'));
			$('#conf_cont').append(createHelpTable(window.schema.forwarder.properties, $.i18n("edt_conf_fw_heading_title")));
		}
		
		//Reorder hardcoded token div at the end
		var tocMoved = $("#tok_desc").detach();
		$('#conf_cont').append(tocMoved);
	}	

	conf_editor = createJsonEditor('editor_container', {
		webConfig : window.schema.webConfig
	}, true, true);
	
	$('#btn_submit_www').off().on('click',function() {
		var val = conf_editor.getValue();
		window.fastReconnect = true;
		window.jsonPort = val.webConfig.port;
		requestWriteConfig(val);
	});
	
	// net
	conf_editor_net = createJsonEditor('editor_container_net', {
		network         : window.schema.network
	}, true, true);

	conf_editor_net.on('change',function() {
		conf_editor_net.validate().length || window.readOnlyMode ? $('#btn_submit_net').attr('disabled', true) : $('#btn_submit_net').attr('disabled', false);
	});

	$('#btn_submit_net').off().on('click',function() {
		requestWriteConfig(conf_editor_net.getValue());
	});

	//json
	conf_editor_json = createJsonEditor('editor_container_jsonserver', {
		jsonServer         : window.schema.jsonServer
	}, true, true);
	
	conf_editor.on('change',function() {
		conf_editor.validate().length || window.readOnlyMode ? $('#btn_submit').attr('disabled', true) : $('#btn_submit').attr('disabled', false);
	});

	conf_editor_json.on('change',function() {
		conf_editor_json.validate().length || window.readOnlyMode ? $('#btn_submit_jsonserver').attr('disabled', true) : $('#btn_submit_jsonserver').attr('disabled', false);
	});

	$('#btn_submit_jsonserver').off().on('click',function() {
		requestWriteConfig(conf_editor_json.getValue());
	});

	//flatbuffer
	conf_editor_fbs = createJsonEditor('editor_container_fbserver', {
		flatbufServer        : window.schema.flatbufServer
	}, true, true);

	conf_editor_fbs.on('change',function() {
		conf_editor_fbs.validate().length || window.readOnlyMode ? $('#btn_submit_fbserver').attr('disabled', true) : $('#btn_submit_fbserver').attr('disabled', false);
	});

	$('#btn_submit_fbserver').off().on('click',function() {
		requestWriteConfig(conf_editor_fbs.getValue());
	});

	//
	conf_editor_mqtt = createJsonEditor('editor_container_mqtt', {
		mqtt        : window.schema.mqtt
	}, true, true);

	conf_editor_mqtt.on('change',function() {
		conf_editor_mqtt.validate().length || window.readOnlyMode ? $('#btn_submit_mqtt').attr('disabled', true) : $('#btn_submit_mqtt').attr('disabled', false);
	});

	$('#btn_submit_mqtt').off().on('click',function() {
		requestWriteConfig(conf_editor_mqtt.getValue());
	});

	if (window.serverInfo.hasPROTOBUF == 1)
	{
		//protobuffer
		conf_editor_proto = createJsonEditor('editor_container_protoserver', {
			protoServer        : window.schema.protoServer
		}, true, true);

		conf_editor_proto.on('change',function() {
			conf_editor_proto.validate().length || window.readOnlyMode ? $('#btn_submit_protoserver').attr('disabled', true) : $('#btn_submit_protoserver').attr('disabled', false);
		});

		$('#btn_submit_protoserver').off().on('click',function() {
			requestWriteConfig(conf_editor_proto.getValue());
		});
	}

	conf_editor_rawUdp = createJsonEditor('editor_container_rawUdpServer', {
		rawUdpServer     : window.schema.rawUdpServer
	}, true, true);

	conf_editor_rawUdp.on('change',function() {
		conf_editor_rawUdp.validate().length || window.readOnlyMode ? $('#btn_submit_rawUdpServer').attr('disabled', true) : $('#btn_submit_rawUdpServer').attr('disabled', false);
	});

	$('#btn_submit_rawUdpServer').off().on('click',function() {
		requestWriteConfig(conf_editor_rawUdp.getValue());
	});

	document.getElementById('editor_container_rawUdpServer').parentElement.firstElementChild.classList.add('is-instance');
		
	//boblight
	if (BOBLIGHT_ENABLED)
	{
		conf_editor_bobl = createJsonEditor('editor_container_boblightserver', {
			boblightServer     : window.schema.boblightServer
		}, true, true);

		conf_editor_bobl.on('change',function() {
			conf_editor_bobl.validate().length || window.readOnlyMode ? $('#btn_submit_boblightserver').attr('disabled', true) : $('#btn_submit_boblightserver').attr('disabled', false);
		});

		$('#btn_submit_boblightserver').off().on('click',function() {
			requestWriteConfig(conf_editor_bobl.getValue());
		});

		document.getElementById('editor_container_boblightserver').parentElement.firstElementChild.classList.add('is-instance');
	}

	if(storedAccess != 'default')
	{
		//forwarder
		conf_editor_forw = createJsonEditor('editor_container_forwarder', {
			forwarder          : window.schema.forwarder
		}, true, true);

		conf_editor_forw.on('change',function() {
			conf_editor_forw.validate().length || window.readOnlyMode ? $('#btn_submit_forwarder').attr('disabled', true) : $('#btn_submit_forwarder').attr('disabled', false);
		});

		$('#btn_submit_forwarder').off().on('click',function() {
			requestWriteConfig(conf_editor_forw.getValue());
		});
	}

	//create introduction
	if(window.showOptHelp)
	{
		createHint("intro", $.i18n('conf_webconfig_label_intro'), "editor_container");
		createHint("intro", $.i18n('conf_network_net_intro'), "editor_container_net");
		createHint("intro", $.i18n('conf_network_json_intro'), "editor_container_jsonserver");
		createHint("intro", $.i18n('conf_network_fbs_intro'), "editor_container_fbserver");
		createHint("intro", $.i18n('conf_network_mqtt_intro'), "editor_container_mqtt");
		createHint("intro", $.i18n('edt_udp_raw_server'), "editor_container_rawUdpServer");
		
		if (window.serverInfo.hasPROTOBUF == 1)
		{
			createHint("intro", $.i18n('conf_network_proto_intro'), "editor_container_protoserver");
		}
		
		if (BOBLIGHT_ENABLED)
		{
			createHint("intro", $.i18n('conf_network_bobl_intro'), "editor_container_boblightserver");
		}
		
		createHint("intro", $.i18n('conf_network_forw_intro'), "editor_container_forwarder");
		createHint("intro", $.i18n('conf_network_tok_intro'), "tok_desc_cont");
	}

	// Token handling
	function buildTokenList()
	{
		$('.tktbody').html("");
		for(var key in tokenList)
		{
			var lastUse = (tokenList[key].last_use) ? tokenList[key].last_use : "-";
			var btn = '<button id="tok'+tokenList[key].id+'" type="button" class="btn btn-danger">'+$.i18n('general_btn_delete')+'</button>';
			$('.tktbody').append(createTableRow([tokenList[key].comment, lastUse, btn], false, true));
			$('#tok'+tokenList[key].id).off().on('click', handleDeleteToken);
		}
	}

	createTable('tkthead', 'tktbody', 'tktable');
	$('.tkthead').html(createTableRow([$.i18n('conf_network_tok_cidhead'), $.i18n('conf_network_tok_lastuse'), $.i18n('general_btn_delete')], true, true));
	buildTokenList();

	function handleDeleteToken(e)
	{
		var key = e.currentTarget.id.replace("tok","");
		requestTokenDelete(key);
		$('#tok'+key).parent().parent().remove();
		// rm deleted token id
		tokenList = tokenList.filter(function( obj ) {
    		return obj.id !== key;
		});
	}

	$('#btn_create_tok').off().on('click',function() {
		requestToken($('#tok_comment').val())
		$('#tok_comment').val("")
		$('#btn_create_tok').attr('disabled', true)
	});
	$('#tok_comment').off().on('input',function(e) {
		(e.currentTarget.value.length >= 10) ? $('#btn_create_tok').attr('disabled', false) : $('#btn_create_tok').attr('disabled', true);
		if(10-e.currentTarget.value.length >= 1 && 10-e.currentTarget.value.length <= 9)
			$('#tok_chars_needed').html(10-e.currentTarget.value.length + " " + $.i18n('general_chars_needed'))
		else
		$('#tok_chars_needed').html("<br />")
	});
	$(window.hyperhdr).off("cmd-authorize-createToken").on("cmd-authorize-createToken", function(event) {
		var val = event.response.info;
		showInfoDialog("newToken",$.i18n('conf_network_tok_diaTitle'),$.i18n('conf_network_tok_diaMsg')+'<br><div style="font-weight:bold">'+val.token+'</div>')
		tokenList.push(val)
		buildTokenList()
	});

	function checkApiTokenState(state)
	{
		if(state == false)
			$("#tok_desc").attr('style', 'display:none')
		else
			$("#tok_desc").removeAttr('style')
	}

	$('#root_network_apiAuth').change(function () {
		var state = $(this).is(":checked");
		checkApiTokenState(state);
	})

	checkApiTokenState(window.serverConfig.network.apiAuth);
	
	var instHeaders = document.getElementsByClassName("card-header");
	Array.prototype.forEach.call(instHeaders, function(instHeader, index) {
		if (instHeader.classList.contains('is-instance'))
			putInstanceName(instHeader);
	});
	
	removeOverlay();
});
