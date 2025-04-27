---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// SystemDialog
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
* Questo è uno spazio dei nomi che contiene elementi di documentazione appartenenti al SystemDialog
*
* @namespace SystemDialog
*
*/


LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/extjs/sweetalert2/dist/sweetalert2.min.js");
//LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/extjs/sweetalert2/dist/sweetalert2.js");
LibJavascript.RequireLibrary((typeof(SPWebRootURL) != 'undefined' ? SPWebRootURL + '/' : '../') + 'jsp/hrif.jsp', true);


/** Costanti per la gestione degli stati dell'alert 
* @enum
* @type {string}
*/
const hrifALERTTYPE = {
	/** Success */ 
	SUCCESS : "success",
	/** Error */ 
	ERROR : "Error",
	/** Warnig */ 
	WARNING : "warning",
	/** Info */ 
	INFO : "info"
}                                


/** Costanti per la gestione delle tipologie campi di input per i Confirm (di default = testo)  
* @enum
* @type {string}
*/
const hrifALERTINPUTTYPE = {
	/** Password */ 
	PASSWORD : "password",
	/** Checkbox */ 
	CHECKBOX : "checkbox",
}

const maxCharDescription = 250;

/** Visualizzazione di un Alert (HRIF) - Tipo Warning
* @class 
* @alias hrifAlert
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [callbackAction] - Azione di callback.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlert(FormatMsg("Messaggio di testo dell'alert"));
*
*/
function hrifAlert(textValue, titleValue, callback, form){
	hrifAlertWarning(textValue, titleValue, callback, form);
}


/** Visualizzazione di un Alert (HRIF) - Tipo Success
* @class 
* @alias hrifAlertSuccessDestroy
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlertSuccessDestroy(FormatMsg("Messaggio di testo dell'alert"));
*
*/
function hrifAlertSuccessDestroy(textValue, titleValue, form, fromParent){
	var wrkTitle = (titleValue) ? titleValue : FormatMsg("HRSYSTEM_SUCCESS");
	var wrkCustomClass = (textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';
	 
	if (window.top && fromParent!=1){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
//		window.top.addEventListener("message", function(event) {
//        	if(event.data == "openAlertS"){
            	window.top.hrifAlertSuccessDestroy(textValue, titleValue, form, 1);
            	return true;
//        	}
//    	});
//    	window.top.postMessage("openAlertS", "*");
	} else {
		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: textValue,
		  	icon: 'success',
		  	timer: 1550,
			position: 'top',
			showConfirmButton: false,
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
				backdrop: 'swal2-alert swal2-hide'
	  		},
			customClass :wrkCustomClass
			 
		}).then((result) => {
			if ((typeof(form)=="object") && typeof(callback)!="undefined" && callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + form.formid + '").' + callback + '()');
		});
	}	
}


/** Visualizzazione di un Alert (HRIF) - Tipo Success
* @class 
* @alias hrifAlertSuccess
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [callbackAction] - Azione di callback.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlertSuccess(FormatMsg("Messaggio di testo dell'alert"));
*
*/
function hrifAlertSuccess(alertTextValue, titleValue, callback, form, fromParent){

	if (typeof(alertTextValue)=='object'){
		this.textValue = alertTextValue.textValue;
		this.titleValue = alertTextValue.titleValue;
		this.callback = alertTextValue.callback;
		this.form = alertTextValue.form;
		this.fromParent = alertTextValue.fromParent;
		this.autoDestroy = alertTextValue.autoDestroy;
		this.autoDestroyDelay;
		if (alertTextValue.autoDestroy){
			this.autoDestroyDelay = (alertTextValue.autoDestroyDelay && alertTextValue.autoDestroyDelay<30000) ? alertTextValue.autoDestroyDelay : 30000;
		}
	} else {
		this.textValue = alertTextValue;
		this.titleValue = titleValue;
		this.callback = callback;
		this.form = form;
		this.fromParent = fromParent;
	}

	var FAlertTop = false;
	var wrkTitle = (this.titleValue) ? this.titleValue : FormatMsg("HRSYSTEM_SUCCESS");
	var wrkCustomClass = (this.textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';

	if (window.top && this.fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}
	 
	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var jsonAlert = {};
		jsonAlert.textValue = this.textValue;
		jsonAlert.titleValue = this.titleValue; 
		jsonAlert.callback = this.callback;
		jsonAlert.form = this.form;
		jsonAlert.autoDestroy = this.autoDestroy;
		jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
		jsonAlert.fromParent = 1;
		window.top.hrifAlertSuccess(jsonAlert);
		return true;
	} else {
		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: textValue,
		  	icon: 'success',
			position: 'top',
			heightAuto: false,
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK'),
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
				backdrop: 'swal2-alert swal2-hide'
	  		},
			customClass :wrkCustomClass
			 
		}).then((result) => {
			if ((typeof(this.form)=="object") && typeof(this.callback)!="undefined" && this.callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + this.form.formid + '").' + this.callback + '()');
		});
	}	
}


/** Visualizzazione di un Alert (HRIF) - Tipo Error
* @class 
* @alias hrifAlertError
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [callbackAction] - Azione di callback.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlertError(FormatMsg("Messaggio di testo dell'alert"));
*
*/
function hrifAlertError(textValue, titleValue, callback, form, fromParent){

	if (typeof(textValue)=='object'){
		this.textValue = textValue.textValue;
		this.titleValue = textValue.titleValue;
		this.callback = textValue.callback;
		this.form = textValue.form;
		this.fromParent = textValue.fromParent;
		this.autoDestroy = textValue.autoDestroy;
		this.autoDestroyDelay;
		if (textValue.autoDestroy){
			this.autoDestroyDelay = (textValue.autoDestroyDelay && textValue.autoDestroyDelay<30000) ? textValue.autoDestroyDelay : 30000;
		}
	} else {
		this.textValue = textValue;
		this.titleValue = titleValue;
		this.callback = callback;
		this.form = form;
		this.fromParent = fromParent;
	}

	var FAlertTop = false;
	var wrkTitle = (this.titleValue) ? this.titleValue : FormatMsg("HRSYSTEM_ERROR");
	var wrkCustomClass = (this.textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + 'align-start' , title : hrifCLASSBASE.LABEL + 'align-start'} : '';

	if (window.top && this.fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}

	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var jsonAlert = {};
		jsonAlert.textValue = this.textValue;
		jsonAlert.titleValue = this.titleValue; 
		jsonAlert.callback = this.callback;
		jsonAlert.form = this.form;
		jsonAlert.autoDestroy = this.autoDestroy;
		jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
		jsonAlert.fromParent = 1;
		window.top.hrifAlertError(jsonAlert);
		return true;

	} else {
	
		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: this.textValue,
		  	icon: 'error',
			position: 'top',
			timer: this.autoDestroyDelay,			
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide'
	  		},
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK'),
			customClass :wrkCustomClass
		}).then((result) => {
			if ((typeof(this.form)=="object") && typeof(this.callback)!="undefined" && this.callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + this.form.formid + '").' + this.callback + '()');
		});	
	}

}


/** Visualizzazione di un Alert (HRIF) - Tipo Warning
* @class 
* @alias hrifAlertWarning
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @returns {object} Oggetto Alert (Hrif).
*/
function hrifAlertWarning(alertTextValue, titleValue, callback, form, fromParent){

	if (typeof(alertTextValue)=='object'){
		this.textValue = alertTextValue.textValue;
		this.titleValue = alertTextValue.titleValue;
		this.callback = alertTextValue.callback;
		this.form = alertTextValue.form;
		this.fromParent = alertTextValue.fromParent;
		this.autoDestroy = alertTextValue.autoDestroy;
		this.autoDestroyDelay;
		if (alertTextValue.autoDestroy){
			this.autoDestroyDelay = (alertTextValue.autoDestroyDelay && alertTextValue.autoDestroyDelay<30000) ? alertTextValue.autoDestroyDelay : 30000;
		}
	} else {
		this.textValue = alertTextValue;
		this.titleValue = titleValue;
		this.callback = callback;
		this.form = form;
		this.fromParent = fromParent;
	}

	var FAlertTop = false;
	var wrkTitle = (this.titleValue) ? this.titleValue : FormatMsg("HRSYSTEM_ATTENTION");
	var wrkCustomClass = (this.textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';
 	if (window.top && this.fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}
/*
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var topVers = window.top.hrifGetVersion();
		
//		window.top.addEventListener("message", function(event) {
//        	if(event.data == "openAlertW"){
				var jsonAlert = {};
				jsonAlert.textValue = this.textValue;
				jsonAlert.titleValue = this.titleValue; 
				jsonAlert.callback = this.callback;
				jsonAlert.form = this.form;
				jsonAlert.autoDestroy = this.autoDestroy;
				jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
				jsonAlert.fromParent = 1;	
            	// window.top.hrifAlertWarning(textValue, titleValue, callback, form, 1);
            	window.top.hrifAlertWarning(jsonAlert);
            	return true;
//        	}
//    	});
//    	window.top.postMessage("openAlertW", "*");
*/
	// }

	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var jsonAlert = {};
		jsonAlert.textValue = this.textValue;
		jsonAlert.titleValue = this.titleValue; 
		jsonAlert.callback = this.callback;
		jsonAlert.form = this.form;
		jsonAlert.autoDestroy = this.autoDestroy;
		jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
		jsonAlert.fromParent = 1;
		window.top.hrifAlertWarning(jsonAlert);
		return true;
	} else {
		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: this.textValue,
		  	icon: 'warning',
			position: 'top',
			timer: this.autoDestroyDelay,
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
	 			backdrop: 'swal2-alert swal2-hide'
	  		},
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK'),
			customClass :wrkCustomClass
		}).then((result) => {
			if ((typeof(this.form)=="object") && typeof(this.callback)!="undefined" && this.callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + this.form.formid + '").' + this.callback + '()');
		});	
	}	
}


/** Visualizzazione di un Alert (HRIF) - Tipo Info
* @class 
* @alias hrifAlertInfo
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [callbackAction] - Azione di callback.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlertInfo(FormatMsg("Messaggio di testo dell'alert"));
*
*/
function hrifAlertInfo(textValue, titleValue, callback, form, fromParent){

	if (typeof(textValue)=='object'){
		this.textValue = textValue.textValue;
		this.titleValue = textValue.titleValue;
		this.callback = textValue.callback;
		this.form = textValue.form;
		this.fromParent = textValue.fromParent;
		this.autoDestroy = textValue.autoDestroy;
		this.autoDestroyDelay;
		if (textValue.autoDestroy){
			this.autoDestroyDelay = (textValue.autoDestroyDelay && textValue.autoDestroyDelay<30000) ? textValue.autoDestroyDelay : 30000;
		}
	} else {
		this.textValue = textValue;
		this.titleValue = titleValue;
		this.callback = callback;
		this.form = form;
		this.fromParent = fromParent;
	}

	var FAlertTop = false;
	var wrkTitle = (this.titleValue) ? this.titleValue : FormatMsg("HRSYSTEM_INFORMATION"); 
	var wrkCustomClass = (this.textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';
	if (window.top && this.fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}

	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var jsonAlert = {};
		jsonAlert.textValue = this.textValue;
		jsonAlert.titleValue = this.titleValue; 
		jsonAlert.callback = this.callback;
		jsonAlert.form = this.form;
		jsonAlert.autoDestroy = this.autoDestroy;
		jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
		jsonAlert.fromParent = 1;
		window.top.hrifAlertInfo(jsonAlert);
		return true;

	} else {	

		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: this.textValue,
		  	icon: 'info',
			position: 'top',
			timer: this.autoDestroyDelay,
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
	 			backdrop: 'swal2-alert swal2-hide'
	  		},
			customClass :wrkCustomClass,
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK')
		}).then((result) => {
			if ((typeof(this.form)=="object") && typeof(this.callback)!="undefined" && this.callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + this.form.formid + '").' + this.callback + '()');
		});
	}	
}


function hrifAlertQuestion(textValue, titleValue, callback, form, fromParent){


	if (typeof(textValue)=='object'){
		this.textValue = textValue.textValue;
		this.titleValue = textValue.titleValue;
		this.callback = textValue.callback;
		this.form = textValue.form;
		this.fromParent = textValue.fromParent;
		this.autoDestroy = textValue.autoDestroy;
		this.autoDestroyDelay;
		if (textValue.autoDestroy){
			this.autoDestroyDelay = (textValue.autoDestroyDelay && textValue.autoDestroyDelay<30000) ? textValue.autoDestroyDelay : 30000;
		}
	} else {
		this.textValue = textValue;
		this.titleValue = titleValue;
		this.callback = callback;
		this.form = form;
		this.fromParent = fromParent;
	}

	var FAlertTop = false;
	var wrkTitle = (titleValue) ? titleValue : FormatMsg("HRSYSTEM_QUESTION");
	var wrkCustomClass = (textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';
	if (window.top && this.fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}	
// 	if (window.top && fromParent!=1){
// 		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
// 		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
// //		window.top.addEventListener("message", function(event) {
// //        	if(event.data == "openAlertQ"){
//             	window.top.hrifAlertQuestion(textValue, titleValue, callback, form, 1);
//             	return true;
//        	}
//    	});
//    	window.top.postMessage("openAlertQ", "*");

	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		var jsonAlert = {};
		jsonAlert.textValue = this.textValue;
		jsonAlert.titleValue = this.titleValue; 
		jsonAlert.callback = this.callback;
		jsonAlert.form = this.form;
		jsonAlert.autoDestroy = this.autoDestroy;
		jsonAlert.autoDestroyDelay = this.autoDestroyDelay;
		jsonAlert.fromParent = 1;
		window.top.hrifAlertWarning(jsonAlert);
		return true;
		
	} else {
	 
		var wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: textValue,
		  	icon: 'question',
			position: 'top',
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
	 			backdrop: 'swal2-alert swal2-hide'
	  		},
			customClass :wrkCustomClass,
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK')
		}).then((result) => {
			if ((typeof(form)=="object") && typeof(callback)!="undefined" && callback.trim()!="")
				eval('ZtVWeb.getPortletById("' + form.formid + '").' + callback + '()');
		});
	}	
}


/** Visualizzazione di un Confirm (HRIF) 
* @class 
* @alias hrifConfirm
* @memberOf SystemDialog
* @param {string} form - oggetto this.
* @param {json} jsonConfirm - Proprietà del Confirm.
* @param {string} [jsonConfirm.Title] - Titolo.
* @param {string} jsonConfirm.Text - Testo del messaggio.
* @param {string} jsonConfirm.ConfirmButtonText - Testo del bottone dell'azione positiva.
* @param {string} jsonConfirm.CancelButtonText - Testo del bottone dell'azione negativa.
* @param {string} jsonConfirm.ConfirmCallback - Azione di callback.
* @param {string} jsonConfirm.ConfirmCallbackParam - Parametri della callback.
* @param {string} [jsonConfirm.ValidatorCallback] - Azione di validazione campo input.
* @param {json} jsonConfirm.Input.Label - Label del campo di input.
* @param {number} jsonConfirm.Input.MaxLength - Valore massimo caratteri di input;
* @param {json} jsonConfirm.Input.Init - Valore iniziale.
* @param {boolean} jsonConfirm.Input.Obligatory = Campo obbligatori (true/false);
* @param {json} jsonConfirm.Input.CheckMessage  - Testo del messaggio per dato obbligatorio
* @returns {object} Oggetto Alert (Hrif).
*
* @example Esempio di Confirm con Titolo, Testo, bottoni di Conferma e Annulla
* 
* var jsonConfirm = {};
* jsonConfirm.Title = FormatMsg("Ma ti piace questo confirm?");
* jsonConfirm.Text = FormatMsg("Testo del confirm");
* jsonConfirm.ConfirmButtonText = FormatMsg("Conferma");
* jsonConfirm.CancelButtonText = FormatMsg("Annulla");
* jsonConfirm.ConfirmCallback = "confirmSaved";
*
* hrifConfirm(this, jsonConfirm);
*
* @example Esempio di Confirm con Titolo, Testo, bottoni di Conferma e Annulla, più la gestione di un campo di input
* 
* var jsonConfirm = {};
* jsonConfirm.Title = FormatMsg("Ma ti piace questo confirm?");
* jsonConfirm.ConfirmButtonText = FormatMsg("Conferma");
* jsonConfirm.CancelButtonText = FormatMsg("Annulla");
* jsonConfirm.ConfirmCallback = "confirmCheckSaved";
* jsonConfirm.Input = {};
* jsonConfirm.Input.Label = FormatMsg("Questa è la label del campo di input"),
* jsonConfirm.Input.MaxLength = 20;
* jsonConfirm.Input.Init = "valore iniziale";
* jsonConfirm.Input.Obligatory = true;
* jsonConfirm.Input.ValidatorCallback = "checkInput";
* jsonConfirm.Input.CheckMessage = FormatMsg("Manca compilazione per dato obbligatorio");
* 	
* hrifConfirm(this, jsonConfirm);
*
*/
function hrifConfirm(form, jsonConfirmParam, fromParent){
	
	var jsonConfirm = (typeof(jsonConfirmParam)=='string') ? JSON.parse(jsonConfirmParam) : jsonConfirmParam;
	var wrkCustomClass = (jsonConfirm.Title.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';

	var wrkShowDenyButton = false;
  	if (jsonConfirm.DenyButtonText){
  		wrkShowDenyButton = true;
  	}

  	var inputType = "";
  	var inputLabel = "";
  	var inputInit = "";
  	var inputPlaceholder = "";
  	var maxLength = null;
  	
	var FAlertTop = false;

  	if (jsonConfirm.Input){
	  	if (jsonConfirm.Input.Label){
			inputType = (typeof(jsonConfirm.Input.Type)=='undefined') ? 'text': jsonConfirm.Input.Type;
			inputLabel = jsonConfirm.Input.Label;
			if (jsonConfirm.Input.Type==hrifALERTINPUTTYPE.CHECKBOX){
				inputLabel = '';
				inputPlaceholder = jsonConfirm.Input.Label; 
			}
			
		}
		if (jsonConfirm.Input.Init){
			inputInit = jsonConfirm.Input.Init; 	
		}
		if (jsonConfirm.Input.MaxLength){
			maxLength = jsonConfirm.Input.MaxLength; 
		}
	}

	if (window.top && fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}

	// if (window.top && fromParent!=1){
	if (FAlertTop){		
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");		
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
//		window.top.addEventListener("message", function(event) {
//        	if(event.data == "openAlertC");{
            	window.top.hrifConfirm(form, jsonConfirmParam, 1);
            	return true;
//        	}
//    	});
//    	window.top.postMessage("openAlertC", "*");
    	
	} else {
		
		var wrkConfirm = Swal.fire({  
	  		title: jsonConfirm.Title,
		  	text: jsonConfirm.Text,
		  	input: inputType, 
			inputLabel: inputLabel,
  			inputValue: inputInit,
  			inputPlaceholder: inputPlaceholder,			  	
			icon: 'question',  
		  	showDenyButton : wrkShowDenyButton,  
			showCancelButton: true,  
		  	confirmButtonText: jsonConfirm.ConfirmButtonText,
		  	denyButtonText : jsonConfirm.DenyButtonText,  
			cancelButtonText: jsonConfirm.CancelButtonText,
		  	inputAttributes: {
		    	maxlength: maxLength
		  	},			
			  inputValidator: (value) => {
				if(jsonConfirm.ValidatorCallback) {
					 return ZtVWeb.getPortletById(form.formid)[jsonConfirm.ValidatorCallback](value)
				}
				if (typeof(jsonConfirm.Input.Obligatory)!='undefined' && jsonConfirm.Input.Obligatory){
				    if (!value) {
				      	return jsonConfirm.Input.CheckMessage;
				    }
				}
			},			
			customClass :wrkCustomClass,
	//  		showClass: {
	//    		popup: 'swal2-show swal2-confirm'
	//  		},
	//  		hideClass: {
	//    		popup: 'swal2-confirm swal2-hide',
	// 			backdrop: 'swal2-confirm swal2-hide'
	//  		},
			position: 'top',
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
	 			backdrop: 'swal2-alert swal2-hide'
	  		}	
		}).then((result) => {  
			/* Read more about isConfirmed, isDenied below */  
		    if (result.isConfirmed) {
				// window[form.formid][jsonConfirm.ConfirmCallback](result.value,jsonConfirm.ConfirmCallbackParam);
				ZtVWeb.getPortletById(form.formid)[jsonConfirm.ConfirmCallback](result.value,jsonConfirm.ConfirmCallbackParam)
		    } else if (result.isDenied) {
				if (jsonConfirm.DenyCallback)
					ZtVWeb.getPortletById(form.formid)[jsonConfirm.DenyCallback]();
		 	}
		});
		
	}	
	
}





/** Visualizzazione di un Alert (HRIF) - Tipo Info
* @class 
* @alias hrifAlertInfoWait
* @memberOf SystemDialog
* @param {string} textValue - Descrizione dell'alert.
* @param {string} [titleValue] - Titolo  dell'alert.
* @param {string} [callbackAction] - Azione di callback.
* @param {string} [form] - oggetto this..
* @returns {object} Oggetto Alert (Hrif).
*
* @example 
*
* hrifAlertInfoWait(FormatMsg("Messaggio di testo dell'alert"));
*
*/

function hrifAlertInfoWait(textValue, titleValue, icon, fromParent){
	var wrkTitle = (titleValue) ? titleValue : FormatMsg("HRSYSTEM_INFORMATION"); 
	var wrkCustomClass = (textValue.length>maxCharDescription) ? {htmlContainer : hrifCLASSBASE.LABEL + '-align-start' , title : hrifCLASSBASE.LABEL + '-align-start'} : '';
	this.wrkAlert = null;

	// Istanzio l'icona svg
	var jsonSvg = {};
	jsonSvg.Icon = icon;
	this.svg = new HrifIconRecolorable(this, jsonSvg);
	this.svg.addClass(hrifCLASSBASE.SVG + "--small");

	// Vado sul 'top' solo se non sono in modalità Mobile
	if ((window.top && !HRMIsActive()) && fromParent!=1){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
//		window.top.addEventListener("message", function(event) {
//        	if(event.data == "openAlertI"){
		
            	this.wrkAlert = window.top.hrifAlertInfoWait(textValue, titleValue, icon, 1);
            	return this.wrkAlert;
//        	}
//    	});
//    	window.top.postMessage("openAlertI", "*");
    	
	} else {
	
		this.wrkAlert = Swal.fire({
			title: wrkTitle,
		  	text: textValue,
		  	icon: 'info',
			position: 'top',
			showConfirmButton: false,
			allowOutsideClick: false,			
			heightAuto: false,
	  		showClass: {
	    		popup: 'swal2-show swal2-alert'
	  		},
	  		hideClass: {
	    		popup: 'swal2-alert swal2-hide',
	 			backdrop: 'swal2-alert swal2-hide'
	  		},
			customClass :wrkCustomClass,
		  	confirmButtonText: FormatMsg('HRSYSTEM_OK'),
//		  	html : '<div class="hrif2-spinner-loader"><span>ciao</span></div>',
		  	iconHtml : this.svg.getHtml(),
//		}).then((result) => {
//			return this.wrkAlert;
//			if ((typeof(form)=="object") && typeof(callback)!="undefined" && callback.trim()!="")
//				eval('ZtVWeb.getPortletById("' + form.formid + '").' + callback + '()');
		});
		return this.wrkAlert;
	}	
}


function hrifCheckVersionTop(){

	var result = false;
	window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_tools.js");
	if (hrifGetVersion() == window.top.hrifGetVersion()){
		result = true;
	}
	return result;
	
}



const hrifTOASTTYPE = {
	SUCCESS: "success",
	WARNING: "warning",
	DANGER: "error",
	INFO: "info",
	QUESTION: "question"
}

function hrifToast(titleValue, toastType, fromParent){
	var wrkTitle = (titleValue) ? titleValue : FormatMsg("HRSYSTEM_INFORMATION"); 
	this.wrkToast = null;
	let FAlertTop = null;

	if (window.top && fromParent!=1){
		FAlertTop = hrifCheckVersionTop();
	}	
	
	if (FAlertTop){
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_enum.js");
		window.top.LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/js/hrif2_systemdialog.js");
		
		window.top.hrifToast(titleValue, toastType, 1);
		return true;
	} else {
		this.wrkToast = Swal.fire({
			toast: true,
			position: "top",
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: false,  
			didOpen: (toast) => {
				toast.onmouseenter = Swal.stopTimer;
				toast.onmouseleave = Swal.resumeTimer;
			},
			icon: toastType,
			title: wrkTitle	
		});
		return this.wrkToast;
	}	
}
//# sourceURL=../../HRPORTAL/binframework/extjs/sweetalert2/dist/sweetalert2.min.js
