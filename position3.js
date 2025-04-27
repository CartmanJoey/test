if (typeof (ZtVWeb) != "undefined") {
//	if (typeof (jQuery) == "undefined") {
//&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ZtVWeb.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/jquery.js");
//&nbsp;&nbsp;&nbsp; }
	// to do
	ZtVWeb.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/binframework/libcomp/js/htmleditor/showdown.js");  // Per markdown
}

// LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/it_tools.js");
//LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hr_mobile.js");

//var jq = jQuery.noConflict();
var converter = new showdown.Converter();

//Inserimento delle traduzioni
if (typeof (LibJavascript) != 'undefined') {
	LibJavascript.RequireLibrary((typeof (SPWebRootURL) != 'undefined' ? SPWebRootURL + '/' : '../') + 'jsp/hrif.jsp', true);
} else {
	document.write('<' + "script src='" + (typeof (SPWebRootURL) != 'undefined' ? SPWebRootURL + '/' : '../') + "jsp/hrif.jsp'></" + 'script>');
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
* @file Funzionalità previste dalla libreria HRIF
* @author Ricerca & Sviluppo - Divisione HR
*/

const hiddenVisibility = "hidden-visibility";
const hiddenDisplay = "hidden-display";

//let hrifVer = "02.01.00";



const TYPEOBJ = {
	Header: "",
	Body: "",
	Footer: "",
	Left: "",
	Right: "",
	bodyobj: "",
	NavigationTitle: "detail",
	NavigationDrawerStruct: "detail",
	NavigationDrawerHeader: "detail",
	NavigationDrawer: "detail",

	SectionTitle: "detail",
	SectionSubTitle: "detail",
	Title: "detail",
	LabelCounter: "detail",
	Label: "detail",
	LabelZic: "detail",
	Icon: "detail",
	Zic: "detail",
	ListGroup: "detail",

	Source: "detail",
	ListLabel: "detail",
	Portlet: "portlet",
	ButtonListFooter: "detail"
};

// Definizione Variabili Globali
if (typeof (wrkNavigationiId) == 'undefined') var wrkNavigationiId = '';
if (typeof (NavigationDrawerObj) == 'undefined') var NavigationDrawerObj = [];
if (typeof (NavigationTitleCurrObj) == 'undefined') var NavigationTitleCurrObj = [];
if (typeof (PortletObjToAdd) == 'undefined') var PortletObjToAdd = [];
if (typeof (portletForm) == 'undefined') var portletForm = '';
//if (Eq(typeof(objNavigationOld),'undefined')) var objNavigationOld = "";

this.ArrayObj = new Map();


/** Esegue l'azione del portlet
* @ignore
* @param {string} portletName - Nome del portlet.
* @param {string} action - Azione da eseguire.
* @returns Esegue l'azione del portlet indicata.
*/
function execPortletAction(portletId, action, parm, stopPropagation, event) {

	if (typeof (parm) != 'undefined' && (typeof (parm) != 'object' && typeof (parm) != "undefined")) {

		if (typeof (parm) == 'string') {
			paralElement = parm.split(",");
			wrkParam = "";
			if (paralElement.length > 1){
				for (IdxParam = 0; IdxParam < paralElement.length; IdxParam++) {
					wrkParam += paralElement[IdxParam] + ",";
				}
				eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '(' + wrkParam + ');');
			} else {
				wrkParam = "";
				eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '("' + parm + '");');
			}
		} else if (typeof (parm) == 'number') {
			wrkParam = parm;
		}

		
	} else {
		if (action.substring(action.length - 1) == ')')
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + ';');
		else
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '();');
	}

	if (typeof (stopPropagation) != 'object' && stopPropagation)
		event.stopPropagation();
}

// /**
//  * esegue callBack su chiamante
//  * @param {string} action function da eseguire
//  * @param {string} parm parametri separati da virgola
//  * @param {boolean} stopPropagation boolean 
//  * @param {event} event evento
//  * @ignore
//  */
// function execCallBack(action, parm, stopPropagation, event) {
// 	// istanzio nuovo array parametri
// 	let arrayParametri = [];
// 	// se valorizzato parm riempio array facendo split con ,
// 	if (parm) {
// 		arrayParametri = parm.split(',').map(parametro => parametro.trim());
// 	}

// 	// chiamo la funcion sul portlet/chiamante con i parametri dinamici
// 	this[action](...arrayParametri);

// 	// gestione stopPropagation
// 	if (typeof (stopPropagation) != 'object' && stopPropagation)
// 		event.stopPropagation();
// }

/** Esegue l'azione del portlet
* @ignore
* @param {string} portletName - Nome del portlet.
* @param {string} action - Azione da eseguire.
* @returns Esegue l'azione del portlet indicata.
*/
function execPortletActionRetJson(portletId, action, parm, stopPropagation, event) {
	if (typeof (parm) != 'undefined')
		eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '(' + JSON.stringify(parm) + ');');
	else
		if (action.substring(action.length - 1) == ')')
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + ';');
		else
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '();');

	if (typeof (stopPropagation) != 'object' && stopPropagation)
		event.stopPropagation();
}

function execPortletActionCheck(portletId, action, parm, obj, stopPropagation, event) {

	if (typeof (parm) != 'undefined' && typeof (parm) != 'object')
		eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '(' + parm + ');');
	else
		if (action.substring(action.length - 1) == ')')
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + ';');
		else if (obj)
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '("' + obj.value + '",' + obj.getValue() + ');');
		else
			eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '();');

	if (typeof (stopPropagation) != 'object' && stopPropagation)
		event.stopPropagation();
}

//function createDocumentChild(tagHtml, IdNameInto, IdItem, IdName, className, html){
function createDocumentChild(tagHtml, IdNameInto, IdItem, IdName, className) {

	var node = document.createElement(tagHtml);
	if (IdItem != '' && IdName != '') {
		node.id = IdItem + '_' + IdName;
	} else if (IdName != '') {
		node.id = IdName;
	} else if (IdItem != '') {
		node.id = IdItem;
	}

	if (className != '' && typeof (className) != 'undefined')
		node.className = className;

	document.getElementById(IdNameInto).appendChild(node);

	return node;

}

function createDocumentElement(tagHtml, IdItem, IdName, className) {

	var node = document.createElement(tagHtml);
	if (IdItem != '' && IdName != '') {
		node.id = IdItem + '_' + IdName;
	} else if (IdName != '') {
		node.id = IdName;
	} else if (IdItem != '') {
		node.id = IdItem;
	}
	if (className != '') node.className = className;

	if (document.getElementById(node.id) == null)
		document.body.appendChild(node);

	return node;
}

function appendObjectIntoDocument(object, IdNameInto) {

	if (IdNameInto == '' || typeof (IdNameInto) == 'undefined')
		document.body.appendChild(object);
	else
		document.getElementById(IdNameInto).appendChild(object);

}

function appendHtmlIntoObject(object, html) {

	// if (IdNameInto=='' || typeof(IdNameInto)=='undefined')
	// document.body.appendChild(object);
	// else 
	// document.getElementById(IdNameInto).appendChild(object);

}



/** Aggiunge la classe all'elemento
* @ignore
* @param {object} object - Elemento.
* @param {string} classsName - Nome classe.
* @returns Aggiunte della classe per elemento passato.
*/
function hrifAddClass(object, className) {
	LibJavascript.CssClassNameUtils.addClass(object, className);
}
/** Rimuove la classe all'elemento
* @ignore
* @param {object} object - Elemento.
* @param {string} classsName - Nome classe.
* @returns Rimuove la classe all' elemento passato.
*/
function hrifRemoveClass(object, className) {
	if (LibJavascript.CssClassNameUtils.hasClass(object, className)) {
		LibJavascript.CssClassNameUtils.removeClass(object, className);
		// FraIva: se "class" rimane vuoto devo rimuovere l'attributo
	}
}
/** Controlla l'esistenza  della classe all'elemento
* @ignore
* @param {object} object - Elemento.
* @param {string} classsName - Nome classe.
* @returns {logic} True=Classe presente / False=Classe Non presente.
*/
function hrifHasClass(object, className) {
	return LibJavascript.CssClassNameUtils.hasClass(object, className);
}


//// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//// Button
//// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
///**
//* @namespace Button
//*/



/** Definizione oggetto Button
* @class
* @alias HrifButton
* @memberOf Button
* @param {object} form - this.
* @param {json} jsonButtonParm - Proprietà dell'oggetto
* @param {string} jsonButtonParm.Label - Descrizione della Label del Button.
* @param {hrifICON} [jsonButtonParm.Icon] - Icona del Button.
* @param {string} jsonButtonParm.Action - Azione da eseguire al click (callback).
* @param {string} [jsonButtonParm.ActionParam] - Parametri dell'azione.
* @param {hrifBUTTONTYPE} [jsonButtonParm.Type] - Tipologia.
* @param {hrifBUTTONLAYOUT} [jsonButtonParm.Layout] - Tipologia di layout.
* @param {string} [jsonButtonParm.Tooltip] - Valore del tooltip.
* @param {boolean} [jsonButtonParm.Disabled] - Bottone disabilitato.
* @returns {object} Oggetto Button.
*
* @example
*
* // Definisco le proprietà del bottone
* var jsonButton = {};
* jsonButton.Label = FormatMsg("Pulsante");
* jsonButton.Action = "execAction";
*
* // Istanzio l'oggetto button
* var button = new HrifButton(this, jsonButton);
* 
* // Carico il button in un contenitore
* this.hrifCnt.Load(button);
*
*/
this.HrifButton = function (form, jsonButtonParm) {

	var jsonButton = (typeof (jsonButtonParm) == 'string') ? JSON.parse(jsonButtonParm) : jsonButtonParm;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonButton.IdItem);
	this.label = jsonButton.Label;
	this.icon = jsonButton.Icon;
	this.action = jsonButton.Action;
	this.actionParam = jsonButton.ActionParam;
	this.type = jsonButton.Type;
	this.effect = jsonButton.Effect;
	this.layout = jsonButton.Layout;
	this.tooltip = jsonButton.Tooltip;
	this.disabled = jsonButton.Disabled;


	this.typeObj = "pattern";
	this.objectName = "button";
	this.stringHtml = "";

	this.portletId = this.form.formid;
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.BUTTON;
	this.classNameButtonLoading = this.classNameBase + "--loading";

	this.actionOld = "";

	var wrkButton = document.createElement('button');
	wrkButton.id = this.idItem;
	wrkButton.className = this.classNameBase;

	//	if (typeof(this.label)=='undefined' || this.label==""){
	//		this.label = 'undefined';
	//		hrifConsole("[HRIF] HrifButtonObj: Label non valorizzata",'warn');
	//	}
	this.iconObj = null;
	
	this.docTextFrag = document.createDocumentFragment();
	if (this.icon) {
		var jsonIconParam = {};
		jsonIconParam.Icon = this.icon;
		this.iconObj = new HrifIcon(this.form, jsonIconParam);
		this.iconObj.addClass(this.classNameBase + "__icon");
		wrkButton.appendChild(this.iconObj.getObject());
		wrkButton.className = wrkButton.className + " " + this.classNameBase + "--icon";
	}
	if (typeof (this.label) != 'undefined' && this.label != "") {
		documentFrag(this.docTextFrag, 'div', this.idItem + '_t', '', hrifCLASSBASE.BUTTON + '__message');
		this.docTextFrag.childNodes[0].innerText = this.label;
	}
	wrkButton.appendChild(this.docTextFrag);
	if (jsonButton.Tooltip) wrkButton.setAttribute('title', jsonButton.Tooltip);

	this.wrkObj = wrkButton;

	/** Valorizza il Tooltip del Button
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Button.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};
	if (this.tooltip)
		this.setTooltip(this.tooltip);

	/** Valorizza il testo della Label del Button
	* @param {string} label - Testo della Label.
	* @returns {null} Valorizza il testo della Label del Button.
	*/
	this.Value = function (label) {
		// In questo caso vado sull'elemento figlio del button (la label)
		// this.wrkObj.children[0].innerHTML = label;
		this.wrkObj.children[0].innerHTML = ToHTag(label, "xssPrevent");
	};
	
	this.setIcon = function(icon){
		this.iconObj.Value(icon);	
	}

	/** Valorizza l'azione del Button
	* @ignore
	* @param {string} action - Azione da eseguire al click.
	* @returns {null} Valorizza l'azione del Button.
	*/
	this.setAction = function (action, param) {
		this.action = action;
		this.actionParam = param;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action, this.actionParam);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkObj.addEventListener) {
				this.wrkObj.addEventListener("click", this.wrkAction, false);
				this.wrkObj.addEventListener("keypress", this.wrkAction, false);
			} else if (this.wrkObj.attachEvent) {
				this.wrkObj.attachEvent("click", this.wrkAction);
				this.wrkObj.attachEvent("keypress", this.wrkAction);
			}
		}

		this.actionOld = this.action;
	};
	this.setAction(this.action, this.actionParam);

	/** Abilita 'effetto' caricamento al Click
	* @param {boolean} loadValue - true/false
	* @returns {null} Disabilita il button.
	*/
	this.Loading = function (loadValue) {
		if (loadValue)
			hrifAddClass(this.wrkObj, this.classNameButtonLoading);
		else
			hrifRemoveClass(this.wrkObj, this.classNameButtonLoading);
	};

	/** Disabilita il button
	* @returns {null} Disabilita il button.
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};
	if (this.disabled)
		this.Disabled();

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};

	/** Nasconde il Button
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde il Button.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza il Button
	* @returns {null} Visualizza il Button.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	//	/** Setta la dimensione del Button
	//	* @param {hrifSIZE} size - Dimensione dell'oggetto.
	//	* @returns {null} Visualizza il Button ridimensionato.
	//	*/
	//	this.setSize = function(size){
	//		if (size==hrifSIZE.XSMALL || size==hrifSIZE.XLARGE) hrifConsole("[HRIF] HrifButtonObj.setSize: non previste le dimensioni impostate (XSMALL/XLARGE)",'warn');
	//		this.classSize= this.classNameBase + "--" + size;
	//		this.wrkObj.classList.remove("hrif-button--small","hrif-button--medium","hrif-button--large");
	//		hrifAddClass(this.wrkObj, this.classSize);
	//	}


	/** Setta il colore del Button
	* @ignore
	* @param {hrifBUTTONTYPE} status - Tipo dell'oggetto.
	* @returns {null} Setta la tipologia del Button.
	*/
	this.setType = function (type) {
		this.wrkObj.classList.remove(this.classNameBase + "--primary", this.classNameBase + "--success", this.classNameBase + "--danger", this.classNameBase + "--warning", this.classNameBase + "--info");
		if (type) {
			var wrkClassName = this.classNameBase + "--" + type.class;
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, wrkClassName);
		}
	};
	if (this.type)
		this.setType(this.type);

	/** Definizione tipologia del Button
	* @ignore
	* @param {hrifBUTTONLAYOUT} type - Tipologia di layout del Button.
	* @returns {null} Visualizza il bottone del tipo settato.
	*/
	this.setLayout = function (layoutType) {
		this.wrkObj.classList.remove(this.classNameBase + "--flat", this.classNameBase + "--contained", this.classNameBase + "--outlined");
		if (layoutType) {
			var wrkClassName = this.classNameBase + "--" + layoutType.class;
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, wrkClassName);
		}
	};
	if (this.layout)
		this.setLayout(this.layout);

	this.setEffect = function (typeEffect){
		// Solo se impostata anche un'icona
		if (this.icon){
			if (typeEffect){
				hrifAddClass(this.wrkObj, this.classNameBase + "--" + typeEffect.class);
			}
		}
	}
	if (this.effect)
		this.setEffect(this.effect);

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkObj.classList.remove(className);
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};


	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		//		return this.wrkObj.outerHTML;
		return hrifGetHtmlAction(this.form.formid, this.wrkObj, this.action, this.actionParam);
	};

	/** Caricamento dell'oggetto
	* @ignore 
	*/
	this.Load = function (IdNameInto) {

		appendObjectIntoDocument(this.wrkObj, IdNameInto);
		this.isLoaded = true;
	};

};


/** Definizione oggetto Button Icon
* @class
* @alias HrifButtonIcon
* @memberOf Button
* @param {object} form - this.
* @param {json} jsonButtonIconParm - Proprietà dell'oggetto
* @param {hrifICON} jsonButtonIconParm.Icon - Icona del Button.
* @param {string} [jsonButtonIconParm.Action] - Azione da eseguire al click (callback).
* @param {hrifBUTTONTYPE} [jsonButtonIconParm.Type] - Tipologia.
* @param {hrifBUTTONLAYOUT} [jsonButtonIconParm.Layout] - Tipologia di layout.
* @param {string} [jsonButtonIconParm.Tooltip] - Valore del tooltip.
* @param {boolean} [jsonButtonIconParm.Disabled] - Bottone disabilitato.
* @returns {object} Oggetto Button.
*
* @example
*
* // Definisco le proprietà del bottone
* var jsonButtonIcon = {};
* jsonButtonIcon.Icon = hrifICON.CALENDAR;
* jsonButtonIcon.Action = "execAction";
*
* // Istanzio l'oggetto button
* var buttonIcon = new HrifButtonIcon(this, jsonButtonIcon);
* 
* // Carico il button in un contenitore
* this.hrifCnt.Load(buttonIcon);
*
*/
this.HrifButtonIcon = function (form, jsonButtonIconParm) {

	var jsonButtonIcon = (typeof (jsonButtonIconParm) == 'string') ? JSON.parse(jsonButtonIconParm) : jsonButtonIconParm;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonButtonIcon.IdItem);
	this.icon = jsonButtonIcon.Icon;
	this.action = jsonButtonIcon.Action;
	this.actionParam = jsonButtonIcon.ActionParam;
	this.type = jsonButtonIcon.Type;
	this.layout = jsonButtonIcon.Layout;
	this.tooltip = jsonButtonIcon.Tooltip;
	this.disabled = jsonButtonIcon.Disabled;

	this.typeObj = "pattern";
	this.objectName = "button";
	this.stringHtml = "";

	this.portletId = this.form.formid;
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.BUTTONICON;
	this.classNameButtonLoading = this.classNameBase + "--loading";

	this.actionOld = "";

	var wrkButton = document.createElement('button');
	wrkButton.id = this.idItem;
	wrkButton.className = this.classNameBase;

	this.docTextFrag = document.createDocumentFragment();
	if (this.icon) {
		var jsonIconParam = {};
		jsonIconParam.Icon = this.icon;
		var icon = new HrifIcon(this.form, jsonIconParam);
		icon.addClass(this.classNameBase + "__icon");
		wrkButton.appendChild(icon.getObject());
	}

	wrkButton.appendChild(this.docTextFrag);
	if (jsonButtonIcon.Tooltip) wrkButton.setAttribute('title', jsonButtonIcon.Tooltip);

	this.wrkObj = wrkButton;

	/** Valorizza il Tooltip del Button
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Button.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};
	if (this.tooltip)
		this.setTooltip(this.tooltip);

	/** Valorizza l'azione del Button
	* @ignore
	* @param {string} action - Azione da eseguire al click.
	* @returns {null} Valorizza l'azione del Button.
	*/
	this.setAction = function (action) {
		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action, this.actionParam);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkObj.addEventListener) {
				this.wrkObj.addEventListener("click", this.wrkAction, false);
				this.wrkObj.addEventListener("keypress", this.wrkAction, false);
			} else if (this.wrkObj.attachEvent) {
				this.wrkObj.attachEvent("click", this.wrkAction);
				this.wrkObj.attachEvent("keypress", this.wrkAction);
			}
		}

		this.actionOld = this.action;
	};
	this.setAction(this.action);

	/** Abilita 'effetto' caricamento al Click
	* @param {boolean} loadValue - true/false
	* @returns {null} Disabilita il button.
	*/
	this.Loading = function (loadValue) {
		if (loadValue)
			hrifAddClass(this.wrkObj, this.classNameButtonLoading);
		else
			hrifRemoveClass(this.wrkObj, this.classNameButtonLoading);
	};

	/** Disabilita il button
	* @returns {null} Disabilita il button.
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};
	if (this.disabled)
		this.Disabled();

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};

	/** Nasconde il Button
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde il Button.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza il Button
	* @returns {null} Visualizza il Button.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};


	/** Setta il colore del Button
	* @ignore
	* @param {hrifBUTTONTYPE} status - Tipo dell'oggetto.
	* @returns {null} Setta la tipologia del Button.
	*/
	this.setType = function (type) {
		this.wrkObj.classList.remove(this.classNameBase + "--primary", this.classNameBase + "--success", this.classNameBase + "--danger", this.classNameBase + "--warning", this.classNameBase + "--info");
		if (type) {
			var wrkClassName = this.classNameBase + "--" + type.class;
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, wrkClassName);
		}
	};
	if (this.type)
		this.setType(this.type);

	/** Definizione tipologia del Button
	* @ignore
	* @param {hrifBUTTONLAYOUT} type - Tipologia di layout del Button.
	* @returns {null} Visualizza il bottone del tipo settato.
	*/
	this.setLayout = function (layoutType) {
		this.wrkObj.classList.remove(this.classNameBase + "--flat", this.classNameBase + "--contained", this.classNameBase + "--outlined");
		if (layoutType) {
			var wrkClassName = this.classNameBase + "--" + layoutType.class;
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, wrkClassName);
		}
	};
	if (this.layout)
		this.setLayout(this.layout);

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkObj.classList.remove(className);
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};


	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		//		return this.wrkObj.outerHTML;
		return hrifGetHtmlAction(this.form.formid, this.wrkObj, this.action, this.actionParam);
	};

	/** Caricamento dell'oggetto
	* @ignore 
	*/
	this.Load = function (IdNameInto) {

		appendObjectIntoDocument(this.wrkObj, IdNameInto);
		this.isLoaded = true;
	};

};

/** Definizione oggetto Button Group
* @class
* @alias HrifButtonGroup
* @memberOf Button
* @param {object} form - this.
* @param {json} jsonButtonGroupParm - Proprietà dell'oggetto button
* @param {hrifBUTTONGROUPTYPE} jsonButtonGroupParm.Type - Tipologia dell'oggetto
* @param {hrifORIENTATION} jsonButtonGroupParm.Orientation - Orientamento dell'oggetto
* @param {json[]} jsonButtonGroupParm.Buttons - Array di Buttons (jsonButtonIconParm) - Accedi alle proprietà del Button -> {@link HrifButtonIcon}
* @param {string} jsonButtonGroupParm.Buttons.Label - Descrizione della Label del Button.
* @param {hrifICON} [jsonButtonGroupParm.Buttons.Icon] - Icona del Button.
* @param {string} jsonButtonGroupParm.Buttons.Action - Azione da eseguire al click (callback).
* @param {hrifBUTTONTYPE} [jsonButtonGroupParm.Buttons.Type] - Tipologia.
* @param {hrifBUTTONLAYOUT} [jsonButtonGroupParm.Buttons.Layout] - Tipologia di layout.
* @param {string} [jsonButtonGroupParm.Buttons.Tooltip] - Valore del tooltip.
* @param {boolean} [jsonButtonGroupParm.Buttons.Disabled] - Bottone disabilitato.
* @returns {object} Oggetto Button Group.
*
* @example
*
* var jsonButtonGroupParm = {};
* jsonButtonGroupParm.Buttons = [];
*
* var jsonButton1 = {};
* jsonButton1.Label = FormatMsg('Button 1');
* jsonButton1.Action = "execBottone1";
* jsonButtonGroupParm.Buttons.push(jsonButton1);
*
* var jsonButton2 = {};
* jsonButton2.Label = FormatMsg('Button 2');
* jsonButton2.Action = "execBottone2";
* jsonButtonGroupParm.Buttons.push(jsonButton2);
*
* var jsonButton3 = {};
* jsonButton3.Label = FormatMsg('Button 3');
* jsonButton3.Action = "execBottone3";
* jsonButtonGroupParm.Buttons.push(jsonButton3);
*
* var buttonGroup = new HrifButtonGroup(this, jsonButtonGroupParm);
* this.hrif_cntButton.Load(buttonGroup);
* 
*/
this.HrifButtonGroup = function (form, jsonButtonGroupParm) {

	var jsonButtonGroup = (typeof (jsonButtonGroupParm) == 'string') ? JSON.parse(jsonButtonGroupParm) : jsonButtonGroupParm;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonButtonGroup.IdItem);
	this.type = (typeof (jsonButtonGroup.Type) == "undefined") ? hrifBUTTONGROUPTYPE.NORMAL : jsonButtonGroup.Type;
	this.effect = (jsonButtonGroup.Effect) ? jsonButtonGroup.Effect : null;
	this.orientation = (typeof (jsonButtonGroup.Orientation) == "undefined") ? hrifORIENTATION.HORIZONTAL_WRAP : jsonButtonGroup.Orientation;
	this.buttonsParam = jsonButtonGroup.Buttons;
	this.maxButton = jsonButtonGroup.MaxButton; 		// se si cambia il nome ricordarsi di allineare anche le card
	this.isCardFooter = jsonButtonGroup.IsCardFooter; 	// se si cambia il nome ricordarsi di allineare anche le card

	this.typeObj = "pattern";
	this.objectName = "ButtonGroup";
	this.stringHtml = "";
	this.stringButtonHtml = "";

	this.isLoaded = false;
	this.maxButtonDefaul = 3;
	//	this.maxButtonShowCalc = (this.buttons.length < this.maxButtonDefaul) ? this.buttons.length: this.maxButtonShow;
	if (this.maxButton) {
		if (this.maxButton < this.buttonsParam.length)
			hrifConsole("[HRIF] HrifButtonGroup: inseriti solo i primi " + this.maxButton + " bottoni dei " + this.buttonsParam.length + " previsti", 'warn');
		this.maxButtonShowCalc = (this.buttonsParam.length < this.maxButton) ? this.buttonsParam.length : this.maxButton;
	} else {
		this.maxButtonShowCalc = this.buttonsParam.length;
	}

	this.classNameBase = hrifCLASSBASE.BUTTONGROUP;

	// Array dei button dell'oggetto
	this.buttons = [];

	var orientationClass = (typeof (this.orientation) != 'undefined') ? " " + this.classNameBase + this.orientation.class : "";
	// Creo il documento in memoria
	this.docButtonFrag = document.createDocumentFragment();
	documentFrag(this.docButtonFrag, 'div', this.idItem, '', this.classNameBase + orientationClass);
	this.stringHtml = this.docButtonFrag.children[0].outerHTML;

	var buttonOk = true;
	// Ciclo su i button configurati
	//	for (IdxBtn=0; IdxBtn < this.buttons.length; IdxBtn++){
	for (IdxBtn = 0; IdxBtn < this.maxButtonShowCalc; IdxBtn++) {
		buttonOk = true;
		switch (this.type) {
			case hrifBUTTONGROUPTYPE.BOOLEAN:
				if (IdxBtn == 0) {
					this.buttonsParam[IdxBtn].Icon = hrifICON.APPROVE;
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.SUCCESS;
				} else if (IdxBtn == 1) {
					this.buttonsParam[IdxBtn].Icon = hrifICON.DISAPPROVE;
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.DANGER;
				} else {
					buttonOk = false;
				}
				break;
			case hrifBUTTONGROUPTYPE.PRIMARY:
				if (IdxBtn == 0) {
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.EVIDENCE;
				} else {
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				}
				break;
			case hrifBUTTONGROUPTYPE.DANGER_OPE:
				if (IdxBtn == this.buttonsParam.length - 1) {
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.DANGER;
				} else {
					this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				}
				break;
			case hrifBUTTONGROUPTYPE.NORMAL:
				this.buttonsParam[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				break;
		}
		if (this.isCardFooter)
			this.buttonsParam[IdxBtn].Layout = hrifBUTTONLAYOUT.FLAT;
		if (this.effect)
			this.buttonsParam[IdxBtn].Effect = this.effect;
		if (buttonOk) {
			this.buttons[IdxBtn] = new HrifButton(this.form, this.buttonsParam[IdxBtn]);
			// var button = new HrifButton(this.form, this.buttonsParam[IdxBtn]);
			this.docButtonFrag.getElementById(this.idItem).appendChild(this.buttons[IdxBtn].getObject());
			this.stringButtonHtml += this.buttons[IdxBtn].getHtml();
		}
	}

	this.wrkDocFrag = this.docButtonFrag.children[0];

	/** Disabilita il button
	* @returns {null} Disabilita il button.
	*/
	this.Disabled = function () {
		document.getElementById(this.idItem).setAttribute("disabled", "true");
		//		this.wrkObj.setAttribute("disabled","true");
	};

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function () {
		document.getElementById(this.idItem).removeAttribute("disabled");
	};


	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		var htmlAction = this.stringHtml.replace('</div>', this.stringButtonHtml + "</div>");
		return htmlAction;
		//		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {

		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


/** Definizione oggetto Button Icon Group
* @class
* @alias HrifButtonIconGroup
* @memberOf Button
* @param {object} form - this.
* @param {json} jsonButtonIconGroupParm - Proprietà dell'oggetto button
* @param {hrifBUTTONGROUPTYPE} jsonButtonIconGroupParm.Type - Tipologia dell'oggetto
* @param {hrifORIENTATION} jsonButtonIconGroupParm.Orientation - Orientamento dell'oggetto
* @param {json[]} jsonButtonIconGroupParm.Icons - Array di Buttons
* @param {hrifICON} jsonButtonIconGroupParm.Icons.Icon - Icona del Button.
* @param {string} jsonButtonIconGroupParm.Icons.Action - Azione da eseguire al click (callback).
* @param {hrifBUTTONTYPE} [jsonButtonIconGroupParm.Icons.Type] - Tipologia.
* @param {hrifBUTTONLAYOUT} [jsonButtonIconGroupParm.Icons.Layout] - Tipologia di layout.
* @param {string} jsonButtonIconGroupParm.Icons.Tooltip - Valore del tooltip.
* @param {boolean} [jsonButtonIconGroupParm.Icons.Disabled] - Bottone disabilitato.
* @returns {object} Oggetto Button Icon Group.
*
* @example
*
* var jsonButtonIconGroupParm = {};
* jsonButtonIconGroupParm.Buttons = [];
*
* var jsonIcon1 = {};
* jsonButtonIconGroupParm.Icons = [];
* jsonIcon1.Icon = hrifICON.SAVE;
* jsonIcon1.Action = "execIcon1";
* jsonIcon1.Tooltip = FormatMsg("Salva");
* jsonButtonIconGroupParm.Icons.push(jsonIcon1);
*
* var jsonIcon2 = {};
* jsonIcon2.Icon = hrifICON.EDIT;
* jsonIcon2.Action = "execIcon2";
* jsonIcon2.Tooltip = FormatMsg("Modifica");
* jsonButtonIconGroupParm.Icons.push(jsonIcon2);
*
* var jsonIcon3 = {};
* jsonIcon3.Icon = hrifICON.DELETE;
* jsonIcon3.Action = "execIcon3";
* jsonIcon3.Tooltip = FormatMsg("Cancella");
* jsonButtonIconGroupParm.Icons.push(jsonIcon3);
*
* var buttonIconGroup = new HrifButtonIconGroup(this, jsonButtonIconGroupParm);
* this.hrif_cntButton.Load(buttonIconGroup);
* 
*/
this.HrifButtonIconGroup = function (form, jsonButtonIconGroupParm) {

	var jsonButtonIconParm = (typeof (jsonButtonIconGroupParm) == 'string') ? JSON.parse(jsonButtonIconGroupParm) : jsonButtonIconGroupParm;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonButtonIconParm.IdItem);
	this.type = (typeof (jsonButtonIconParm.Type) == "undefined") ? hrifBUTTONGROUPTYPE.NORMAL : jsonButtonIconParm.Type;
	this.orientation = (typeof (jsonButtonIconParm.Orientation) == "undefined") ? hrifORIENTATION.HORIZONTAL_WRAP : jsonButtonIconParm.Orientation;
	this.icons = jsonButtonIconParm.Icons;
	this.maxButton = jsonButtonIconParm.MaxButton; // se si cambia il nome ricordarsi di allineare anche le card

	this.typeObj = "pattern";
	this.objectName = "ButtonGroup";
	this.stringHtml = "";
	this.stringButtonHtml = "";

	this.isLoaded = false;
	this.maxButtonDefaul = 3;
	//	this.maxiconshowCalc = (this.icons.length < this.maxButtonDefaul) ? this.icons.length: this.maxiconshow;
	if (this.maxButton) {
		if (this.maxButton < this.icons.length)
			hrifConsole("[HRIF] HrifButtonGroup: inseriti solo i primi " + this.maxButton + " bottoni dei " + this.icons.length + " previsti", 'warn');
		this.maxButtonShowCalc = (this.icons.length < this.maxButton) ? this.icons.length : this.maxButton;
	} else {
		this.maxButtonShowCalc = this.icons.length;
	}

	this.classNameBase = hrifCLASSBASE.BUTTONICONGROUP;

	// Array dei bottoni
	this.buttons = [];

	var orientationClass = (typeof (this.orientation) != 'undefined') ? " " + this.classNameBase + this.orientation.class : "";
	// Creo il documento in memoria
	this.docButtonFrag = document.createDocumentFragment();
	documentFrag(this.docButtonFrag, 'div', this.idItem, '', this.classNameBase + orientationClass);
	this.stringHtml = this.docButtonFrag.children[0].outerHTML;

	var buttonOk = true;
	// Ciclo su i button configurati
	//	for (IdxBtn=0; IdxBtn < this.buttons.length; IdxBtn++){
	for (IdxBtn = 0; IdxBtn < this.maxButtonShowCalc; IdxBtn++) {

		buttonOk = true;
		switch (this.type) {
			case hrifBUTTONGROUPTYPE.BOOLEAN:
				if (IdxBtn == 0) {
					this.icons[IdxBtn].Icon = hrifICON.APPROVE;
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.SUCCESS;
				} else if (IdxBtn == 1) {
					this.icons[IdxBtn].Icon = hrifICON.DISAPPROVE;
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.DANGER;
				} else {
					buttonOk = false;
				}
				break;
			case hrifBUTTONGROUPTYPE.PRIMARY:
				if (IdxBtn == 0) {
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.EVIDENCE;
				} else {
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				}
				break;
			case hrifBUTTONGROUPTYPE.DANGER_OPE:
				if (IdxBtn == this.icons.length - 1) {
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.DANGER;
				} else {
					this.icons[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				}
				break;
			case hrifBUTTONGROUPTYPE.NORMAL:
				this.icons[IdxBtn].Type = hrifBUTTONTYPE.NORMAL;
				break;
		}
		if (buttonOk) {
			// var buttonIcon = new HrifButtonIcon(this.form, this.icons[IdxBtn]);
			this.buttons[IdxBtn] = new HrifButtonIcon(this.form, this.icons[IdxBtn]);
			this.docButtonFrag.getElementById(this.idItem).appendChild(this.buttons[IdxBtn].getObject());
			this.stringButtonHtml += this.buttons[IdxBtn].getHtml();
		}
	}

	this.wrkDocFrag = this.docButtonFrag.children[0];


	/** Disabilita il button
	* @returns {null} Disabilita il button.
	*/
	this.Disabled = function (idItem) {
		document.getElementById(this.form.formid + "_" + idItem).setAttribute("disabled", "true");
		//		this.wrkObj.setAttribute("disabled","true");
	};

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function (idItem) {
		document.getElementById(this.form.formid + "_" + idItem).removeAttribute("disabled");
	};


	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		var htmlAction = this.stringHtml.replace('</div>', this.stringButtonHtml + "</div>");
		return htmlAction;
		//		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {

		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


/** Definizione oggetto HrifFooterAction
* @class
* @alias HrifFooterAction
* @memberOf Button
* @param {object} form - this.
* @param {json} jsonFooterActionParm - Proprietà&nbsp; dell'oggetto button
* @param {json[]} jsonFooterActionParm.Buttons - Array di Buttons (jsonButtonIconParm) - Accedi alle proprieta del Button -> {@link HrifButtonIcon}
* @param {string} jsonFooterActionParm.Buttons.Label - Descrizione della Label del Button.
* @param {hrifICON} [jsonFooterActionParm.Buttons.Icon] - Icona del Button.
* @param {string} jsonFooterActionParm.Buttons.Action - Azione da eseguire al click (callback).
* @param {string} [jsonFooterActionParm.Buttons.ActionParam] - Parametri dell'azione.
* @param {string} [jsonFooterActionParm.Buttons.Tooltip] - Valore del tooltip.
* @param {boolean} [jsonFooterActionParm.Buttons.Disabled] - Bottone disabilitato.
* @returns {object} Oggetto FooterAction.
*
* @example
*
* // Definizione delle proprietà del Footer Action
* var jsonFooterActionParm = {};
* jsonFooterActionParm.Buttons = [];
* 
* var jsonButton1 = {};
* jsonButton1.Icon = hrifICON.CART;
* jsonButton1.Label = FormatMsg('Prenota');
* jsonButton1.Action = "execPrenota";
* jsonFooterActionParm.Buttons.push(jsonButton1);
* 
* var jsonButton2 = {};
* jsonButton2.Evidence = true;
* jsonButton2.Icon = hrifICON.QR_CODE;
* jsonButton2.Label = FormatMsg('QR Code');
* jsonButton2.Action = "execQRCode";
* jsonFooterActionParm.Buttons.push(jsonButton2);
* 
* var jsonButton3 = {};
* jsonButton3.Icon = hrifICON.GLOBE;
* jsonButton3.Label = FormatMsg('Planimetria');
* jsonButton3.Action = "execPlan";
* jsonFooterActionParm.Buttons.push(jsonButton3);
*
* // Istanzio l'oggetto 
* var footerAction = new HrifFooterAction(this, jsonFooterActionParm);
* this.hrif_CntFooterAction.Load(footerAction);
* 
*/
this.HrifFooterAction = function (form, jsonFooterActionParm) {

	var jsonFooterAction = (typeof (jsonFooterActionParm) == 'string') ? JSON.parse(jsonFooterActionParm) : jsonFooterActionParm;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonFooterAction.IdItem);
	this.type = (typeof (jsonFooterAction.Type) == "undefined") ? hrifBUTTONGROUPTYPE.NORMAL : jsonButtonGroup.Type;
	this.buttons = jsonFooterAction.Buttons;
	//	this.container = jsonFooterAction.Container; 	
	this.maxButton = jsonFooterAction.MaxButton; 		// se si cambia il nome ricordarsi di allineare anche le card
	this.isCardFooter = jsonFooterAction.IsCardFooter; 	// se si cambia il nome ricordarsi di allineare anche le card

	this.typeObj = "pattern";
	this.objectName = "HrifFooterAction";
	this.stringHtml = "";
	this.stringButtonHtml = "";

	this.idItemFooterAction = this.idItem + "_fa";

	this.classNameBase = hrifCLASSBASE.FOOTER_ACTION;

	this.isLoaded = false;
	this.maxButtonDefaul = 5;

	if (this.maxButton) {
		if (this.maxButton < this.buttons.length)
			hrifConsole("[HRIF] HrifFooteAction: inseriti solo i primi " + this.maxButton + " bottoni dei " + this.buttons.length + " previsti", 'warn');
		this.maxButtonShowCalc = (this.buttons.length < this.maxButton) ? this.buttons.length : this.maxButton;
	} else {
		this.maxButtonShowCalc = this.buttons.length;
	}

	this.docFragFooterAction = document.createDocumentFragment();
	documentFrag(this.docFragFooterAction, 'div', this.idItemFooterAction, '', this.classNameBase);

	var orientationClass = (typeof (this.orientation) != 'undefined') ? " " + this.classNameBase + this.orientation.class : "";
	// Creo il documento in memoria
	this.docButtonFrag = document.createDocumentFragment();
	documentFrag(this.docButtonFrag, 'div', this.idItem, '', hrifCLASSBASE.CONTAINER + orientationClass);
	this.stringHtml = this.docButtonFrag.children[0].outerHTML;

	let firstEvidence = false;
	// Ciclo su i button configurati
	for (IdxBtn = 0; IdxBtn < this.maxButtonShowCalc; IdxBtn++) {
		if (this.buttons[IdxBtn].Evidence && (this.buttons.length % 2 != 0 || (this.buttons.length==2) && !firstEvidence) || (this.buttons.length==1)) {
			this.buttons[IdxBtn].Type = hrifBUTTONTYPE.EVIDENCE;
			firstEvidence = true;
		}

		var button = new HrifButton(this.form, this.buttons[IdxBtn]);
		this.docButtonFrag.getElementById(this.idItem).appendChild(button.getObject());
		this.stringButtonHtml += button.getHtml();
	}

	this.docFragFooterAction.getElementById(this.idItemFooterAction).appendChild(this.docButtonFrag);

	this.wrkDocFrag = this.docFragFooterAction.children[0];

	/** Disabilita il button
	* @returns {null} Disabilita il button.
	*/
	this.Disabled = function (idItem) {
		document.getElementById(this.form.formid + "_" + idItem).setAttribute("disabled", "true");
		//		this.wrkObj.setAttribute("disabled","true");
	};

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function (idItem) {
		document.getElementById(this.form.formid + "_" + idItem).removeAttribute("disabled");
	};


	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		var htmlAction = this.stringHtml.replace('</div>', this.stringButtonHtml + "</div>");
		return htmlAction;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Label
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// /**
// * @module Label
// */

/** Area parametri per la gestione degli stili di una Label HighLightBox
* @ignore
* @class
* @param {json|object} jsonHighLightBoxStyle
* @param {string} jsonHighLightBoxStyle.Size - Dimensionamento label (valori: "fixed" , "autowidth")
* @param {string} jsonHighLightBoxStyle.Color - Colore (Primary=blue, Secondary=grey, Success=green, Danger=red, Warning=yellow, Light=, Dark=black)
* @param {string} jsonHighLightBoxStyle.Type - Outlined
*/
var jsonHighLightBoxStyle = {
	Size: "",
	Color: "",
	Type: ""
};

/** Tipi di colore
* @param {json|object} hrifCOLOR
* @param {string} hrifCOLOR.PRIMARY - Primary (colore del tema grafico)
* @param {string} hrifCOLOR.SUCCESS - Green
* @param {string} hrifCOLOR.DANGER - Red
* @param {string} hrifCOLOR.WARNING - Yellow
* @param {string} hrifCOLOR.INFO - Blue
*/
const hrifCOLOR = {
	PRIMARY: "primary",
	SUCCESS: "green",
	DANGER: "red",
	WARNING: "yellow",
	INFO: "blue"
};

/** Costanti per la definizione dei margini
* @enum
* @type {string}
*
*/
const hrifMARGIN = {
	MARGINS: "margins",
	LEFT: "margin-left",
	RIGHT: "margin-right",
	TOP: "margin-top",
	BOTTOM: "margin-bottom"
};

/** Visualizza solo su WEB/MOBILE.
* @enum
* @type {string}
*/
const hrifVIEWMODE = {
	/** Abilita visualizzazione solo per MOBILE */
	MOBILE: "mobile",
	/** Abilita visualizzazione solo per WEB */
	WEB: "web"
};

/** Costanti per la gestione del timer
* @enum
* @type {string}
*/
const hrifTIMER = {
	/** 3 Secondi */
	SHORT: "short",
	/** 5 secondi */
	LONG: "long"
};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// /**
// * @module Container
// */
const hrifCONTAINERTPL = {

	APP_MOBILE: { "HEADER": "app__header", "MAIN": "app__body", "FOOTER": "app__footer" },
	MODAL_HBF: { "HEADER": "modal__header", "MAIN": "modal__body", "FOOTER": "modal__footer" },
	MODAL_LB: { "LEFT": "prova__left", "MAIN": "prova_main" }

};


/** Area parametri per la gestione della Label
* @ignore
* @class
* @param {json|object} jsonLabelParm
* @param {string} jsonLabelParm.IdItem - Id (chiave) del Button.
* @param {string} jsonLabelParm.Label - Testo da inserire nella Label.
* @param {string} jsonLabelParm.Tooltip - Tooltip.
* @param {string} jsonLabelParm.Action - Azione da eseguire al click.
* @param {string} jsonLabelParm.Image - Percorso immagine da visualizzare nel Button.
* @param {json|object} jsonLabelParm.Style - Oggetto contenente tutte le proprietà di style relative .
* @returns.
*/
var jsonLabelParm = {
	Struct: "",
	IdItem: "",
	Name: "",
	Label: "",
	Tooltip: "",
	Action: "",
	PortletId: "",
	Image: "",
	Style: {}
};

function hrifGetJsonLabel() {
	return {
		IdItem: "",
		Label: "",
		Tooltip: "",
		Action: "",
		Status: "",
		Type: ""
	};
}



//function loadGenericObj(object, zone, idContainer, nameId, className){
//	
//	createDocumentChild(zone, idContainer, idContainer, nameId, className);
//	if (typeof(object.obj.typeObj)!='undefined' && object.obj.typeObj=='container'){
//		object.obj.loadRecursive(object.parentObjId);
//	} else if (typeof(object.obj.typeObj)!='undefined' && object.obj.typeObj=='pattern'){
//		object.obj.Load(object.parentObjId);
//	} else {
//		// Fraiva: inserire una segnalazione di warning nel caso sia già stato fatto un setHeader
//		appendObjectIntoDocument(object.obj.wrkObj, object.parentObjId);
//	}
//	
//}
//
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// da qui inizia la parte nuova con HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2 HRIF2

/**
* @namespace Labels
*/


/** Imposta la tipologia della <b>Label</b>
* @class hrifLabelType
* @memberOf Labels
* @param {object} ctrlParm - Oggetto <b>Label</b> di PortalStudio (esempio this.Label).
* @param {json|object} jsonType - Proprietà dell'oggetto.
* @param {hrifLABELTYPE} jsonType.Type - Tipologia dell'oggetto.
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*
* @example
*
* // Definizione proprietà della Label
* var jsonLabel = {};
* jsonLabel.Type = hrifLABELTYPE.PRIMARY;
*
* // Applico le proprietà sull'oggetto di portalstudio 
* hrifLabelType(this.Label, jsonLabel);
*
*/
function hrifLabelType(ctrlParm, jsonTypeParam) {

	var jsonType = (typeof (jsonTypeParam) == 'string') ? JSON.parse(jsonTypeParam) : jsonTypeParam;

	var classNameBase = hrifCLASSBASE.LABEL;
	var classNameContainer = classNameBase + '-container';
	var className = " ";

	// Imposto le classi 
	if (jsonType.Type)
		className += classNameBase + "-" + jsonType.Type;

	// Reimposto le classi alla Label
	if (!ctrlParm.Ctrl.className.includes(classNameContainer))
		ctrlParm.Ctrl.className = ctrlParm.Ctrl.className + " " + classNameContainer;

	ctrlParm.Ctrltbl.className = classNameBase + " " + className;

	if (ctrlParm.hide == 'true')
		ctrlParm.Hide();

}


/** Definizione oggetto Label
* @ignore 
* @class 
* @alias HrifLabel
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonLabelParam - Proprietà dell'oggetto
* @param {string} jsonLabelParam.Label - Descrizione/Contenuto della Label
* @param {string} [jsonLabelParam.SearchFilter] - Descrizione da ricercare nel testo della label
* @param {string} [jsonLabelParam.Tooltip] - Valore del tooltip
* @param {string} [jsonLabelParam.Action] - Azione di callback al click
* @returns {object} Oggetto Label.
*
* @example 
* // Esempio semplice: Istanzio la label e la carico in hrifCnt (hrifContainer)
* 
* // Definizione proprietà della Label
* var jsonLabelParam = {};
* jsonLabelParam.Label = FormatMsg("Testo della label");
*
* var label = new HrifLabel(this, jsonLabelParam);
*
* this.hrifCnt.Load(label);
* 
*/
this.HrifLabel = function (form, jsonLabelParam) {

	var jsonLabel = (typeof (jsonLabelParam) == 'string') ? JSON.parse(jsonLabelParam) : jsonLabelParam;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabel.IdItem);
	this.label = jsonLabel.Label;
	this.searchFilter = jsonLabel.SearchFilter;
	this.tooltip = jsonLabel.Tooltip;
	this.actionLabel = jsonLabel.Action;
	this.status = jsonLabel.Status;
	this.portletId = this.form.formid;

	this.objectName = "HrifLabel";

	this.action = null;
	this.actionOld = null;
	this.isDisabled = false;

	this.classNameBase = hrifCLASSBASE.LABEL;

	var wrkLabel = document.createElement('div');
	wrkLabel.id = this.idItem;
	if (typeof (this.searchFilter) == "undefined" || this.searchFilter.trim() == "") {
		wrkLabel.innerText = this.label;
	} else {
		wrkLabel.innerHTML = hrifSearchAndHighlight(this.label, this.searchFilter);
	}

	if (this.tooltip) wrkLabel.setAttribute('title', this.tooltip);

	hrifAddClass(wrkLabel, this.classNameBase);

	this.wrkObj = wrkLabel;

	/** Determina il tipo di Label - - - - - da adeguare
	* @ignore
	* @param {hrifLBLSTRUCT} typeLabel - Tipologia di Label.
	* @returns {null} Valorizza la Label.
	*/
	this.setStyleType = function (typeLabel) {

		jsonLabel.Struct = typeLabel;
		this.wrkObj.classList.remove(hrifCLASSBASE.LABEL + "--h1", hrifCLASSBASE.LABEL + "--h2", hrifCLASSBASE.LABEL + "--h3", hrifCLASSBASE.LABEL + "--h4", hrifCLASSBASE.LABEL + "--h5", hrifCLASSBASE.LABEL + "--h6", hrifCLASSBASE.LABEL + "--small", hrifCLASSBASE.LABEL + "--xsmall", hrifCLASSBASE.LABEL + "--xxsmall", hrifCLASSBASE.LABEL + "--medium", hrifCLASSBASE.LABEL + "--large", hrifCLASSBASE.LABEL + "--xlarge");

		var wrkClassName = hrifLabelSetStyleString(jsonLabel);
		// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
		hrifAddClass(this.wrkObj, wrkClassName);
	};


	/** Valorizza il Tooltip della Label
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Determina l'azione della Label
	* @param {string} action - Azione al click sulla Label.
	* @returns {null} Esegue l'azione definita.
	*/
	this.setAction = function (action) {

		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			this.wrkObj.addEventListener("click", this.wrkAction, false);
		}

		this.actionOld = this.action;

	};
	if (typeof (this.actionLabel) != 'undefined' && this.actionLabel != "")
		this.setAction(this.actionLabel);

	/** Valorizza il testo della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.Value = function (label) {
		this.label = label;
		this.wrkObj.innerText = this.label;
		//		this.wrkObj.innerHTML = ToHTag(this.label,"xssPrevent");
	};

	/** Valorizza il testo con markdown della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.ValueMarkdown = function (label) {

		// Rimuove i titoli dalla stringa Markdown
		this.label = label.replace(/^#(\s+)/gm, '$1');
		
//		this.wrkObj.innerHTML = converter.makeHtml(removeTagHTML(this.label));
		converter.setOption('tables', true);
		converter.setOption('openLinksInNewWindow', true);
		converter.setOption('simplifiedAutoLink', true);
		converter.setOption('simpleLineBreaks', true);
		converter.setOption('strikethrough', true);
		  
		this.wrkObj.innerHTML = converter.makeHtml(this.label);
		
		if (!this.wrkObj.classList.contains('label-markdown'))
			this.wrkObj.classList.add('label-markdown');
	};

	/** Disabilita la Label
	* @returns {null} Disabilita la Label.
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};

	/** Abilita il button
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};


	/** Nasconde la Label
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza la Label
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkObj, className);
	};

	/** Setta lo stato della Label - - - - - da adeguare/cancellare
	* @ignore
	* @param {hrifSTATUS} status - Stato dell'oggetto.
	* @returns {null} Setta lo status della Label.
	*/
	this.setStatus = function (status) {

		this.wrkObj.classList.remove("text-color-primary", "text-color-success", "text-color-warning", "text-color-danger", "text-color-info");
		if (status != "") {
			// jsonLabel.Style.Status = status;
			hrifAddClass(this.wrkObj, "text-color-" + status);
		}

	};
	if (typeof (this.status) != 'undefined' && this.status != "")
		this.setStatus(this.status);

	/** Setta il peso della Label- - - - - da adeguare/cancellare
	* @ignore	
	* @param {HrifWEIGHT} weight - Peso dell'oggetto.
	* @returns {null} Setta il peso della Label.
	*/
	this.setStyleWeight = function (weight) {

		this.wrkObj.classList.remove("text-black", "text-extrabold", "text-bold", "text-semibold", "text-medium", "text-regular", "text-light");
		if (weight != "") {
			hrifAddClass(this.wrkObj, "text-" + weight);
		}
	};

	/** Setta il contrasto della Label- - - - - da adeguare/cancellare
	* @ignore
	* @param {hrifCONTRAST} weight - Contrasto dell'oggetto.
	* @returns {null} Setta il contrasto della Label.
	*/
	this.setStyleContrast = function (contrast) {

		this.wrkObj.classList.remove("text-color-grey-100", "text-color-grey-200", "text-color-grey-300", "text-color-grey-300", "text-color-grey-400", "text-color-grey-500", "text-color-grey-600", "text-color-grey-700", "text-color-grey-800", "text-color-grey-900");
		if (contrast != "") {
			// jsonLabel.Style.Contrast = contrast;
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, "text-color-grey-" + contrast);
		}

	};

	/** Setta l'allineamento della Label - - - - - da adeguare/cancellare
	* @ignore
	* @param {hrifLABELALIGNMENT} alignment - Allineamento della Label (valori ammessi: left/center/right).  // Fraiva: to do hrifLABELALIGNMENT
	* @returns {null} Setta l'allineamento della Label.
	*/
	this.setAlignment = function (alignment) {
		this.wrkObj.classList.remove("text-right", "text-center", "text-left");
		if (alignment != "") {
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, "text-" + alignment);
		}
	};

	/** Setta lo stile del font della Label - - - - - da adeguare/cancellare
	* @ignore
	* @param {hrifLABELFONTSTYLE} fontStyleValue - stile del font della Label (valori ammessi: normal/italic).  // Fraiva: to do hrifLABELFONTSTYLE
	* @returns {null} Setta lo stile del font della Label
	*/
	this.setFontStyle = function (fontStyleValue) {
		this.wrkObj.classList.remove("normal", "italic");
		if (fontStyleValue != "") {
			// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
			hrifAddClass(this.wrkObj, fontStyleValue);
		}
	};

	/** Imposta la Label con una largehzza in base al contenuto in modo di poterla affinacare ad altre.- - - - - da adeguare/cancellare
	* @ignore
	* @param {boolean} inLineValue - true=inline/false=block
	* @returns {null} Imposta la Label con una largehzza in base al contenuto in modo di poterla affinacare ad altre.
	*/
	this.setInLine = function (inLineValue) {
		this.wrkObj.classList.remove(hrifCLASSBASE.LABEL + "--inline");
		if (inLineValue) {
			hrifAddClass(this.wrkObj, hrifCLASSBASE.LABEL + "--inline");
		}

	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
		//		if (this.action){
		//			var pippo = "";
		//			pippo = this.wrkObj.outerHTML;
		//			var ivan = pippo.replace('id','onclick ="event.stopPropagation();javascript:'+this.form.formid +'.'+ this.action +'() id');
		//			return ivan; 
		//		} else {
		//			this.wrkObj.outerHTML
		//		}
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};

	/** Carica l'oggetto
	* @ ignore
	* @returns {object} Carica l'oggetto .
	*/
	this.Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkObj, IdNameInto);
	};

};

// fraiva - to do
/** Definizione oggetto HrifLabelQuote
* @ignore
* @class 
* @alias HrifLabelQuote
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonLabelParam - Proprietà dell'oggetto
* @param {string} jsonLabelParam.Label - Descrizione/Contenuto della Label
* @param {string} [jsonLabelParam.SearchFilter] - Descrizione da ricercare nel testo della label
* @param {string} [jsonLabelParam.Tooltip] - Valore del tooltip
* @param {string} [jsonLabelParam.Action] - Azione di callback al click
* @returns {object} Oggetto Label.
*
* @example 
* // Esempio semplice: Istanzio la label e la carico in hrifCnt (hrifContainer)
* 
* // Definizione proprietà della Label
* var jsonLabelQuoteParam = {};
* jsonLabelQuoteParam.Label = FormatMsg("Testo della label");
*
* // Istanzio l'oggetto
* var labelQuote = new HrifLabeQuote(this, jsonLabelQuoteParam);
*
* // Carico l'oggetto in un cotainer
* this.hrifCnt.Load(labelQuote);
* 
*/
this.HrifLabelQuote = function (form, jsonLabelQuoteParam) {

	var jsonLabelQuote = (typeof (jsonLabelQuoteParam) == 'string') ? JSON.parse(jsonLabelQuoteParam) : jsonLabelQuoteParam;

	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabelQuote.IdItem);
	this.label = jsonLabelQuote.Label;
	this.searchFilter = jsonLabelQuote.SearchFilter;
	this.tooltip = jsonLabelQuote.Tooltip;
	this.actionLabel = jsonLabelQuote.Action;
	this.portletId = this.form.formid;

	this.action = null;
	this.actionOld = null;
	this.isDisabled = false;

	this.classNameBase = hrifCLASSBASE.LABEL + " " + hrifCLASSBASE.LABELQUOTE;

	var wrkLabel = document.createElement('div');
	wrkLabel.id = this.idItem;
	
	if (typeof (this.searchFilter) == "undefined" || this.searchFilter.trim() == "") {
		wrkLabel.innerText = this.label;
	} else {
		// wrkLabel.innerHTML = converter.makeHtml(removeTagHTML(hrifSearchAndHighlight(this.label, this.searchFilter)));
		wrkLabel.innerHTML = hrifSearchAndHighlight(this.label, this.searchFilter);
	}

	if (this.tooltip) wrkLabel.setAttribute('title', this.tooltip);

	hrifAddClass(wrkLabel, this.classNameBase);

	this.wrkObj = wrkLabel;


	/** Valorizza il Tooltip della Label
	* @ignore
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Determina l'azione della Label
	* @ignore
	* @param {string} action - Azione al click sulla Label.
	* @returns {null} Esegue l'azione definita.
	*/
	this.setAction = function (action) {

		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			this.wrkObj.addEventListener("click", this.wrkAction, false);
		}

		this.actionOld = this.action;

	};
	if (typeof (this.actionLabel) != 'undefined' && this.actionLabel != "")
		this.setAction(this.actionLabel);

	/** Valorizza il testo della Label
	* @ignore
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.Value = function (label) {
		this.label = label;
		this.wrkObj.innerText = this.label;
		//		this.wrkObj.innerHTML = ToHTag(this.label,"xssPrevent");
	};

	/** Valorizza il testo con markdown della Label
	* @ignore
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.ValueMarkdown = function (label) {
		this.label = label;
		this.wrkObj.innerHTML = converter.makeHtml(removeTagHTML(this.label));

		if (!this.wrkObj.classList.contains('label-markdown'))
			this.wrkObj.classList.add('label-markdown');
	};

	/** Disabilita la Label
	* @ignore
	* @returns {null} Disabilita la Label.
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};

	/** Abilita il button
	* @ignore
	* @returns {null} Abilita il button.
	*/
	this.Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};


	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkObj, className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};

	/** Carica l'oggetto
	* @ ignore
	* @returns {object} Carica l'oggetto .
	*/
	this.Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkObj, IdNameInto);
	};

};


// da documentare

class HrifLabelValueGroup {

	constructor(form, jsonLabelValueGroupParam) {
		
		var jsonLabelValueGroup = (typeof (jsonLabelValueGroupParam) == 'string') ? JSON.parse(jsonLabelValueGroupParam) : jsonLabelValueGroupParam;
	
		this.form = form;
		this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabelValueGroup.IdItem);
		this.elements = jsonLabelValueGroup.Elements;
		this.direction = (jsonLabelValueGroup.Direction) ? jsonLabelValueGroup.Direction : hrifDIRECTION.HORIZONTAL; 
		
		this.typeObj = "pattern";
		this.nameObj = "HrifLabelValueGroup";
		this.portletId = this.form.formid;
	
		this.action = null;
		this.actionOld = null;
		this.isDisabled = false;	
	
		this.idItemCont = this.idItem + "_cont"; 
	
		this.classNameBase = hrifCLASSBASE.LABEL + " " + hrifCLASSBASE.LABELVALUEGROUP;
		this.classNameCont = hrifCLASSBASE.ITEM;
		this.classNameLabel = this.classNameBase + "__label";
		this.classNameValue = this.classNameBase + "__value";
	
		this.docLabelValueFrag = document.createDocumentFragment();
		documentFrag(this.docLabelValueFrag, 'div', this.idItem, '', this.classNameBase + " " + hrifCLASSBASE.LABELVALUEGROUP + this.direction.class);
		
		
		let IdxElem = 0;
		for(IdxElem=0; IdxElem < this.elements.length; IdxElem++){
			
			this.label = null;
			this.value = null;

			let hideClass = "";

			if(!this.elements[IdxElem].Label && !this.elements[IdxElem].Value) {
				hideClass = " "+hiddenVisibility;
			}
			
			this.docLabelValueContFrag = document.createDocumentFragment();
			documentFrag(this.docLabelValueContFrag, 'div', this.idItemCont+"_"+IdxElem, '', hrifCLASSBASE.ITEM+hideClass);
			
			if (this.elements[IdxElem].Label){
				var JsonLabel = {};
				JsonLabel.Label = this.elements[IdxElem].Label;
				this.label = new HrifLabel(this.form, JsonLabel);
				this.label.getObject().setAttribute("role", hrifROLE.LABEL);
				this.docLabelValueContFrag.getElementById(this.idItemCont+"_"+IdxElem).appendChild(this.label.getObject());
			}
			
			if (this.elements[IdxElem].Status && this.elements[IdxElem].Status == hrifSTATUS.DANGER){
				var jsonIconLabel = {};
				switch(this.elements[IdxElem].Status) {
				  case hrifSTATUS.DANGER:
					jsonIconLabel.Icon = hrifICON.DANGER;  	
				    break;
				  case hrifSTATUS.INFO:
					jsonIconLabel.Icon = hrifICON.INFO;  	
				    break;
				}
				
				jsonIconLabel.Label = this.elements[IdxElem].Value;
				this.iconLabel = new HrifIconLabel(this.form, jsonIconLabel);
				this.iconLabel.getObject().setAttribute("role", hrifROLE.VALUE);
				this.docLabelValueContFrag.getElementById(this.idItemCont+"_"+IdxElem).appendChild(this.iconLabel.getObject());
				
				this.docLabelValueContFrag.children[0].classList.add(hrifCLASSBASE.ITEM + "--" + this.elements[IdxElem].Status) 
				
			} else {
				
				if (this.elements[IdxElem].Value){
					var JsonValue = {};
					JsonValue.Label = this.elements[IdxElem].Value;
					this.value = new HrifLabel(this.form, JsonValue);
					this.value.getObject().setAttribute("role", hrifROLE.VALUE);
					this.docLabelValueContFrag.getElementById(this.idItemCont+"_"+IdxElem).appendChild(this.value.getObject());
				}
			}
			
			this.docLabelValueFrag.getElementById(this.idItem).appendChild(this.docLabelValueContFrag.children[0]);
		}
	
		this.wrkDocFrag = this.docLabelValueFrag.children[0];
	
	}

	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	removeClass = function (className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};

	/** Carica l'oggetto
	* @ ignore
	* @returns {object} Carica l'oggetto .
	*/
	Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkDocFrag, IdNameInto);
	};

};


class HrifLabelValueList {

	constructor(form, jsonLabelValueListParam) {
		
		var jsonLabelValueList = (typeof (jsonLabelValueListParam) == 'string') ? JSON.parse(jsonLabelValueListParam) : jsonLabelValueListParam;
	
		this.form = form;
		this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabelValueList.IdItem);
		this.title = (jsonLabelValueList.Title) ? jsonLabelValueList.Title : null;
		this.elements = jsonLabelValueList.Elements;
		
		this.typeObj = "pattern";
		this.nameObj = "HrifLabelValueList";
		this.portletId = this.form.formid;
	
		this.action = null;
		this.actionOld = null;
		this.isDisabled = false;	
	
		this.idItem = this.idItem + "_lvlist"; 
		this.idItemItem = this.idItem + "_item"; 
//		this.idItemLabel = this.idItem + "_lbl"; 
		this.idItemValue = this.idItem + "_val"; 
	
		this.classNameBase = hrifCLASSBASE.LABELVALUELIST;
		this.classNameItem = this.classNameBase + "__voice";
//		this.classNameLabel = this.classNameBase + "--label";
		this.classNameValue = "";
	
		// Creo il documento in memoria
		this.docLabelValueFrag = document.createDocumentFragment();
		documentFrag(this.docLabelValueFrag, 'div', this.idItem, '', this.classNameBase);

		if (this.title != null){
			let titleObject = new HrifTitle(this.form, {"Title" : this.title});
			this.docLabelValueFrag.getElementById(this.idItem).appendChild(titleObject.getObject());
		}
		
		let IdxElem,IdxValue = 0;
		for(IdxElem=0; IdxElem < this.elements.length; IdxElem++){
			
			this.label = null;
			this.value = null;
			
			// Creo il document per Item (voice)
			this.docLabelValueItemFrag = document.createDocumentFragment();
			documentFrag(this.docLabelValueItemFrag, 'div', this.idItemItem, '', this.classNameItem);
			
			if (this.elements[IdxElem].Icon){
				var jsonIconLabel = {};
				jsonIconLabel.Icon = this.elements[IdxElem].Icon;
				jsonIconLabel.Label = this.elements[IdxElem].Label;
				this.iconLabel = new HrifIconLabel(this.form, jsonIconLabel);
				this.docLabelValueItemFrag.getElementById(this.idItemItem).appendChild(this.iconLabel.getObject());
			} else if (this.elements[IdxElem].Label){
				var JsonLabel = {};
				JsonLabel.Label = this.elements[IdxElem].Label;
				this.label = new HrifLabel(this.form, JsonLabel);
				this.docLabelValueItemFrag.getElementById(this.idItemItem).appendChild(this.label.getObject());
			}
			
			
			if (this.elements[IdxElem].Values){
				
				// Creo il documento per i Valori
				this.docLabelValueValFrag = document.createDocumentFragment();
				documentFrag(this.docLabelValueValFrag, 'div', this.idItemValue, '', this.classNameValue);
				
				for(IdxValue=0; IdxValue < this.elements[IdxElem].Values.length; IdxValue++){
					
					var JsonLabel = {};
					JsonLabel.Label = this.elements[IdxElem].Values[IdxValue].Value;
					this.labelValue = new HrifLabel(this.form, JsonLabel);
					this.docLabelValueValFrag.getElementById(this.idItemValue).appendChild(this.labelValue.getObject());
										
				}
				
				this.docLabelValueItemFrag.getElementById(this.idItemItem).appendChild(this.docLabelValueValFrag.children[0]);	
			}
			
			this.docLabelValueFrag.getElementById(this.idItem).appendChild(this.docLabelValueItemFrag.children[0]);
			
		}
	
		this.wrkDocFrag = this.docLabelValueFrag.children[0];
	
	}

	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	removeClass = function (className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};

	/** Carica l'oggetto
	* @ ignore
	* @returns {object} Carica l'oggetto .
	*/
	Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkDocFrag, IdNameInto);
	};

};



// to do
this.HrifTextLong = function (form, jsonLabelParam) {

	var jsonLabel = (typeof (jsonLabelParam) == 'string') ? JSON.parse(jsonLabelParam) : jsonLabelParam;

	this.LabelMemo = new HrifLabel(form, jsonLabel);
	this.LabelMemo.addClass(hrifCLASSBASE.LABEL + "-long");
	return this.LabelMemo;

};


/** Definizione oggetto Label [PS - new HrifLabel()]
* @class 
* @alias HrifLabelCounter
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonLabelCounterParam - Proprietà dell'oggetto
* @param {string} jsonLabelCounterParam.Label - Descrizione/Contenuto della Label
* @param {string} jsonLabelCounterParam.Counter - Valore del contatore
* @returns {object} Oggetto LabelCounter.
*
* @example 
* 
* // Definizione proprietà dell'oggetto
* var jsonLabelCounter = {};
* jsonLabelCounter.Label = FormatMsg("Comunicazioni");
* jsonLabelCounter.Counter = 15;
* 
* // Istanzio l'oggetto
* var labelCounter = new HrifLabelCounter(this, jsonLabelCounter);
* 
* // Carico l'oggetto in un contenitore
* this.hrif_CntLabelCounter.Load(labelCounter);
* 
*/
this.HrifLabelCounter = function (form, jsonLabelCounterParm) {

	var jsonLabelCounter = (typeof (jsonLabelCounterParm) == 'string') ? JSON.parse(jsonLabelCounterParm) : jsonLabelCounterParm;
	
	this.form = form;
	this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabelCounter.IdItem);
	this.label = jsonLabelCounter.Label;
	this.counter = jsonLabelCounter.Counter;
	this.showCounter = (jsonLabelCounterParm.ShowCounter===false)?false:true;

	this.typeObj = "pattern";

	this.classNameBase = hrifCLASSBASE.LABELCOUNTER;
	this.classNameCounter = this.classNameBase + "__counter";

	// Definizione oggetto
	this.wrkObj = {
		"label": null,
		"labelCounter": null
	};

	// Creo il documento in memoria
	this.docResultChipFrag = document.createDocumentFragment();
	documentFrag(this.docResultChipFrag, 'div', this.idItem, '', this.classNameBase);

	if (typeof (this.label) == "undefined") {
		this.label = "undefined";
		hrifConsole("[HRIF] HrifLabelCounter: manca la valorizzazione della Label", 'warn');
	}
	var jsonLabel = {};
	jsonLabel.Label = this.label;
	this.wrkObj.label = new HrifLabel(this.form, jsonLabel);
	this.docResultChipFrag.getElementById(this.idItem).appendChild(this.wrkObj.label.getObject());

	if (typeof (this.counter) == "undefined") {
		this.counter = "undefined";
		hrifConsole("[HRIF] HrifLabelCounter: manca la valorizzazione del Counter", 'warn');
	}

	if (this.showCounter && (typeof(eval(this.counter))=='number')) {
		var jsonLabelCounter = {};
		jsonLabelCounter.Label = this.counter;
		this.wrkObj.labelCounter = new HrifLabel(this.form, jsonLabelCounter);
		this.wrkObj.labelCounter.removeClass(hrifCLASSBASE.LABEL);
		this.wrkObj.labelCounter.addClass(hrifCLASSBASE.COUNTER);
		this.wrkObj.labelCounter.addClass(this.classNameCounter);
	
		this.docResultChipFrag.getElementById(this.idItem).appendChild(this.wrkObj.labelCounter.getObject());
	}
	

	this.wrkDocFrag = this.docResultChipFrag.children[0];


	this.setCounter = function (counterValue) {
		this.wrkObj.labelCounter.Value(counterValue);
	};

	this.setLabel = function (label) {
		this.wrkObj.label.Value(label);
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};


};

/** Ricerca una stringa all'interno del testo
* @ignore
* @param {string} text - Testo   
* @param {string} search - Stringa da ricercare
* @returns {null} Evidenzia la stringa ricercata all'interno del testo.
*/
function hrifSearchAndHighlight(text, search) {

	// sostituisco i tag di apertura e chiusura
	text = text.replace(/</g, '&lt;');
    text = text.replace(/\/>/g, '&gt;');
    
	text = removeTagHTML(text);
	let ret = text;
	var index = text.toLowerCase().indexOf(search.toLowerCase());
	if (index >= 0 && Trim(search) != '') {
		// rimuovo tag html dal testo
		

		let textNoEvidenceIni = text.substring(0, index);
		let textToEvidence = text.substring(index, index + search.length);
		let textNoEvidenceEnd = text.substring(index + search.length);
		
		// creo la stringa con la struttura html che evidenzia il testo
		let htmlText = "<span class=\"hrif2-mark\"></span>";

		// creo la stringa con il testo evidenziato
		let htmlHighligh = htmlText.replace("</span>",textToEvidence+"</span>"+textNoEvidenceEnd);
		
		// costruisco la stringa compoleta
		ret = textNoEvidenceIni+htmlHighligh;

	}

	return ret;
}


/** Determina le classi di stile per la tipologia di Label in linea   -  fraiva - to do ... forse è da cancellare
* @ignore
* @param {json|object} jsonLabelStyleParm 
* @returns {string} Classi label HighLightBox.
* @example 
*
* label.Type = "highlightbox";
* label.Color = hrifCOLOR.SUCCESS;
* label.Style.Size = 'autowidth';
* hrifLabelSetStyle(label,this.nomeLabel);
*
*/
function hrifLabelSetStyle(prtObject, Struct, Color, Weight, Contrast) {

	if (typeof (prtObject) == 'undefined') hrifConsole('[HRIF] hrifLabelSetStyle: manca il paramentro "this.nomeoggetto"', 'warn');

	//var jsonLabelStyle = (typeof(jsonLabelStyleParm)=='string') ? JSON.parse(jsonLabelStyleParm) : jsonLabelStyleParm;

	var jsonLabelStyle = hrifGetJsonLabel();
	jsonLabelStyle.Struct = Struct;
	jsonLabelStyle.Style.Color = Color;
	jsonLabelStyle.Style.Weight = Weight;
	jsonLabelStyle.Style.Contrast = Contrast;

	var wrkClassName = hrifLabelSetStyleString(jsonLabelStyle);
	// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
	hrifAddClass(prtObject.Ctrl, wrkClassName);

}


/** Determina le classi di stile per la Label di base alla sua tipologia
* @ignore
* @param {json|object} jsonLabelParm - <a href="module-Label-jsonLabelParm_.html#jsonLabelParm">jsonLabelParm</a> Area parametri per la gestione della Label. 
* @returns {string} Stringa contente le classi della label.
*/
function hrifLabelSetStyleString(jsonLabelParm) {

	var jsonLabel = (typeof (jsonLabelParm) == 'string') ? JSON.parse(jsonLabelParm) : jsonLabelParm;

	var wrkClassName = "";

	var wrkStructure = (typeof (jsonLabel.Struct) == 'string') ? eval(jsonLabel.Struct) : jsonLabel.Struct;

	// switch (Trim(jsonLabel.Struct.TPL.toLowerCase())) {
	switch (Trim(wrkStructure.TPL.toLowerCase())) {
		case 'title':
		case 'label':
		case 'sectiontitle':
			wrkClassName = hrifLabelStyle(jsonLabel);
			break;
		// case 'sectiontitle':
		// wrkClassName = hrifLabelSectionTitleStyle(jsonLabel);
		// break;
		case 'highlightbox':
			wrkClassName = hrifLabelHighLightBox(jsonLabel);
			break;
		default:
			break;
	}

	return wrkClassName;

}

/** Determina  le classi Label HighLightBox - fraiva: probabilmente da cancellare
* @ignore
* @param {json|object} jsonLabelStylaParm 
* @returns {string} Classi label HighLightBox.
*
*/
function hrifLabelHighLightBox(jsonLabelParm, wrkLabelObj) {

	var jsonLabel = (typeof (jsonLabelParm) == 'string') ? JSON.parse(jsonLabelParm) : jsonLabelParm;

	// Stili
	var wrkClassName = "highlight-box ";
	wrkClassName += (typeof (jsonLabel.Style.Size) != "undefined" && jsonLabel.Style.Size == "autowidth") ? 'highlight-box--auto-width ' : '';
	// potrebbe già arrivare il colore da json quindi applico l'eval solo se mi arriva la stringa hrifCOLOR
	wrkClassName += (typeof (jsonLabel.Style.Color) == 'string' && jsonLabel.Style.Color.substring(0, 9) == "hrifCOLOR") ? eval(jsonLabel.Style.Color) : jsonLabel.Style.Color;
	wrkClassName += (typeof (jsonLabel.Style.Type) != "undefined" && jsonLabel.Style.Type == "outlined") ? ' highlight-box--outlined' : '';
	wrkClassName += (typeof (jsonLabel.Style.Gravity) == "undefined" || jsonLabel.Style.Gravity == "") ? " " + hrifGRAVITY.LEFT : " " + jsonLabel.Style.Gravity;

	return wrkClassName;

}

/** Determina le classi Label per i Template di tipo Title
* @ignore
* @param {json|object} jsonLabelStylaParm 
* @returns {string} Classi label Template di tipo Title.
*
*/
function hrifLabelStyle(jsonLabelParm) {

	var jsonLabel = (typeof (jsonLabelParm) == 'string') ? JSON.parse(jsonLabelParm) : jsonLabelParm;

	var wrkStructure = (typeof (jsonLabel.Struct) == 'string') ? eval(jsonLabel.Struct) : jsonLabel.Struct;

	var wrkClassName = "";
	// Imposto i valori di Default (se definiti)
	if (typeof (wrkStructure.STYLE.CLASS) != "undefined") {
		wrkClassName += wrkStructure.STYLE.CLASS;
	}

	if (wrkStructure.TYPE == "modify") {
		// Stili
		wrkClassName += (!jsonLabel.Style.Weight) ? "" : " " + jsonLabel.Style.Weight;
		wrkClassName += (typeof (jsonLabel.Style.Contrast) == "undefined" || jsonLabel.Style.Contrast == "") ? "" : " " + jsonLabel.Style.Contrast;
		wrkClassName += (typeof (jsonLabel.Style.Color) == "undefined" || jsonLabel.Style.Color == "") ? "" : " colored " + jsonLabel.Style.Color;

	} else if (wrkStructure.TYPE == "preset") {
		// Stili
		wrkClassName += ' ' + eval(wrkStructure.STYLE.WEIGHT);
		wrkClassName += ' ' + eval(wrkStructure.STYLE.CONTRAST);

	}

	if (typeof (jsonLabel.Style) == "undefined" || typeof (jsonLabel.Style.Gravity) == "undefined" || jsonLabel.Style.Gravity == "") {
		//wrkClassName += " " + hrifGRAVITY.LEFT;
	} else if (jsonLabel.Style.Gravity != hrifGRAVITY.NONE) {
		wrkClassName += " " + jsonLabel.Style.Gravity;
	}

	if (wrkStructure.TYPE == "preset" && jsonLabel.Style != "") {
		hrifConsole('[HRIF] hrifLabelTitle: impossibile applicare personalizzazioni/forzature per un oggetto "predefinito"', 'warn');
	}

	return wrkClassName;

}


// fraiva - to do - per il momento è ancora indicato l'utilizzo del icona
/** Definizione oggetto HighLightBox [PS - new HrifHighLightBox()]
* @ignore
* @class
* @alias HrifHighLightBox - NEW
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonHighlightbox - Proprietà dell'oggetto
* @param {string} jsonHighlightbox.Label - Testo dell'oggetto
* @param {hrifSTATUS} jsonHighlightbox.Status - Stato
* @param {string} jsonHighlightbox.Tooltip - Testo del tooltip
* @returns {object} Oggetto HighLightBox.
*
* @example 
*
* // Valorizzo le proprietà del HighLighBox
* var highlightboxParm = {};
* highlightboxParm.IdItem = "highl";
* highlightboxParm.Label = "Testo del highlightbox";
* highlightboxParm.Tooltip = "Tooltip del highlightbox";
* highlightboxParm.Status = hrifSTATUS.DANGER;
* 
* // Istanzio l'oggetto
* var highlightbox = new HrifHighlightbox(this, highlightboxParm);*
* 
*/
this.HrifHighlightbox = function (form, jsonParam) {

	var jsonHighlightbox = (typeof (jsonParam) == 'string') ? JSON.parse(jsonParam) : jsonParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonHighlightbox.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.iconValue = null;
	this.label = jsonHighlightbox.Label;
	this.tooltip = jsonHighlightbox.Tooltip;
	this.typeObj = "pattern";

	this.portletId = this.form.formid;
	this.isLoaded = false;
	this.type = hrifHIGHLIGHTBOXTYPE.CONTAINED;

	this.classNameBase = hrifCLASSBASE.HIGHLIGHTBOX;
	this.classNameIcon = this.classNameBase + "__icon";
	this.classNameIconLabel = this.classNameBase + "--icon-label";
	this.classNameLabel = this.classNameBase + "__label";
	this.classNameBulletPos = this.classNameBase + "--bullet";

	this.idItemIcon = this.idItem + "_ico";
	this.idItemLabel = this.idItem + "_lbl";

	// Definizione oggetto Svg, Label(Title) e Label(Message) 
	this.wrkObj = {
		"iconObj": null,
		"labelObj": null
	};

	// Verificare se devo forzare le classi sugli oggetti.
	// this.wrkObj.iconObj.addClass(this.classNameIcon);
	// this.wrkObj.labelMessage.addClass(this.classNameMessage);


	// Definizione del documento in memoria
	this.docHighLightBoxFrag = document.createDocumentFragment();
	documentFrag(this.docHighLightBoxFrag, 'div', this.idItem, '', this.classNameBase);

	this.wrkDocFrag = this.docHighLightBoxFrag.children[0];

	/** Valorizza il Tooltip dell'oggetto
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip dell'oggetto.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;
	};
	if (typeof (this.tooltip) != 'undefined')
		this.setTooltip(this.tooltip);

	/** Valorizza l'icona
	* @param {string} hrifICON - Valore dell'icona.
	* @returns {null} Valorizza l'icona.
	*/
	this.setIcon = function (iconValue) {
		if (iconValue.trim() != "") {
			this.iconValue = iconValue;
			if (this.wrkObj.iconObj == null) {
				this.wrkObj.iconObj = new HrifIconObj(this.form, this.idItemIcon, this.iconValue);
				this.wrkObj.iconObj.setSize(hrifSIZE.XSMALL);
				this.wrkObj.iconObj.addClass(this.classNameIcon);
				hrifAddClass(this.wrkDocFrag, this.classNameIconLabel);
				this.wrkDocFrag.appendChild(this.wrkObj.iconObj.wrkObj);
			} else {
				this.wrkObj.iconObj.Value(this.iconValue);
			}
		} else {
			var wrkDoc = document.getElementById(this.idItemIcon);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.iconObj = null;
				hrifRemoveClass(this.wrkDocFrag, this.classNameIconLabel);
			}
		}
	};

	/** Valorizza il testo della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Valorizza il testo della Label.
	*/
	this.setLabel = function (label) {
		if (label.trim() != "") {
			this.label = label;
			if (this.wrkObj.labelObj == null) {
				var jsonLabel = hrifGetJsonLabel();
				jsonLabel.IdItem = this.idItemLabel;
				jsonLabel.Label = this.label;
				this.wrkObj.labelObj = new HrifLabel(this.form, jsonLabel);
				this.wrkObj.labelObj.addClass(this.classNameLabel);
				this.wrkDocFrag.appendChild(this.wrkObj.labelObj.wrkObj);
			} else {
				this.wrkObj.labelObj.Value(this.label);
			}
		} else {
			var wrkDoc = document.getElementById(this.form.formid + "_" + this.idItemLabel);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.labelObj = null;
			}
		}
	};
	if (typeof (this.label) != 'undefined' && this.label != "")
		this.setLabel(this.label);

	/** Imposta lo stile dell'icona
	* @param {string} style - hrifICONSTYLE.
	* @returns {null} Imposta lo stile dell'icona
	*/
	this.setIconStyle = function (styleValue) {
		if (this.wrkObj.iconObj != null)
			this.wrkObj.iconObj.setStyle(styleValue);
		else
			hrifConsole("[HRIF] HrifHighlightbox.setIconStyle: impossibile applicare lo stile se l'icona non è stata deffinita [setIcon(valoreIcona)]", "warn");
	};

	/** Imposta l'icona nella posizione indicata
	* @param {string} iconPosition - Posizione (left/right).
	* @returns {null} Visualizza l'icona nella posizione.
	*/
	this.setIconPosition = function (iconPosition) {
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--icon-label-left", hrifCLASSBASE.HIGHLIGHTBOX + "--icon-label-right");
		if (iconPosition.trim() != "")
			hrifAddClass(this.wrkDocFrag, this.classNameIconLabel + "-" + iconPosition);
	};


	/** Imposta il 'pallino' nella posizione indicata
	* @param {string} bulletPosition - Posizione (left/right).
	* @returns {null} Imposta il 'pallino' nella posizione indicata.
	*/
	this.setBulletPosition = function (bulletPosition) {
		if (this.type == hrifHIGHLIGHTBOXTYPE.BULLET) {
			this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--bullet-right", hrifCLASSBASE.HIGHLIGHTBOX + "--bullet-right");
			if (bulletPosition.trim() != "")
				hrifAddClass(this.wrkDocFrag, this.classNameBulletPos + "-" + bulletPosition);
		} else {
			hrifConsole("[HRIF] HrifHighlightbox.setBulletPosition: impossibile applicare il metodo per un HIGHLIGHTBOXT diverso da 'bullet'", "warn");
		}

	};

	/** Nasconde l'oggetto
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	* @returns {null} Visualizza l'oggetto.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Setta il colore dell'oggetto
	* @param {string} status - hrifSTATUS.
	* @returns {null} Setta il colore dell'oggetto.
	*/
	this.setStatus = function (statusVal) {
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--primary", hrifCLASSBASE.HIGHLIGHTBOX + "--success", hrifCLASSBASE.HIGHLIGHTBOX + "--warning", hrifCLASSBASE.HIGHLIGHTBOX + "--danger", hrifCLASSBASE.HIGHLIGHTBOX + "--info");
		hrifAddClass(this.wrkDocFrag, this.classNameBase + "--" + statusVal);
	};
	if (typeof (jsonParam.Status) != 'undefined' && jsonParam.Status != "")
		this.setStatus(jsonParam.Status);

	/** Definizione tipologia dell'oggetto
	* @param {string} type - hrifBUTTONTYPE.
	* @returns {null} Visualizza l'oggetto del tipo settato.
	*/
	this.setType = function (type) {
		this.type = type;
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--contained", hrifCLASSBASE.HIGHLIGHTBOX + "--outlined", hrifCLASSBASE.HIGHLIGHTBOX + "--bullet");
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--bullet-right", hrifCLASSBASE.HIGHLIGHTBOX + "--bullet-right");
		hrifAddClass(this.wrkDocFrag, this.classNameBase + "--" + type);
	};

	/** Definizione dimesioni dell'oggetto
	* @param {hrifSIZE} type - Valori ammessi MEDIUM (default) / LARGE .
	* @returns {null} Definizione dimesioni dell'oggetto.
	*/
	this.setSize = function (size) {
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.HIGHLIGHTBOX + "--medium", hrifCLASSBASE.HIGHLIGHTBOX + "--large");
		if (size.trim() != "")
			hrifAddClass(this.wrkDocFrag, this.classNameBase + "--" + size);
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {

		//if (this.iconValue || this.label.trim()!=""){
		if (this.label != "") {
			appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
			this.isLoaded = true;
		}
		// } else {
		// hrifConsole("[HRIF] buttonIconedObj.Load: icona e messaggio campi obbligatori",'warn');
		// }
	};

};



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Counter
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// /**
// * @module Counter
// */
//const hrifCOUNTERSTRUCT = {
//
//	MEATBALL:			{ "TPL" : "meatball" 		, "TYPE" : "modify"	, "STYLE" : {} }
//
//}



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// /**
// * @module Image 
// */
const hrifIMAGESTRUCT = {

	STANDARD: { "TPL": "image", "TYPE": "preset", "STYLE": { "CLASS": "" } },

	MODALHEADER: { "TPL": "image", "TYPE": "preset", "STYLE": { "CLASS": "header-image" } }

};

function hrifGetJsonImage() {
	return {
		IdItem: "",
		Value: "",
		Tooltip: "",
		Action: "",
	};
}


/** Definizione oggetto Image [PS - new HrifPlutoObj()]
* @ignore
* @class
* @param {object} form - this.
* @param {string} struct - Struttura hrifIMAGESTRUCT.
* @param {string} idItem - id dell'oggetto immagine
* @param {string} TooltipValue - Tooltip dell'immagine
* @param {string} Action - Azione associata al click dell'immagine
* @param {string} Style - Stile dell'immagine
* @returns {object} Oggetto Image.
*/
class HrifImage {

	constructor(form, jsonImageParam) {

		var jsonImage = (typeof (jsonImageParam) == 'string') ? JSON.parse(jsonImageParam) : jsonImageParam;

		this.form = form;
		this.idItemCalc = HrifGetItem(jsonImage.IdItem);
		this.idItem = this.form.formid + "_" + this.idItemCalc;
		this.title = jsonImage.Title;
		this.tooltip = jsonImage.Tooltip;
		this.imageValue = jsonImage.Value;
		this.action = jsonImage.Action;

		this.idItemImage = this.idItem + "_img";

		this.className = hrifCLASSBASE.IMAGE;
		this.classNameImage = this.className + "__img";
		this.classNameCaption = this.className + "__caption";

		// Definizione dell'oggetto in memoria e ne carico i songoli oggetti
		this.docImageContainerFrag = document.createDocumentFragment();
		documentFrag(this.docImageContainerFrag, 'div', this.idItem, '', this.className);

		// Gestisco l'eventuale titolo 
		if (this.title) {
			var jsonLabel = {};
			jsonLabel.Label = this.title;
			this.title = new HrifLabel(this.form, jsonLabel);
			this.title.addClass(this.classNameCaption);
			this.docImageContainerFrag.getElementById(this.idItem).appendChild(this.title.getObject());
		}

		// Definizione tag Image
		this.docImageFrag = document.createDocumentFragment();
		documentFrag(this.docImageFrag, 'img', this.idItemImage, '', this.classNameImage);
		this.docImageFrag.children[0].setAttribute("src", this.imageValue);
		if (this.tooltip) this.docImageFrag.children[0].setAttribute('title', this.tooltip);

		this.docImageContainerFrag.getElementById(this.idItem).appendChild(this.docImageFrag.children[0]);

		this.wrkDocFrag = this.docImageContainerFrag.children[0];

		if (typeof (jsonImage.Action) != "undefined" && jsonImage.Action != "")
			this.setAction(jsonImage.Action);
	}


	/** Applica il tooltip  all'immagine
	* @param {string} tooltipValue - Testo del tooltip.
	* @returns {null} Applica il tooltip all'immagine.
	*/
	setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;
	};

	/** Applica il tooltip  all'immagine
	* @param {string} tooltipValue - Testo del tooltip.
	* @returns {null} Applica il tooltip all'immagine.
	*/
	setAction = function (action) {
		jsonImage.Action = action;
		if (jsonLabel.Action != "") {
			if (this.jsonImage.addEventListener)
				this.jsonImage.addEventListener("click", function () { execPortletAction(this.form, jsonImage.Action); }, false);
			else if (this.jsonImage.attachEvent) {
				this.jsonImage.attachEvent("onclick", function () { execPortletAction(this.form, jsonImage.Action); });
			}
		}
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass(className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	/** Rimozione classe sull'oggetto
	* @ignore
	* @param {string} className - Nome classe da rimuovere.
	* @returns {null} Viene rimossa la classe passata dall'oggetto.
	*/
	removeClass(className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Nasconde l'immagine
	* @param {string} IdItem - Id immagine.
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'immagine.
	*/
	Hide = function (preserveSpace) {

		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);

	};

	/** Visualizza l'immagine
	* @param {string} IdItem - Id Immagine.
	* @returns {null} Visualizza l'Immagine.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Carica l'Immagine
	* @param {string} pathImageValue - URL relativo dell'immagine.
	* @returns {null} Carica l'Immagine
	*/
	Value = function (pathImageValue) {

		var wrkRemoveOldStyle = document.getElementById(this.idItem);
		wrkRemoveOldStyle.removeAttribute("style");

		jsonImage.Value = pathImageValue;
		this.wrkDocFrag.setAttribute("style", "background-image:url('" + jsonImage.Value + "');");

	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Caricamento dell'Immagine
	* @ignore
	* @param .
	* @returns {null} Carica l'Immagine.
	*/
	Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkDocFrag, IdNameInto);
	};

}


this.HrifImageOld = function (form, jsonImageParam) {

	var jsonImage = (typeof (jsonImageParam) == 'string') ? JSON.parse(jsonImageParam) : jsonImageParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonImage.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.imageValue = jsonImage.Value;
	this.tooltip = jsonImage.Tooltip;
	this.action = jsonImage.Action;

	this.typeObj = 'pattern';

	var wrkImage = document.createElement('img');
	wrkImage.id = this.idItem;
	wrkImage.src = this.imageValue;
	if (jsonImage.TooltipValue) wrkImage.setAttribute('title', jsonImage.Tooltip);
	//	if (typeof(jsonImage.Value)!='undefined' && jsonImage.Value!="") 
	//		wrkImage.setAttribute("style","background-image:url('" + jsonImage.Value + "');");

	this.wrkObj = wrkImage;

	/** Applica il tooltip  all'immagine
	* @param {string} tooltipValue - Testo del tooltip.
	* @returns {null} Applica il tooltip all'immagine.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Applica il tooltip  all'immagine
	* @param {string} tooltipValue - Testo del tooltip.
	* @returns {null} Applica il tooltip all'immagine.
	*/
	this.setAction = function (action) {
		jsonImage.Action = action;
		if (jsonLabel.Action != "") {
			if (this.jsonImage.addEventListener)
				this.jsonImage.addEventListener("click", function () { execPortletAction(jsonImage.PortletId, jsonImage.Action); }, false);
			else if (this.jsonImage.attachEvent) {
				this.jsonImage.attachEvent("onclick", function () { execPortletAction(jsonImage.PortletId, jsonImage.Action); });
			}
		}
	};
	if (typeof (jsonImage.Action) != "undefined" && jsonImage.Action != "")
		this.setAction(jsonImage.Action);

	/** Nasconde l'immagine
	* @param {string} IdItem - Id immagine.
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'immagine.
	*/
	this.Hide = function (preserveSpace) {

		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);

	};

	/** Visualizza l'immagine
	* @param {string} IdItem - Id Immagine.
	* @returns {null} Visualizza l'Immagine.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	/** Carica l'Immagine
	* @param {string} pathImageValue - URL relativo dell'immagine.
	* @returns {null} Carica l'Immagine
	*/
	this.Value = function (pathImageValue) {

		var wrkRemoveOldStyle = document.getElementById(this.idItem);
		wrkRemoveOldStyle.removeAttribute("style");

		jsonImage.Value = pathImageValue;
		this.wrkObj.setAttribute("style", "background-image:url('" + jsonImage.Value + "');");

	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};

	/** Caricamento dell'Immagine
	* @ignore
	* @param .
	* @returns {null} Carica l'Immagine.
	*/
	this.Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkObj, IdNameInto);
	};

};

/** Definizione oggetto Immagine 
* @ignore 
* @param {object} jsonImageParm - Variabile jsonImageParm.
* @returns {object} Oggetto Immagine.
*/
function hrifImage(jsonImageParm) {

	var jsonImage = (typeof (jsonImageParm) == 'string') ? JSON.parse(jsonImageParm) : jsonImageParm;

	var wrkImage = document.createElement('div');
	wrkImage.id = jsonImage.IdItem;

	if (jsonImage.TooltipValue) wrkImage.setAttribute('title', jsonImage.TooltipValue);
	if (jsonImage.Action != "")
		wrkImage.addEventListener("click", execPortletAction.bind(null, jsonImage.PortletId, jsonImage.Action), false);
	var wrkClassName = hrifImageSetStyleString(jsonImage);
	if (wrkClassName != "") {
		hrifAddClass(wrkImage, wrkClassName);
	}

	//wrkImage.setAttribute("style","background-image:url('" + jsonImage.Value + "');height: 50px;background-repeat: no-repeat;");
	if (typeof (jsonImage.Value) != 'undefined' && jsonImage.Value != "")
		wrkImage.setAttribute("style", "background-image:url('" + jsonImage.Value + "');");

	return wrkImage;

}


// fraiva: da cancellare
function hrifImageSetStyle(prtObject, Struct) {

	if (typeof (prtObject) == 'undefined') hrifConsole('[HRIF] hrifImageSetStyle: manca il paramentro "this.nomeoggetto"', 'warn');

	var jsonImageStyle = hrifGetJsonImage();
	jsonImageStyle.Struct = Struct;

	var wrkClassName = hrifCounterSetStyleString(jsonImageStyle);
	// forzatura per aggiungere la classe calcolata all'oggetto di portal studio
	hrifAddClass(prtObject.Ctrl, wrkClassName);

}

// fraiva : al momento non è utilizzato

/**
* @namespace Check
*/


/** Definizione oggetti Toggle
* @memberOf Check
* @class
* @alias HrifToggle
* @param {object} form - this.
* @param {json|object} jsonToggleParam - Proprietà dell'oggetto
* @param {string} jsonToggleParam.Caption - Testo della Label/Caption
* @param {string} [jsonToggleParam.InitValue] - Valore iniziale del check
* @param {string} jsonToggleParam.CheckedValue - Valore del check a true
* @param {string} jsonToggleParam.UncheckedValue - Valore del check a false
* @param {string} [jsonToggleParam.Disabled] - Oggetto disabilitato
* @param {hrifPOSITION} [jsonToggleParam.CaptionPosition] - Posizione della Label/Caption (di default = hrifPOSITION.AUTO)
* @param {string} [jsonToggleParam.Action] - Azione da eseguire al click sull'oggetto 
* @returns {object} Oggetto Toggle.
* @example <caption>Esempio di utilizzo</caption>
*
* // Definisco le proprietà dell'oggetto
* var jsonToggleParm = {};
* jsonToggleParm.InitValue = 1;
* jsonToggleParm.CheckedValue = 1;
* jsonToggleParm.UncheckedValue = 0;
* jsonToggleParm.Caption = FormatMsg("Attiva strumenti");
* jsonToggleParm.Action = "toggle_action";
*
* // Istanzio l'oggetto
* var toggle = new HrifToggle(this, jsonToggleParm); 
* this.hrif_cntTitle.Load(toggle)
*/
this.HrifToggle = function (form, jsonToggleParam) {

	var jsonToggle = (typeof (jsonToggleParam) == 'string') ? JSON.parse(jsonToggleParam) : jsonToggleParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonToggle.IdItem);
	this.idToggle = jsonToggle.IdToggle;
	this.initValue = jsonToggle.InitValue;
	this.checkedValue = (typeof (jsonToggle.CheckedValue) == 'undefined') ? true : jsonToggle.CheckedValue;
	this.uncheckedValue = (typeof (jsonToggle.UncheckedValue) == 'undefined') ? true : jsonToggle.UncheckedValue;
	this.caption = jsonToggle.Caption;
	this.disabled = jsonToggle.Disabled;
	this.captionPosition = (typeof (jsonToggle.CaptionPosition) == 'undefined') ? hrifPOSITION.AUTO : jsonToggle.CaptionPosition;
	this.action = jsonToggle.Action;

	this.typeObj = "pattern";
	this.nameObj = "HrifToggle";
	this.checkValue = false;

	this.portletId = this.form.formid;
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.TOGGLE;
	this.classNameBaseInput = this.classNameBase + '__input';
	this.classNameBaseToggle = this.classNameBase + '__toggle';
	this.classNameBaseToggleCircle = this.classNameBaseToggle + '-circle';
	this.classNameBaseToggleLabel = this.classNameBase + '__label';

	this.idItem = this.form.formid + '_' + this.idItemCalc;
	this.idItemInput = this.idItem + "_i";
	this.idItemToggle = this.idItem + "_t";
	this.idItemToggleCircle = this.idItem + "_c";
	this.idItemToggleLabel = this.idItemCalc + "_l";

	// Istanzio il "toggle"
	this.docToggleSwitchFrag = document.createDocumentFragment();
	documentFrag(this.docToggleSwitchFrag, 'div', this.idItem, '', this.classNameBase);

	// Definizione del checkbox
	this.docCheckBoxFrag = document.createDocumentFragment();
	documentFrag(this.docCheckBoxFrag, 'input', this.idItemInput, '', this.classNameBaseInput);
	this.docCheckBoxFrag.children[0].type = "checkbox";
	this.wrkDocInputFrag = this.docCheckBoxFrag.children[0];
	//this.wrkDocInputFrag.setAttribute('name', this.name);

	this.docToggleSwitchFrag.getElementById(this.idItem).appendChild(this.docCheckBoxFrag);

	// Definizione del toggle
	this.docToggleFrag = document.createDocumentFragment();
	documentFrag(this.docToggleFrag, 'div', this.idItemToggle, '', this.classNameBaseToggle);
	this.docToggleCircleFrag = document.createDocumentFragment();
	documentFrag(this.docToggleCircleFrag, 'div', this.idItemToggleCircle, '', this.classNameBaseToggleCircle);
	this.docToggleFrag.getElementById(this.idItemToggle).appendChild(this.docToggleCircleFrag);

	// Inserisco il toggle nel principale
	this.docToggleSwitchFrag.getElementById(this.idItem).appendChild(this.docToggleFrag);

	this.label = null;
	// Istanzio la label e l'aggiungo al toggle
	if (this.caption.trim() != "") {
		var jsonLabel = {};
		jsonLabel.Label = this.caption;
		this.label = new HrifLabel(this.form, jsonLabel);
		this.label.addClass(this.classNameBaseToggleLabel);
		this.docToggleSwitchFrag.getElementById(this.idItem).appendChild(this.label.wrkObj);
	}

	this.wrkDocFrag = this.docToggleSwitchFrag.children[0];

	// Imposto le proprietà Json del check selezionato
	this.jsonChecked = {};
	this.jsonChecked.IdToggle = this.idToggle;
	this.jsonChecked.Value = this.initValue;

	/** Al click va a settare/eliminare l'attributo "checked" sul toggle 
	* @ignore
	* @param {string} idItemInput - idItem del campo input/toggle
	* @returns {null} Setta/Elimin l'attributo "checked" sul toggle.
	*/
	this.setChecked = function (object, idItemInput, actionCallback) {
		if (!document.getElementById(idItemInput).checked) {
			//document.getElementById(idItemInput).checked = false;
			object.jsonChecked.Value = object.uncheckedValue;
		} else {
			//document.getElementById(idItemInput).checked = true;
			object.jsonChecked.Value = object.checkedValue;
		}
	};

	// Gestisco le azioni da eseguire al click
	if (this.wrkDocFrag.children[0].addEventListener)
		this.wrkDocFrag.children[0].addEventListener("click", this.setChecked.bind(null, this, this.idItemInput, this.actionCallback), false);
	else if (this.wrkDocFrag.attachEvent) {
		this.wrkDocFrag.children[0].attachEvent("onclick", "click", this.setChecked.bind(null, this, this.idItemInput, this.actionCallback));
	}

	this.wrkAction = execPortletActionRetJson.bind(null, this.portletId, this.action, this.jsonChecked);

	if (this.action) {
		if (this.wrkDocFrag.addEventListener)
			this.wrkDocFrag.addEventListener("click", this.wrkAction, false);
		else if (this.wrkDocFrag.attachEvent) {
			this.wrkDocFrag.attachEvent("onclick", this.wrkAction);
		}
	}

	/** Imposta il valore del toggle 
	* @param {boolean} value - Valore del toggle (true/false)
	* @returns {null} Restituisce il valore del toggle.
	*/
	this.Value = function (value) {
		// var result = false;
		var wrkDoc = null;
		
		//		if (typeof(value)!='undefined' && typeof(value)=='boolean') {
		if (typeof (value) != 'undefined') {
			if (document.getElementById(this.idItemInput)) {
				wrkDoc = document.getElementById(this.idItemInput);
			} else {
				wrkDoc = this.wrkDocInputFrag;
			}
			if (value == this.checkedValue) {
//				wrkDoc.setAttribute("checked", "checked");
				wrkDoc.checked = true;
			} else {
//				wrkDoc.removeAttribute("checked");
				wrkDoc.checked = false;
			}
			this.checkValue = value;
		} else {
			this.checkValue = this.uncheckedValue;
		}
	};
	if (this.initValue)
		this.Value(this.initValue);

	/** Valorizza il testo della Label
	* @param {string} captionValue - Testo della Label
	* @returns {null} Valorizza il testo della Label.
	*/
	this.setCaption = function (captionValue) {
		// per asserto la Label deve essere istanziata
		this.caption = captionValue;
		if (this.label != null) {
			this.label.Value(this.caption);
		}
	};

	/** Reperimento valore del toggle
	* @ignore 
	* @returns {null} Restituisce il valore del toggle.
	*/
	this.getValueJson = function () {
		return this.jsonChecked;
	};

	/** Reperimento valore del toggle 
	* @returns {null} Restituisce il valore del toggle.
	*/
	this.getValue = function () {
		var result = this.uncheckedValue;
		if (document.getElementById(this.idItemInput).hasAttribute('checked'))
			result = this.checkedValue;
		return result;
	};

	/** Disabilita l'oggetto
	* @returns {null} Disabilita l'oggetto.
	*/
	this.Disabled = function () {
		this.wrkDocFrag.setAttribute("disabled", "true");
		// this.wrkDocFrag.getElementById(this.idItemInput).setAttribute("disabled","true");
		if (this.isLoaded)
			document.getElementById(this.idItemInput).setAttribute("disabled", "true");
		else
			this.wrkDocInputFrag.setAttribute("disabled", "true");
	};
	if (this.disabled)
		this.Disabled();

	/** Abilita l'oggetto
	* @returns {null} Abilita l'oggetto.
	*/
	this.Enabled = function () {
		this.wrkDocFrag.removeAttribute("disabled");
		if (this.isLoaded)
			document.getElementById(this.idItemInput).removeAttribute("disabled");
		else
			this.wrkDocInputFrag.removeAttribute("disabled");
	};

	/** Nasconde l'oggetto
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	* @returns {null} Visualizza l'oggetto.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Imposta il tooltip
	* @returns {null} Imposta il tooltip.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;
	};

	/** Ridimensiona l'oggetto
	* @param {hrifSIZE} size - Dimesione dell'oggetto: valori ammessi SMALL/MEDIUM/LERGE.
	* @returns {null} Ridimensiona l'oggetto.
	*/
	this.setSize = function (size) {
		if (size != hrifSIZE.SMALL && size != hrifSIZE.MEDIUM && size != hrifSIZE.LARGE) hrifConsole("[HRIF] HrifToggle.setSize: non previste le dimensioni impostate (XSMALL/XLARGE)", 'warn');
		if (size.trim() != "") {
			this.classSize = this.classNameBase + "--" + size;
			this.wrkDocFrag.classList.remove(this.classNameBase + "--small", this.classNameBase + "--medium", this.classNameBase + "--large");
			hrifAddClass(this.wrkDocFrag, this.classSize);
		}
	};

	/** Imposta la Label/Caption nella posizione indicata
	* @param {HrifPOSITION} position - Posizione (LEFT/RIGHT/AUTO).
	* @returns {null} Visualizza la Label/Caption nella posizione.
	*/
	this.setCaptionPosition = function (position) {
		if (position != hrifPOSITION.AUTO && position != hrifPOSITION.LEFT && position != hrifPOSITION.RIGHT) hrifConsole("[HRIF] HrifToggle.setCaptionPosition: non previste le dimensioni impostate (TOP/BOTTOM)", 'warn');
		this.wrkDocFrag.classList.remove(this.classNameBase + "--label-left", this.classNameBase + "--label-top", this.classNameBase + "--label-right", this.classNameBase + "--label-bottom", this.classNameBase + "--label-auto");
		if (position.trim() != "")
			hrifAddClass(this.wrkDocFrag, this.classNameBase + "--label-" + position);
	};
	if (this.captionPosition)
		this.setCaptionPosition(this.captionPosition);

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};


	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};

/** Definizione oggetto HrifCheckBoxGroup 
* @memberOf Check
* @ignore
* @class
* @alias HrifCheckBoxGroup
* @param {object} form - this.
* @param {json|object} jsonCheckBoxGroupParam - Proprietà dell'oggetto
* @param {string} [jsonCheckBoxGroupParam.Label] - Testo della Label
* @param {hrifDIRECTION} [jsonCheckBoxGroupParam.Direction] - Direzione del checkboxgruop (default=Horizontal)
* @param {hrifCHECKGROUPTYPE} [jsonCheckBoxGroupParam.Type] - Tipologia (default=Check)
* @param {hrifPOSITION} [jsonCheckBoxGroupParam.CaptionPosition] - Posizione della Label (default=AUTO)
* @param {boolean} [jsonCheckBoxGroupParam.Disabled] - Disabilitato
* @param {json[]} jsonCheckBoxGroupParam.Elements - Array di Check/Toggle (jsonToggleParam) - Accedi alle proprietà del Toggle -> {@link HrifToggle}
* @returns {object} Oggetto CheckBoxGroup.
* @example <caption>Esempio di utilizzo</caption>
*
* // Definisco le proprietà dell'oggetto
* var jsonCheckBoxGroupParam = {};
* jsonCheckBoxGroupParam.Label = FormatMsg("Cerca in") + ":";
* jsonCheckBoxGroupParam.Elements = [];
* 
* var jsonToggleParm = {};
* jsonToggleParm.InitValue = 0;
* jsonToggleParm.CheckedValue = 1;
* jsonToggleParm.UncheckedValue = 0;
* jsonToggleParm.Caption = FormatMsg("Notizie");
* jsonToggleParm.Action = "checkNot";
* jsonCheckBoxGroupParam.Elements.push(jsonToggleParm);
* 
* var jsonToggleParm = {};
* jsonToggleParm.InitValue = 0;
* jsonToggleParm.CheckedValue = 1;
* jsonToggleParm.UncheckedValue = 0;
* jsonToggleParm.Caption = FormatMsg("Approfondimenti");
* jsonToggleParm.Action = "checkApp";
* jsonCheckBoxGroupParam.Elements.push(jsonToggleParm);
* 
* var jsonToggleParm = {};
* jsonToggleParm.InitValue = 0;
* jsonToggleParm.CheckedValue = 1;
* jsonToggleParm.UncheckedValue = 0;
* jsonToggleParm.Caption = FormatMsg("Scadenziario");
* jsonToggleParm.Action = "checkSca";
* jsonCheckBoxGroupParam.Elements.push(jsonToggleParm);
* 
* var checkBoxGroup = new HrifCheckBoxGroup(this, jsonCheckBoxGroupParam);
* 
* this.hrif_CntSearch.Load(checkBoxGroup);
* 
* function checkNot(check){
*   alert("Notizie : " + check.Value);
* }
* 
* function checkApp(check){
*   alert("Approfondimenti : " + check.Value);
* }
* 
* function checkSca(check){
*   alert("Scadenziario : " + check.Value);
* }
*/
this.HrifCheckBoxGroup = function (form, jsonCheckBoxParam) {

	jsonCheckBoxParam = (typeof (jsonCheckBoxParam) == 'string') ? JSON.parse(jsonCheckBoxParam) : jsonCheckBoxParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonCheckBoxParam.IdItem);

	// proprietà del checkBoxgroup
	this.direction = (typeof (jsonCheckBoxParam.Direction) == 'undefined') ? hrifDIRECTION.HORIZONTAL : jsonCheckBoxParam.Direction;
	this.label = (typeof (jsonCheckBoxParam.Label) == 'undefined') ? "" : jsonCheckBoxParam.Label;
	this.type = (typeof (jsonCheckBoxParam.Type) == 'undefined') ? hrifCHECKGROUPTYPE.CHECK : jsonCheckBoxParam.Type;
	this.captionPosition = (typeof (jsonCheckBoxParam.CaptionPosition) == 'undefined') ? hrifPOSITION.AUTO : jsonCheckBoxParam.CaptionPosition;
	this.disabled = (typeof (jsonCheckBoxParam.Disabled) == 'undefined') ? null : jsonCheckBoxParam.Disabled;
	this.toggles = jsonCheckBoxParam.Elements;
	this.maxElement = 12;
	this.cntElment = this.toggles.length; // numero degli elmenti da visualizzare

	this.typeObj = "pattern";
	this.nameObj = "HrifCheckBoxGroup";
	this.portletId = this.form.formid;
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.CHECKGROUP;
	this.idItem = this.form.formid + '_' + this.idItemCalc;

	if (this.toggles.length > this.maxElement) {
		hrifConsole("[HRIF] HrifCheckBoxGroup: inseriti solo i primi " + this.maxElement + " elementi", 'warn');
		this.cntElment = this.maxElement;
	}

	// Istanzio il "toggleGroup"
	this.docToggleGroupFrag = document.createDocumentFragment();
	documentFrag(this.docToggleGroupFrag, 'div', this.idItem, '', this.classNameBase);
	// add classi aggiuntive
	hrifAddClass(this.docToggleGroupFrag.children[0], this.classNameBase + this.direction.class);
	hrifAddClass(this.docToggleGroupFrag.children[0], this.classNameBase + this.type.class);
	// se passo la label creo oggetto HrifLabel e lo aggiungo
	if (this.label) {
		var jsonLabelParam = {};
		jsonLabelParam.Label = this.label;
		this.hrifLabel = new HrifLabel(this.form, jsonLabelParam);
		this.docToggleGroupFrag.getElementById(this.idItem).appendChild(this.hrifLabel.getObject());
	}

	// aggiungo div container
	/*
	var divContainer = document.createElement('div')
	divContainer.id = this.idItem+"_cnt";
	divContainer.className = this.classNameBase+"_cnt";
	*/

	// ciclo sugli elementi toggle e li aggiungo al div
	for (IdxToggle = 0; IdxToggle < this.cntElment; IdxToggle++) {
		this.toggles[IdxToggle].CaptionPosition = this.captionPosition;
		this.toggle = new HrifToggle(this.form, this.toggles[IdxToggle]);
		//    divContainer.appendChild(this.toggle.getObject());
		this.docToggleGroupFrag.getElementById(this.idItem).appendChild(this.toggle.getObject());
	}
	//  this.docToggleGroupFrag.getElementById(this.idItem).appendChild(divContainer);
	this.wrkDocFrag = this.docToggleGroupFrag.children[0];


	/** Disabilita l'oggetto
	  */
	this.Disabled = function () {
		this.wrkDocFrag.setAttribute("disabled", "true");
		this.disabled = true;
	};
	if (this.disabled != null && this.disabled)
		this.Disabled();

	/** Abilita l'oggetto
	  */
	this.Enabled = function () {
		this.wrkDocFrag.removeAttribute("disabled");
		this.disabled = false;
	};

	/** Nasconde l'oggetto
	  * @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	  */
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	  */
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Reperimento codice Html dell'oggetto
	 *  @ignore
	  * @returns {String}; Stringa contenente il codice Html dell'oggetto.
	  */
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	  * @ignore
	  * @returns {null}; Ritorna l'oggetto.
	  */
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};
};




//// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//// hrifTogglePS 
//// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
///** Definizione oggetto Toggle di PortalStudio - 
//* @memberOf Check
//* @alias hrifToggle
//* @param {object} ctrlParm - Oggetto Check di PortalStudio.
//* @returns {object} Oggetto Check di PortalStudio.
//*/
//function hrifTogglePS(ctrlParm){
//
//	var classNameBase = hrifCLASSBASE.TOGGLEPS;
//	// Reimposto le classi 
//	ctrlParm.CtrlDiv.className = classNameBase + " " + ctrlParm.name + "_ctrl"; 
//  
//}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// hrifToggle 
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Toggle di PortalStudio -
* @memberOf Check
* @class
* @alias hrifToggle 
* @param {object} ctrlParm - Oggetto Check di PortalStudio.
* @returns {object} Oggetto Check di PortalStudio.
*
* @example
*
* // Setto l'oggetto Check di Portal Studio come 'Toggle'
* hrifToggle(this.ChkTogglePS) 
*
*/
function hrifToggle(ctrlParm) {

	var classNameBase = hrifCLASSBASE.TOGGLEPS;
	// Reimposto le classi 
	ctrlParm.CtrlDiv.className = classNameBase + " " + ctrlParm.name + "_ctrl";

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifRadio 
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto generico del radio - 
* @memberOf Check
* @class
* @alias HrifRadio
* @param {object} form - this.
* @param {object|json} jsonRadioParam - Proprietà dell'oggetto 
* @param {json[]} jsonRadioParam.Elements - Elementi dell'oggetto 
* @param {string} jsonRadioParam.Elements.Value - Valore dell'elemento 
* @param {string} jsonRadioParam.Elements.Label - Valore della Label dell'elemento
* @param {string} [jsonRadioParam.Action] - Azione di callback 
* @param {string} [jsonRadioParam.InitValue] - Valore iniziale 
* @param {hrifORIENTATION} [jsonRadioParam.Orientation] - Orientamento
* @param {String} [jsonRadioParam.Tooltip] - Tooltip 
* @param {logic} [jsonRadioParam.Disabled] - Disabilitato 
* @returns {object} Oggetto HrifRadio.
* @example <caption>Esempio di utilizzo</caption> 
*
* // Definisco le proprietà dell'oggetto
* var jsonRadioParam = {};
* jsonRadioParam.Elements = [{"Value" : "uno", "Label" : "Label Uno"} , {"Value" : "due", "Label" : "Label Due"} , {"Value" : "tre", "Label" : "Label Tre"}]
* jsonRadioParam.Action = "radio_selected";
* jsonRadioParam.InitValue = 'due';
* 
* // Istanzio l'oggetto
* var radio = new HrifRadio(this, jsonRadioParam);
* this.hrif_cntTitle.Load(radio)
*/
this.HrifRadio = function (form, jsonRadioParam) {

	var jsonRadio = (typeof (jsonRadioParam) == 'string') ? JSON.parse(jsonRadioParam) : jsonRadioParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonRadio.IdItem);
	this.elements = jsonRadio.Elements;
	this.initValue = jsonRadio.InitValue;
	this.action = jsonRadio.Action;
	this.orientation = (typeof (jsonRadio.Orientation) == 'undefined') ? hrifORIENTATION.VERTICAL : jsonRadio.Orientation;
	this.tooltip = jsonRadio.Tooltip;
	this.disabled = jsonRadio.Disabled;

	this.typeObj = "pattern";
	this.nameObj = "HrifRadio";

	this.portletId = this.form.formid;
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.RADIO;
	this.classNameRadio = this.classNameBase + "__radio";
	this.classNameInput = this.classNameBase + "__input";
	this.classNameCheckMark = this.classNameBase + "__checkmark";
	this.classNameLabel = this.classNameBase + "__label";

	this.idItem = this.idItemCalc + "_rad";

	// Istanzio il Radio
	this.docRadioFrag = document.createDocumentFragment();
	documentFrag(this.docRadioFrag, 'div', this.idItem, '', this.classNameBase + ' ' + this.classNameBase + this.orientation.class);

	
	this.docRadioItemFrag = '';
	// Ciclo su tutti gli elementi passati
	for (IdxElem = 0; IdxElem < this.elements.length; IdxElem++) {
		let IdItemRadio = null;
		IdItemRadio = this.idItem + IdxElem;

		// Elemento (group) 
		this.docRadioItemFrag = document.createDocumentFragment();
		documentFrag(this.docRadioItemFrag, 'div', IdItemRadio, IdItemRadio, this.classNameRadio);

		// Input
		this.docRadioElemFrag = document.createDocumentFragment();
		documentFrag(this.docRadioElemFrag, 'input', this.idItem + '_' + this.elements[IdxElem].Value.toLowerCase(), '', this.classNameInput);
		this.docRadioElemFrag.children[0].type = "radio";
		this.docRadioElemFrag.children[0].name = this.idItem;
		this.docRadioElemFrag.children[0].value = this.elements[IdxElem].Value;
		if (this.initValue == this.elements[IdxElem].Value)
			this.docRadioElemFrag.children[0].checked = true;
		if (this.tooltip) {
			this.docRadioElemFrag.children[0].title = this.tooltip;
		}
		if (this.disabled)
			this.docRadioElemFrag.children[0].disabled = true;

		if (typeof (this.action) != 'undefined' && this.action != '') {
			this.wrkAction = execPortletAction.bind(null, this.portletId, this.action, this.elements[IdxElem].Value);
			if (this.docRadioElemFrag.children[0].addEventListener)
				this.docRadioElemFrag.children[0].addEventListener("click", this.wrkAction, false);
			else if (this.docRadioElemFrag.children[0].attachEvent) {
				this.docRadioElemFrag.children[0].attachEvent("onclick", this.wrkAction);
			}
		}

		this.docRadioItemFrag.getElementById(IdItemRadio).appendChild(this.docRadioElemFrag);

		// Span
		this.docCheckMarkFrag = document.createDocumentFragment();
		documentFrag(this.docCheckMarkFrag, 'span', this.idItem + '_' + this.elements[IdxElem].Value.toLowerCase() + '_ck', '', this.classNameCheckMark);
		this.docRadioItemFrag.getElementById(IdItemRadio).appendChild(this.docCheckMarkFrag);

		// Label
		this.docRadioLabelFrag = document.createDocumentFragment();
		documentFrag(this.docRadioLabelFrag, 'label', this.idItem + '_' + this.elements[IdxElem].Value.toLowerCase() + "_l", '', this.classNameLabel);
		this.docRadioLabelFrag.children[0].htmlFor = this.elements[IdxElem].Value.toLowerCase();
		this.docRadioLabelFrag.children[0].innerText = this.elements[IdxElem].Label;
		if (typeof (this.action) != 'undefined' && this.action != '') {
			this.wrkAction = execPortletAction.bind(null, this.portletId, this.action, this.elements[IdxElem].Value);
			if (this.docRadioLabelFrag.children[0].addEventListener) {
				this.docRadioLabelFrag.children[0].addEventListener("click", this.wrkAction, false);
				//				this.docRadioLabelFrag.children[0].addEventListener("click", this.setChecked.bind(null, this.idItem + '_' + this.elements[IdxElem].Value.toLowerCase(), this.classNameInput), false);
			} else if (this.docRadioLabelFrag.children[0].attachEvent) {
				//				this.docRadioLabelFrag.children[0].attachEvent("onclick", this.setChecked.bind(null, this.idItem + '_' + this.elements[IdxElem].Value.toLowerCase(), this.classNameInput));
				this.docRadioLabelFrag.children[0].attachEvent("onclick", this.wrkAction);
			}

		}

		this.docRadioItemFrag.getElementById(IdItemRadio).appendChild(this.docRadioLabelFrag);

		this.docRadioFrag.getElementById(this.idItem).appendChild(this.docRadioItemFrag);

	}

	this.wrkDocFrag = this.docRadioFrag.children[0];

	/** Setta il valore 
	* @returns {null} Setta il valore 
	*/
	this.setValue = function (value) {
		var inputs = document.getElementsByName(this.idItem);
		for (IdxIn = 0; IdxIn < inputs.length; IdxIn++) {
			if (inputs[IdxIn].value == value) {
				inputs[IdxIn].checked = true;
			}
		}
	};

	/** Reperimento valore 
	* @returns {null} Restituisce il valore 
	*/
	this.getValue = function () {
		var selectElement = document.querySelector('input[name="' + this.idItem + '"]:checked');
		return selectElement.value;
	};

	/** Disabilita l'oggetto
	* @returns {null} Disabilita l'oggetto.
	*/
	this.Disabled = function () {
		if (this.isLoaded) {
			var inputs = document.getElementsByName(this.idItem);
			for (IdxIn = 0; IdxIn < inputs.length; IdxIn++) {
				inputs[IdxIn].disabled = true;
			}
		}
	};

	/** Abilita l'oggetto
	* @returns {null} Abilita l'oggetto.
	*/
	this.Enabled = function () {
		if (this.isLoaded) {
			var inputs = document.getElementsByName(this.idItem);
			for (IdxIn = 0; IdxIn < inputs.length; IdxIn++) {
				inputs[IdxIn].removeAttribute("disabled");
			}
		}
	};

	/** Nasconde l'oggetto
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	* @returns {null} Visualizza l'oggetto.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Imposta il tooltip
	* @returns {null} Imposta il tooltip.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};


};



///** Determina la Struttura del Counter
//* @ignore
//* @param {json|object} jsonCounterParm
//* @returns {string} Struttura del Counter.
//*
//*/
//function hrifImageSetStyleString(jsonImageParm){
//	
//	var jsonImage = (typeof(jsonImageParm)=='string') ? JSON.parse(jsonImageParm) : jsonImageParm;
//	
//	var wrkStructure = (typeof(jsonImage.Struct)=='string') ? eval(jsonImage.Struct) : jsonImage.Struct;
//	
//	var wrkClassName = "";
//	switch (Trim(wrkStructure.TPL.toLowerCase())) {
//		case 'image':
//			//wrkClassName += (typeof(jsonImage.STYLE.CLASS)=="undefined" || jsonImage.STYLE.CLASS=="") ? ""  : jsonImage.STYLE.CLASS;
//			wrkClassName += (typeof(wrkStructure.STYLE.CLASS)=="undefined" || wrkStructure.STYLE.CLASS=="") ? ""  : wrkStructure.STYLE.CLASS;
//			break;
//		default:
//			break;
//	}	
//	
//	return wrkClassName;
//
//}

/** Gestione del log
* @ignore
* @param {string} Text - Testo del log.
* @param {string} Type - Tipologia log (info, error, log, warn)
* @returns Aggiornamento della console del browser.
*/
function hrifConsole(Text, Type) {

	if (Type == 'info')
		console.info(Text);
	else if (Type == 'error')
		console.error(Text);
	else if (Type == 'log')
		console.log(Text);
	else if (Type == 'warn') {
		console.warn(Text);
		//		alert(Text);
	}

}


function documentFrag(docFrag, tagHtml, IdItem, IdName, className, role) {

	var node = document.createElement(tagHtml);
	if (IdItem != '') {
		node.id = IdItem;
	} else if (IdName != '') {
		node.id = IdName;
	}

	if (IdName)
		node.name = IdName;

	if (className != '' && typeof (className) != 'undefined')
		node.className = className;

	if(role)
		node.setAttribute("role",role);

	docFrag.appendChild(node);

	return node;
}


function hrifDocumentRemoveClick(object, funct) {
	if (object.removeEventListener)
		object.removeEventListener("click", funct, false);
	else if (object.detachEvent)
		object.detachEvent("onclick", funct);
}


function hrifSetAction(obj, actionOld, action) {

	// Rimuovo l'eventuale vecchia azione
	if (actionOld != null) {
		hrifDocumentRemoveClick(this.Obj, this.actionOld);
		hrifRemoveClass(this.Obj, "cursor_pointer");
	}

	// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
	// altrimenti non riuscirebbe ad eliminarlo
	this.wrkAction = execPortletAction.bind(null, this.portletId, this.action);
	// Valorizzo la nuova azione
	if ((action != null && action != "")) {
		this.wrkObj.addEventListener("click", this.wrkAction, false);
		hrifAddClass(this.wrkObj, 'cursor_pointer');
	}

}

function removeTagHTML(text) {

	// Elimino h1,h2,h3,h4,h5,h6
	const regexA = /<h\d>/ig;
	text = text.replace(regexA, '');

	const regexC = /<\/h\d>/ig;
	text = text.replace(regexC, '');

	return text;

}


function provaListener(form, object, actionCallback) {

	var wrkDocGrid = document.getElementById(object.ctrlid);
	var gridElements = wrkDocGrid.getElementsByClassName("hrif-toggle-switch");
	var inputElement = null;
	wrkAction = execPortletAction.bind(null, form.formid, actionCallback);

	for (Idx = 0; Idx < gridElements.length; Idx++) {
		inputElement = gridElements[Idx].getElementsByClassName("hrif-toggle-switch__input");
		handler = setChecked.bind(null, form, inputElement[0].id, actionCallback);
		if (!inputElement[0].getAttribute('listClick')) {
			inputElement[0].setAttribute('listClick', 'true');
			if (inputElement[0].addEventListener) {
				inputElement[0].addEventListener("click", handler, false);
			} else if (inputElement[0].attachEvent) {
				inputElement[0].attachEvent("click", setChecked.bind(null, form, inputElement[0].id, actionCallback));
			}
		}
	}

}


function setChecked(form, idItemInput, actionCallback) {

	var result = null;
	if (document.getElementById(idItemInput).hasAttribute('checked')) {
		document.getElementById(idItemInput).removeAttribute("checked");
		result = false;
	} else {
		document.getElementById(idItemInput).setAttribute("checked", "checked");
		result = true;
	}

	// execPortletAction.bind(null, form.formid, actionCallback, result);
	param = '"' + document.getElementById(idItemInput).name + '",' + result;
	eval('ZtVWeb.getPortletById(\'' + form.formid + '\').' + actionCallback + '(' + param + ');');

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Forzature su oggetti di Portal Studio
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
* Questo è uno spazio dei nomi che contiene elementi di documentazione appartenenti alle forzature sul Portlet
*
* @namespace Portlet Action
*
*/

/** Nasconde il Portlet
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" da nascondere
* @returns {null} Nasconde il Portlet.
*/
function hrifPortletHide(form) {
	document.getElementById(form.formid).classList.add(hiddenDisplay);
}

/** Imposta il Portel come Footer
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" 
* @returns {null} Imposta il Portel come Footer.
*/
function hrifPortletFooter(form) {
	document.getElementById(form.formid).classList.add("footer-sheet");
}

/** Imposta le classi per la gestione del Wizard
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" 
* @returns {null} Imposta le classi per la gestione del Wizard.
*/
function hrifSetWizardStyle(form) {
	if (document.getElementById(form.formid + "_tabcontainer")) {
		document.getElementById(form.formid + "_tabcontainer").classList.add("hrvg-wizard");
		hrifSetTitleWhite(form);
	}
}

/** Imposta il titolo con sfondo bianco [al momento utilizzata in CI]
* @ignore 
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" 
* @returns {null} Imposta il titolo con sfondo bianco.
*/
function hrifSetTitleWhite(form) {
	if (document.getElementById(form.formid + "_" + form.title_id)) {
		document.getElementById(form.formid + "_" + form.title_id).classList.add("hrvg-custom-toolbar");
	}
}


/** Imposta le classi della tipologia selezionata sul portlet
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" 
* @param {json|object} jsonPortletParam - Proprietà  
* @param {hrifPORTLETTYPE} jsonPortletParam.Type - Tipologia del portlet
* @param {boolean} [jsonPortletParam.Preloading] - Indica se il portlet prevede una fase di caricamento  
* @param {boolean} [jsonPortletParam.NoBorder] - Non applica i bordi  
* @param {boolean} [jsonPortletParam.ContainFooter] - il portlet contiene un oggetto nel footer
* @param {hrifTYPEACTION} [jsonPortletParam.TypeAction] - Indica l'impostazione del primo button dell'action bar  
* @param {hrifSIZEFORM} [jsonPortletParam.Size] - Indica la dimensione della maschera 
* @returns {null} Imposta le classi della tipologia selezionata sul portlet.
*
* @example
*
* var jsonPortletParam = {};
* jsonPortletParam.Type = hrifPORTLETTYPE.PRIMARY;
* hrifSetPortletType(this, jsonPortletParam);
*
*/
function hrifSetPortletType(form, jsonPortletParam) {

	var jsonPortlet = (typeof (jsonPortletParam) == 'string') ? JSON.parse(jsonPortletParam) : jsonPortletParam;

	//this.form = form;

	var classPortletBody = hrifCLASSBASE.PORTLETBODY;
	var classPortletTitle = hrifCLASSBASE.PORTLETTITLE;
	var classPortletTab = hrifCLASSBASE.PORTLETTABSTRIP;

	this.footerActionMob = (jsonPortletParam.FooterActionMob)?jsonPortletParam.FooterActionMob:false;

	if (jsonPortletParam.Preloading) {
		hrifPreloadRun();
	}

	// Body
	if (document.getElementById(form.formid)) {
		if ((typeof (jsonPortlet.Type) != 'undefined') && jsonPortlet.Type.InternalTab)
			document.getElementById(form.formid).classList.add(classPortletBody );
		else
			document.getElementById(form.formid).classList.add(classPortletBody + "__content");
		
		if (jsonPortletParam.NoBorder)
			document.getElementById(form.formid).classList.add(classPortletBody + "__content--topzero");
	}

	if (document.getElementById(form.formid + "_" + form.title_id + "_container")) {
		document.getElementById(form.formid + "_" + form.title_id + "_container").classList.add(classPortletTitle + "__content");
		if (document.getElementById(form.formid + "_" + form.title_id + "_container").classList.contains("custom_toolbar_container")) {
			document.getElementById(form.formid + "_" + form.title_id + "_container").classList.add(hrifCLASSBASE.TOOLBAR);
			if (typeof (jsonPortlet.TypeAction) != 'undefined') {
				document.getElementById(form.formid + "_" + form.title_id + "_container").classList.add(jsonPortlet.TypeAction.class);
			}
		}
	}

	// Titolo
	if (document.getElementById(form.formid + "_" + form.title_id + "_title_container")) {
		document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(classPortletTitle);
		if (typeof (jsonPortlet.Type) != 'undefined') {
			// Se Primary
			if (jsonPortlet.Type.Primary || jsonPortlet.Type.InternalTab) {
				document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(hrifCLASSBASE.PORTLETTITLE + "--primary");

				
				var divElement = document.getElementById(form.formid + "_container");
    			var iframeElement = divElement.ownerDocument.defaultView.frameElement;

			    if (iframeElement && iframeElement.getAttribute('modallayer') === 'true') {
					document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--isspmodallayer");
//					document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--isspmodallayer");
			    }
				
			}
		}
		if (jsonPortlet.Size) {
			document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(hrifCLASSBASE.PORTLETTITLE + jsonPortlet.Size.class);
		}
		// Se esiste il tabcontainer aggiungo la classe ...--above-tabstrip
		if (document.getElementById(form.formid + "_tabcontainer")) {
			document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(classPortletTitle + "--above-tabstrip");
		}
	}

	// Vado ad inserire la classe nel 'CustomObject' (nel Menù) partendo dall'oggetto Title
	if (form.getTitlePortlet()) {
		form.getTitlePortlet().class_name = classPortletTitle + "__menu";
	}

	if (document.getElementById(form.formid + "_container")) {
		document.getElementById(form.formid + "_container").classList.add(classPortletBody);
		if (typeof (jsonPortlet.Type) != 'undefined') {
			// Se Primary
			if (jsonPortlet.Type.Primary) {
				document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--primary");

				// gestione footer
				if(jsonPortlet.ContainFooter===true)
					document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--footer");
				// Aggiungo un evento sullo scroll
				
//				document.getElementById(form.formid + "_container").addEventListener("scroll", (event) => {
				let wrkDoc = document.body;
				wrkDoc.addEventListener("scroll", (event) => {	
					
					// Aggiungo la classe di scroll 
					document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.add(classPortletTitle + "--scroll");
					
					var container = document.getElementById(form.formid + "_container");
					
					var roundedScrollTop = Math.floor(container.scrollTop);
        			var isAtTop = roundedScrollTop <= 1;  // considera un range di 1px
        			// var isAtBottom = roundedScrollTop >= container.scrollHeight - container.clientHeight - 1;					
				    
				    // Verifica se sei all'inizio del contenuto
				    if (isAtTop) {
				      document.getElementById(form.formid + "_" + form.title_id + "_title_container").classList.remove(classPortletTitle + "--scroll");
				    }
					
				});
    		}
		}
		if (jsonPortlet.Size) {
			document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + jsonPortlet.Size.class);
		}
		// Se esiste il tabcontainer aggiungo la classe ...---below-tabstrip
		if (document.getElementById(form.formid + "_tabcontainer")) {
			document.getElementById(form.formid + "_container").classList.add(classPortletBody + "--below-tabstrip");
		}
	}

	// Tabstrip
	if (document.getElementById(form.formid + "_tabcontainer")) {
		document.getElementById(form.formid + "_tabcontainer").classList.add(hrifCLASSBASE.TABSTRIP);
		document.getElementById(form.formid + "_tabcontainer").classList.add(classPortletTab);
		document.getElementById(form.formid + "_tabcontainer").classList.remove("Tabstrip");
		// Se Primary
		if (jsonPortlet.Type.Primary) {
			document.getElementById(form.formid + "_tabcontainer").classList.add(hrifCLASSBASE.PORTLETTABSTRIP + "--primary");
		}
		if (jsonPortlet.Size) {
			document.getElementById(form.formid + "_tabcontainer").classList.add(hrifCLASSBASE.PORTLETTABSTRIP + jsonPortlet.Size.class);
		}
	}

	// se impostato FooterActionMob aggiungo la gestione per mettere in bottom la toolbar 
	if (this.footerActionMob===true) {
		let _self = form;
		let maxButtons = 2;

		// fix x desktop
		_self.getTitlePortlet().SetMaxToolbarItem(maxButtons + (window.innerWidth <= 768) ? 0 : 1);
		if(document.getElementById(form.getTitlePortletId() + "_toolbar"))
			document.getElementById(form.getTitlePortletId() + "_toolbar").classList.add("hrif2-custom-toolbar");
	

		const targetDiv = form.Ctrl_container;

		// Crea un nuovo oggetto MutationObserver con una funzione di callback

		// if(this.footerActionMob) {
		const observer = new MutationObserver(mutationsList => {
			// Itera attraverso tutte le mutazioni osservate
			for (const mutation of mutationsList) {
				// Verifica se la mutazione riguarda la proprietÃ&nbsp; 'style'
				if (mutation.type === 'attributes' && mutation.attributeName === 'style') {

					// setto il numero massimo dei button da visualizzare 
					_self.getTitlePortlet().SetMaxToolbarItem(maxButtons);
					if(document.getElementById(_self.getTitlePortletId() + "_wrapper"))
						document.getElementById(_self.getTitlePortletId() + "_wrapper").classList.add("hrif2-portlet-title__menu--bottom");

					// disconnetto observer per non mandarlo in loop
					observer.disconnect();
					var tabStripHeight = document.getElementById(_self.formid + '_tabcontainer') ? document.getElementById(_self.formid + '_tabcontainer').offsetHeight : 0;
					var titleHeight = _self.isPortletTitled() ? document.getElementById(_self.getTitlePortletId() + '_title_container').offsetHeight : 0;
					var bottomHeight = (window.innerWidth <= 768 && document.getElementById(_self.getTitlePortletId() + "_toolbar")) ? document.getElementById(_self.getTitlePortletId() + "_toolbar").offsetHeight + 12 : 0;
					var totHeight = (tabStripHeight + titleHeight + bottomHeight) + 0.000001; // aggiungo 0.000001px per fare in modo di ricalcorare ogni volta altezza
					// Modifica l'altezza del div
					mutation.target.style.height = "calc(100% - " + totHeight + "px)";

					// Riconnetti l'observer dopo aver completato la modifica
					observer.observe(targetDiv, { attributes: true });
				}
			}
		});

		// Configura l'observer per osservare i cambiamenti negli attributi del div target
		observer.observe(targetDiv, { attributes: true });
	}

}


/** Imposta le classi della tipologia selezionata sulla Pagelet
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Pagelet" 
* @param {json|object} jsonPageletParam - Proprietà  
* @param {hrifPORTLETTYPE} jsonPageletParam.Type - Tipologia della Pagelet
* @param {boolean} [jsonPageletParam.Preloading] - Indica se la Pagelet prevede una fase di caricamento  
* @param {hrifTYPEACTION} [jsonPageletParam.TypeAction] - Indica l'impostazione del primo button dell'action bar  
* @param {hrifSIZEFORM} [jsonPageletParam.Size] - Indica la dimensione della form
* @returns {null} Imposta le classi della tipologia selezionata sul portlet.
*
* @example
*
* var jsonPageletParam = {};
* jsonPageletParam.Type = { "Primary" : true };
* jsonPageletParam.ResourceTitle = "hrif_header_container"  ;
* jsonPageletParam.ResourceBody = "hrif_body_container"  ;
* hrifSetPageletType(this, jsonPageletParam);
*
*/
function hrifSetPageletType(form, jsonPageletParam) {

	var jsonPagelet = (typeof (jsonPageletParam) == 'string') ? JSON.parse(jsonPageletParam) : jsonPageletParam;

	this.form = form;

	var classPortletBody = hrifCLASSBASE.PAGELETBODY;
	var classPortletTitle = hrifCLASSBASE.PAGELETTITLE;
	var classPortletTab = hrifCLASSBASE.PAGELETTABSTRIP;

	if (jsonPagelet.Preloading) {
		hrifPreloadRun();
	}

	// Titolo
	resTitle = eval(form.resources[jsonPagelet.ResourceTitle]);
	LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE);
	LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].content, hrifCLASSBASE.PAGELETTITLE + "__content");
	if (document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container")) {
		LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE + "--above-tabstrip");
	}
	if (typeof (jsonPagelet.Type) != 'undefined') {
		// Se Primary
		if (jsonPagelet.Type.Primary) {
			LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE + "--primary");
		}
	}
	if (jsonPagelet.Size) {
		LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE + jsonPagelet.Size.class);
	}

	var wrkCustomToolbar = resTitle.content.getElementsByClassName("custom_toolbar_container");
	if (wrkCustomToolbar[0]) {
		wrkCustomToolbar[0].classList.add(hrifCLASSBASE.TOOLBAR);
		if (typeof (jsonPagelet.TypeAction) != 'undefined') {
			wrkCustomToolbar[0].classList.add(jsonPagelet.TypeAction.class);
		}
	}

	// Body	  	
	if (jsonPagelet.ResourceBody) {
		resBody = eval(form.resources[jsonPagelet.ResourceBody]);
		LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceBody].Ctrl, hrifCLASSBASE.PAGELETBODY);
		LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceBody].content, hrifCLASSBASE.PAGELETBODY + "__content");
		if (typeof (jsonPagelet.Type) != 'undefined') {
			// Se Primary
			if (jsonPagelet.Type.Primary) {
				LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceBody].Ctrl, hrifCLASSBASE.PAGELETBODY + "--primary");
				
//				let wrkDoc = document.getElementById(resBody.Ctrl.id)
				let wrkDoc = document.body;
				
				// Seleziona tutti i div con l'attributo ps-group-item all'interno dell'elemento con id="w2eizxce9u_item_group_0_content"
				var divsConPsGroupItem = document.querySelectorAll('#'+ resBody.Ctrl.id + ' [ps-group-item]');

				// Itera attraverso gli elementi selezionati e fai qualcosa con ciascun elemento
//				divsConPsGroupItem.forEach(function(div) {
			    	// Fai qualcosa con l'elemento, ad esempio loggalo in console
//					console.log(div);
				// form.resources[jsonPagelet.ResourceBody].CtrlAggiungo un evento sullo scroll
				wrkDoc.addEventListener("scroll",	(event) => {
					
					// Aggiungo la classe di scroll
					LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE + "--scroll"); 
					
					var container = form.resources[jsonPagelet.ResourceBody].Ctrl;
					
					var roundedScrollTop = Math.floor(container.scrollTop);
        			var isAtTop = roundedScrollTop <= 1;  // considera un range di 1px
        			// var isAtBottom = roundedScrollTop >= container.scrollHeight - container.clientHeight - 1;					
				    
				    // Verifica se sei all'inizio del contenuto
				    if (isAtTop) {
				      LibJavascript.CssClassNameUtils.removeClass(form.resources[jsonPagelet.ResourceTitle].Ctrl, hrifCLASSBASE.PAGELETTITLE + "--scroll");
				    }
					
				});
//				});
								
			}
		}
		if (jsonPagelet.Size) {
			LibJavascript.CssClassNameUtils.addClass(form.resources[jsonPagelet.ResourceBody].Ctrl, hrifCLASSBASE.PAGELETBODY + jsonPagelet.Size.class);
		}
	}

	// Tabstrip
	if (document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container")) {
		document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container").className += " " + hrifCLASSBASE.TABSTRIP + " " + hrifCLASSBASE.PAGELETTABSTRIP;
		document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container").classList.remove("Tabstrip");

		if (typeof (jsonPagelet.Type) != 'undefined') {
			// Se Primary
			if (jsonPagelet.Type.Primary) {
				document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container").classList.add(hrifCLASSBASE.PAGELETTABSTRIP + "--primary");
			}
		}

		if (jsonPagelet.Size) {
			document.getElementById(form.id + "_" + jsonPagelet.ResourceBody + "_tabs_container").classList.add(hrifCLASSBASE.PAGELETTABSTRIP + jsonPagelet.Size.class);
		}
	}

	//	
	//	// Body
	//	if (document.getElementById(form.formid)){
	//		document.getElementById(form.formid).classList.add(hrifCLASSBASE.PORTLETBODY + "__content");
	//	}
	//	
	//	if (document.getElementById(form.formid + "_container")){
	//		document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY);
	//		if (typeof(jsonPagelet.Type)!='undefined'){
	//			// Se Primary
	//			if (jsonPagelet.Type.Primary) {
	//				document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--primary");
	//			}
	//		}
	//		// Se esiste il tabcontainer aggiungo la classe ...---below-tabstrip
	//		if (document.getElementById(form.formid + "_tabcontainer")){
	//			document.getElementById(form.formid + "_container").classList.add(hrifCLASSBASE.PORTLETBODY + "--below-tabstrip");
	//		}
	//	}
	//	
	//	// Tabstrip
	//	if (document.getElementById(form.formid + "_tabcontainer")){
	//		document.getElementById(form.formid + "_tabcontainer").classList.add(hrifCLASSBASE.PORTLETTABSTRIP);
	//		// Se Primary
	//		if (jsonPagelet.Type.Primary) {
	//			document.getElementById(form.formid + "_tabcontainer").classList.add(hrifCLASSBASE.PORTLETTABSTRIP + "--primary");
	//		}
	//	}

}




/** Imposta l'immagine passata nel titolo
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} form - Oggetto "Portlet" 
* @param {string} imageValue - hrifSVG.*
* @returns {null} Imposta l'immagine passata nel titolo.
*/
function hrifSetTitleImage(form, imageValue) {
	if (document.getElementById(form.formid + "_" + form.title_id)) {
		var image = new HrifSvgObj(form, "thrifSVG", imageValue);
		image.setSize(hrifSIZE.SMALL);
		image.setAlignment("top-right");
		document.getElementById(form.formid + "_" + form.title_id).appendChild(image.wrkObj);
	}
}

/** Costanti per la gestione degli stili del SPLinker
* @ignore
* @enum
* @type {string}
*/
const hrifOPENMODETYPE = {
	/** Modal Layer*/
	MODAL_LAYER: 'modal_layer',
	/** Bottom sheet*/
	BOTTOM_SHEET: 'bottom_sheet'

};

/** Costanti per la gestione degli stili del SPLinker
* @ignore
* @enum
* @type {string}
*/
const hrifEXITSTYLE = {
	/** Back*/
	BACK: 'back'

};

/** Gestisce l'apertura del SPLinker nella modalità indicata
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} splinerObject - Oggetto SPLinker
* @param {hrifOPENMODETYPE} modeValue - hrifOPENMODETYPE.*
* @returns {null} Apre l'oggetto nella modalità indicata.
*/
function hrifLinkerOpenMode(splinerObject, modeValue, exitStyle) {

	var classBase = hrifCLASSBASE.MODALLAYER;

	if (typeof (modeValue) != 'undefined' && modeValue != "") {
		switch (modeValue) {
			case hrifOPENMODETYPE.MODAL_LAYER:
				break;
			case hrifOPENMODETYPE.BOTTOM_SHEET:
				classBase += ' ' + hrifCLASSBASE.MODALLAYER + '--bottom-sheet';
				break;
		}
	}

	if (typeof (exitStyle) != 'undefined' && exitStyle != "") {
		switch (exitStyle) {
			case hrifEXITSTYLE.BACK:
				classBase += ' ' + hrifCLASSBASE.MODALLAYER + '--back';
				break;
		}
	}

	splinerObject.setCustomClass(classBase);

}

function hrifNavDraw_setHeader(idNode, textValue, isClickable, imageValue) {

	if (window.parent.ZtVWeb.getPortlet('wdco_wheader')) {
		window.parent.ZtVWeb.getPortlet('wdco_wheader').setHeader(idNode, textValue, isClickable, imageValue);
	}

}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Forzature su oggetti di Portal Studio - Grid
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
* Questo è uno spazio dei nomi che contiene elementi di documentazione appartenenti alle forzature sulle Grid
*
* @namespace Grid
*
*/

/** Costanti per la gestione delle distanze tra le Card di una Grid
* @enum
* @type {string}
*/
const hrifDISTANCE = {
	/** Extra Small*/
	XSMALL: 'xsmall',
	/** Small*/
	SMALL: 'small',
	/** Medium*/
	MEDIUM: 'medium',
	/** Large*/
	LARGE: 'large',
	/** Extra Large*/
	XLARGE: 'xlarge'

};


/** Imposta la tipologia della Grid
* @class hrifGridType
* @memberOf Grid
* @alias hrifGridType
* @param {json|object} jsonGridType - Proprietà della Grid
* @param {object} jsonGridType.Grid - Oggetto griglia (es. this.Grid)
* @param {hrifGRIDTYPE} jsonGridType.GridType - Tipologia della Grid
* @param {hrifGRIDCARDTYPE} jsonGridType.GridCardType - Tipologia della Card presente in Grid
* @param {hrifGRIDLAYOUT} [jsonGridType.GridLayoutWEB] - Tipologia di layout WEB della Card presente in Grid (di Default è WRAP)
* @param {hrifGRIDLAYOUT} [jsonGridType.GridLayoutMobile] - Tipologia di layout MOBILE della Card presente in Grid
* @param {hrifGRIDLAYOUT} jsonGridType.GridLayout - Tipologia di LayOut della Grid
* @param {hrifGRIDLAYOUT} jsonGridType.Style - Proprietà di stile
* @param {hrifGRIDLAYOUT} jsonGridType.Style.Border - Border (true/false)
* @param {hrifGRIDLAYOUT} jsonGridType.Style.RowSelected - Effetto riga selezionata (true/false)
* @param {json} [jsonGridType.EmptyDataParm] - Proprietà del TextEmptyData 
* @param {string} jsonGridType.EmptyDataParm.Title - Testo del Titolo
* @param {json|object} jsonGridType.EmptyDataParm.Message - Testo del Messaggio
* @param {json[]} [jsonGridType.EmptyDataParm.Buttons] - Array dei bottoni
* @param {string} jsonGridType.EmptyDataParm.Buttons.Label - Testo del bottone 
* @param {string} jsonGridType.EmptyDataParm.Buttons.Action - Azione del bottone 
* @returns {null} Carica la grid nella tipologia selezionata.
*
* @description L'utilizzo della funzione deve avvenire una volta caricata la Grid (vedi esempio)
*
* @example <caption>Esempio di utilizzo di hrifGridType</caption>
*
* // Definizione dei parametri da passare alla funzione hrifGridType
* var buttonText = FormatMsg("Nuovo dato");
* 
* var jsonGridType = {};
* jsonGridType.Grid = this.gridCommunications;
* jsonGridType.GridType = hrifGRIDTYPE.CARD;
* jsonGridType.GridCardType = hrifGRIDCARDTYPE.MEDIA;
* jsonGridType.GridCardSize = hrifGRIDCARDSIZE.MEDIA;
* jsonGridType.EmptyDataParm = {};
* jsonGridType.EmptyDataParm.Title = FormatMsg("Nessuna comunicazione");
* jsonGridType.EmptyDataParm.Message = FormatMsg("Non vi sono comunicazioni da visualizzare");
* jsonGridType.EmptyDataParm.Buttons = [{"Label" : buttonText, "Action" : "execAction"}];
* 
* // Richiamo la function
* hrifGridType(this, jsonGridType);
*
* function execAction(){
*	alert("execAction");
* }
*
*/
function hrifGridType(form, jsonType) {

	var className = jsonType.Grid.name + "_ctrl " + hrifCLASSBASE.GRID + ' ';
	jsonType.GridLayoutWEB = (typeof (jsonType.GridLayoutWEB) == "undefined") ? hrifGRIDLAYOUT.HORIZONTAL_WRAP : jsonType.GridLayoutWEB;
	jsonType.GridLayoutMobile = (typeof (jsonType.GridLayoutMobile) == "undefined") ? hrifGRIDLAYOUT.HORIZONTAL_WRAP : jsonType.GridLayoutMobile;
	
	this.gridCardSize = (jsonType.GridCardSize) ? jsonType.GridCardSize : hrifGRIDCARDSIZE.MEDIUM;  

	// Imposto le classi per la tipologia di Grid
	if (jsonType.GridType)
		className += jsonType.GridType.class + " ";

	if (jsonType.GridType == hrifGRIDTYPE.CARD || jsonType.GridType == hrifGRIDTYPE.GRID) {
		// Imposto le classi per la tipologia di Card
		if (jsonType.GridCardType)
			className += jsonType.GridCardType.class + " ";

		// Imposto le classi per il Layout	
		if (jsonType.GridLayoutWEB)
			className += " " + hrifCLASSBASE.GRIDCARD + "--" + jsonType.GridLayoutWEB.class + " ";

		if (jsonType.GridLayoutMobile)
			className += " " + hrifCLASSBASE.GRIDCARD + "--mobile-" + jsonType.GridLayoutMobile.class + " ";

		if (jsonType.GridType == hrifGRIDTYPE.GRID) {
			if (jsonType.Style) {
				if (jsonType.Style.Border)
					className += " " + hrifCLASSBASE.GRIDCARD + "--border";
				if (jsonType.Style.RowSelected)
					className += " " + hrifCLASSBASE.GRIDCARD + "--selected";
			}
		}

		if (jsonType.HiddenCheck)
			className += hrifCLASSBASE.GRID + "--hidden-check";

	}

	// ---------------------- >>>>>>>>>>>>>>>>>>>>>>>
	if (jsonType.CheckCard && (jsonType.Grid.checkboxAll || jsonType.Grid.checkboxAllOfPage)){
		var wrkDoc2 = document.getElementById(jsonType.Grid.ctrlid);
		if (wrkDoc2){
			// if (jsonType.CheckAllCallBack){
				// var jsonButtonParm = {};
				// if (jsonType.Grid.checkboxAllOfPage)
				// 	jsonButtonParm.Label = FormatMsg("Seleziona tutti in pagina");
				// else if (jsonType.Grid.checkboxAll)
				// 	jsonButtonParm.Label = FormatMsg("Seleziona tutto");

				// // Istanzio l'oggetto
				// var btnSelect = new HrifButton(form, jsonButtonParm); 
				// btnSelect.getObject().addEventListener("click", () =>{ 
				// 	jsonType.Grid.AllChecked(true);
				// });	
				
				// wrkDoc2.prepend(btnSelect.getObject());
				
			// }

			var wrkDoc = document.getElementById("tbl_" + jsonType.Grid.ctrlid + "_container");
			wrkDoc.classList.add("hrif2-grid-card-checkbox");
		}

	} else {

		if (jsonType.Grid.class_row_selected.includes('hrif2-grid_row-checked')) {
			// Se è presente, la rimuoviamo
			jsonType.Grid.class_row_selected = jsonType.Grid.class_row_selected.replace('hrif2-grid_row-checked', '');
		}
		
	}
	// <<<<<<<<<<<<<<<<<<<<<<< ---------------------

	// Se prevista la nav bar aggiungo una classe per posizionare correttamente gli elementi
	if (jsonType.Grid.checkboxAll){
		var wrkDoc = document.getElementById("tbl_" + jsonType.Grid.ctrlid + "_container");
		if (wrkDoc)
			wrkDoc.classList.add("hrif2-grid--checkbox");
	}

	//	Dimensioni della card
	if (this.gridCardSize){
		className += " " + this.gridCardSize.class;
	}

	// Se prevista la nav bar aggiungo una classe per posizionare correttamente gli elementi
	if (jsonType.Grid.nav_bar)
		className += " " + "hrif2-grid--pager";

	// Reimposto le classi alla card
	jsonType.Grid.CssClass(className);

	// Imposto le caratteristice per la Grid senza dati
	if (typeof (jsonType.EmptyDataParm) == "undefined") {
		jsonType.EmptyDataParm = {};
	}
	jsonType.EmptyDataParm.Grid = jsonType.Grid;
	hrifSetTextEmptyData(form, jsonType.EmptyDataParm);

}

function trovaElementoConID(elemento, id) {
    // Controlla se l'elemento corrente ha l'ID desiderato
    if (elemento.id === id) {
        return elemento;
    }
    
    // Scansiona tutti i figli dell'elemento corrente
    for (var i = 0; i < elemento.children.length; i++) {
        // Chiama ricorsivamente questa funzione per ogni figlio
        var risultatoRicorsione = trovaElementoConID(elemento.children[i], id);
        // Se l'elemento con l'ID desiderato viene trovato, restituiscilo
        if (risultatoRicorsione !== null) {
            return risultatoRicorsione;
        }
    }
    
    // Se non viene trovato alcun elemento con l'ID desiderato nei figli, restituisci null
    return null;
}

/** Imposta le classi per la Grid di tipo Default
* @class hrifGridDefault
* @memberOf Grid
* @alias hrifGridDefault
* @param {json|object} jsonGrid - Proprietà della Grid
* @param {object} jsonGrid.Grid - Oggetto griglia (es. this.Grid)
* @param {json} [jsonGridType.EmptyDataParm] - Proprietà del TextEmptyData 
* @param {string} jsonGridType.EmptyDataParm.Title - Testo del Titolo
* @param {json|object} jsonGridType.EmptyDataParm.Message - Testo del Messaggio
* @returns {null} Carica la grid di default
*c
* @example
* 
* // Definizione delle proprietà della grid
* let jsonGrid = {}; 
* jsonGrid.Grid = this.GridUsers;
* jsonGrid.EmptyDataParm = {};
* jsonGrid.EmptyDataParm.Title = FormatMsg("Nessuna richiesta");
* jsonGrid.EmptyDataParm.Message = FormatMsg("Non ho trovato risultati per la ricerca selezionata");
* 
* hrifGridDefault(this, jsonGrid);
*
*/
function hrifGridDefault(form, jsonGrid) {

	var className = jsonGrid.Grid.name + "_ctrl " + hrifCLASSBASE.GRID + " " + hrifCLASSBASE.GRID + "--default";

	// Se prevista la nav bar aggiungo una classe per posizionare correttamente gli elementi
	if (jsonGrid.Grid.nav_bar)
		className += " " + "hrif2-grid--pager";

	// Reimposto le classi alla Grid
	jsonGrid.Grid.CssClass(className);

	// Imposto le caratteristice per la Grid senza dati
	if (typeof (jsonGrid.EmptyDataParm) == "undefined") {
		jsonGrid.EmptyDataParm = {};
	}
	jsonGrid.EmptyDataParm.Grid = jsonGrid.Grid;
	hrifSetTextEmptyData(form, jsonGrid.EmptyDataParm);

}

// to do
///** Imposta lo style della Grid
//* @ignore
//* @class hrifSetGridStyle
//* @memberOf Grid
//* @param {object} ctrlParm - Oggetto Grid di PortalStudio (esempio this.Grid.Ctrl).
//* @param {string} styleType - Tipo di Grid (hrifGRIDSTYLE).
//* @param {string} [distanceValue] - Tipo di Grid (hrifDISTANCE).
//* @returns {null} Carica l'Immagine.
//*/
//function hrifGridStyle(ctrlParm, jsonStyle){
//	
//	var className = ctrlParm.name + "_ctrl " + hrifCLASSBASE.GRID + ' ';
//	
//	if (typeof(jsonStyle.Type)!='undefined'){
//		className += jsonStyle.Type.class;
//		// Reimposto le classi alla card
//		ctrlParm.CssClass(className);
//	}
//	
//}


function hrifGridDrag(gridObj) {

	const slider = document.getElementById('tbl' + gridObj.Ctrl.id + '_scroller');
	let isDown = false;
	let startX;
	let scrollLeft;
	slider.addEventListener('mousedown', function (e) {
		isDown = true;
		slider.classList.add('active');
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});
	slider.addEventListener('mouseleave', function () {
		isDown = false;
		slider.classList.remove('active');
	});
	slider.addEventListener('mouseup', function () {
		isDown = false;
		slider.classList.remove('active');
	});
	slider.addEventListener('mousemove', function (e) {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.5;
		slider.scrollLeft = scrollLeft - walk;
	});

}

/** Imposta un oggetto custom default per Grid voute
* @ignore
* @class hrifSetTextEmptyData
* @memberOf Grid
* @param {object} form - Oggetto "Portlet" (this)
* @param {json|object} jsonEmptyDataParm - Prorietà
* @param {object} jsonEmptyDataParm.Grid - Oggetto Grid (es. this.Grid)
* @param {string} jsonEmptyDataParm.Title - Testo del Titolo
* @param {string} jsonEmptyDataParm.Message - Testo del Messaggio
* @param {json[]} [jsonEmptyDataParm.Buttons] - Array dei bottoni
* @param {string} jsonEmptyDataParm.Buttons.Label - Testo del bottone 
* @param {string} jsonEmptyDataParm.Buttons.Action - Azione del bottone 
* @returns {null} Imposta un oggetto custom default per Grid voute
*
* @description L'utilizzo della funzione deve avvenire una volta caricata la Grid (vedi esempio)
*
* @example <caption>Esempio di utilizzo di hrifSetTextEmptyData</caption>
*
* // Definizione dei parametri da passare alla funzione hrifSetTextEmptyData
* var buttonText = FormatMsg("Nuovo dato");
* 
* // Definizione dei parametri
* var jsonGridVoid = {};
* jsonGridVoid.Grid = this.GridVoid;
* jsonGridVoid.Title = FormatMsg("Grazie per il tuo feedback");
* jsonGridVoid.Message = FormatMsg("E' importante per sapere cosa non ti soddisfa.\nCercherò di migliorare in futuro proprio sfruttando i tuoi suggerimenti.");
* jsonGridVoid.Buttons = [{"Label" : buttonText, "Action" : "execAction"}];
* 
* // Richiamo il metodo
* hrifSetTextEmptyData(this, jsonGridVoid);
*
* function execAction(){
*	alert("execAction");
* }
*
*/
function hrifSetTextEmptyData(form, jsonEmptyDataParm) {

	var jsonEmptyData = (typeof (jsonEmptyDataParm) == 'string') ? JSON.parse(jsonEmptyDataParm) : jsonEmptyDataParm;

	this.form = form;
	this.grid = jsonEmptyData.Grid;
	this.title = jsonEmptyData.Title;
	this.message = jsonEmptyData.Message;
	this.buttons = jsonEmptyData.Buttons;

	if (!this.title && !this.message)
		this.title = FormatMsg("HRSYSTEM_NORECORD");

	// Label del titolo
	if (this.title) {
		var jsonTitleParm = {};
		jsonTitleParm.Title = this.title;
		this.titleObj = new HrifTitleSection(this.form, jsonTitleParm);
	}

	// Label del mesaggio	
	if (this.message) {
		var jsonMessageParm = {};
		jsonMessageParm.Label = this.message;
		this.messageObj = new HrifLabel(this.form, jsonMessageParm);
	}

	var classAction = '';
	if (this.buttons) {
		classAction = hrifCLASSBASE.EMPTYGRID + "--action";
	}

	// Definizione prorietà dell' Icona  
	var jsonIcon = {};
	jsonIcon.Icon = hrifICONRECOLORABLE.EMPTY_GRID;
	// Istanzio l'oggetto
	var iconSvgRecol = new HrifIconRecolorable(this, jsonIcon);
	iconSvgRecol.addClass(hrifCLASSBASE.EMPTYGRID + '__media');

	// Costruzione della stringa HTML
	var resultHtml = '';
	resultHtml += '<div class="' + hrifCLASSBASE.EMPTYGRID + ' ' + classAction + '">';
	resultHtml += '<div class="' + hrifCLASSBASE.EMPTYGRID + '__media">' + iconSvgRecol.getHtml() + '</div>';
	resultHtml += '<div class="' + hrifCLASSBASE.EMPTYGRID + '__message">';
	if (this.title) {
		resultHtml += this.titleObj.getHtml();
	}
	if (this.message) {
		resultHtml += this.messageObj.getHtml();
	}
	resultHtml += '</div>';
	if (this.buttons) {
		resultHtml += '<div class="' + hrifCLASSBASE.EMPTYGRID + '__action">';
		for (IdxBtn = 0; IdxBtn < this.buttons.length; IdxBtn++) {
			resultHtml += '<button class="' + hrifCLASSBASE.BUTTON + ' ' + hrifCLASSBASE.BUTTON + '--evidence' + '" onclick="javascript:' + this.form.formid + '.' + this.buttons[IdxBtn].Action + '()">' + this.buttons[IdxBtn].Label + '</button>';
		}
		resultHtml += '</div>';
	}
	resultHtml += '</div>';

	// Forzatura per eliminare i titoli
	if (document.getElementById(this.grid.ctrlid + "_titles_row"))
		document.getElementById(this.grid.ctrlid + "_titles_row").remove();

	// Rimuovo i default ed inserisco la gestione Hrif
	//	grid.Ctrl.classList.add("grid--hrif-no-data");

	grid.SetTextEmptyData(resultHtml);

}


var loadFirst = false;
/** Setta la Grid in modalità "responsiva"
* @ignore
* @class hrifGridResponsive 
* @memberOf Grid
* @param {number} step - step del portlet.
* @param {object} grid - Oggetto Grid di PortalStudio (esempio this.Grid).
* @returns {null} A seconda dello step nasconde/visualizza le colonne impostate.
*/
function hrifGridResponsive(Step, grid) {

	var wrkStep = "step" + Step + " ";

	grid.floatRows = (Step == 100);
	grid.hide_default_titles = (Step == 100);

	// Se non dichiarato istanzio il Map delle Grid
	if (typeof (this.gridSourceMap) == 'undefined') {
		this.gridSourceMap = new Map();
	}

	// Inserisco la grid nel Map
	if (typeof (this.gridSourceMap.get(grid.ctrlid)) == 'undefined') {
		this.wrkGridObj = {
			"gridClassSource": [],
			"gridHiddenSource": [],
			"gridTitleSource": []
		};
		for (Idx = 0; Idx < grid.Cols.length; Idx++) {
			this.wrkGridObj.gridClassSource[Idx] = grid.Cols[Idx].col_class + " ";
			this.wrkGridObj.gridHiddenSource[Idx] = grid.Cols[Idx].hidden;
			this.wrkGridObj.gridTitleSource[Idx] = grid.Cols[Idx].title;
		}
		this.gridSourceMap.set(grid.ctrlid, this.wrkGridObj);
	}

	// Leggo i dati della Grid dal Map
	value = this.gridSourceMap.get(grid.ctrlid);
	for (Idx = 0; Idx < value.gridClassSource.length; Idx++) {
		if (value.gridClassSource[Idx].includes(wrkStep) || value.gridClassSource[Idx] == "") {
			grid.Cols[Idx].hidden = value.gridHiddenSource[Idx];
			grid.Cols[Idx].title = value.gridTitleSource[Idx];
		} else {
			grid.Cols[Idx].hidden = true;
		}
		grid.Cols[Idx].col_class = "";
		if (Step == 100)
			grid.Cols[Idx].title = "";
	}

	// Ricarico la Grid
	if (loadFirst) {
		grid.ChangeLayout();
	} else {
		grid.Refresh();
		loadFirst = true;
	}
}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WRAPPER FEEDBACK
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

this.HrifSystemFeedbackObj = function (form, idItem, titleValue, subtitleValue, svgValue) {
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_feedback.js");
	var sysFeedBack = new HrifSystemFeedback(form, idItem, titleValue, subtitleValue, svgValue);
	return sysFeedBack;
};




// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// WRAPPER CONTAINER
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
this.hrifGetJsonBubbleParm = function () {
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_container.js");
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_information.js");
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_feedback.js");
	var jsonBubbleParm = new hrifGetJsonBubble();
	return jsonBubbleParm;
};
this.HrifBubbleObj = function (form, jsonBubbleParm) {
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_container.js");
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_information.js");
	LibJavascript.RequireLibrary("https://hrportal.network-contacts.it/HRPORTAL/hrif_feedback.js");
	var container = new HrifBubble(form, jsonBubbleParm);
	return container;
};


// SPToolBar	
// Aggiorna in automatico le azioni presenti nella toolbar/titolo in base ai parametri passati
function HrifSetStyleToolbarMenu(form) {
	wrkDoc = document.getElementById(form.formid + "_wrapper");
	if (wrkDoc != null) {
		if (!wrkDoc.classList.contains('sptoolbar_menu--styled'))
			wrkDoc.classList.add('sptoolbar_menu--styled');
	}
}


/** Trasforma testo con markdown in html
* @ignore
* @param {string} textMarkDown - Testo da convertire.
* @returns {string} Testo convertito.
*/
function convertMarkdownToHtml(textMarkDown) {
	return converter.makeHtml(removeTagHTML(textMarkDown));
}



/** Definizione Proprietà/Parametri dell'oggetto Title
* @ignore 
* @class
* @alias JsonTitleParm
* @param {string} JsonTitleParm.IdItem - IdItem dell'oggetto 
* @param {string} [JsonTitleParm.OverTitle] - Descrizione dell'OverTitle 
* @param {string} JsonTitleParm.Title - Descrizione del Title 
* @param {string} [JsonTitleParm.SubTitle] - Descrizione del SubTitle 
* @returns {json|object} Json parametri oggetto Title.
*/
function hrifJsonTitleParm() {
	return {
		IdItem: "",
		OverTitle: "",
		Title: "",
		SubTitle: ""
	};
}



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// BUTTON TYPE
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Imposta la tipologia del Button di PS
* @class hrifButtonType
* @memberOf Button
* @param {object} ctrlParm - Oggetto Button di PortalStudio (esempio this.Button0).
* @param {json|object} styleType - Proprietà del bottone
* @param {hrifBUTTONTYPE} styleType.ButtonType - Tipo di oggetto .
* @param {hrifBUTTONLAYOUT} styleType.ButtonLayout - Layout dell'oggetto.
* @param {hrifBUTTONDISPLAY} styleType.ButtonDisplay - Display dell'oggetto.
* @returns {null} Carica la grid nella tipologia selezionata.
* 
* @example
* 
* // Button Standard Hrif 
* hrifButtonType(this.BtnStart);
*
* oppure
*
* // Button di tipo EVIDENCE
* hrifButtonType(this.BtnStart, {"ButtonType": hrifBUTTONTYPE.EVIDENCE}); 
*
*/
function hrifButtonType(ctrlParm, jsonTypeParm) {

	var jsonType = (typeof (jsonTypeParm) == 'string') ? JSON.parse(jsonTypeParm) : jsonTypeParm;

	if (typeof (jsonType) == 'undefined') {
		jsonType = {};
		jsonType.ButtonType = hrifBUTTONTYPE.NORMAL;
		jsonType.ButtonLayout = hrifBUTTONLAYOUT.CONTAINED;
	}

	var classNameBase = hrifCLASSBASE.BUTTON;
	var className = classNameBase + " ";

	// Imposto le classi per la tipologia del button
	if (jsonType.ButtonType)
		className += classNameBase + "--" + jsonType.ButtonType.class + " ";

	// Imposto le classi per il layout selezionato
	if (jsonType.ButtonLayout)
		className += classNameBase + "--" + jsonType.ButtonLayout.class + " ";

	// Imposto le classi per il Diplay
	if (jsonType.ButtonDisplay)
		className += classNameBase + "--" + jsonType.ButtonDisplay.class + " ";

	// Reimposto le classi alla card
	ctrlParm.Ctrl.className = className + ctrlParm.name + "_ctrl";

}


function hrifGetJsonChipGroup() {
	return {
		IdItem: "",
		WithFilter: "",
		FilterCounter: "",
		FilterAction: "",
		ChipItems: []
	};
}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// IconLabel - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifIconLabel
* @ignore
* @class
* @memberof Labels
* @alias HrifIconLabel
* @param {object} form - this.
* @param {json|object} jsonIconLabel - Proprietà dell'oggetto 
* @param {hrifICON} jsonIconLabel.Icon - Icona da visualizzare 
* @param {string} jsonIconLabel.Label - Descrizione della label  
* @param {string} [jsonIconLabel.Action] - Azione al click (callback)  
* @param {string} [jsonIconLabel.Tooltip] - Descrizione del tooltip
* @param {boolean} [jsonIconLabel.IsTotalizer] - Indica che si tratta di un "totalizzatore"
* @returns {object} Oggetto Icon Label.
*
* @example
*
* // Definizione delle proprietà dell'oggetto
* var jsonIconLabel = {};
* jsonIconLabel.Icon = hrifICON.ALARM;
* jsonIconLabel.Label = FormatMsg('Questa è la descrizione della tua Label');
* 
* // Istanzio l'oggetto
* var iconLabel = new HrifIconLabel(this, jsonIconLabel);
*
* this.hrif_Container.Load(iconLabel);
*/
this.HrifIconLabel = function (form, jsonIconLabelParam) {

	var jsonIconLabel = (typeof (jsonIconLabelParam) == 'string') ? JSON.parse(jsonIconLabelParam) : jsonIconLabelParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonIconLabelParam.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.icon = jsonIconLabel.Icon;
	this.label = jsonIconLabel.Label;
	this.tooltip = jsonIconLabel.Tooltip;
	this.action = jsonIconLabel.Action;
	this.actionParam = jsonIconLabel.ActionParam;
	this.iconStyle = jsonIconLabel.IconStyle;
	this.status = jsonIconLabel.Status;
	this.isTotalizer = jsonIconLabel.IsTotalizer;
	this.typeObj = "pattern";
	this.nameObj = "HrifIconLabel";

	this.tooltipObj = null;

	this.classNameBase = hrifCLASSBASE.ICONLABEL;
	this.classNameBaseIcon = this.classNameBase + "__icon";
	this.classNameBaseLabel = this.classNameBase + "__label";
	this.classNameBaseTotalize = this.classNameBase + "--numeric";

	this.idItemIconLabel = this.idItem + "_il";
	this.idItemIcon = this.idItemCalc + "il_i";
	this.idItemLabel = this.idItemCalc + "il_l";

	// Definizione oggetto Icon + Label
	this.wrkObj = {
		"iconObj": null,
		"labelObj": null
	};

	// Definizione del documento in memoria
	this.docIconLabelFrag = document.createDocumentFragment();
	documentFrag(this.docIconLabelFrag, 'div', this.idItemIconLabel, '', this.classNameBase);

	this.wrkDocFrag = this.docIconLabelFrag.children[0];

	if (this.isTotalizer && typeof (this.label) == 'number')
		hrifAddClass(this.wrkDocFrag, this.classNameBaseTotalize);


	// Controllo compilazione della Label
	if (typeof (this.icon) == 'undefined' || this.icon.trim() == "") {
		hrifConsole("[HRIF] HrifIconLabel: 'icon' obbligatorio", "warn");
		this.icon = hrifICON.ALERT;
	}

	// Controllo compilazione della Label
	if (typeof (this.label) == 'undefined' || (typeof (this.label) == 'string' && this.label.trim() == "")) {
		hrifConsole("[HRIF] HrifIconLabel: 'label' obbligatorio", "warn");
		this.label = "undefined";
	}

	/** Valorizza il Tooltip della IconLabel
	* @ignore
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della IconLabel.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;

		// da reinserire quando alberto ha visto il funzionamento
		// if (this.tooltipObj==null)
		// 	this.tooltipObj = new HrifTooltip(this.form, {"Tooltip": tooltipValue, "ObjectInto" : this.wrkDocFrag});
		// else 
		// 	this.tooltipObj.setTooltip(tooltipValue);
		
		// this.wrkDocFrag.appendChild(this.tooltipObj.getObject());
		// this.wrkDocFrag.classList.add(hrifCLASSBASE.TOOLTIP);
	};
	if (this.tooltip)
		this.setTooltip(this.tooltip);

	this.setIcon = function (iconValue) {
		if (iconValue.trim() != "") {
			this.icon = iconValue;
			if (this.wrkObj.iconObj == null) {
				var jsonIconParm = hrifGetJsonLabel();
				jsonIconParm.IdItem = this.idItemIcon;
				jsonIconParm.Icon = this.icon;
				this.wrkObj.iconObj = new HrifIcon(this.form, jsonIconParm);
				this.wrkObj.iconObj.addClass(this.classNameBaseIcon);
				this.wrkDocFrag.appendChild(this.wrkObj.iconObj.getObject());
			} else {
				this.wrkObj.iconObj.Value(this.icon);
			}
		} else {
			var wrkDoc = document.getElementById(this.form.formid + "_" + this.idItemIcon);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.iconObj = null;
			}
		}

	};
	if (typeof (this.icon) != "undefined" && this.icon != "") {
		this.setIcon(this.icon);
	}


	this.setLabel = function (label) {
		if (typeof (label) == 'number' || (typeof (label) == 'string' && label.trim() != "")) {
			this.label = label;
			if (this.wrkObj.labelObj == null) {
				var jsonLabelParm = hrifGetJsonLabel();
				jsonLabelParm.IdItem = this.idItemLabel;
				jsonLabelParm.Label = this.label;
				this.wrkObj.labelObj = new HrifLabel(this.form, jsonLabelParm);
				this.wrkObj.labelObj.addClass(this.classNameBaseLabel);
				this.wrkDocFrag.appendChild(this.wrkObj.labelObj.getObject());
			} else {
				this.wrkObj.labelObj.Value(this.label);
			}
		} else {
			var wrkDoc = document.getElementById(this.form.formid + "_" + this.idItemLabel);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.labelObj = null;
			}
		}

	};
	if (typeof (this.label) != "undefined" && this.label != "") {
		this.setLabel(this.label);
	}


	/** Dimensiona l'oggetto Icon
	* @ignore	
	* @param {hrifSIZE} size - Dimensione dell'oggetto.
	* @returns {null} Dimensiona l'oggetto Icon.
	*/
	this.setIconSize = function (size) {
		this.wrkObj.iconObj.setSize(size);
	};

	/** Imposta lo stato dell'oggetto Icon
	* @ignore	
	* @param {hrifSTATUS} status - Stato dell'oggetto.
	* @returns {null} Imposta lo stato dell'oggetto Icon.
	*/
	this.setIconStatus = function (status) {
		this.wrkObj.iconObj.setStatus(status);
//		this.wrkObj.labelObj.setStatus(status);
		
	};
	if (typeof (this.status) != 'undefined' && this.status != "")
		this.setIconStatus(this.status);

	/** Imposta la tipologia dell'oggetto Icon
	* @ignore	
	* @param {hrifICONTYPE} typeValue - Tipologia dell'oggetto.	
	* @returns {null} Imposta la tipologia dell'oggetto Icon.
	*/
	this.setIconType = function (typeValue) {
		this.wrkObj.iconObj.setType(typeValue);
	};

	/** Imposta lo stile dell'oggetto Icon
	* @ignore	
	* @param {hrifICONSTYLE} styleValue - Stile dell'oggetto
	* @returns {null} Imposta lo stile dell'oggetto Icon.
	*/
	this.setIconStyle = function (styleValue) {
		this.wrkObj.iconObj.setStyle(styleValue);
	};
	if (typeof (this.iconStyle) != 'undefined' && this.iconStyle != "")
		this.setIconStyle(this.iconStyle);

	/** Imposta l'icona nella posizione indicata
	* @ignore	
	* @param {hrifPOSITION} position - Posizione dell'oggetto (left/right/top/bottom).
	* @returns {null} Visualizza l'icona nella posizione.
	*/
	this.setIconPosition = function (position) {
		this.wrkDocFrag.classList.remove(hrifCLASSBASE.ICONLABEL + "--icon-left", hrifCLASSBASE.ICONLABEL + "--icon-top", hrifCLASSBASE.ICONLABEL + "--icon-right", hrifCLASSBASE.ICONLABEL + "--icon-bottom");
		hrifAddClass(this.wrkDocFrag, this.classNameBase + "--icon-" + position);
	};

	/** Valorizza il testo della Label
	* @ignore	
	* @param {string} label - Testo della Label.
	* @returns {null} Valorizza il testo della Label.
	*/
	this.setLabel = function (label) {
		if (typeof (label) == 'number' || (typeof (label) == 'string' && label.trim() != "")) {
			this.label = label;
			this.wrkObj.labelObj.Value(this.label);
		} else {
			hrifConsole("[HRIF] HrifIconLabelObj.setLabel: il messaggio è un campo obbligatorio", 'warn');
		}
	};

	/** Valorizza il testo della Label con il MarkDown
	* @ignore	
	* @param {string} label - Testo della Label.
	* @returns {null} Valorizza il testo della Label con il MarkDown.
	*/
	this.setLabelMarkdown = function (label) {
		if (label.trim() != "") {
			this.label = label;
			this.wrkObj.labelObj.ValueMarkdown(this.label);
		} else {
			hrifConsole("[HRIF] HrifIconLabelObj.setLabelMarkdown: il messaggio è un campo obbligatorio", 'warn');
		}
	};

	/** Valorizza il colore della Label
	* @ignore	
	* @param {string} color - HrifCOLOR.
	* @returns {null} Valorizza il colore della Label.
	*/
	this.setLabelColor = function (color) {
		this.wrkObj.labelObj.setStyleColor(color);
	};

	/** Valorizza il contrasto della Label
	* @ignore	
	* @param {hrifWEIGHT} weight - Contrasto della Label.
	* @returns {null} Valorizza il contrasto della Label.
	*/
	this.setLabelContrast = function (weight) {
		this.wrkObj.labelObj.setStyleContrast(weight);
	};

	/** Valorizza la tipologia della Label
	* @ignore	
	* @param {hrifLBLSTRUCT} type - Tipologia della Label.
	* @returns {null} Valorizza la tipologia della Label.
	*/
	this.setLabelType = function (type) {
		this.wrkObj.labelObj.setStyleType(type);
	};


	/** Disabilita IconLabel
	* @ignore	
	* @returns {null} Disabilita IconLabel.
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};

	/** Nasconde IconLabel
	* @ignore	
	* @param {boolean} [PreserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza IconLabel
	* @ignore	
	* @returns {null} Visualizza IconLabel.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Imposta l'azione per l'oggetto
	* @ignore	
	* @param {string} action - Azione da eseguire
	* @returns {null} Imposta l'azione per l'oggetto.
	*/
	this.setAction = function (action) {
		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkDocFrag, this.wrkAction);
			hrifRemoveClass(this.wrkDocFrag, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.form.formid, this.action, this.actionParam);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			this.wrkDocFrag.addEventListener("click", this.wrkAction, false);
			hrifAddClass(this.wrkDocFrag, 'cursor_pointer');
		}

		this.actionOld = this.action;

	};
	if (this.action)
		this.setAction(this.action);

	/** Reperimento codice Html dell'oggetto
	* @ignore	
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return hrifGetHtmlAction(this.form.formid, this.wrkDocFrag, this.action);
		//		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	/** Caricamento del IconLabel
	* @ignore
	* @returns {null} carica il IconLabel.
	*/
	this.Load = function (parentObjIdParm) {
		//		if (this.icon && this.label.trim()!=""){
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
		//		}
	};

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Tag - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function hrifJsonTag() {

	return {
		IdItem: "",
		Label: "",
		Type: ""
	};

}

/** Definizione oggetto HrifTag
* @class
* @alias HrifTag
* @param {object} form - this.
* @param {json|object} jsonTag - Proprietà dell'oggetto 
* @param {string} jsonIconLabel.Label - Descrizione della label  
* @param {string} [jsonIconLabel.Tooltip] - Descrizione del tooltip
* @param {string} [jsonIconLabel.IdItem] - Chiave dell'oggetto
* @returns {object} Oggetto Icon Label.
*/
this.HrifTag = function (form, jsonTagParam) {

	var jsonTag = (typeof (jsonTagParam) == 'string') ? JSON.parse(jsonTagParam) : jsonTagParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonTag.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.label = jsonTag.Label;
	this.type = jsonTag.Type;

	this.typeObj = "pattern";
	this.nameObj = "HrifTag";

	this.portletId = this.form.formid;

	this.classNameBase = hrifCLASSBASE.TAG;
	this.classNameOutlined = this.classNameBase + "--outlined";

	var wrkTag = document.createElement('div');
	wrkTag.id = this.idItem;
	wrkTag.innerText = this.label;
	hrifAddClass(wrkTag, this.classNameBase);

	this.wrkObj = wrkTag;

	this.setType = function (type) {
		this.wrkObj.classList.remove(this.classNameOutlined);
		if (type == "outlined")
			hrifAddClass(this.wrkObj, this.classNameOutlined);
	};
	if (typeof (this.type) != "undefined" && this.type.trim() != "");
	this.setType(this.type);

	/** Nasconde il Tag
	* @ignore
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde il Tag.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza il Tag
	* @ignore
	* @returns {null} Visualizza il Tag.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkObj, className);
	};


	/** Reperimento codice Html dell'oggetto
	* @ignore
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	/** Reperimento dell'oggetto
	* @ignore
	* @returns {object} Oggetto Label.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};


	/** Carica l'oggetto
	* @ignore
	* @returns {object} Carica l'oggetto.
	*/
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};

};


function hrifJsonTagsGroup() {

	return {
		IdItem: "",
		Type: "",
		Tags: []
	};

}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TagsGroup - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/** Definizione oggetto HrifTagsGroup
* @class
* @alias HrifTagsGroup
* @param {object} form - this.
* @param {json|object} jsonTagsGroup - Proprietà dell'oggetto 
* @param {json} jsonTagsGroup.Tags - Array di json Tag  
* @returns {object} Oggetto Icon Label.
*/
this.HrifTagsGroup = function (form, jsonTagsGroupParm) {

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonTagsGroupParm.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc + "_tg";
	this.tags = jsonTagsGroupParm.Tags;
	this.typeObj = "pattern";


	this.portletId = this.form.formid;

	this.classNameBase = hrifCLASSBASE.TAGSGROUP;
	this.classNameItem = this.classNameBase + "__item";
	this.classNameLi = this.classNameBase + "__tag";

	this.wrkTagsMap = new Map();

	// Definizione oggetto
	this.wrkObj = {
		"tags": []
	};

	// Creo il documento in memoria
	this.docTagsArrFrag = document.createDocumentFragment();
	documentFrag(this.docTagsArrFrag, 'ul', this.idItem, '', this.classNameBase);

	// Carico gli elementi passati in un array di chips
	for (IdxTag = 0; IdxTag < this.tags.length; IdxTag++) {
		if (typeof (jsonTagsGroupParm.Tags[IdxTag]) != 'undefined' && jsonTagsGroupParm.Tags[IdxTag].trim() != '') {
			this.docTagsLiFrag = document.createDocumentFragment();
			var itemWrk = this.idItem + "_" + IdxTag;
			documentFrag(this.docTagsLiFrag, 'li', itemWrk, '', this.classNameItem);

			var tagParm = hrifJsonTag();
			tagParm.IdItem = this.idItemCalc + "_" + IdxTag + "_dli";
			tagParm.Label = jsonTagsGroupParm.Tags[IdxTag];
			this.wrkObj.tags[IdxTag] = new HrifTag(this.form, tagParm);
			this.wrkObj.tags[IdxTag].addClass(this.classNameLi);
			this.docTagsLiFrag.getElementById(itemWrk).appendChild(this.wrkObj.tags[IdxTag].getObject());
			this.docTagsArrFrag.getElementById(this.idItem).appendChild(this.docTagsLiFrag.children[0]);
		}
	}

	this.wrkDocFrag = this.docTagsArrFrag.children[0];

	this.setType = function (type) {
		for (IdxTag = 0; IdxTag < this.tags.length; IdxTag++) {
			this.wrkObj.tags[IdxTag].setType(type);
		}
	};


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		if (this.isLoaded)
			return document.getElementById(this.idItem).outerHTML;
		else
			return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};


};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifIcon
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifIcon
* @class
* @alias HrifIcon
* @memberof Labels 
* @param {object} form - this.
* @param {json|object} jsonIconParam - Proprietà dell'oggetto 
* @param {hrifICON} jsonIconParam.Icon - Definizione dell'icona
* @param {string} [jsonIconParam.Action] - Azione di callback
* @param {tooltip} [jsonIconParam.Tooltip] - Testo del tooltip 
* @returns {object} Oggetto Icon.
* 
*
* @example 
*
* // Definizione delle proprietà
* var jsonIconParam = {};
* jsonIconParam.Icon = hrifICON.ADD;
* jsonIconParam.Action = "execIcon";
* jsonIconParam.Tooltip = FormatMsg('Testo del tooltip');
* 
* // Istanzione l'oggetto e lo carico nel contenitore 
* var icon = new HrifIcon(this, jsonIconParam);
* 
* this.hrif_Container.Load(icon)
*
*/
this.HrifIcon = function (form, jsonIconParam) {

	var jsonIcon = (typeof (jsonIconParam) == 'string') ? JSON.parse(jsonIconParam) : jsonIconParam;
	this.form = form;
	this.idItemCalc = HrifGetItem(jsonIcon.IdItem);
	this.idItem = (typeof (form) == 'object') ? this.idItem = this.form.formid + "_" + this.idItemCalc + "_ico" : this.idItem = this.idItemCalc + "_ico";
	//	if (typeof(form)=='object')
	//		this.idItem = this.form.formid + "_" + this.idItemCalc + "_ico";
	//	else 
	//		this.idItem = this.idItemCalc + "_ico";
	this.icon = jsonIcon.Icon;
	this.tooltipValue = jsonIcon.Tooltip;
	this.action = jsonIcon.Action;
	this.evidence = (jsonIcon.Evidence) ? jsonIcon.Evidence : false;
	this.wrkAction = null;

	this.type = jsonIcon.Type;
	this.style = jsonIcon.Style;
	this.status = jsonIcon.Status;
	this.size = jsonIcon.Size;

	this.typeObj = 'pattern';
	this.nameObj = "HrifIcon";
	
	this.classNameBase = hrifCLASSBASE.ICON;

	//	this.idItemIcon = this.form.formid + "_ico";
	this.idItemIcon = this.idItem + "_ico";

	// Definisco l'oggetto Icon
	this.wrkObj = document.createElement('span');
	this.wrkObj.id = this.idItem;
	if (this.tooltipValue) this.wrkObj.setAttribute('title', this.tooltipValue);
	hrifAddClass(this.wrkObj, hrifCLASSBASE.ICON);
	// Imposto la classe dell'icon
	this.classNameIconValue = this.classNameBase + "-" + this.icon;
	hrifAddClass(this.wrkObj, this.classNameIconValue);

	if (this.evidence) {
		this.wrkObjBadgeFrag = document.createDocumentFragment();
		documentFrag(this.wrkObjBadgeFrag, 'span', this.idItem + "_b", '', hrifCLASSBASE.BADGE);
		if (this.status)
			hrifAddClass(this.wrkObjBadgeFrag.children[0], hrifCLASSBASE.BADGE + "--" + this.status);
		this.wrkObj.appendChild(this.wrkObjBadgeFrag.children[0]);
	}


	/** Valorizza il testo della Label (gestisce anche il refresh/reload de una )
	* @ignore
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.Value = function (iconValue) {
		this.icon = iconValue;
		hrifRemoveClass(this.wrkObj, this.classNameIconValue);
		// Imposto la classe dell'icon
		this.classNameIconValue = this.classNameBase + "-" + this.icon;
		hrifAddClass(this.wrkObj, this.classNameIconValue);
	};

	/** Disabilita la Label
	* @returns {null} Disabilita la Label.
	* @ignore
	*/
	this.Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};

	/** Abilita l'oggetto
	* @ignore
	* @returns {null} Abilita l'oggetto.
	*/
	this.Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};

	/** Valorizza il Tooltip della Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Imposta l'azione per l'oggetto
	* @ignore
	* @param {string} action - Azione da eseguire al click
	* @returns {null} Imposta l'azione per l'oggetto.
	*/
	this.setAction = function (action) {
		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.form.formid, this.action);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			this.wrkObj.addEventListener("click", this.wrkAction, false);
			hrifAddClass(this.wrkObj, 'cursor_pointer');
		}

		this.actionOld = this.action;

	};
	this.setAction(this.action);

	this.setActionCustom = function (actionCustom) {
		if ((actionCustom != null && actionCustom != "")) {
			this.wrkObj.addEventListener("click", actionCustom, false);
		}
	};

	/** Nasconde l'oggetto
	* @ignore
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto.
	*/
	this.Hide = function (preserveSpace) {

		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);

	};

	/** Visualizza l'oggetto
	* @ignore
	* @returns {null} Visualizza l'oggetto.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	/** Imposta la tipologia dell'oggetto
	* @ignore
	* @param {hrifICONTYPE} typeValue - Tipologia dell'oggetto.	
	* @returns {null} Imposta la tipologia dell'oggetto.
	*/
	this.setType = function (typeValue) {
		this.type = typeValue;
		this.wrkObj.classList.remove("hrvg-icon--icon", "hrvg-icon--outlined", "hrvg-icon--circled");
		if (this.type.trim() != "") {
			var wrkClass = this.classNameBase + "--" + this.type;
			hrifAddClass(this.wrkObj, wrkClass);
		}
	};
	if (typeof (this.type) != 'undefined' && this.type != "")
		this.setType(this.type);

	/** Imposta lo stile dell'oggetto
	* @ignore
	* @param {hrifICONSTYLE} styleValue - Stile dell'oggetto.	
	* @returns {null} Imposta lo stile dell'oggetto.
	*/
	this.setStyle = function (styleValue) {
		this.style = styleValue;
		this.wrkObj.classList.remove("hrvg-icon--regular", "hrvg-icon--filled", "hrvg-icon--tinted");
		if (this.style.trim() != "") {
			var wrkClass = this.classNameBase + "--" + this.style;
			hrifAddClass(this.wrkObj, wrkClass);
		}
	};
	if (typeof (this.style) != 'undefined' && this.style != "")
		this.setStyle(this.style);

	/** Imposta lo stato dell'oggetto
	* @ignore
	* @param {hrifSTATUS} statusValue - Valore stato dell'oggetto.	
	* @returns {null} Imposta lo stile dell'oggetto.
	*/
	this.setStatus = function (statusValue) {
		this.status = statusValue;
		this.wrkObj.classList.remove("hrvg-icon--primary", "hrvg-icon--success", "hrvg-icon--warning", "hrvg-icon--danger", "hrvg-icon--info");
		if (this.status.trim() != "") {
			var wrkClass = this.classNameBase + "--" + this.status;
			hrifAddClass(this.wrkObj, wrkClass);
		}
	};
	if (typeof(this.status) != 'undefined' && this.status != "" && !this.evidence)
		this.setStatus(this.status);


	/** Imposta la dimensione dell'oggetto
	* @ignore
	* @param {hrifSIZE} sizeValue - Dimensione dell'oggetto.	
	* @returns {null} Imposta la dimensione dell'oggetto.
	*/
	this.setSize = function (sizeValue) {
		this.size = sizeValue;
		this.wrkObj.classList.remove("hrvg-icon--xsmall", "hrvg-icon--small", "hrvg-icon--medium", "hrvg-icon--large", "hrvg-icon--xlarge", "hrvg-icon--xxlarge");
		if (this.size.trim() != "") {
			var wrkClass = this.classNameBase + "--" + this.size;
			hrifAddClass(this.wrkObj, wrkClass);
		}
	};
	if (typeof (this.size) != 'undefined' && this.size != "")
		this.setSize(this.size);

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkObj, className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {string} Ritorna la stringa contente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
		//		if (this.action){
		//			var pippo = "";
		//			pippo = this.wrkObj.outerHTML;
		//			ivan = pippo.replace('id','onclick ="event.stopPropagation();javascript:'+this.form.formid + '.' + this.action + '() id');
		//			return ivan;
		//		} else {
		//			this.wrkObj.outerHTML;
		//		} 

	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkObj;
	};

	/** Caricamento dell'oggetto
	* @ignore	
	* @returns {null} Caricamento dell'oggetto.
	*/
	this.Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkObj, IdNameInto);
	};

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifIconTinted
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifIconTited
* @class
* @alias HrifIconTinted
* @memberof Labels 
* @param {object} form - this.
* @param {json|object} jsonIconParam - Proprietà dell'oggetto 
* @param {hrifICON} jsonIconParam.Icon - Definizione dell'icona
* @param {string} [jsonIconParam.Action] - Azione di callback
* @param {string} [jsonIconParam.Tooltip] - Testo del tooltip 
* @returns {object} Oggetto IconTinted.
* 
*
* @example 
*
* // Definizione delle proprietà
* var jsonIconParam = {};
* jsonIconParam.Icon = hrifICONTINTED.BADGE;
* jsonIconParam.Action = "execIcon";
* jsonIconParam.Tooltip = FormatMsg('Testo del tooltip');
* 
* // Istanzio l'oggetto e lo carico nel contenitore 
* var iconTinted = new HrifIconTinted(this, jsonIconParam);
* 
* this.hrif_Container.Load(iconTinted)
*
*/
this.HrifIconTinted = function (form, jsonIconTintedParam) {

	var jsonIcon = (typeof (jsonIconTintedParam) == 'string') ? JSON.parse(jsonIconTintedParam) : jsonIconTintedParam;
	jsonIcon.Style = hrifICONSTYLE.TINTED;

	this.iconTinted = new HrifIcon(form, jsonIcon);

	/** Reperimento codice Html dell'oggetto
	* @ignore	
	* @returns {string} Ritorna la stringa contente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.iconTinted.getHtml();
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.iconTinted.getObject();
	};

	/** Caricamento dell'oggetto
	* @ignore	
	* @returns {null} Caricamento dell'oggetto.
	*/
	this.Load = function (IdNameInto) {
		appendObjectIntoDocument(this.iconTinted.getObject(), IdNameInto);
	};

};



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifIconRecolorable
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Icon Recolorable
* @class
* @param {object} form - this.
* @param {json|object} jsonIcon - Proprietà dell'oggetto
* @param {hrifICONRECOLORABLE} jsonIcon.Icon - hrifICONRECOLORABLE
* @param {string} [jsonIcon.Action] - Azione di callback
* @param {string} [jsonIcon.Tooltip] - Descrizione del tooltip
* @returns {object} Oggetto Icon .
*
* @example
*
* // Definizione prorietà dell' Icona  
* var jsonIcon = {}
* jsonIcon.Icon = hrifICONRECOLORABLE.BUSINESS_DOCUMENTATION
*
* // Istanzio l'oggetto
* var icon = new HrifIconRecolorable(this, jsonIcon);
*
* // Carico l'oggetto in un container
* this.hrif_cnt1.Load(icon);
*
*
*/
this.HrifIconRecolorable = function (form, jsonIconParam) {

	var jsonIcon = (typeof (jsonIconParam) == 'string') ? JSON.parse(jsonIconParam) : jsonIconParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonIcon.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.icon = jsonIcon.Icon;
	this.action = jsonIcon.Action;
	this.evidence = jsonIcon.Evidence;
	this.tooltip = jsonIcon.Tooltip;
	this.typeObj = 'pattern';

	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.ICONRECOLORABLE;

	this.statusSvg = "";
	this.classSize = "";
	this.alignment = "";
	this.genericClass = "";
	this.actionOld = null;

	//	this.wrkObjFrag = document.createDocumentFragment();
	//	documentFrag(this.wrkObjFrag, 'div', this.idItem, '', this.classNameBase);
	//	// Istanzio l'oggetto Svg
	//	var svgObj = new XMLHttpRequest();
	//
	//	svgObj.open("GET", "../" + ZtVWeb.theme +"/hrvg/recolorable-icons/pastel/" + this.icon, false);
	//	svgObj.overrideMimeType("image/svg+xml");
	//	svgObj.parentIdItem = this.idItem;
	//	svgObj.send("");
	//	this.wrkObjFrag.getElementById(this.idItem).appendChild(svgObj.responseXML.documentElement);
	//	
	//	/** Imposta l'azione per l'oggetto
	//	* @ignore
	//	* @param {string} action - Azione da eseguire al click
	//	* @returns {null} Imposta l'azione per l'oggetto.
	//	*/
	//	this.setAction = function(action){
	//		this.action = action;
	//		
	//		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
	//		// altrimenti non riuscirebbe ad eliminarlo
	//		this.wrkAction = execPortletAction.bind(null, this.form.formid, this.action);
	//		// Valorizzo la nuova azione
	//		if ((this.action!=null && this.action!="")){
	//			if (this.wrkObjFrag.children[0].addEventListener){	
	//				this.wrkObjFrag.children[0].addEventListener("click", this.wrkAction, false);
	//			} else if (this.wrkObjFrag.children[0].attachEvent){
	//				this.wrkObjFrag.children[0].attachEvent("onclick",this.wrkAction);
	//			}
	//		}
	////		this.wrkObj.addEventListener("click", this.wrkAction, false);
	//		hrifAddClass(this.wrkObjFrag.children[0],'cursor_pointer');
	//	}
	//	if (this.action)
	//		this.setAction(this.action);
	//		
	//	this.wrkObj = this.wrkObjFrag.children[0];	

	this.wrkObj = null;

	/** Visualizza l'oggetto svg
	* @ignore
	* @returns {null} Visualizza l'oggetto svg.
	*/
	this.Show = function () {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifRemoveClass(wrkDoc, hiddenDisplay);
		hrifRemoveClass(wrkDoc, hiddenVisibility);
	};

	/** Nasconde l'oggetto svg
	* @ignore
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto svg.
	*/
	this.Hide = function (preserveSpace) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(wrkDoc, wrkClass);
	};

	//	/** Imposta il tooltip
	//	* @param {string} tooltip - Contenuto del tooltip.
	//	* @returns {null} Valorizza il tooltip.
	//	*/	
	//	this.setTooltip = function(tooltip){
	//		var wrkDoc = "";
	//		if (this.isLoaded){
	//			wrkDoc = document.getElementById(this.idItem);
	//		} else {
	//			wrkDoc = this.wrkObj;
	//		}
	//		wrkDoc.title = tooltip;
	//		this.tooltip = tooltip;
	//	}
	//	if (this.tooltip)
	//		this.setTooltip(this.tooltip);


	/** Imposta il dimensionamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Carica l'oggetto ridimensionato.
	*/
	this.setSize = function (size) {
		if (size == hrifSIZE.XSMALL || size == hrifSIZE.XLARGE) hrifConsole("[HRIF] .setSize() SVG - : non previste le dimensioni impostate (XSMALL/XLARGE)", 'warn');

		this.classSize = this.classNameBase + "--" + size;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--small", hrifCLASSBASE.SVG + "--medium", hrifCLASSBASE.SVG + "--large");
		hrifAddClass(wrkDoc, this.classSize);

	};

	/** Imposta l'allineamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Allinea l'oggetto Svg.
	*/
	this.setStyleColor = function (statusSvg) {
		this.statusSvg = this.classNameBase + "--" + statusSvg;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--primary", hrifCLASSBASE.SVG + "--success", hrifCLASSBASE.SVG + "--danger", hrifCLASSBASE.SVG + "--warning", hrifCLASSBASE.SVG + "--info");
		hrifAddClass(wrkDoc, this.statusSvg);
	};

	/** Imposta l'allineamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Allinea l'oggetto Svg.
	*/
	this.setAlignment = function (align) {
		this.alignment = this.classNameBase + "--" + align;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--left", hrifCLASSBASE.SVG + "--top-left", hrifCLASSBASE.SVG + "--top", hrifCLASSBASE.SVG + "--top-right", hrifCLASSBASE.SVG + "--center", hrifCLASSBASE.SVG + "--right", hrifCLASSBASE.SVG + "--bottom-left", hrifCLASSBASE.SVG + "--bottom", hrifCLASSBASE.SVG + "--bottom-right");
		hrifAddClass(wrkDoc, this.alignment);
	};

	this.addClass = function (className) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifAddClass(wrkDoc, className);
		this.genericClass += " " + className;
	};

	this.removeClass = function (className) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifRemoveClass(wrkDoc, className);
	};

	this.getHtml = function () {
		if (this.wrkObj == null)
			this.makeIcon();
		return this.wrkObj.outerHTML;
	};

	this.getObject = function () {
		if (this.wrkObj == null)
			this.makeIcon();
		return this.wrkObj;
	};

	this.makeIcon = function () {

		this.wrkObjFrag = document.createDocumentFragment();
		documentFrag(this.wrkObjFrag, 'div', this.idItem, '', this.classNameBase);

		// Istanzio l'oggetto Svg
		var svgObjRec = new XMLHttpRequest();
		svgObjRec.open("GET", "../" + ZtVWeb.theme + "/hrvg/recolorable-icons/pastel/" + this.icon, false);
		svgObjRec.overrideMimeType("image/svg+xml");
		svgObjRec.parentIdItem = this.idItem;
		svgObjRec.send("");

		if (this.evidence) {
			this.wrkObjBadgeFrag = document.createDocumentFragment();
			documentFrag(this.wrkObjBadgeFrag, 'span', this.idItem + "_b", '', hrifCLASSBASE.BADGE);
			this.wrkObjFrag.getElementById(this.idItem).appendChild(this.wrkObjBadgeFrag.children[0]);
		}

		//		this.wrkObjFrag.getElementById(this.idItem).appendChild(svgObjRec.responseXML.documentElement);

		this.wrkObj = this.wrkObjFrag.children[0];

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.form.formid, this.action);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkObj.addEventListener) {
				this.wrkObj.addEventListener("click", this.wrkAction, false);
			} else if (this.wrkObj.attachEvent) {
				this.wrkObj.attachEvent("onclick", this.wrkAction);
			}
		}

		this.wrkObj.insertAdjacentHTML('beforeend', svgObjRec.response.replace(/\r?\n|\r/gm, ""));
		//		var doc = new DOMParser().parseFromString(svgObjRec.response,'application/xml')
		//		this.wrkObj.innerHTML = doc.children[0].outerHTML;
	};

	/** Caricamento dell'Immagine
	* @ignore
	* @param .
	* @returns {null} Carica l'Immagine.
	*/
	this.Load = function (parentObjIdParm) {
		var classDiv = (this.classSize != "") ? this.classNameBase + ' ' + this.classSize : this.classNameBase;
		this.wrkObj = createDocumentChild('div', parentObjIdParm, this.idItem, '', classDiv);
		// appendObjectIntoDocument(this.wrkObj.children[0], parentObjIdParm);
		// Definizione del tooltip, stato e allineamento
		if (this.tooltip != "") this.wrkObj.title = this.tooltip;
		if (this.statusSvg != "") hrifAddClass(this.wrkObj, this.statusSvg);
		if (this.alignment != "") hrifAddClass(this.wrkObj, this.alignment);
		if (this.genericClass != "") hrifAddClass(this.wrkObj, this.genericClass);

		if (this.evidence) {
			this.wrkObjBadgeFrag = document.createDocumentFragment();
			documentFrag(this.wrkObjBadgeFrag, 'span', this.idItem + "_b", '', hrifCLASSBASE.BADGE);
			this.wrkObj.appendChild(this.wrkObjBadgeFrag.children[0]);
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.form.formid, this.action);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkObj.addEventListener) {
				this.wrkObj.addEventListener("click", this.wrkAction, false);
			} else if (this.wrkObj.attachEvent) {
				this.wrkObj.attachEvent("onclick", this.wrkAction);
			}
		}
		//		this.wrkObj.addEventListener("click", this.wrkAction, false);
		hrifAddClass(this.wrkObj, 'cursor_pointer');

		// Istanzio l'oggetto Svg
		var svgObjRec = new XMLHttpRequest();
		svgObjRec.open("GET", "../" + ZtVWeb.theme + "/hrvg/recolorable-icons/pastel/" + this.icon, false);
		svgObjRec.overrideMimeType("image/svg+xml");
		svgObjRec.parentIdItem = this.idItem;
		svgObjRec.onload = function (e) {
			// Asincrona - al termine del caricamento aggiungo l'oggetto svg al documento
			document.getElementById(svgObjRec.parentIdItem).appendChild(svgObjRec.responseXML.documentElement);
		};
		svgObjRec.send("");
		this.isLoaded = true;
	};

};






this.HrifStatusObj = function (form, jsonStatusParm) {

	var jsonStatus = (typeof (jsonStatusParm) == 'string') ? JSON.parse(jsonStatusParm) : jsonStatusParm;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonStatus.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.label = jsonStatus.Label;
	this.status = jsonStatus.Status;
	this.tooltip = jsonStatus.Tooltip;
	this.typeObj = "pattern";

	this.wrkObj = null;

	if (typeof (this.label) != 'undefined' && this.label.trim() != "") {
		var jsonHighLightBoxParm = {};
		jsonHighLightBoxParm.Label = this.label;
		jsonHighLightBoxParm.Status = this.status;
		jsonHighLightBoxParm.Tooltip = this.tooltip;
		this.wrkObj = new HrifHighlightbox(this.form, jsonHighLightBoxParm);
	}


	this.getHtml = function () {
		return this.wrkObj.getHtml();
	};

	this.getObject = function () {
		if (typeof (this.label) != 'undefined' && this.label.trim() != "") {
			return this.wrkObj.getObject();
		} else {
			//			this.wrkObj = document.createElement('span');
			//			this.wrkObj.hidden = true;
			return this.wrkObj;
		}

	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj.getObject(), parentObjIdParm);
	};	
};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifIconsGroup - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifIconsGroup
* @class
* @alias HrifIconsGroup
* @param {object} form - this.
* @param {json|object} jsonIconsGroupParam - Proprietà delle icone
* @param {hrifICON} jsonIconsGroupParam.Icon - Array di Icone
* @returns {object} Oggetto Icon.
*/
this.HrifIconsGroup = function (form, jsonIconsGroupParam) {

	var jsonIconsGroup = (typeof (jsonIconsGroupParam) == 'string') ? JSON.parse(jsonIconsGroupParam) : jsonIconsGroupParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonIconsGroup.IdItem);
	this.idItem = (this.form.formid) ? this.form.formid + "_" + this.idItemCalc + "_ig" : this.idItemCalc + "_ig";
	this.iconsObj = jsonIconsGroup.IconsObj;
	this.direction = (jsonIconsGroup.Direction) ? jsonIconsGroup.Direction : hrifDIRECTION.HORIZONTAL;
	this.typeObj = "pattern";

	this.portletId = this.form.formid;

	this.classNameBase = hrifCLASSBASE.ICONSGROUP;
	this.classNameItem = this.classNameBase + "__item";
	this.classNameLi = this.classNameBase + "__icon";

	this.wrkTagsMap = new Map();

	// Definizione oggetto
	this.wrkObj = {
		"icons": []
	};

	// Creo il documento in memoria
	this.docIconsArrFrag = document.createDocumentFragment();
	documentFrag(this.docIconsArrFrag, 'ul', this.idItem, '', this.classNameBase + " " + this.classNameBase + this.direction.class);

	// Carico gli elementi passati in un array di chips
	for (IdxIcons = 0; IdxIcons < this.iconsObj.length; IdxIcons++) {
		if (typeof (this.iconsObj[IdxIcons].Icon) != 'undefined' && this.iconsObj[IdxIcons].Icon.trim() != '') {
			this.docIconsLiFrag = document.createDocumentFragment();
			var itemWrk = this.idItem + "_" + IdxIcons;
			documentFrag(this.docIconsLiFrag, 'li', itemWrk, '', this.classNameItem);

			var iconParm = {};
			iconParm.IdItem = this.idItemCalc + "_" + IdxIcons + "_ili";
			iconParm.Icon = this.iconsObj[IdxIcons].Icon;
			this.wrkObj.icons[IdxIcons] = new HrifIcon(this.form, iconParm);
			this.wrkObj.icons[IdxIcons].addClass(this.classNameLi);
			this.docIconsLiFrag.getElementById(itemWrk).appendChild(this.wrkObj.icons[IdxIcons].getObject());
			this.docIconsArrFrag.getElementById(this.idItem).appendChild(this.docIconsLiFrag.children[0]);
		}
	}

	this.wrkDocFrag = this.docIconsArrFrag.children[0];


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifIconLabelGroup
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifIconLabelGroup
* @class
* @alias HrifIconLabelGroup
* @param {object} form - this.
* @param {json|object} jsonIconLabelGroupParam - Elenco Icon Label
* @param {hrifDIRECTION} [jsonIconLabelGroupParam.Direction] - Direzione dell'oggetto (default = HORIZONTAL)
* @param {json|object} jsonIconLabelGroupParam.IconLabelObj - Array 
* @param {hrifICON} jsonIconLabelGroupParam.IconLabelObj.Icon - Icona
* @param {string} jsonIconLabelGroupParam.IconLabelObj.Label - Valore della Label
* @returns {object} Oggetto HrifIconLabelGroup.
*
* @example
*
* // Definizione delle proprietà dell'oggetto
* var jsonParam = {
*	"Direction": hrifDIRECTION.HORIZONTAL,
*	"IconLabelObj": [
*		{
*			"Icon": hrifICON.STAR,
*			"Label": FormatMsg("Label della stella")
*		},
*		{
*			"Icon": hrifICON.ALARM,
*			"Label": FormatMsg("Label Allarme")
*		},
*		{
*			"Icon": hrifICON.ARCHIVE,
*			"Label": FormatMsg("Label archivio")
*		}
*	]
*}
*
* // Istanzio l'oggetto
* var iconLabelGroup = new HrifIconLabelGroup(this, jsonParam); 
* this.hrif_Container.Load(iconLabelGroup)
*/
this.HrifIconLabelGroup = function (form, jsonIconLabelGroupParam) {

	var jsonIconLabelGroup = (typeof (jsonIconLabelGroupParam) == 'string') ? JSON.parse(jsonIconLabelGroupParam) : jsonIconLabelGroupParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonIconLabelGroup.IdItem);
	this.idItem = (this.form.formid) ? this.form.formid + "_" + this.idItemCalc + "_ig" : this.idItemCalc + "_ig";
	this.iconsLabelObj = jsonIconLabelGroup.IconLabelObj;
	this.direction = jsonIconLabelGroup.Direction;
	this.maxElement = jsonIconLabelGroup.MaxElement;

	this.typeObj = "pattern";
	this.objectName = "HrifIconLabelGroup";
	this.portletId = this.form.formid;

	this.classNameBase = hrifCLASSBASE.ICONLABELGROUP;
	this.classNameGroup = hrifCLASSBASE.GROUP + " " + this.classNameBase;
	this.classNameGroup += (typeof (this.direction) != "undefined") ? " " + hrifCLASSBASE.GROUP + this.direction.class : "";
	this.classNameItem = hrifCLASSBASE.GROUP + "__item " + this.classNameBase + "__item";
	//this.classNameLi = this.classNameBase + "__iconlabel";

	this.wrkTagsMap = new Map();

	// Definizione oggetto
	this.wrkObj = {
		"iconLabel": []
	};
	this.maxElementShow = 0;
	if (this.maxElement) {
		if (this.maxElement < this.iconsLabelObj.length)
			hrifConsole("[HRIF] HrifIconLabelGroup: inseriti solo i primi " + this.maxElement + " IconLabel dei " + this.iconsLabelObj.length + " previsti", 'warn');
		this.maxElementShow = (this.iconsLabelObj.length < this.maxElement) ? this.iconsLabelObj.length : this.maxElement;
	} else {
		this.maxElementShow = this.iconsLabelObj.length;
	}

	// Creo il documento in memoria
	this.docIconLabelArrFrag = document.createDocumentFragment();
	documentFrag(this.docIconLabelArrFrag, 'ul', this.idItem, '', this.classNameGroup);

	// Carico gli elementi passati in un array di chips
	for (IdxIcons = 0; IdxIcons < this.maxElementShow; IdxIcons++) {
		if (typeof (this.iconsLabelObj[IdxIcons].Icon) != 'undefined' && this.iconsLabelObj[IdxIcons].Icon.trim() != '') {
			this.docIconLabelLiFrag = document.createDocumentFragment();
			var itemWrk = this.idItem + "_" + IdxIcons;
			documentFrag(this.docIconLabelLiFrag, 'li', itemWrk, '', this.classNameItem);

			var iconLabelParm = this.iconsLabelObj[IdxIcons];
			iconLabelParm.IdItem = this.idItemCalc + "_" + IdxIcons + "_ili";
//			iconLabelParm.Icon = this.iconsLabelObj[IdxIcons].Icon;
//			iconLabelParm.Label = this.iconsLabelObj[IdxIcons].Label;
//			iconLabelParm.Tooltip = this.iconsLabelObj[IdxIcons].Tooltip;
			this.wrkObj.iconLabel[IdxIcons] = new HrifIconLabel(this.form, iconLabelParm);
			//this.wrkObj.iconLabel[IdxIcons].addClass(this.classNameLi);
			this.docIconLabelLiFrag.getElementById(itemWrk).appendChild(this.wrkObj.iconLabel[IdxIcons].getObject());
			this.docIconLabelArrFrag.getElementById(this.idItem).appendChild(this.docIconLabelLiFrag.children[0]);
		}
	}

	this.wrkDocFrag = this.docIconLabelArrFrag.children[0];


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		if (this.iconsLabelObj.length > 0) {
			appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
			this.isLoaded = true;
		}
	};

};

/**
* Questo è uno spazio che contiene elementi di documentazione appartenenti ad Oggetti Generici
*
* @namespace Object
*
*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifResource
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifResource
* @class
* @alias HrifResource
* @memberOf Object
* @param {object} form - this.
* @param {json|object} jsonResourceParam - Proprietà dell'oggetto
* @param {hrifRESOURCETYPE} jsonResourceParam.Type - Tipologia del FileName 
* @param {string} jsonResourceParam.FileName - Nome del file con estensione 
* @param {number} [jsonResourceParam.LabelInfo] - Informazione dimensione file espressa in Byte
* @param {string} jsonResourceParam.DownloadAction - Azione da eseguire al download
* @param {string} jsonResourceParam.OpenAction - Azione da eseguire all'open
* @param {hrifRESOURCEACTION} [jsonResourceParam.EnableAction] - Azioni Abilitate
* @returns {object} Oggetto HrifResource.
*
* @example
*
* // Definizione delle proprietà dell'oggetto
* var jsonResource = {};
* jsonResource.Type = hrifRESOURCETYPE.ATTACHMENT;
* jsonResource.FileName = "Documentazione.pdf";
* jsonResource.LabelInfo = 223584;
* jsonResource.DownloadAction = "download_Click";
* jsonResource.OpenAction = "open_Click";
*
* // Istanzio l'oggetto
* var resource = new HrifResource(this, jsonResource);
* this.hrif_cntTitle.Load(resource)
*/
this.HrifResource = function (form, jsonResourceParam) {

	var jsonResource = (typeof (jsonResourceParam) == 'string') ? JSON.parse(jsonResourceParam) : jsonResourceParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonResource.IdItem);
	this.type = jsonResource.Type;
	this.fileName = (typeof (jsonResource.FileName) == "undefined") ? "undefined" : jsonResource.FileName;
	this.labelInfo = jsonResource.LabelInfo;
	this.downloadAction = jsonResource.DownloadAction;
	this.openAction = jsonResource.OpenAction;
	this.enableAction = (typeof (jsonResource.EnableAction) == "undefined") ? hrifRESOURCEACTION.DOWNLOAD_OPEN : jsonResource.EnableAction;
	this.typeObj = "pattern";

	this.portletId = this.form.formid;
	this.objectName = "HrifResource";

	this.idItem = this.form.formid + '_' + this.idItemCalc;
	this.idItemBody = this.idItem + "_b";
	this.idItemRow = this.idItem + "_br";
	this.idItemFooter = this.idItem + "_f";

	this.classNameBase = hrifCLASSBASE.RESOURCE;
	this.classNameBody = this.classNameBase + "__body";
	this.classNameRow = this.classNameBase + "__row";
	this.classNameFooter = this.classNameBase + "__footer";

	this.stringHtml = "";
	this.stringBodyHtml = "";
	this.stringRowHtml = "";
	this.stringFooterHtml = "";

	this.stringBodyContentHtml = "";
	this.stringRowContentHtml = "";
	this.stringFooterContentHtml = "";

	// Definizione oggetto
	this.wrkObj = {
		"iconLabel": null,
		"labelInfo": null,
		"buttonGroup": null,
	};

	// Creo il documento in memoria
	this.docResourceFrag = document.createDocumentFragment();
	documentFrag(this.docResourceFrag, 'div', this.idItem, '', this.classNameBase);
	this.stringHtml += this.docResourceFrag.children[0].outerHTML;

	// Body	-----
	this.docBodyFrag = document.createDocumentFragment();
	documentFrag(this.docBodyFrag, 'div', this.idItemBody, '', this.classNameBody);
	this.stringBodyHtml = this.docBodyFrag.children[0].outerHTML;

	// Row (da inserire nel Body) -----
	this.docRowFrag = document.createDocumentFragment();
	documentFrag(this.docRowFrag, 'div', this.idItemRow, '', this.classNameRow);
	this.stringRowHtml = this.docRowFrag.children[0].outerHTML;

	// Carico l'IconLabel	
	var jsonIconLabel = {};
	if (this.type) {
		jsonIconLabel.Icon = this.type;
	}
	jsonIconLabel.Label = this.fileName;
	this.wrkObj.iconLabel = new HrifIconLabel(this.form, jsonIconLabel);
	// Aggiungo alla Row
	this.docRowFrag.getElementById(this.idItemRow).appendChild(this.wrkObj.iconLabel.getObject());
	this.stringRowContentHtml += this.wrkObj.iconLabel.getHtml();

	// Carico la label (info)
	if (this.labelInfo && typeof (this.labelInfo) == 'number') {
		var resultByte = hrifFormatBytes(this.labelInfo);
		var jsonLabel = {};
		jsonLabel.Label = resultByte;
		this.wrkObj.labelInfo = new HrifLabel(this.form, jsonLabel);
		this.wrkObj.labelInfo.addClass(hrifCLASSBASE.LABEL + "-" + hrifLABELTYPE.TERTIARY);
		// Aggiungo alla Row
		this.docRowFrag.getElementById(this.idItemRow).appendChild(this.wrkObj.labelInfo.getObject());
		this.stringRowContentHtml += this.wrkObj.labelInfo.getHtml();
	}

	// Aggiungo la Row al Body
	this.docBodyFrag.getElementById(this.idItemBody).appendChild(this.docRowFrag);

	// Footer ----- 	
	this.docFooterFrag = document.createDocumentFragment();
	documentFrag(this.docFooterFrag, 'div', this.idItemFooter, '', this.classNameFooter);
	this.stringFooterHtml = this.docFooterFrag.children[0].outerHTML;

	// Definizione del ButtonGruop (da inserire nel Footer)  
	var jsonButtonGroupParm = {};
	jsonButtonGroupParm.Buttons = [];
	if (this.enableAction == hrifRESOURCEACTION.DOWNLOAD_OPEN || this.enableAction == hrifRESOURCEACTION.DOWNLOAD) {
		var jsonButton1 = {};
		jsonButton1.Label = FormatMsg('HRSYSTEM_FILE_DOWNLOAD');
		jsonButton1.Action = this.downloadAction;
		jsonButton1.Layout = hrifBUTTONLAYOUT.OUTLINED;
		jsonButton1.Type = hrifBUTTONTYPE.EVIDENCE;
		jsonButtonGroupParm.Buttons.push(jsonButton1);
	}
	if (this.enableAction == hrifRESOURCEACTION.DOWNLOAD_OPEN || this.enableAction == hrifRESOURCEACTION.OPEN) {
		var jsonButton2 = {};
		jsonButton2.Label = FormatMsg('HRSYSTEM_FILE_OPEN');
		jsonButton2.Action = this.openAction;
		jsonButton2.Layout = hrifBUTTONLAYOUT.OUTLINED;
		jsonButton2.Type = hrifBUTTONTYPE.EVIDENCE;
		jsonButtonGroupParm.Buttons.push(jsonButton2);
	}
	this.wrkObj.buttonGroup = new HrifButtonGroup(this.form, jsonButtonGroupParm);
	this.stringFooterContentHtml += this.wrkObj.buttonGroup.getHtml();
	// Aggiungo al Footer
	this.docFooterFrag.getElementById(this.idItemFooter).appendChild(this.wrkObj.buttonGroup.getObject());


	// Aggiungo Body e Footer alla struttura principale
	this.docResourceFrag.getElementById(this.idItem).appendChild(this.docBodyFrag);
	this.docResourceFrag.getElementById(this.idItem).appendChild(this.docFooterFrag);

	this.wrkDocFrag = this.docResourceFrag.children[0];


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function (object) {

		if (object) {
			object.Ctrl.className = object.name + "_ctrl";
		}

		resultRowHtml = this.stringRowHtml.replace("</div>", this.stringRowContentHtml + "</div>");
		resultBodyHtml = this.stringBodyHtml.replace("</div>", resultRowHtml + "</div>");
		resultFooterHtml = this.stringFooterHtml.replace("</div>", this.stringFooterContentHtml + "</div>");
		resultHtml = this.stringHtml.replace("</div>", resultBodyHtml + resultFooterHtml + "</div>");
		this.wrkDocFrag = null;
		return resultHtml;

	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifBannerMessage
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifBannerMessage
* @class
* @alias HrifBannerMessage
* @memberOf Object
* @param {object} form - this.
* @param {json|object} jsonBannerMessage - Proprietà dell'oggetto
* @param {hrifICON} [jsonBannerMessage.Icon] - Icona  
* @param {string} jsonBannerMessage.Label - Testo della Label 
* @param {json[]} [jsonBannerMessage.Buttons] - Array dei Bottoni
* @param {string} [jsonBannerMessage.Action] - Azione di callback (se impostata azzera i Bottoni)
* @param {string} [jsonBannerMessage.ActionParam] - Parametri dell'azione 
* @returns {object} Oggetto HrifBannerMessage.
*
* @example
*
* // Definizione delle proprietà dell'oggetto
* var jsonBannerMessage = {};
* jsonBannerMessage.Icon = hrifICON.STAR;
* jsonBannerMessage.Label = FormatMsg("Questa è la label presente nel testo del message banner");
* jsonBannerMessage.Buttons = [{"Label" : "Azione 1", "Action": "Azione1"} , {"Label" : "Azione 2", "Action": "Azione2"}];
*
* // Istanzio l'oggetto
* var BannerMessage = new HrifBannerMessage(this, jsonBannerMessage);
* this.hrif_container.Load(BannerMessage);
*
*/
this.HrifBannerMessage = function (form, jsonBannerMessageParam) {

	var jsonBannerMessage = (typeof (jsonBannerMessageParam) == 'string') ? JSON.parse(jsonBannerMessageParam) : jsonBannerMessageParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonBannerMessage.IdItem);
	this.icon = (jsonBannerMessage.Icon) ? jsonBannerMessage.Icon : null;
	this.label = (jsonBannerMessage.Label) ? jsonBannerMessage.Label : "undefined";
	this.buttons = (jsonBannerMessage.Buttons) ? jsonBannerMessage.Buttons : null;
	this.action = (jsonBannerMessage.Action) ? jsonBannerMessage.Action : null;
	this.actionParam = (jsonBannerMessage.ActionParam) ? jsonBannerMessage.ActionParam : null;
	if (this.action)
		this.buttons = null;

	this.typeObj = "pattern";

	this.portletId = this.form.formid;
	this.objectName = "HrifBannerMessage";

	this.idItem = this.form.formid + '_' + this.idItemCalc;
	this.idItemContent = this.idItem + "_content";

	this.classNameBase = hrifCLASSBASE.BannerMessage;
	this.classNameContent = this.classNameBase + "__content";

	this.stringHtml = "";
	this.stringContentHtml = "";
	this.stringContentItemHtml = "";
	this.stringButtonHtml = "";

	// Definizione oggetto
	this.wrkObj = {
		"icon": null,
		"label": null,
		"buttons": null,
	};

	// Creo il documento in memoria
	this.docBannerMessageFrag = document.createDocumentFragment();
	documentFrag(this.docBannerMessageFrag, 'div', this.idItem, '', this.classNameBase);
	this.stringHtml += this.docBannerMessageFrag.children[0].outerHTML;

	// Content	-----
	this.docContentFrag = document.createDocumentFragment();
	documentFrag(this.docContentFrag, 'div', this.idItemContent, '', this.classNameContent);
	this.stringContentHtml = this.docContentFrag.children[0].outerHTML;

	// Istanzio l'icona	
	if (this.icon != null) {
		var jsonIconParam = {};
		jsonIconParam.Icon = this.icon;
		this.wrkObj.icon = new HrifIcon(this.form, jsonIconParam);
		this.docContentFrag.getElementById(this.idItemContent).appendChild(this.wrkObj.icon.getObject());
		this.stringContentItemHtml += this.wrkObj.icon.getHtml();
	}

	// Istanzio la Label
	var jsonLabel = {};
	jsonLabel.Label = this.label;
	this.wrkObj.label = new HrifLabel(this.form, jsonLabel);
	this.docContentFrag.getElementById(this.idItemContent).appendChild(this.wrkObj.label.getObject());
	this.stringContentItemHtml += this.wrkObj.label.getHtml();

	// 	
	this.docBannerMessageFrag.getElementById(this.idItem).appendChild(this.docContentFrag.children[0]);

	// Istanzio i Button
	if (this.buttons != null) {
		var jsonButtonGroupParm = {};
		jsonButtonGroupParm.Buttons = [];

		for (Idx = 0; Idx < this.buttons.length; Idx++) {

			var jsonButton = {};
			jsonButton.Label = this.buttons[Idx].Label;
			jsonButton.Action = this.buttons[Idx].Action;
			jsonButton.ActionParam = this.buttons[Idx].ActionParam;
			jsonButton.Layout = hrifBUTTONLAYOUT.OUTLINED;
			jsonButtonGroupParm.Buttons.push(jsonButton);

		}

		this.wrkObj.buttons = new HrifButtonGroup(this.form, jsonButtonGroupParm);
		this.docBannerMessageFrag.getElementById(this.idItem).appendChild(this.wrkObj.buttons.getObject());
		this.stringButtonHtml = this.wrkObj.buttons.getHtml();

	}

	this.wrkDocFrag = this.docBannerMessageFrag.children[0];


	/** Azione da eseguire al Click
	* @param {string} action - Indica la funzione da eseguire.
	* @returns {null} Richiama l'azione indicata.
	*/
	this.setAction = function (action, param) {

		this.action = action;
		this.actionParam = param;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkDocFrag, this.wrkAction);
			hrifRemoveClass(this.wrkDocFrag, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action, this.actionParam);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkDocFrag.addEventListener)
				this.wrkDocFrag.addEventListener("click", this.wrkAction, false);
			else if (this.wrkDocFrag.attachEvent) {
				this.wrkDocFrag.attachEvent("onclick", this.wrkAction);
			}
			hrifAddClass(this.wrkDocFrag, 'cursor_pointer');
		}

		this.actionOld = this.action;
	};
	// Carico l'azione passata
	if (this.action)
		this.setAction(this.action, this.actionParam);


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function (object) {

		if (object) {
			object.Ctrl.className = object.name + "_ctrl";
		}

		resultContentHtml = this.stringContentHtml.replace("</div>", this.stringContentItemHtml + "</div>");
		//resultButtonHtml = this.stringBodyHtml.replace("</div>", resultRowHtml + "</div>"); 
		wrkResultHtml = this.stringHtml.replace("</div>", resultContentHtml + this.stringButtonHtml + "</div>");
		var resultHtml = wrkResultHtml.replace('id', 'onclick ="event.stopPropagation();javascript:' + this.form.formid + '.' + this.action + '()" id');

		this.wrkDocFrag = null;
		return resultHtml;

	};

	/** Nasconde il Button
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde il Button.
	*/
	this.Hide = function (preserveSpace) {
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza il Button
	* @returns {null} Visualizza il Button.
	*/
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


function hrifFormatBytes(bytes) {

	var marker = 1024; // Change to 1000 if required
	var decimal = 0; // Change as required
	var kiloBytes = marker; // One Kilobyte is 1024 bytes
	var megaBytes = marker * marker; // One MB is 1024 KB
	var gigaBytes = marker * marker * marker; // One GB is 1024 MB
//	var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

	// return bytes if less than a KB
	if (bytes < kiloBytes) return bytes + " Bytes";
	// return KB if less than a MB
	else if (bytes < megaBytes) return (bytes / kiloBytes).toFixed(decimal) + " KB";
	// return MB if less than a GB
	else if (bytes < gigaBytes) return (bytes / megaBytes).toFixed(decimal) + " MB";
	// return GB if less than a TB
	else return (bytes / gigaBytes).toFixed(decimal) + " GB";
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifLabelDropDown - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HriLabelDropDown
* @class
* @alias HrifLabelDropDown
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonOrderParm - Prorietà dall'oggetto
* @param {json[]} jsonOrderParm.Elements - Array
* @param {string} jsonOrderParm.Elements.Label - Descrizione della label dell'elemento  
* @param {string} jsonOrderParm.Elements.Value - Valore dell'elemento
* @param {string} jsonOrderParm.Label - Descrizione della label
* @param {string} [jsonOrderParm.InitValue] - Valore iniziale dell'elemento 
* @param {hrifALIGNMET} [jsonOrderParm.Align] - Tipologia di allinemanto
* @param {string} [jsonOrderParm.Action] - Azione di callback
* @returns {object} Oggetto HriLabelDropDown.
*
* @example <caption>Esempio</caption>
*
* // Definizione oggetto LabelDropDown
* var jsonOrderParm = {};
* jsonOrderParm.Label = FormatMsg("Ordina per") + ":";
* jsonOrderParm.Action = "manageOrderBy";
* jsonOrderParm.Elements = [{
*   "Label": FormatMsg("ultima variazione"),
*   "Value": "L"
* }, {
*   "Label": FormatMsg("data apertura"),
*   "Value": "C"
* }]
* jsonOrderParm.InitValue = "L";
* jsonOrderParm.Align = hrifALIGNMENT.RIGHT;
* 
* // Istanzio oggetto LabelDropDown e lo carico in hrifOrderByContainer
* this.hrifOrderByContainer.Load(new HrifLabelDropDown(this, jsonOrderParm));
* 
*/
this.HrifLabelDropDown = function (form, jsonOrderParm) {

	var jsonOrder = (typeof (jsonOrderParm) == 'string') ? JSON.parse(jsonOrderParm) : jsonOrderParm;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonOrder.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;

	this.orderElement = jsonOrder.Elements;
	this.label = (jsonOrder.Label) ? jsonOrder.Label : "undefined";
	this.initValue = jsonOrder.InitValue;
	this.align = (jsonOrder.Align) ? jsonOrder.Align : hrifALIGNMENT.LEFT;
	this.action = jsonOrder.Action;


	this.portletId = form.formid;

	this.classNameBase = hrifCLASSBASE.LABELDROPDOWN;
	this.classNameContainer = this.classNameBase + "__container";
	this.classNameSelectWrapper = this.classNameBase + "__selectwrapper";
	this.classNameValue = this.classNameBase + "__value";

	this.idItemContainer = this.idItem + "_cont";
	this.idItemWrapper = this.idItem + "_selwrp";

	// Creo il documento in memoria
	this.docOrderFrag = document.createDocumentFragment();
	documentFrag(this.docOrderFrag, 'div', this.idItem, '', this.classNameBase);

	// Contenitore  
	this.docContainerFrag = document.createDocumentFragment();
	documentFrag(this.docContainerFrag, 'div', this.idItemContainer, '', this.classNameContainer);

	// Label da Parametro
	var jsonLabelParm = {};
	jsonLabelParm.Label = this.label;
	this.Label = new HrifLabel(this.form, jsonLabelParm);
	// Aggiungo Label da Parametro nel Container
	this.docContainerFrag.getElementById(this.idItemContainer).appendChild(this.Label.getObject());

	// SelectWrapper 
	this.docValueFrag = document.createDocumentFragment();
	documentFrag(this.docValueFrag, 'div', this.idItemWrapper, '', this.classNameSelectWrapper);

	// Select 
	this.docSelectFrag = document.createDocumentFragment();
	documentFrag(this.docSelectFrag, 'select', this.idItem + 'sel', '', this.classNameBase);

	for (IdxEle = 0; IdxEle < this.orderElement.length; IdxEle++) {
		this.docElemFrag = document.createDocumentFragment();
		documentFrag(this.docElemFrag, 'option', this.idItem + IdxEle, '', '');
		this.docElemFrag.children[0].setAttribute("value", this.orderElement[IdxEle].Value);
		this.docElemFrag.children[0].innerText = this.orderElement[IdxEle].Label;
		if (typeof (this.initValue) != 'undefined') {
			if (this.initValue.trim() != "" && this.initValue == this.orderElement[IdxEle].Value) {
				this.initValue = this.orderElement[IdxEle].Label;
				this.docElemFrag.children[0].setAttribute("selected", "true");
			}
		}
		this.docSelectFrag.getElementById(this.idItem + 'sel').appendChild(this.docElemFrag.children[0]);
	}
	// Aggiungo SelectWrapper nel Wrapper
	this.docValueFrag.getElementById(this.idItemWrapper).appendChild(this.docSelectFrag.children[0]);

	if (typeof (this.initValue) == 'undefined' || this.initValue.trim() == "") {
		this.initValue = this.orderElement[0].Label;
	}

	// Label di Wrk
	var jsonLabelOut = {};
	jsonLabelOut.Label = this.initValue;
	this.LabelOut = new HrifLabel(this.form, jsonLabelOut);
	this.LabelOut.addClass(this.classNameValue);
	// Aggiungo Label di Wrk nel Wrapper	
	this.docValueFrag.getElementById(this.idItemWrapper).appendChild(this.LabelOut.getObject());

	// Aggiungo il SelectWrapper nel Container
	this.docContainerFrag.getElementById(this.idItemContainer).appendChild(this.docValueFrag.children[0]);

	this.docOrderFrag.getElementById(this.idItem).appendChild(this.docContainerFrag.children[0]);

	this.wrkDocFrag = this.docOrderFrag.children[0];
	hrifAddClass(this.wrkDocFrag, this.classNameBase + "--align-" + this.align);

	/** Valorizza l'azione del Button
	* @param {string} action - Azione da eseguire al click.
	* @returns {null} Valorizza l'azione del Button.
	*/
	this.setAction = function (action) {
		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkDocFrag, this.wrkAction);
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletActionCbx.bind(null, this.portletId, this.action, null, this);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkDocFrag.addEventListener) {
				this.wrkDocFrag.addEventListener("change", this.wrkAction, false);
			} else if (this.wrkDocFrag.attachEvent) {
				this.wrkDocFrag.attachEvent("change", this.wrkAction);
			}
		}

		this.actionOld = this.action;
	};
	this.setAction(this.action);


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};
};


/**
* Questo è uno spazio che contiene elementi di documentazione appartenenti alle Cards
*
* @namespace Search
*
*/


/** Definizione oggetto HrifSearchResult
* @class
* @alias HrifSearchResult
* @memberof Search
* @param {object} form - this
* @param {json|object} jsonSearchResultParam - Prorietà dell'oggetto
* @param {json|object} jsonSearchResultParam.Properties - Prorietà dell'oggetto
* @param {boolean} [jsonSearchResultParam.Properties.Disabled] - SearchResult disabilitato
* @param {hrifSEARCHRESULTTYPE} jsonSearchResultParam.Properties.Type - Tipologia visualizzazione
* @param {json|object} jsonSearchResultParam.Search - Prorietà dell'oggetto search   
* @param {object} jsonSearchResultParam.Search.TxtObj - Oggetto textbox del portlet
* @param {boolean} [jsonSearchResultParam.Search.Disabled] - search disabilitata
* @param {object} [jsonSearchResultParam.Search.Select] - Prorietà dell'oggetto select
* @param {string} [jsonSearchResultParam.Search.Select.Action] - Azione di callback
* @param {string} [jsonSearchResultParam.Search.Select.Init] - Valore iniziale dell'elemento 
* @param {boolean} [jsonSearchResultParam.Search.Select.Disabled] - select disabilitata
* @param {json[]} [jsonSearchResultParam.Search.Select.Option] - Array elementi option
* @param {string} [jsonSearchResultParam.Search.Select.Option.Text] - Descrizione della label dell'elemento  
* @param {string} [jsonSearchResultParam.Search.Select.Option.Value] - Valore dell'elemento
* @param {json|object} [jsonSearchResultParam.Search.Button] - Prorietà dell'oggetto button
* @param {string} jsonSearchResultParam.Search.Button.Label - Testo del Button
* @param {string} [jsonSearchResultParam.Search.Button.Action] - Action del Button
* @param {string} [jsonSearchResultParam.Search.Button.Tooltip] - Tooltip del Button
* @param {json[]} jsonSearchResultParam.ChipsChoice - Prorietà dell'oggetto ChipsChoice
* @param {object|json} jsonSearchResultParam.ChipsChoice.Property - Proprietà delle Chips
* @param {hrifCHIPLAYOUT} jsonSearchResultParam.ChipsChoice.Property.Layout - Layout
* @param {object|json[]} jsonSearchResultParam.ChipsChoice.ChipItems - Elenco Chips 
* @param {string} jsonSearchResultParam.ChipsChoice.ChipItems.Value - Valore della Chip  
* @param {string} jsonSearchResultParam.ChipsChoice.ChipItems.Label - Descrizione della Chip
* @param {string} [jsonSearchResultParam.ChipsChoice.ChipItems.Action] - Azione di callback
* @returns {object} Oggetto HrifSearchResult.
*
* @example <caption>Esempio SEARCHCHIPS</caption>
*
* // Definizione delle proprietà HrifSearchResults
* var jsonSearchResultsParam = {};
* jsonSearchResultsParam.Properties = {};
* jsonSearchResultsParam.Properties.Type = hrifSEARCHRESULTTYPE.SEARCHCHIPS;
* 
* // Definizione proprietà del select search
* var jsonSelectSearchParam = {};
* jsonSelectSearchParam.TxtObj = this.Textbox1 // oggetto portalstudio
* // Definizione delle proprietà del Bottone presente nel Search
* var jsonButtonParam = {};
* jsonButtonParam.Label = FormatMsg("Btn di prova");
* jsonButtonParam.Action = "actionButton";
* jsonButtonParam.Tooltip = FormatMsg("Btn di prova tooltip");
* jsonSelectSearchParam.Button = jsonButtonParam;
* jsonSearchResultsParam.Search = jsonSelectSearchParam;
* 
* //Definizione dei filtri(chips) 
* var jsonchipsChoice = {};
* jsonchipsChoice.ChipItems = [];
* itemChoice = {};
* itemChoice.Value = "t1";
* itemChoice.Label = FormatMsg("label1");
* itemChoice.Action = "actionC";
* itemChoice.Active = true;
* jsonchipsChoice.ChipItems.push(itemChoice);
* itemChoice = {};
* itemChoice.Value = "t2";
* itemChoice.Label = FormatMsg("label2");
* itemChoice.Action = "actionC";
* jsonchipsChoice.ChipItems.push(itemChoice)
* jsonSearchResultsParam.ChipsChoice = jsonchipsChoice;
* 
* // Istanzio l'oggetto
* var searchResults = new HrifSearchResult(this, jsonSearchResultsParam);
* 
* // Carico l'oggetto nel container
* this.hrif_container0.Load(searchResults);
* 
* @example <caption>Esempio SELECTSEARCH</caption>
*
* // Definizione delle proprietà HrifSearchResults
* var jsonSearchResultsParam = {};
* jsonSearchResultsParam.Properties = {};
* jsonSearchResultsParam.Properties.Type = hrifSEARCHRESULTTYPE.SELECTSEARCH;
* 
* // Definizione proprietà del select search
* var jsonSelectSearchParam = {};
* jsonSelectSearchParam.Disabled = false;
* jsonSelectSearchParam.SelectFirst = false;
* jsonSelect = {};
* jsonSelect.Init="ute2";
* jsonSelect.Action="onChange";
* jsonSelect.Disabled=false;
* jsonSelect.Label="label";
* jsonSelect.Option = [];
* jsonOption = {};
* jsonOption.Value="ute1";
* jsonOption.Text="utente 1";
* jsonSelect.Option.push(jsonOption);
* jsonOption = {};
* jsonOption.Value="ute2";
* jsonOption.Text="utente 2";
* jsonSelect.Option.push(jsonOption);
* jsonOption = {};
* jsonOption.Value="ute3";
* jsonOption.Text="utente 3";
* jsonSelect.Option.push(jsonOption);
* jsonSelectSearchParam.Select = jsonSelect;
* jsonSelectSearchParam.TxtObj = this.Textbox1 // oggetto portalstudio
* 
* // Definizione delle proprietà del Bottone presente nel Search
* var jsonButtonParam = {};
* jsonButtonParam.Label = FormatMsg("Btn di prova");
* jsonButtonParam.Action = "actionButton";
* jsonButtonParam.Tooltip = FormatMsg("Btn di prova tooltip");
* jsonSelectSearchParam.Button = jsonButtonParam;
* jsonSearchResultsParam.Search = jsonSelectSearchParam;
* 
* //Definizione dei filtri(chips) 
* var jsonchipsChoice = {};
* jsonchipsChoice.ChipItems = [];
* itemChoice = {};
* itemChoice.Value = "t1";
* itemChoice.Label = FormatMsg("label1");
* itemChoice.Action = "actionC";
* itemChoice.Active = true;
* jsonchipsChoice.ChipItems.push(itemChoice);
* itemChoice = {};
* itemChoice.Value = "t2";
* itemChoice.Label = FormatMsg("label2");
* itemChoice.Action = "actionC";
* jsonchipsChoice.ChipItems.push(itemChoice)
* jsonSearchResultsParam.ChipsChoice = jsonchipsChoice;
* 
* // Istanzio l'oggetto
* var searchResults = new HrifSearchResult(this, jsonSearchResultsParam);
* 
* // Carico l'oggetto nel container
* this.hrif_container0.Load(searchResults);
* 
*/
this.HrifSearchResult = function (form, jsonSearchResultParam) {

	let jsonSearchResult = (typeof (jsonSearchResultParam) == 'string') ? JSON.parse(jsonSearchResultParam) : jsonSearchResultParam;

	this.form = form;
	this.portletId = this.form.formid;
	this.idItemCalc = HrifGetItem(jsonSearchResult.IdItem);
	this.idItem = this.portletId + '_' + this.idItemCalc;

	this.properties = jsonSearchResult.Properties; // proprietà oggetto SearchResults
	this.title = (this.properties.Title)?this.properties.Title:undefined;
	this.search = jsonSearchResult.Search; // proprietà oggetto Search
	this.chipsChoice = jsonSearchResult.ChipsChoice; // proprietà oggetto ChipsChoice
	this.recommended = jsonSearchResult.Recommended; // proprietà oggetto Recommended
	this.txtObj = this.search.TxtObj; 	// oggetto textbox
	this.button = this.search.Button; // oggetto button
	this.functionSuggest = this.search.FunctionSuggest;

	this.disabled = this.properties.Disabled;
	this.type = (this.properties.Type) ? this.properties.Type : hrifSEARCHRESULTTYPE.SELECTSEARCH;

	this.typeObj = "pattern";
	this.nameObj = "HrifSearchResult";
	this.isLoaded = false;

	this.resultChipObj = null;

	this.classNameBase = hrifCLASSBASE.SEARCHRESULT;
	// verifico che ci sia il textbox di portalstudio
	if (typeof (this.txtObj) == 'undefined') {
		hrifConsole("[HRIF] HrifSearchResult : ATTENZIONE: non è stato impostato l'oggetto Textbox di Portal Studio", 'error');
		return null;
	}

	this.docSearchFrag = document.createDocumentFragment();

	// creo div principale
	documentFrag(this.docSearchFrag, 'div', this.idItem, '', this.classNameBase);

	if(this.title) {
		this.titleObj = new HrifTitleObj(this.form,{"Title":this.title})
		this.docSearchFrag.getElementById(this.idItem).appendChild(this.titleObj.getObject());
	}

	// controllo type oggetto
	if (this.type === hrifSEARCHRESULTTYPE.SELECTSEARCH) {
		// verifico se mi è stato passato il button
		if (!this.button) {
			hrifConsole("[HRIF] HrifSearchResult : ATTENZIONE: BUTTON OBBLIGATORIO", 'warn');
			let buttonParam = {};
			buttonParam.Label = "Undefined";
			this.search.Button = buttonParam;
		}

		// verifico se mi è stato passata la select 
		if (!this.search.Select) {
			hrifConsole("[HRIF] HrifSearchResult : ATTENZIONE: SELECT OBBLIGATORIA", 'warn');
			jsonSelectTmp = {};
			jsonSelectTmp.Option = [];
			jsonOption = {};
			jsonOption.Value = "Undefined";
			jsonOption.Text = "Undefined";
			jsonSelectTmp.Option.push(jsonOption);
			this.search.Select = jsonSelectTmp;
		}
	}

	if (this.type === hrifSEARCHRESULTTYPE.SEARCHCHIPS) {
		// elimino eventuale select passata
		this.search.Select = null;
		// se non passato chipsChoice ne setto una di default
		if (!this.chipsChoice) {
			jsonchipsChoice = {};
			jsonchipsChoice.ChipItems = [];
			item = {};
			item.Value = "-";
			item.Label = "Undefined";
			item.Active = true;
			jsonchipsChoice.ChipItems.push(item);
			this.chipsChoice = jsonchipsChoice;
		}
		else {
			// sovrascrivo proprietà Layout
			this.chipsChoice.Layout = hrifCHIPLAYOUT.DEFAULT;
		}
	}

	if (this.type === hrifSEARCHRESULTTYPE.RECOMMENDED) {
		// elimino eventuale select passata
		this.search.Select = null;
		// se non passato chipsChoice ne setto una di default
		if (!this.recommended) {
			let defaultConf = {
				"Direction": hrifDIRECTION.HORIZONTAL,
				"IconLabelObj": [
					{
						"Icon": hrifICON.SEARCH,
						"Label": "Undefined"
					}
				]
			}
			this.recommended = defaultConf;
		}
	}

	// creo oggetto search
	this.searchObj = new HrifSearch(this.form, this.search);
	this.docSearchFrag.getElementById(this.idItem).appendChild(this.searchObj.getObject());

	// aggiungo oggetto chipsChoiceObj
	if (this.type === hrifSEARCHRESULTTYPE.SEARCHCHIPS) {
		this.chipsChoiceObj = new HrifChipsChoice(this.form, this.chipsChoice);
		this.docSearchFrag.getElementById(this.idItem).appendChild(this.chipsChoiceObj.getObject());
	}

	// aggiungo oggetto recommended
	if (this.type === hrifSEARCHRESULTTYPE.RECOMMENDED) {
		this.recommended.Direction = hrifDIRECTION.HORIZONTAL;
		for (const element of this.recommended.Items) {
			// sovrascrivo eventuale icona
			element.Icon = hrifICON.SEARCH
			if(this.recommended.Action){
				element.Action = this.recommended.Action;
				element.ActionParam = element.Param;
			}
		}

		this.recommended.IconLabelObj = this.recommended.Items;
		this.recoomendedObj = new HrifIconLabelGroup(this.form, this.recommended);
		this.docSearchFrag.getElementById(this.idItem).appendChild(this.recoomendedObj.getObject());
	}

	this.wrkDocFrag = this.docSearchFrag.children[0];

	/**
	 * Aggiungo ResultChip
	 * @param {JSON} resultChipParam 
	 */
	this.addResultChip = function (resultChipParam) {
		if (this.resultChipObj) {
			this.wrkDocFrag.removeChild(this.resultChipObj.getObject());
			this.resultChipObj = null;
		}

		if (resultChipParam) {
			this.resultChipObj = new HrifResultChip(this.form, resultChipParam);
			this.wrkDocFrag.appendChild(this.resultChipObj.getObject());
		}
	};

	/**
	 * funzione esguita su evento onkeyup del textbox
	 * se il testo del textbox è vuoto rimuovo eventuale resultChipObj
	 * @param {ojbect} form 
	 
	this.fieldEvent = function () {
		if (form.txtObj.Value() == "" && form.resultChipObj != null) {
			form.wrkDocFrag.removeChild(form.resultChipObj.getObject());
			form.resultChipObj = null;
		}
	};
*/

	/**
	 * rimuovo ResultChip
	 * 
	 */
	this.removeResultChip = function () {
		if (this.resultChipObj != null) {
			this.wrkDocFrag.removeChild(this.resultChipObj.getObject());
			this.resultChipObj = null;
		}
	};

	/** Disabilita l'oggetto
	 * 
	 */
	this.Disable = function () {
		this.wrkDocFrag.setAttribute("disabled", "true");
		this.disabled = true;
	};
	if (this.disabled)
		this.Disable();

	/** Abilita l'oggetto
	 * 
	 */
	this.Enable = function () {
		this.wrkDocFrag.removeAttribute("disabled");
		this.disabled = false;
	};

	/** Nasconde l'oggetto
	 * @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	 * 
	 */
	this.Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		let wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	 * 
	 */
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/**
	 * ritorna valore della combo selezionata
	 * @returns {String}  valore option selezionata
	 */
	this.getSelectValue = function () {
		let retFunct = (this.searchObj.select) ? this.searchObj.selectObj.getValue() : "";
		return retFunct;
	};

	/**
	 * ritorna il testo della combo selezionata
	 * @returns {String}  testo option selezionata
	 */
	this.getSelectText = function () {
		let retFunct = (this.searchObj.select) ? this.searchObj.selectObj.getText() : "";
		return retFunct;
	};

	/** Reperimento codice Html dell'oggetto
	 * @ignore
	 * @returns {String} Stringa contenente il codice Html dell'oggetto.
	 */
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	 * @ignore
	 * @returns {null}; Ritorna l'oggetto.
	 */
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		// aggiungo evento al textbox
		//document.getElementById(this.txtObj.Ctrl.id).addEventListener("keyup", this.fieldEvent.bind(null, this), false);
		this.isLoaded = true;
	};
};


/** Definizione oggetto HrifSelect
* @class
* @alias HrifSelect
* @param {object} form - this
* @param {json|object} jsonSelectParam - Prorietà dall'oggetto 
* @param {string} [jsonSelectParam.Label] - Descrizione della label
* @param {string} [jsonSelectParam.Init] - Valore iniziale dell'elemento 
* @param {boolean} [jsonSelectParam.Disabled] - select disabilitata
* @param {string} [jsonSelectParam.Action] - Azione di callback
* @param {json[]} jsonSelectParam.Option - Array elementi option
* @param {string} jsonSelectParam.Option.Text - Descrizione della label dell'elemento  
* @param {string} jsonSelectParam.Option.Value - Valore dell'elemento
* @returns {object} Oggetto HrifSelect.
*
* @example
*
* // Definizione delle proprietà HrifSelect
* jsonSelectParam = {};
* jsonSelectParam.Label=FormatMsg("label di prova")
* jsonSelectParam.Init="ute2";
* jsonSelectParam.Action="onChange";
* jsonSelectParam.Option = [];
* jsonOptionSelect = {};
* jsonOptionSelect.Value="ute1";
* jsonOptionSelect.Text="utente 1";
* jsonSelectParam.Option.push(jsonOptionSelect);
* jsonOptionSelect = {};
* jsonOptionSelect.Value="ute2";
* jsonOptionSelect.Text="utente 2";
* jsonSelectParam.Option.push(jsonOptionSelect);
* 
* // Istanzio l'oggetto
* hrifSelect = new HrifSelect(this,jsonSelectParam);
* 
* //Carico l'oggetto nel container
* this.hrif_container0.Load(hrifSelect)
*/

this.HrifSelect = function (form, jsonSelectParam) {

	let jsonSelect = (typeof (jsonSelectParam) == 'string') ? JSON.parse(jsonSelectParam) : jsonSelectParam;

	this.form = form;
	this.portletId = this.form.formid;
	this.idItemCalc = HrifGetItem(jsonSelect.IdItem);
	this.idItem = this.portletId + '_' + this.idItemCalc;
	this.initValue = jsonSelect.Init;
	this.action = jsonSelect.Action;
	this.option = jsonSelect.Option;
	this.disabled = jsonSelect.Disabled;
	this.label = jsonSelect.Label;

	this.cntOptions = this.option.length;

	this.typeObj = "pattern";
	this.nameObj = "HrifSelect";
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.SELECT;
	this.classNameContainer = this.classNameBase + "__container";

	this.idItemContainer = this.idItem + "_cont";

	this.docSelect = document.createDocumentFragment();
	documentFrag(this.docSelect, 'div', this.idItem, '', this.classNameBase);

	if (typeof (this.label) != 'undefined' && this.label != "") {
		let jsonLabelParm = {};
		jsonLabelParm.Label = (this.label) ? this.label : "undefined";
		this.Label = new HrifLabel(this.form, jsonLabelParm);
		this.docSelect.getElementById(this.idItem).appendChild(this.Label.getObject());
	}

	// SelectContainer
	this.docContainerFrag = document.createDocumentFragment();
	documentFrag(this.docContainerFrag, 'div', this.idItemContainer, '', this.classNameContainer);

	// Select 
	this.docSelectFrag = document.createDocumentFragment();
	documentFrag(this.docSelectFrag, 'select', this.idItem + 'sel', '', '');

	// ciclo su options e creo la select 
	for (let IdxOption = 0; IdxOption < this.cntOptions; IdxOption++) {
		this.docElemFrag = document.createDocumentFragment();
		documentFrag(this.docElemFrag, 'option', 'opt' + this.idItem + IdxOption, '', '');
		let ojbOption = this.option[IdxOption];
		this.docElemFrag.children[0].setAttribute("value", ojbOption.Value);
		this.docElemFrag.children[0].innerText = ojbOption.Text;
		this.docSelectFrag.getElementById(this.idItem + 'sel').appendChild(this.docElemFrag.children[0]);
	}

	this.docContainerFrag.getElementById(this.idItemContainer).appendChild(this.docSelectFrag);
	this.docSelect.getElementById(this.idItem).appendChild(this.docContainerFrag);

	this.wrkDocFrag = this.docSelect.children[0];

	/** Disabilita l'oggetto
	 * 
	 */
	this.Disable = function () {
		this.wrkDocFrag.setAttribute("disabled", "true");
		this.disabled = true;
	};
	if (this.disabled)
		this.Disable();

	/** Abilita l'oggetto
	 * 
	 */
	this.Enable = function () {
		this.wrkDocFrag.removeAttribute("disabled");
		this.disabled = false;
	};

	/** Nasconde l'oggetto
	 * @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	 * 
	 */
	this.Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		let wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	 * 
	 */
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/**Inizializza la select
	 * 
	 * @param {string} initValue valore di default.
	 */
	this.InitSelect = function (initValue) {
		// oggetto select
		let select = this.wrkDocFrag.getElementsByTagName("select")[0];
		select.value = initValue;
	};


	/**Ritorna il value della option selezionata
	 * 
	 * @returns {string} valore della option selezionata
	 */
	this.getValue = function () {
		let select = this.wrkDocFrag.getElementsByTagName("select")[0];
		return select.value;
	};

	/**Ritorna il text della option selezionata
	 * 
	 * @returns {string} testo della option selezionata
	 */
	this.getText = function () {
		let select = this.wrkDocFrag.getElementsByTagName("select")[0];
		return select.options[select.selectedIndex].text;
	};

	/**
	 * Ritorna selectedIndex della combo
	 * @returns {number}
	 */
	this.getSelectIndex = function () {
		let select = this.wrkDocFrag.getElementsByTagName("select")[this.idItem + 'sel'];
		return select.selectedIndex;
	};

	// se ho settato il valore di init chiamo il metodo che si posiziona sul valore nella combo
	if (this.initValue)
		this.InitSelect(this.initValue);


	/** Valorizza l'azione del Button
	* @param {string} action - Azione da eseguire al click.
	* 
	*/
	this.setAction = function (action) {
		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkDocFrag, this.wrkAction);
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletActionCbx.bind(null, this.portletId, this.action, null, this);

		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkDocFrag.addEventListener) {
				this.wrkDocFrag.addEventListener("change", this.wrkAction, false);
			} else if (this.wrkDocFrag.attachEvent) {
				this.wrkDocFrag.attachEvent("change", this.wrkAction);
			}
		}

		this.actionOld = this.action;
	};
	// se action è valorizzato chiamo il metodo per la gesitone callback
	if (typeof (this.action) != 'undefined' && typeof (this.action) != 'object' && this.action != "")
		this.setAction(this.action);

	/** Reperimento codice Html dell'oggetto
	* @ignore
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	 * @ignore
	 * @returns {null} Ritorna l'oggetto.
	 */
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};

/** Definizione oggetto HrifSearch
* @class
* @alias HrifSearch
* @memberof Search
* @param {object} form - this
* @param {json|object} jsonSearchParam - Prorietà dall'oggetto
* @param {object} jsonSearchParam.TxtObj - Oggetto textbox del portlet
* @param {boolean} [jsonSearchParam.Disabled] - Disabilita search
* @param {json|object} [jsonSearchParam.Select] - proprietà della select 
* @param {string} [jsonSearchParam.Select.Init] - Valore iniziale dell'elemento 
* @param {string} [jsonSearchParam.Select.Action] - Azione di callback
* @param {boolean} [jsonSearchParam.Select.Disabled] - Disabilita select
* @param {json[]} [jsonSearchParam.Select.Option] - Array elementi option
* @param {string} jsonSearchParam.Select.Option.Text - Descrizione della label dell'elemento  
* @param {string} jsonSearchParam.Select.Option.Value - Valore dell'elemento
* @param {json|object} [jsonSearchParam.Button] - proprietà del button
* @param {string} jsonSearchParam.Button.Label - Testo del Button
* @param {string} [jsonSearchParam.Button.Action] - Action del Button
* @param {string} [jsonSearchParam.Button.Tooltip] - Tooltip del Button
* @returns {object} Oggetto HrifSearch.
*
* @example
*
* // Definizione oggetto HrifSearch
* jsonSearchParam = {};
* jsonSearchParam.TxtObj= this.Textbox1 // oggetto portalstudio

 // Definizione delle proprietà della select presente nel Search
* jsonSelectParam = {};
* jsonSelectParam.Init="ute2";
* jsonSelectParam.Action="onChange";
* jsonSelectParam.Option = [];
* jsonOptionSelect = {};
* jsonOptionSelect.Value="ute1";
* jsonOptionSelect.Text="utente 1";
* jsonSelectParam.Option.push(jsonOptionSelect);
* jsonOptionSelect = {};
* jsonOptionSelect.Value="ute2";
* jsonOptionSelect.Text="utente 2";
* jsonSelectParam.Option.push(jsonOptionSelect);
* jsonSearchParam.Select = jsonSelectParam
* 
* // Definizione delle proprietà del Bottone presente nel Search
* var jsonButtonParam = {};
* jsonButtonParam.Label = FormatMsg("Btn di prova");
* jsonButtonParam.Action = "actionButton";
* jsonButtonParam.Tooltip = FormatMsg("Btn di prova tooltip");
* jsonSearchParam.Button = jsonButtonParam;
* 
* // Istanzio l'oggetto
* hrifSearch = new HrifSearch(this,jsonSearchParam);
* 
* // Carico l'oggetto nel container
* this.hrif_container0.Load(hrifSearch)
*/
this.HrifSearch = function (form, jsonSearchParam) {
	let jsonSearch = (typeof (jsonSearchParam) == 'string') ? JSON.parse(jsonSearchParam) : jsonSearchParam;

	this.form = form;
	this.portletId = this.form.formid;
	this.idItemCalc = HrifGetItem(jsonSearch.IdItem);
	this.idItem = this.portletId + '_' + this.idItemCalc;
	this.select = (jsonSearch.Select) ? jsonSearch.Select : null; // proprietà oggetto select
	this.txtObj = jsonSearch.TxtObj; 	// oggetto textbox
	this.button = jsonSearch.Button;
	this.functionSuggest = jsonSearch.FunctionSuggest;
	this.disabled = jsonSearch.Disabled;

	this.typeObj = "pattern";
	this.nameObj = "HrifSearch";
	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.SEARCH;

	// creo div principale
	this.docSelectSearchFrag = document.createDocumentFragment();
	documentFrag(this.docSelectSearchFrag, 'div', this.idItem, '', this.classNameBase);

	if (this.select) {
		if (this.select.Label) {
			this.select.Label = ""; 		// sovrascrivo eventuale label 	
		}
		// istanzio oggetto select 
		this.selectObj = new HrifSelect(this.form, this.select);
		// gestione ordinamento degli elmenti
		this.docSelectSearchFrag.getElementById(this.idItem).appendChild(this.selectObj.getObject());
	}

	if (typeof (this.txtObj) == 'undefined') {
		hrifConsole("[HRIF] HrifSearch : ATTENZIONE: non è stato impostato l'oggetto Textbox di Portal Studio", 'error');
		return null;
	} else {
		var jsonPageSearchParm = {};
		jsonPageSearchParm.FunctionSuggest = this.functionSuggest;
		hrifPageSearch(this.form, this.txtObj, jsonPageSearchParm);
		// aggiungo oggetto text search
		this.docSelectSearchFrag.getElementById(this.idItem).appendChild(document.getElementById(this.txtObj.Ctrl.id));
	}

	// verifico se devo aggiungere oggetto HrifButton
	if (this.button) {
		// sovrascrivo eventuali proprietà passate da portlet
		this.button.Type = hrifBUTTONTYPE.NORMAL;
		this.button.Layout = hrifBUTTONLAYOUT.CONTAINED;
		this.button.Icon = hrifICON.ARROW_RIGHT;
		var button = new HrifButton(this.form, this.button);
		button.setType(hrifBUTTONTYPE.PRIMARY);
		this.docSelectSearchFrag.getElementById(this.idItem).appendChild(button.getObject());
	}

	this.wrkDocFrag = this.docSelectSearchFrag.children[0];

	/** Disabilita l'oggetto
	 * 
	 */
	this.Disable = function () {
		this.wrkDocFrag.setAttribute("disabled", "true");
		this.disabled = true;
	};
	if (this.disabled)
		this.Disable();

	/** Abilita l'oggetto
	 * 
	 */
	this.Enable = function () {
		this.wrkDocFrag.removeAttribute("disabled");
		this.disabled = false;
	};

	/** Nasconde l'oggetto
	 * @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	 *
	 */
	this.Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		let wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	 * 
	 */
	this.Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
	};

	/**
	 * ritorna value della combo selezionata
	 * @returns {String} valore combo selezionata
	 */
	this.getSelectValue = function () {
		return (this.select) ? this.selectObj.getValue() : "";
	};

	/**
	 * ritorna testo della combo selezionata
	 * @returns {String}  testo combo selezionata
	 */
	this.getSelectText = function () {
		return (this.select) ? this.selectObj.getText() : "";
	};

	/** Reperimento codice Html dell'oggetto
	 * @returns {String} Stringa contenente il codice Html dell'oggetto.
	 */
	this.getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	 * @ignore
	 * @returns {null} Ritorna l'oggetto.
	 */
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};
};


function execPortletActionCbx(portletId, action, parm, obj, stopPropagation, event) {

	//	return obj.wrkDocFrag.getElementsByClassName(obj.classNameBase)[0].value;
	var selectedIdx = obj.wrkDocFrag.getElementsByTagName("select")[0].selectedIndex;
	var options = obj.wrkDocFrag.getElementsByTagName("select")[0].options;

	if (obj.wrkDocFrag.getElementsByClassName(obj.classNameValue)[0])
		obj.wrkDocFrag.getElementsByClassName(obj.classNameValue)[0].innerText = options[selectedIdx].text;
	//	eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '("' + obj.wrkDocFrag.getElementsByClassName(obj.classNameBase)[0].value + '");');
	eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + action + '("' + options[selectedIdx].value + '");');

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifSvg
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Svg
* @ignore
* @class
* @param {object} form - this.
* @param {json|object} jsonSvg - Proprietà dell'oggetto
* @param {hrifSVG} jsonSvg.Svg - hrifSVG
* @param {string} [jsonSvg.Tooltip] - Descrizione del tooltip
* @returns {object} Oggetto Svg.
*/
this.HrifSvg = function (form, jsonSvgParam) {

	var jsonSvg = (typeof (jsonSvgParam) == 'string') ? JSON.parse(jsonSvgParam) : jsonSvgParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonSvg.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.svg = jsonSvg.Svg;
	this.status = jsonSvg.Status;
	this.typeObj = 'pattern';

	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.SVG;

	this.tooltip = "";
	this.statusSvg = "";
	this.classSize = "";
	this.alignment = "";
	this.genericClass = "";

	this.wrkObjFrag = document.createDocumentFragment();
	documentFrag(this.wrkObjFrag, 'div', this.idItem, '', this.classNameBase);
	// Istanzio l'oggetto Svg
	var svgObj = new XMLHttpRequest();
	//svgObj.open("GET", "https://hrportal.network-contacts.it/HRPORTAL/SpTheme_NG/hrvg/illustrations/" + this.svg, false);
	svgObj.open("GET", "../" + ZtVWeb.theme + "/hrvg/illustrations/" + this.svg, false);
	svgObj.overrideMimeType("image/svg+xml");
	svgObj.parentIdItem = this.idItem;
	svgObj.send("");
	this.wrkObjFrag.getElementById(this.idItem).appendChild(svgObj.responseXML.documentElement);

	this.wrkObj = this.wrkObjFrag.children[0];

	/** Aggiorna l'oggetto svg
	* @ignore
	* @param {string} svg - hrifSVG.
	* @returns {null} Aggiorna l'oggetto svg.
	*/
	this.Value = function (svgValue) {
		this.svg = svgValue;
		// Istanzio l'oggetto Svg
		this.svgObj = new XMLHttpRequest();
		this.svgObj.open("GET", "../" + ZtVWeb.theme + "/hrvg/illustrations/" + this.svg, false);
		this.svgObj.overrideMimeType("image/svg+xml");
		this.svgObj.parentIdItem = this.idItem;
		this.svgObj.send("");

		if (document.getElementById(this.idItem) != null) {
			var wrkDoc = document.getElementById(this.idItem);
			wrkDoc.innerHTML = "";
			document.getElementById(this.idItem).appendChild(this.svgObj.responseXML.documentElement);
		}

	};

	/** Visualizza l'oggetto svg
	* @ignore
	* @returns {null} Visualizza l'oggetto svg.
	*/
	this.Show = function () {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifRemoveClass(wrkDoc, hiddenDisplay);
		hrifRemoveClass(wrkDoc, hiddenVisibility);
	};

	/** Nasconde l'oggetto svg
	* @ignore
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto svg.
	*/
	this.Hide = function (preserveSpace) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(wrkDoc, wrkClass);
	};

	/** Imposta il tooltip
	* @param {string} tooltip - Contenuto del tooltip.
	* @returns {null} Valorizza il tooltip.
	*/
	this.setTooltip = function (tooltip) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.title = tooltip;
		this.tooltip = tooltip;
	};

	/** Imposta il dimensionamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Carica l'oggetto ridimensionato.
	*/
	this.setSize = function (size) {
		if (size == hrifSIZE.XSMALL || size == hrifSIZE.XLARGE) hrifConsole("[HRIF] .setSize() SVG - : non previste le dimensioni impostate (XSMALL/XLARGE)", 'warn');

		this.classSize = this.classNameBase + "--" + size;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--small", hrifCLASSBASE.SVG + "--medium", hrifCLASSBASE.SVG + "--large");
		hrifAddClass(wrkDoc, this.classSize);

	};

	/** Imposta l'allineamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Allinea l'oggetto Svg.
	*/
	this.setStyleColor = function (statusSvg) {
		this.statusSvg = this.classNameBase + "--" + statusSvg;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--primary", hrifCLASSBASE.SVG + "--success", hrifCLASSBASE.SVG + "--danger", hrifCLASSBASE.SVG + "--warning", hrifCLASSBASE.SVG + "--info");
		hrifAddClass(wrkDoc, this.statusSvg);
	};
	if (this.status)
		this.setStyleColor(this.status);


	/** Imposta l'allineamento dell'oggetto svg
	* @ignore
	* @param {string} size - Dimensione dell'oggetto Svg.
	* @returns {null} Allinea l'oggetto Svg.
	*/
	this.setAlignment = function (align) {
		this.alignment = this.classNameBase + "--" + align;
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		wrkDoc.classList.remove(hrifCLASSBASE.SVG + "--left", hrifCLASSBASE.SVG + "--top-left", hrifCLASSBASE.SVG + "--top", hrifCLASSBASE.SVG + "--top-right", hrifCLASSBASE.SVG + "--center", hrifCLASSBASE.SVG + "--right", hrifCLASSBASE.SVG + "--bottom-left", hrifCLASSBASE.SVG + "--bottom", hrifCLASSBASE.SVG + "--bottom-right");
		hrifAddClass(wrkDoc, this.alignment);
	};

	this.addClass = function (className) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifAddClass(wrkDoc, className);
		this.genericClass += " " + className;
	};

	this.removeClass = function (className) {
		var wrkDoc = "";
		if (this.isLoaded) {
			wrkDoc = document.getElementById(this.idItem);
		} else {
			wrkDoc = this.wrkObj;
		}
		hrifRemoveClass(wrkDoc, className);
	};

	this.getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	this.getObject = function () {
		return this.wrkObj;
	};

	/** Caricamento dell'Immagine
	* @ignore
	* @param .
	* @returns {null} Carica l'Immagine.
	*/
	this.Load = function (parentObjIdParm) {
		var classDiv = (this.classSize != "") ? this.classNameBase + ' ' + this.classSize : this.classNameBase;
		this.wrkObj = createDocumentChild('div', parentObjIdParm, this.idItem, '', classDiv);
		// appendObjectIntoDocument(this.wrkObj.children[0], parentObjIdParm);
		// Definizione del tooltip, stato e allineamento
		if (this.tooltip != "") this.wrkObj.title = this.tooltip;
		if (this.statusSvg != "") hrifAddClass(this.wrkObj, this.statusSvg);
		if (this.alignment != "") hrifAddClass(this.wrkObj, this.alignment);
		if (this.genericClass != "") hrifAddClass(this.wrkObj, this.genericClass);

		// Istanzio l'oggetto Svg
		var svgObj = new XMLHttpRequest();
		//		svgObj.open("GET", "https://hrportal.network-contacts.it/HRPORTAL/SpTheme_NG/hrvg/illustrations/" + this.svg, true);
		svgObj.open("GET", "../" + ZtVWeb.theme + "/hrvg/illustrations/" + this.svg, false);
		//svgObj.open("GET", "../" + ZtVWeb.theme +"/hrvg/illustrations/" + this.svg, true);
		svgObj.overrideMimeType("image/svg+xml");
		svgObj.parentIdItem = this.idItem;
		svgObj.onload = function (e) {
			// Asincrona - al termine del caricamento aggiungo l'oggetto svg al documento
			document.getElementById(svgObj.parentIdItem).appendChild(svgObj.responseXML.documentElement);
		};
		svgObj.send("");

		this.isLoaded = true;
	};

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Title Zone sul Label di PS
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Imposta la <b>Label</b> come Title Zone
* @class hrifTitleZoneType
* @memberOf Titles
* @param {object} ctrlParm - Oggetto <b>Label</b> di PortalStudio (esempio this.Label).
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*/
function hrifTitleZoneType(ctrlParm) {

	var classNameBase = hrifCLASSBASE.TITLEZONE;
	var className = classNameBase + "-zone";

	ctrlParm.Ctrltbl.className = classNameBase + " " + className;
	ctrlParm.Ctrl.className = className + " " + ctrlParm.name + "_ctrl";
}

/** Imposta la <b>Label</b> in modalità Title Filter
* @class hrifTitleFilterType
* @memberOf Titles
* @param {object} ctrlParm - Oggetto <b>Label</b> di PortalStudio (esempio this.Label).
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*/
function hrifTitleFilterType(ctrlParm) {

	var classNameBase = hrifCLASSBASE.TITLEFILTER;
	var className = classNameBase + "-filter";

	ctrlParm.Ctrltbl.className = classNameBase + " " + className;
	ctrlParm.Ctrl.className = className + " " + ctrlParm.name + "_ctrl";
}

/** Imposta il <b>Combobox</b> in modalità hrifDropdownType
* @class hrifDropdownType
* @memberOf Titles
* @param {object} ctrlParm - Oggetto <b>Combobox</b> di PortalStudio (esempio this.Combobox).
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*/
function hrifDropdownType(ctrlParm) {

	var classNameBase = hrifCLASSBASE.DROPDOWN;
	ctrlParm.Ctrl.className = classNameBase + " " + ctrlParm.name + "_ctrl";
}


/**
* Questo è uno spazio che contiene elementi di documentazione appartenenti a Textbox
*
* @namespace TextBox
*
*/

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Textbox Type
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Imposta la tipologia del <b>TextBox</b>
* @class hrifTextBoxType
* @memberOf TextBox
* @param {object} ctrlParm - Oggetto <b>Textbox</b> di PortalStudio (esempio this.Text).
* @param {json|object} jsonType - Proprietà dell'oggetto.
* @param {hrifTEXTBOXTYPE} jsonType.Type - Tipologia dell'oggetto.
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*
* @example 
*
* // Definizione delle proprietà
* var jsonTextType = {};
* jsonTextType.Type = hrifTEXTBOXTYPE.DATE;
*
* // Applico le proprietà sull'oggetto di Portal Studio
* hrifTextboxType(this.TxtExample, jsonTextType);
*
*/
function hrifTextboxType(ctrlParm, jsonTypeParam) {

	var jsonType = (typeof (jsonTypeParam) == 'string') ? JSON.parse(jsonTypeParam) : jsonTypeParam;

	var classNameBase = hrifCLASSBASE.TEXTBOX;
	var classNameContainer = classNameBase + '-container';
	var className = classNameContainer + " ";

	var jsonIconParm = hrifGetJsonLabel();
	jsonIconParm.IdItem = ctrlParm.ctrlid;
	jsonIconParm.Icon = jsonType.Type;
	var iconObj = new HrifIcon("", jsonIconParm);
	iconObj.addClass(classNameBase + "__icon");
	// Rimuovo la 'vecchia' icon
	if (document.getElementById(iconObj.idItem))
		document.getElementById(iconObj.idItem).remove();
	// Aggiungo la nuova icon
	if (jsonType.Type != "")
		document.getElementById(ctrlParm.Ctrl.id).appendChild(iconObj.getObject());

	// Reimposto le classi al Textbox
	ctrlParm.Ctrl.className = ctrlParm.Ctrl.className + " " + className;
	ctrlParm.Ctrl_input.className = classNameBase;
	if (ctrlParm.hide == 'true')
		ctrlParm.Hide();

}


/** Imposta suggester su campo textbox dell'oggetto <b>hrifPageSearch</b>
* @class hrifPageSearchSuggest
* @memberOf TextBox
* @param {object} form this
* @param {object} ctrlParm oggetto textbox di portalstudio
* @param {json|object} jsonSerchSuggestParam parametri suggester
* @param {string[]} jsonSerchSuggestParam.OptionsList  Array option datalist

* 
* @example
* let jsonPageSearchSuggest = {}
* let options = [];
* options.push('utente1')
* options.push('utente2')
* options.push('utente3')
* options.push('utente4')
* 
* jsonPageSearchSuggest.OptionsList = options;
* // chiamata alla function
* hrifPageSearchSuggest(this,this.TxtFilter, jsonPageSearchSuggest)
*/
function hrifPageSearchSuggest(form, ctrlParm, jsonPageSerchSuggestParam) {

	if (jsonPageSerchSuggestParam == null)
		jsonPageSerchSuggestParam = {};

	var jsonPageSearchSuggest = (typeof (jsonPageSerchSuggestParam) == 'string') ? JSON.parse(jsonPageSerchSuggestParam) : jsonPageSerchSuggestParam;

	this.form = form;
	let portletId = this.form.formid;
	this.txtObj = ctrlParm;

	this.optionsList = jsonPageSearchSuggest.OptionsList;

	this.classBaseName = hrifCLASSBASE.TEXTBOX + "--list";
	this.dataListId = ctrlParm.ctrlid + 'list';

	// rimuovo eventuale datalist
	if (document.getElementById(this.dataListId))
		document.getElementById(this.dataListId).remove();

	if (typeof (this.txtObj) == 'undefined') {
		hrifConsole("[HRIF] hrifPageSearchSuggest : ATTENZIONE: non è stato impostato l'oggetto Textbox di Portal Studio'", 'warn');
		return null;
	} else {
		// creo datalist
		this.docDatalist = document.createDocumentFragment();
		documentFrag(this.docDatalist, 'datalist', this.dataListId, '', this.classBaseName);

		// ciclo sugli e creo option
		for (let IdxOption = 0; IdxOption < this.optionsList.length; IdxOption++) {
			this.docElemFrag = document.createDocumentFragment();
			documentFrag(this.docElemFrag, 'option', portletId + 'opt' + IdxOption, '', '');
			let ojbOption = this.optionsList[IdxOption];
			this.docElemFrag.children[0].setAttribute("value", ojbOption);
			this.docDatalist.getElementById(this.dataListId).appendChild(this.docElemFrag.children[0]);
		}

		document.getElementById(this.txtObj.Ctrl.id).appendChild(this.docDatalist);
	}
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// hrifPageSearch
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Imposta il <b>TextBox</b> in modalità di Ricerca
* @classdesc Il corretto utilizzo della funzione non prevede l'utilizzo dell'evento "onchange" da Action Code, la funzione genera automaticamente un evento <b>"nomeTextbox_enter"</b>
* @class hrifPageSearch
* @memberOf TextBox
* @param {object} this - Oggetto this.
* @param {object} ctrlParm - Oggetto <b>Textbox</b> di PortalStudio (esempio this.TxtFilter).
* @param {json|object} [jsonPageSearchParm] - Parametri suggester
* @param {string} [jsonPageSearchParm.FunctionSuggest] - Azione di callback per suggester
*
* @example <caption>Esempio senza suggester</caption> 
*
* // Applico le proprietà all'oggetto di Portal Studio
* hrifPageSearch(this, this.TxtFilter,pageSearchParam);

* @example <caption>Esempio con suggester abilitato</caption> 
*
* // definisco le proprietà 
* let pageSearchParam = {}
* pageSearchParam.FunctionSuggest ="callbackFunct";
* // Applico le proprietà all'oggetto di Portasl Studio
* hrifPageSearch(this, this.TxtFilter,pageSearchParam);
*
*/
function hrifPageSearch(form, ctrlParm, jsonPageSearchParm) {

	if (jsonPageSearchParm == null)
		jsonPageSearchParm = {};
	var jsonPageSearch = (typeof (jsonPageSearchParm) == 'string') ? JSON.parse(jsonPageSearchParm) : jsonPageSearchParm;

	this.form = form;
	let functionSuggest = jsonPageSearch.FunctionSuggest;

	var classNameBase = hrifCLASSBASE.TEXTBOX;
	var classNamePageSearch = hrifCLASSBASE.PAGESEARCH;
	var classNameContainer = classNameBase + '-container';
	
	// Rimuovo la 'vecchia' icon di Search
	if (ctrlParm.Ctrl.getElementsByClassName("hrvg-icon-" + hrifICON.SEARCH).length==1){
		ctrlParm.Ctrl.getElementsByClassName("hrvg-icon-" + hrifICON.SEARCH)[0].remove();
	}
	
	// Definizione Icona di Ricerca
	var jsonIconParm = {};
	jsonIconParm.IdItem = ctrlParm.ctrlid;
	jsonIconParm.Icon = hrifICON.SEARCH;
	this["iconObj" + jsonIconParm.IdItem] = new HrifIcon("", jsonIconParm);
	this["iconObj" + jsonIconParm.IdItem].addClass(classNameBase + "__icon");
	wrkDocIconSearch = this["iconObj" + jsonIconParm.IdItem].idItem; 
	
//	if (ctrlParm.Value() != "")
//		this["iconObj" + jsonIconParm.IdItem].setStyle(hrifICONSTYLE.FILLED);
//	this["iconObj" + jsonIconParm.IdItem].addClass(classNameBase + "__icon");

	// Definizione Icon di Cancella
	var jsonIconDelParm = {};
	jsonIconDelParm.IdItem = ctrlParm.ctrlid + 'del';
	jsonIconDelParm.Icon = hrifICON.CANCEL;
	this["iconObjDel" + jsonIconDelParm.IdItem] = new HrifIcon("", jsonIconDelParm);
	this["iconObjDel" + jsonIconDelParm.IdItem].setStyle(hrifICONSTYLE.FILLED);

	// Rimuovo la 'vecchia' icon di cancellazione
	if (ctrlParm.Ctrl.getElementsByClassName("hrvg-icon-" + hrifICON.CANCEL).length==1){
		ctrlParm.Ctrl.getElementsByClassName("hrvg-icon-" + hrifICON.CANCEL)[0].remove();
	}

	/**
	 * rimuove le classi hrif
	 * @ignore
	 */
	removeCustomClass = function (ctrlParm) {
		for (i = ctrlParm.Ctrl.classList.length - 1; i >= 0; i--) {
			if (ctrlParm.Ctrl.classList[i].indexOf(classNameBase) >= 0 || ctrlParm.Ctrl.classList[i].indexOf(classNamePageSearch) >= 0) {
				ctrlParm.Ctrl.classList.remove(ctrlParm.Ctrl.classList[i]);
			}
		}
	};

	/**
	 * aggiunge le classi hrif
	 * @ignore
	 */
	addCustomClass = function (ctrlParm) {
		ctrlParm.Ctrl.classList.add(classNameContainer, classNameContainer + "--action", classNamePageSearch);
		ctrlParm.Ctrl_input.classList.add(classNameBase);
	};


	// Aggiungo Icona di Ricerca 
	document.getElementById(ctrlParm.Ctrl.id).prepend(this["iconObj" + jsonIconParm.IdItem].getObject());
	// Aggiungo Icona di Cancella 
	document.getElementById(ctrlParm.Ctrl.id).appendChild(this["iconObjDel" + jsonIconDelParm.IdItem].getObject());
	this["iconObjDel" + jsonIconDelParm.IdItem].Hide();

	// Reimposto le classi al Textbox
	// ctrlParm.Ctrl.classList.add(classNameContainer, classNameContainer + "--action", classNamePageSearch);
	// ctrlParm.Ctrl_input.classList.add(classNameBase);
	addCustomClass(ctrlParm); // aggiungo le classi custom

	/**
	 * 
	 * utilizzata per chiamare la funzione di callback sul portlet
	 */
	this.callbackFunction = function (par) {
		let portletId = this.form.formid;
		var textValue = document.getElementById(ctrlParm.Ctrl_input.id).value;
		eval('ZtVWeb.getPortletById(\'' + portletId + '\').' + functionSuggest + '("' + textValue + '");');
	};

	//se suggest attivo aggiungo azione di callback
	if (functionSuggest) {
		// cambio il type da text a list
		// document.getElementById(ctrlParm.Ctrl_input.id).removeAttribute("type");
		document.getElementById(ctrlParm.Ctrl_input.id).setAttribute("list", ctrlParm.ctrlid + 'list');
		document.getElementById(ctrlParm.Ctrl_input.id).addEventListener('keyup', this.callbackFunction.bind(this));
	}

	// Vado a gestire la visualizzazione dell'icona in base al contenuto del campo
	this.viewIcon = function (ctrlParm) {
		//ctrlParm.Ctrl_input.onblur();
		if (ctrlParm.Value() == "") {
//			if (jsonPageSearch.Action) {
				this["iconObjDel" + jsonIconDelParm.IdItem].Hide();
//			} else {
//				this["iconObj" + jsonIconParm.IdItem].Value(hrifICON.SEARCH);
//				this["iconObj" + jsonIconParm.IdItem].setStyle('');
				ctrlParm.dispatchEvent('enter');
//			}
		} else {
			this["iconObjDel" + jsonIconDelParm.IdItem].Show();
//			this["iconObjDel" + jsonIconParm.IdItem].Value(hrifICON.CANCEL);
//			this["iconObjDel" + jsonIconParm.IdItem].setStyle(hrifICONSTYLE.FILLED);
		}
	};
	var funzViewIcon = this.viewIcon.bind(null, ctrlParm);
	//document.getElementById(ctrlParm.Ctrl_input.id).removeEventListener("keyup",funzViewIcon);

	element = document.getElementById(ctrlParm.Ctrl_input.id);

	if (element.getAttribute('listener') !== 'true') {
		element.addEventListener("keyup", funzViewIcon);
		document.getElementById(ctrlParm.Ctrl_input.id).addEventListener("keyup", function (event) {
			if (event.keyCode == 13) {
				ctrlParm.dispatchEvent('enter');
			}
		});
		element.setAttribute('listener', 'true');
	}
	//document.getElementById(ctrlParm.Ctrl_input.id).addEventListener("keyup",funzViewIcon);

	// Controllo il click del tasto Enter e richiamo l'azione di call back nomecampo_enter()
	//	document.getElementById(ctrlParm.Ctrl_input.id).addEventListener("keyup", function (event) {
	//  		if (event.keyCode == 13) {
	//			ctrlParm.dispatchEvent('enter');
	//  		}
	//	});

	// Al click sulla X reimposto l'icona di Search
	this.removeText = function (iconObj) {

		ctrlParm.Value("");
//		if (jsonPageSearch.Action) {
			iconObj.Hide();
			ctrlParm.dispatchEvent('enter');
//		} else {
//			iconObj.Value(hrifICON.SEARCH);
//			iconObj.setStyle('');
			ctrlParm.SetFocus();
//		}
		// se autosuggest rimuovo oggetto list
		if (this.functionSuggest) {
			let portletId = this.form.formid;
			if (document.getElementById(portletId + 'list'))
				document.getElementById(portletId + 'list').remove();
		}
	};

	// Valorizzo la nuova azione
	this.wrkIconActionCustom = this.removeText.bind(null, this["iconObjDel" + jsonIconDelParm.IdItem]);
	this["iconObjDel" + jsonIconDelParm.IdItem].setActionCustom(this.wrkIconActionCustom);

	// Se impostai i Filtri li visualizzo
	if (!jsonPageSearch && this.iconObjFil) {
		document.getElementById(this.iconObjFil.idItem).remove();
	}

	this.iconObjFil = null;
	if (jsonPageSearch.Action) {
		var jsonIconFilterParm = hrifGetJsonLabel();
		jsonIconFilterParm.IdItem = ctrlParm.ctrlid + "_f";
		jsonIconFilterParm.Icon = hrifICON.LIST;
		jsonIconFilterParm.Action = jsonPageSearch.Action;
		this.iconObjFil = new HrifIcon(this.form, jsonIconFilterParm);
		this.iconObjFil.addClass(classNameBase + "__icon");
		this.iconObjFil.addClass(classNameBase + "__action");
		if (document.getElementById(this.iconObjFil.idItem))
			document.getElementById(this.iconObjFil.idItem).remove();
		document.getElementById(ctrlParm.Ctrl.id).appendChild(this.iconObjFil.getObject());
		if (ctrlParm.Value() == "") {
			// Nascondo l'icona search
			this["iconObjDel" + jsonIconDelParm.IdItem].Hide();
		} else {
			// Visualizzo l'icona x
			this["iconObjDel" + jsonIconDelParm.IdItem].Show();
		}
	}

	// mi salvo le funzioni hide e show
	ctrlParm.HrifHide = ctrlParm.Hide;
	ctrlParm.HrifShow = ctrlParm.Show;

	// aggiungo alla hide la removeclass
	ctrlParm.Hide = function () {
		removeCustomClass(ctrlParm);
	};

	// aggiungo alla show la addclass
	ctrlParm.Show = function () {
		addCustomClass(ctrlParm);
	}

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Funzione che determina il percorso del file SVG
* @ignore
* @class
* @param {hrifSVG} svgValue - Valore hrifSVG
* @returns {string} Restituisce il percorso del file SVG.
*/
function hrifGetSvgPath(svgValue) {
	return "../" + ZtVWeb.theme + "/hrvg/illustrations/" + svgValue;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Imposta la tipologia della Toolbar
* @class hrifSPToolbarType
* @memberOf Toolbar
* @param {object} ctrlParm - Oggetto di PortalStudio (esempio this.Grid).
* @param {string} styleType - Tipo di oggetto (hrifGRIDSTYLE).
* @returns {null} Carica l'oggetto nella tipologia selezionata.
*/
function hrifSPToolbarType(ctrlParm, jsonType) {

	var classNameBase = hrifCLASSBASE.TOOLBAR;
	var className = classNameBase + " ";

	// Imposto le classi per la tipologia di Grid
	if (jsonType.ToolbarType)
		className += classNameBase + "--" + jsonType.ToolbarType.class + " ";

	// Imposto le classi per la tipologia di Card
	if (jsonType.ToolbarAlign)
		className += classNameBase + "--" + jsonType.ToolbarAlign.class + " ";

	// Reimposto le classi alla card
	ctrlParm.cssClass = classNameBase;
	ctrlParm.Ctrl.className = className;

	//	wrkDoc = document.getElementById(ctrlParm.ctrlid + "_menuContent");
	//	if (wrkDoc!=null){
	////		if (!wrkDoc.classList.contains('hrif-toolbar_menu'))
	//			wrkDoc.classList.add('hrif-toolbar__menu');
	//	}
	//	
	//	wrkDoc2 = document.getElementById(ctrlParm.ctrlid + "_NAV_menuContent");
	//	if (wrkDoc2!=null){
	////		if (!wrkDoc.classList.contains('hrif-toolbar_menu'))
	//			wrkDoc2.classList.add('hrif-toolbar__menu');
	//	}

}



/** Gestisce l'apertura del SPLinker nella modalità indicata
* @ignore
* @class
* @memberOf Portlet Action
* @param {object} splinerObject - Oggetto SPLinker
* @param {hrifOPENMODETYPE} modeValue - hrifOPENMODETYPE.*
* @returns {null} Apre l'oggetto nella modalità indicata.
*/
function hrifLinkerType(splinerObject, modeValue) {

	var classBase = "";
	classBase += modeValue;
	splinerObject.setCustomClass(classBase);

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifSPToolbar
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
this.HrifSPToolbar = function (form, SPtoolbarName) {

	this.form = form;
	this.spToolBarName = SPtoolbarName;

	this.portletId = this.form.formid;

	this.idItemSvg = this.form.formid + "_" + SPtoolbarName.SPToolbar;

	this.wrkObj = new HrifIconObj(this.form, this.idItemSvg, hrifICON.MENU_DOTS);

	// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
	// altrimenti non riuscirebbe ad eliminarlo
	actionStr = SPtoolbarName.SPToolbar + ".ToggleMenu";
	this.wrkAction = execPortletAction.bind(null, this.portletId, actionStr);
	if (this.wrkObj.wrkObj.addEventListener) {
		this.wrkObj.wrkObj.addEventListener("click", this.wrkAction, false);
	} else if (this.wrkObj.wrkObj.addEventListener) {
		this.wrkObj.wrkObj.addEventListener("click", this.wrkAction);
	}
	hrifAddClass(this.wrkObj, 'cursor_pointer');

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkObj.getObject();
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};


};


function hrifCheckImage(srcImage) {
	return true;
	// questo era il codice
	// try {
	// 	var http = new XMLHttpRequest();
	// 	http.open('HEAD', srcImage, false);
	// 	http.send();
	// 	return http.status != 404;
	// } catch (e) {
	// 	return false;
	// }

	//	var checkImage = new Image();	
	//	checkImage.src = srcImage;

	//	if (checkImage.complete) {
	//	  	return true;
	////		callback(true);
	//	} else {
	//	  checkImage.onload = () => {
	//	    return true;
	////		callback(true);
	//	  };
	//  
	//	  checkImage.onerror = () => {
	//	    return false;
	////		callback(false);
	//	  };
	//	}

}


function hrifGetHtmlAction(formid, object, action, param) {

	if (action) {
		var wrkOuterHtml = "";
		wrkOuterHtml = object.outerHTML;
		var htmlAction = wrkOuterHtml.replace('id', 'onclick ="event.stopPropagation();javascript:' + formid + '.' + action + '(' + param + ')" id');
		return htmlAction;
	} else {
		return object.outerHTML;
	}

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifGetItem
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function HrifGetItem(idItem) {
	if (idItem)
		return idItem;
	else
		return Math.random().toString(16).substr(2, 5);
}


function HRMIsActive() {
	var isMobile = false;
	if (typeof (Biometric) != "undefined")
		isMobile = true;
	return isMobile;
}




// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// SPLinker
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function hrifSPLinkerResponsive(form, objSPlinker) {
	let closeLayer;
	this.form = form;
	let nameLayer = objSPlinker.name;
	//mi salvo definizione della funzione originale
	let oldFunct = eval("this.form." + nameLayer + "_LayerClosed");

	// verifico se ho gia aggiunto evento su questo splinker
	if (!objSPlinker.closeLayerEvt) {
		closeLayer = new CustomEvent('closeLayer' + nameLayer);
		objSPlinker.closeLayerEvt = closeLayer;
		document.addEventListener('closeLayer' + nameLayer, (e) => {
			// rimuovo le classi aggiunte
			window.document.body.classList.remove(hrifCLASSBASE.MOBILE);
			// rimetto la vecchia funzione
			eval("this.form." + nameLayer + "_LayerClosed = " + oldFunct);
		}, false);
	}
	else {
		closeLayer = objSPlinker.closeLayerEvt;
	}


	// se sono in modalità mobile aggiungo le classi
	if (hrifIsMobile()) {
		window.document.body.classList.add(hrifCLASSBASE.MOBILE);

		// riscrivo la funione aggiungendo evento custom
		const newFunct = function () {
			if (oldFunct) {
				oldFunct.call();
			}
			document.dispatchEvent(closeLayer);
		};

		// sovrascrivo la nuova funzione
		eval("this.form." + nameLayer + "_LayerClosed = " + newFunct);
	}
	// eseguo Link
	objSPlinker.Link();

}

function hrifIsMobile() {
	if (window.top.innerWidth < hrifMOBILE.WIDTH)
		return true;
	else
		return false;
}


/**
 *  genera oggetto HrifLabelCounterGroup
 * @class
 * 
 */
class HrifLabelCounterGroup {

	/**
	 * 
	 * @param {object} form - portlet 
	 * @param {object} jsonLabelCounterProp - json di configurazione  
	 */
	constructor(form, jsonLabelCounterProp,customClass) {

		jsonLabelCounterProp = (typeof jsonLabelCounterProp == 'string') ? JSON.parse(jsonLabelCounterProp) : jsonLabelCounterProp;

		// leggo le proprietà dal json di configurazione
		this.action = jsonLabelCounterProp.Action;
		this.labels = jsonLabelCounterProp.Labels;
		this.title = jsonLabelCounterProp.Title;
		this.selected = jsonLabelCounterProp.Selected; // id da selezionare

		// inizializzo le variabili di lavoro
		this.isLoaded = false;
		this.wrkObj = null;
		this.form = form;
		this.portletId = this.form.formid;
		this.selectedNode;
		this.selectedDivSon = null;
		this.idItemSubPrec = null;
		this.idFatherPrec = null;

		// definisco id del container
		this.idItem = this.form.formid + "_" + HrifGetItem(jsonLabelCounterProp.IdItem);
		this.idItemSub = this.idItem + "_sub";

		//definisco class del container
		this.classNameBase = (customClass)?customClass:hrifCLASSBASE.LABELCOUNTERGROUP;
		this.classNameSub = hrifCLASSBASE.LABELCOUNTER + "__group-sub";

		// creo markup html
		this.createStructureHtml();

		// se ho settato la proprietà selected seleziono la label
		if (this.selected) {
			// ricerco oggetto tramite la proprietà custom
			let wrkSelected = this.wrkObj.querySelector('[data-labelid="' + this.idItem + "_" + this.selected + '"]');
			this.setSelected(wrkSelected);
		}
	}

	/**
	 * crea la struttura html
	 * @ignore
	 * @param {object} form oggetto form del portlet
	 * @param {object} jsonLabelCounterProp json configurazione oggetto
	 */
	createStructureHtml = function (filter, destroy, idItem) {

		if (destroy) this.removeStructure(idItem);
		
		// creo il div container
		this.docContainerFrag = document.createDocumentFragment();
		documentFrag(this.docContainerFrag, 'div', this.idItem, '', this.classNameBase);

		// se ho il title creo oggetto HrifTitleZone
		if (this.title) {
			var jsonTitleObjParm = {};
			jsonTitleObjParm.Title = this.title;

			// Istanzio l'oggetto 
			this.titleObj = new HrifTitleObject(this.form, jsonTitleObjParm);

			// aggiungo titleZone
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.titleObj.getObject());
		}
		
		let idxLabel = 0;

		// ciclo sull'array di label
		for (const labelCounter of this.labels) {
			// aumento il contatore - usato solo se non viene passato id
			idxLabel++;

			if (typeof(labelCounter.IdFather)=='undefined' || labelCounter.IdFather==""){
				
				if (typeof(filter)=='undefined' || (labelCounter.Label.toLowerCase().includes(filter.toLowerCase()))) {
				
				let idLabel = (labelCounter.Id) ? labelCounter.Id : idxLabel.toString();
				
					// creo il div container
					this.docDivFrag = document.createDocumentFragment();
					documentFrag(this.docDivFrag, 'div', this.idItem + '_div', '', '');
					this.docDivFrag.children[0].setAttribute('data-labelidlbl', this.idItem + "lbl_" + idLabel);
		
					let hrifLabelCounter = new HrifLabelCounter(this.form, labelCounter);
		
					let wrkLabelCounter = hrifLabelCounter.getObject();
					// aggiungo una proprietà custom in modo da ricercare la label
					wrkLabelCounter.setAttribute('data-labelid', this.idItem + "_" + idLabel);
					
					let callBack = function() {
						ZtVWeb.getPortletById(this.portletId)[this.action](idLabel,labelCounter.Label);
						setTimeout(() => {
							window[this.form.formid].adjustHeight();	
						}, 1);
					}
		
					// gestione callBack
					if (this.action) {
						this.wrkAction = callBack.bind(this);
		
						if (wrkLabelCounter.addEventListener) {
							wrkLabelCounter.addEventListener("click", this.wrkAction, false);
							wrkLabelCounter.addEventListener("click", this.setSelected.bind(this, wrkLabelCounter, idLabel, labelCounter.IdFather), false);
						} else if (this.wrkObj.attachEvent) {
							wrkLabelCounter.attachEvent("click", this.wrkAction);
							wrkLabelCounter.attachEvent("click", this.setSelected.bind(this, wrkLabelCounter , idLabel, labelCounter.IdFather));
						}
					}
					
					// Aggiungo al div contenitore il Label Counter
					this.docDivFrag.getElementById(this.idItem + '_div').appendChild(wrkLabelCounter);
					
					// aggiungo labelCounter al div principale
					this.docContainerFrag.getElementById(this.idItem).appendChild(this.docDivFrag.children[0]);
				
				}

			}

		}

		this.wrkObj = this.docContainerFrag.children[0];
	};
	
//	Refresh = function (filter){
//		this.wrkObj.innerHTML = '';
//		this.createStructureHtml(filter);
//	} 
	

	/** Nasconde oggetto
	*  @function 
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde il Button.
	*/
	Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza oggetto
	 * @function
	* @returns {null} Visualizza il Button.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	/** Disabilita il Label Counter Group
	* @returns {null} Disabilita il button.
	*/
	Disabled = function () {
		this.wrkObj.setAttribute("disabled", "true");
	};

	/** Abilita il Label Counter Group
	* @returns {null} Abilita il button.
	*/
	Enabled = function () {
		this.wrkObj.removeAttribute("disabled");
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	getObject = function () {
		return this.wrkObj;
	};

	removeStructure = function(idItem){
		if (document.getElementById(idItem))
			document.getElementById(idItem).remove();		
	}

	

	/**
	* setta la label selezionata
	* @ignore
	* @param {object} div label
	*/
	setSelected = function (selectedDiv, idLabelClick, idFather) {
		
		this.idItemSubCurr = this.idItemSub + '_' + idFather;

		if (this.selectedNode) {
			hrifRemoveClass(this.selectedNode, "selected");
			if (idFather != this.idFatherPrec){
				if (document.getElementById(this.idItemSubPrec))
					document.getElementById(this.idItemSubPrec).remove();
			}
		}
		
		hrifAddClass(selectedDiv, "selected");
		this.selectedNode = selectedDiv;
		
		
		if (idFather != this.idFatherPrec){
			this.idItemSubPrec = this.idItemSub + '_' + idFather;
			this.docContainerSubFrag = document.createDocumentFragment();
			documentFrag(this.docContainerSubFrag, 'div', this.idItemSubCurr , '', this.classNameSub);
			
			let idxLabel = 0;
			
			// ciclo sull'array di label
			for (const labelCounter of this.labels) {
				// aumento il contatore - usato solo se non viene passato id
				idxLabel++;
				
				if (labelCounter.IdFather==idLabelClick){
					
					let idLabel = (labelCounter.Id) ? labelCounter.Id : idxLabel.toString();
	
					// se non ho passato il counter setto la proprieta di visibilità a false;
//					labelCounter.ShowCounter = Boolean(labelCounter.Counter);
		
					let hrifLabelCounter = new HrifLabelCounter(this.form, labelCounter);
		
					let wrkLabelCounter = hrifLabelCounter.getObject();
					// aggiungo una proprietà custom in modo da ricercare la label
					wrkLabelCounter.setAttribute('data-labelid', this.idItem + "_" + idLabel);
		
					
					let callBack = function() {
						ZtVWeb.getPortletById(this.portletId)[this.action](idLabel,labelCounter.Label);
					}
		
					// gestione callBack
					if (this.action) {
						this.wrkAction = callBack.bind(this);
		
						if (wrkLabelCounter.addEventListener) {
							wrkLabelCounter.addEventListener("click", this.wrkAction, false);
							wrkLabelCounter.addEventListener("click", this.setSelected.bind(this, wrkLabelCounter, idLabel, labelCounter.IdFather), false);
						} else if (this.wrkObj.attachEvent) {
							wrkLabelCounter.attachEvent("click", this.wrkAction);
							wrkLabelCounter.attachEvent("click", this.setSelected.bind(this, wrkLabelCounter, idLabel, labelCounter.IdFather));
						}
					}
		
					// aggiungo labelCounter al div principale
					this.docContainerSubFrag.getElementById(this.idItemSubCurr).appendChild(wrkLabelCounter);
					
					this.idFatherPrec = labelCounter.IdFather; 
				}
	
			}
					
					
			let wrkSelected = this.wrkObj.querySelector('[data-labelidlbl="' + this.idItem + "lbl_" + idLabelClick + '"]');
			
			if (wrkSelected){
				this.selectedDivSon = this.docContainerSubFrag;
				wrkSelected.appendChild(this.docContainerSubFrag.children[0]);
			}
		}		
		
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifLabelCounterMenu
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifLabelCounterMenu 
* @class 
* @alias HrifLabelCounterMenu
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonLabelCounterMenu - Json contenente le proprietà dell'oggetto.
* @param {string} [jsonLabelCounterMenu.Title] - Titolo dell'oggetto
* @param {string} [jsonLabelCounterMenu.Selected] - Indicare Id dell'elemento (Labels) che deve essere evidenziato inizialmente
* @param {string} [jsonLabelCounterMenu.Action] - Azione da eseguire al click - ritorna Id dell'elemento selezionato
* @param {json[]} jsonLabelCounterMenu.Labels - Array di Label/Valore.
* @param {string} jsonLabelCounterMenu.Labels.Id - Id dell'elemento
* @param {string} jsonLabelCounterMenu.Labels.Label - Descrizione della label
* @param {number} [jsonLabelCounterMenu.Labels.Counter] - Valore del contatore
* @returns {object} Oggetto HrifLabelCounterMenu.
*
* @example 
*
* // Definizione proprieta dell'oggetto
* let jsonLabelCounterMenu = {}
* jsonLabelCounterMenu.Title = "Categorie";
* jsonLabelCounterMenu.Selected = "B";
* jsonLabelCounterMenu.Action = "changeMenu";
* jsonLabelCounterMenu.Labels = [];
* 
* let jsonLabelCounter = {};
* jsonLabelCounter.Id = "A";
* jsonLabelCounter.Label = FormatMsg("In primo piano");
* jsonLabelCounter.Counter = 15;
* jsonLabelCounterMenu.Labels.push(jsonLabelCounter)
* 
* jsonLabelCounter = {};
* jsonLabelCounter.Id = "B";
* jsonLabelCounter.Label = FormatMsg("HR Alliance");
* jsonLabelCounter.Counter = 4;
* jsonLabelCounterMenu.Labels.push(jsonLabelCounter)
* 
* jsonLabelCounter = {};
* jsonLabelCounter.Id = "C";
* jsonLabelCounter.Label = FormatMsg("Welfare & benefit");
* jsonLabelCounterMenu.Labels.push(jsonLabelCounter)                                  
* 
* 
* 
* // Istanzio l'oggetto
* var labelCounterMenu = new HrifLabelCounterMenu(this, jsonLabelCounterMenu);
* 
* // Carico l'oggetto in un contenitore
* this.hrif_container.Load(labelCounterMenu);
*
*/
class HrifLabelCounterMenu extends  HrifLabelCounterGroup {

	constructor(form, jsonLabelCounterProp) {
		super(form, jsonLabelCounterProp,hrifCLASSBASE.LABELCOUNTERMENU);
		// hrifAddClass(this.inputText, "hrif2-labelcountermenu");
		
		this.enableSearch = jsonLabelCounterProp.EnableSearch;
		
		let idItemMenu = this.idItem;
		let idItemDivPrinc = this.idItem + '_divmain';
		
		// Definizione del documento in memoria - div 'principale'
		this.docMenuFrag = document.createDocumentFragment();
		documentFrag(this.docMenuFrag, 'div', idItemDivPrinc, '', '');

		if (this.enableSearch){
		
			// Creo Input
			var jsonInput = {};
			jsonInput.Name = "lblmenu";
			this.inputSearch = new HrifInputSearch(this, jsonInput);
			
			// Agguingi l'evento onchange sul campo di input, perf fare in modo che venga eseguita la funzione di Refresh con il filtro settato nel campo di input 
			this.wrkAction = this.RefreshSearch.bind(null, this, this.inputSearch, idItemMenu, idItemDivPrinc);
			var inputSearch = this.inputSearch.getObject(); 
			if (inputSearch.addEventListener){
				inputSearch.addEventListener("change", this.wrkAction, false);
			}
				
			inputSearch.addEventListener('search', function (event) {
		        // Verifica se l'evento è stato scatenato dalla "x" di cancella
	//	        if (event.target.value === '') {
					this.RefreshSearch(this, this.inputSearch, idItemMenu, idItemDivPrinc);
	//	        }
	    	}.bind(this));	
			
			// Aggiungo il campo di ricerca al div principale
			this.docMenuFrag.getElementById(idItemDivPrinc).appendChild(this.inputSearch.getObject());
		}
		// Aggiungo il labelcountermenu al div principale
		this.docMenuFrag.getElementById(idItemDivPrinc).appendChild(this.getObject());
		
		this.wrkObj = this.docMenuFrag.children[0]; 
		
	}
	
	RefreshSearch = function (object, inputSearch, idItemMenu, idItem){
		
		var filter = inputSearch.getValue();
			 
		// Ricreo la struttura HTML
		object.createStructureHtml(filter, true, idItemMenu);
		// e ricarico l'oggetto nel div 'principale'
		object.Load(idItem);
	}
		
	// Caricamento dell'oggetto nel parentObjIdParm
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
	};

}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HrifLabelCounterMenu
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifLabelAmount 
* @class 
* @alias HrifLabelAmount
* @memberOf Labels
* @param {object} form - this.
* @param {json|object} jsonLabelAmount - Json contenente le proprietà dell'oggetto.
// * @param {string} [jsonLabelAmount.Label] - Descrizione della Label
* @param {string} jsonLabelAmount.Amount - Valore dell'importo
* @param {string} [jsonLabelAmount.Currency] - Valuta
* @param {boolean} [jsonLabelAmount.ShortNumber] - imposta visualizzazione short - default impostato a true
* @returns {object} Oggetto HrifLabelAmount.
*
* @example 
*
* var jsonAmount = {};
* jsonAmount.Amount = 56.99;
* 
* var amountObj = new HrifLabelAmount(this, jsonAmount);
* 
* this.hrif_Container.Load(amountObj);
*
*/
class HrifLabelAmount {

	constructor(form, jsonLabelAmountParam) {
		
		this.label = jsonLabelAmountParam.Label;
		this.amount = jsonLabelAmountParam.Amount;
		this.currency = (jsonLabelAmountParam.Currency) ? jsonLabelAmountParam.Currency : "€";
		this.shortNumber = jsonLabelAmountParam.ShortNumber!==false;

		
		// Definisco gli Item
		this.idItem = form.formid + "_" + HrifGetItem(jsonLabelAmountParam.IdItem);
		
		// Definisco class del container
		this.classNameBase = hrifCLASSBASE.LABELAMOUNT;
		
		// Creo il div container
		this.docLabelAmountFrag = document.createDocumentFragment();
		documentFrag(this.docLabelAmountFrag, 'div', this.idItem, '', this.classNameBase);

		// Se valorizzata la Label	
		if (this.label && this.label.trim()!=""){
			var jsonLabel = {};
			jsonLabel.Label = this.label; 
			this.label = new HrifLabel(form, jsonLabel);
			this.docLabelAmountFrag.getElementById(this.idItem).appendChild(this.label.getObject());
		}

		// Definisco l'oggetto Label per l'importo
		var jsonLabelAmount = {};
		if (typeof(this.amount)=='number'){
			if(this.shortNumber)
				jsonLabelAmount.Label = hrifShortNumber(this.amount) + this.currency;
			else
				jsonLabelAmount.Label = this.amount + this.currency;
		} else{
			jsonLabelAmount.Label = "undefined" + this.currency;
			hrifConsole("[HRIF] HrifLabelAmount: Importo non valorizzato, 'amount' non è un campo numerico",'warn');
		} 		 
		this.labelAmount = new HrifLabel(form, jsonLabelAmount);
		this.docLabelAmountFrag.getElementById(this.idItem).appendChild(this.labelAmount.getObject());
		
		this.wrkDocFrag = this.docLabelAmountFrag.children[0];
		
	}
	
	/** Restituisce l'oggetto
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};
	
	/** Restituisce HTML
	*/
	getHtml = function () {
		return this.wrkDocFrag.outerHTML;
	};
	
	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
	};
	
}



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// hrifTabsCounter
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto HrifLabelCounterMenu 
* @class 
* @alias hrifTabsCounter
* @memberOf Portlet Action
* @param {object} form - this.
* @param {json|object} jsonParam - Json contenente le proprietÃ&nbsp; dell'oggetto.
* @param {string} jsonParam.Description - Descrizione del Tab
* @param {number} jsonParam.Page] - Indicare il numero della pagina/tab 
* @param {number} jsonParam.Counter] - Indicare il contatore
* @returns {object} Viene settatta la description + counter nel tab indicato (page).
*
* @example 
*
* // Definisco i parametri ed applico il contatore alla pagina 1
* var jsonCounter = {};
* jsonCounter.Page = 1;
* jsonCounter.Description = FormatMsg("Pagina con counter");
* jsonCounter.Counter = 10;
* 
* hrifTabsCounter(this, jsonCounter);
*
*/
// * @param {string} jsonParam.Status] - Stato 
function hrifTabsCounter(form, jsonParam){
	jsonParam.Counter = (typeof(jsonParam.Counter)!='undefined' && typeof(jsonParam.Counter)==jsonParam.Counter) ? parseInt(jsonParam.Counter) :jsonParam.Counter;
	jsonParam.Counter = hrifShortNumber(jsonParam.Counter);
	let htmlCounter = '<div>' + jsonParam.Description + '<span class="'+ hrifCLASSBASE.TABSCOUNTER +'">' + jsonParam.Counter + '</span></div>'
	form.ZtTabs.SetCaption('page' + jsonParam.Page, htmlCounter);
}


function hrifShortNumber(number){

	let result;
	
	if (number >= 1000000) {
    	result = (number / 1000000).toString() + "M";
  	} else if (number >= 1000) {
    	result = (number / 1000).toString() + "K";
    	result = (number / 1000).toFixed(1) + "K";
  	} else {
		if (!Number.isInteger(number))
			result = ZtVWeb.applyPicture(number.toString(),'N',10,"999,999,999.99")
		else 
    	 	result = parseInt(number);
  	}
	return result;
	
}


class HrifBottomSheetObj1{
	
	constructor(form, jsonBottomSheetParm) {
		
		// leggo le proprietà dal json di configurazione
		this.object = jsonBottomSheetParm.Object;
		this.labelButton = jsonBottomSheetParm.LabelButton;

		// inizializzo le variabili di lavoro
		this.isLoaded = false;
		this.wrkObj = null;
		this.form = form;
		this.portletId = this.form.formid;

		// definisco id del container
		this.idItem = this.form.formid + "_" + HrifGetItem(jsonBottomSheetParm.IdItem);

		// definisco class del container
		this.classNameBase = "prova_bottom_sheet";
		
		// Definizione del Contenitore principale
		this.docBottomSheetFrag = document.createDocumentFragment();
		documentFrag(this.docBottomSheetFrag, 'div', this.idItem, '', this.classNameBase);
		
		this.docBottomSheetFrag.getElementById(this.idItem).appendChild(this.object);
				
		// definisco il il bottone 
		var jsonButton = {};
		jsonButton.Label = this.labelButton;
//		jsonButton.Action = .... 
		this.button = new HrifButton(this.form, jsonButton);
		this.docBottomSheetFrag.getElementById(this.idItem).appendChild(this.button.getObject());
		
		this.wrkDocFrag = this.docBottomSheetFrag.children[0];
	}
	
	
	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};	
	
}

// /**
//  * @enum { String }
//  */
// const hrifCOUNTERTYPE = {
// 	/** ProgressBar Marker */
// 	MARKER: 		"marker",
// 	/** Rating stelle */
// 	RATINGSTAR: 	"ratingstar",
// 	/** Rating faccine */
// 	RATINGFACE: 	"ratingface",
// 	/** Sentiment */
// 	SENTIMENT:		"sentinment"
// }

// /**
//  * @enum { Number }
//  */
// const hrifCOUNTERNUMELEM = {
// 	/** SMALL */
// 	SMALL: 		3,
// 	/** MEDIUM */
// 	MEDIUM: 	5,
// 	/**  LARGE */
// 	LARGE: 	10,
// }


// new object 
class HrifPriority{
	
	constructor(form, jsonPriorityParm) {
		
		this.jsonPriority = (typeof (jsonPriorityParm) == 'string') ? JSON.parse(jsonPriorityParm) : jsonPriorityParm;

		this.priority = this.jsonPriority.Priority;

		this.form = form;
		this.idItemCalc = HrifGetItem(this.jsonPriority.IdItem);
		
		this.nameObj = "HrifPriority";

		this.idItem = this.form.formid + this.idItemCalc;		
		
		this.classNameBase = hrifCLASSBASE.PRIORITY;
		this.classNamePriority = this.classNameBase + "--" + this.priority;

		this.priorityDes = null;
		
		// Creo il documento Container in memoria 
		this.docPriorityrFrag = document.createDocumentFragment();
		documentFrag(this.docPriorityrFrag, 'span', this.idItem, '', this.classNameBase + " " + this.classNamePriority);

		switch (this.priority){
			
			case hrifPRIORITY.HIGH: 
				this.priorityDes = FormatMsg("HRSYSTEM_PRIORITY_HIGH");
				break;
			case hrifPRIORITY.MEDIUM_HIGH: 
				this.priorityDes = FormatMsg("HRSYSTEM_PRIORITY_MEDIUMHIGH");
				break;
			case hrifPRIORITY.MEDIUM: 
				this.priorityDes = FormatMsg("HRSYSTEM_PRIORITY_MEDIUM");
				break;
			case hrifPRIORITY.MEDIUM_LOW: 
				this.priorityDes = FormatMsg("HRSYSTEM_PRIORITY_MEDIUMLOW");
				break;
			case hrifPRIORITY.LOW: 
				this.priorityDes = FormatMsg("HRSYSTEM_PRIORITY_LOW");
				break;
			
		}

		this.docPriorityrFrag.children[0].innerText = this.priorityDes

		this.wrkDocFrag = this.docPriorityrFrag.children[0];

	};
	
	getObject = function(){
		return this.wrkDocFrag;
	};

	getHtml = function(){
		return this.wrkDocFrag.outerHTML;
	};
	
	Load = function(parentObjIdParm){
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
	};	
	
};



/** Definizione oggetto HrifScore 
* @class 
* @alias HrifScore
* @param {object} form - this
* @param {json|object} jsonScoreParam - Json contenente le proprietà dell'oggetto.
* @param {json|object} jsonScoreParam.Property - Proprietà generiche dell'oggetto
* @param {string} [jsonScoreParam.Property.Title] - Titolo
* @param {string} [jsonScoreParam.Property.Description] - Descrizione
// * @param {hrifCOUNTERTYPE} [jsonScoreParam.Property.Type] - Tipologia
// * @param {hrifCOUNTERNUMELEM} [jsonScoreParam.Property.NumElem] - Numero elementi 
* @param {hrifPROGRESSSTATUS} [jsonScoreParam.Property.Status] - Status
* @param {string} [jsonScoreParam.TitleCounter] - Titolo del counter
* @param {hrifICON} [jsonScoreParam.IconCounter] - Icona del counter
* @param {string} jsonScoreParam.ValueCounter - Valore del counter
* @param {string} jsonScoreParam.UnitMisureCounter - Unità di misura
* @param {string} jsonScoreParam.ValueInit - Valore iniziale
*
* @example 
* let jsonConf = {};
* jsonConf.Property = {"Title":"Score globale","Description":"descrizione di prova","Status":hrifPROGRESSSTATUS.YELLOW}
* jsonConf.TitleCounter = "prova";
* jsonConf.IconCounter = hrifICON.ALARM;
* jsonConf.ValueCounter = "4.2";
* jsonConf.UnitMisureCounter = "/5";
* jsonConf.ValueInit = 84;

* let hrifScore = new HrifScore(this, jsonConf);
*/
class HrifScore {
    constructor(form, jsonScoreParam) {
        // controllo se il parametro è stringa o obj
        let jsonScore = (typeof (jsonScoreParam) == 'string') ? JSON.parse(jsonScoreParam) : jsonScoreParam;
        // inizializzo variabili work
		let property = jsonScore.Property;
        this.title = property.Title;
		this.description =  property.Description;
		// this.type = (property.Type)?property.Type:hrifCOUNTERTYPE.MARKER;
		// this.numElem = (property.NumElem)?property.NumElem:hrifCOUNTERNUMELEM.SMALL;
		this.status = property.Status;

		this.titleCounter = jsonScore.TitleCounter;
		this.iconCounter = jsonScore.IconCounter;
		this.valueCounter = jsonScore.ValueCounter;
		this.umCounter = jsonScore.UnitMisureCounter;
		this.valueInit = jsonScore.ValueInit;
		this.action = jsonScore.Action;
		this.actionParam = jsonScore.ActionParam;
       
        this.form = form;
        this.idItem = HrifGetItem(jsonScore.IdItem);
        this.portletId = this.form.formid;
        this.nameObj = "HrifScore";
        
        // ----------------------------------------------------------------------------------
        // inizializzo variabili classi
        this.classNameBase = hrifCLASSBASE.SCORE;
        // ----------------------------------------------------------------------------------

        // creo il div principale
        this.docContainerFrag = document.createDocumentFragment();
        documentFrag(this.docContainerFrag, 'div', this.idItem, '', this.classNameBase);
       
		if(this.title) {
			this.wrkTitle = new HrifTitleObject(this.form,{"Title":this.title});
			this.wrkTitle.getObject().setAttribute("role",hrifROLE.TITLE);

			// aggiungo oggetto al padre
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkTitle.getObject());
		}

		// creo oggetto titleCounter
		let jsonTitleCounter = {};
		jsonTitleCounter.Title = this.titleCounter;
		jsonTitleCounter.Icon = this.iconCounter;
		jsonTitleCounter.UnitOfMeasure = this.umCounter;
		jsonTitleCounter.Counter = this.valueCounter;
		jsonTitleCounter.IconFilled = true;
		jsonTitleCounter.Action = this.action;
		jsonTitleCounter.ActionParam = this.actionParam;
		this.wrkTitleCounter = new HrifTitleCounter(this.form, jsonTitleCounter);

		// aggiungo oggetto al padre
		this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkTitleCounter.getObject());

		if(this.valueInit) {
			// switch (this.type) {
				// case hrifCOUNTERTYPE.MARKER:
					// creo oggetto ProgressBarMarker 
					let jsonProgressBarMarker = {};
					jsonProgressBarMarker.HidePercent = true;
					jsonProgressBarMarker.Value = this.valueInit;
					jsonProgressBarMarker.Status = this.status;
					this.wrkProgressBarMarker = new HrifProgressBarMarker(this.form, jsonProgressBarMarker);
	
					// aggiungo lo status
					if (this.status)
						hrifAddClass(this.wrkProgressBarMarker.getObject(), this.wrkProgressBarMarker.classNameBase + "--" + this.status);
	
					// reimposto la barra al 100%
					this.wrkProgressBarMarker._setBarPercent(100);
	
					// rimuovo la label con la percentuale
					this.wrkProgressBarMarker._removePercent()
					// aggiungo oggetto al padre
					this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkProgressBarMarker.getObject());
					// break;
			// 	case hrifCOUNTERTYPE.RATINGSTAR:
			// 	const config = {
			// 		"NumItem": this.numElem,
			// 		"IndexItemInit": this.valueInit,
			// 		"ReadOnly": true
			// 	}
	
			// 	this.wrkRatingStar = new HrifRatingStar(this.form, config);
			// 	this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkRatingStar.getObject());
	
			// 	break;
			// 	default:
			// 		console.warn(this.nameObj+ " type non definito");
			// }
		}
		

		// creo descrizione
		if (this.description) {
			this.wrkDescription = new HrifLabel(this.form, { "Label": this.description });
			this.wrkDescription.getObject().setAttribute("role", hrifROLE.DESCRIPTION);
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkDescription.getObject());
		}

		this.wrkObj = this.docContainerFrag.children[0];
	}


	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass(className) {
		hrifAddClass(this.wrkObj, className);
	};
	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml() {
		return this.wrkObj.outerHTML;
	};
	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject() {
		return this.wrkObj;
	};

	/**
	 * nasconde oggetto
	 * @param {boolean} preserveSpace - mantiente lo spazio 
	 */
	Hide(preserveSpace) {
		var wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};
	
	/**
	 * Visualizza oggetto
	 */
	Show() {
		if (!this.isLoaded) {
			hrifRemoveClass(this.wrkObj, hiddenDisplay);
			hrifRemoveClass(this.wrkObj, hiddenVisibility);
		} else {
			document.getElementById(this.idItem).classList.remove(hiddenDisplay);
			document.getElementById(this.idItem).classList.remove(hiddenVisibility);
		}
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load(parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};
}

//################################################################################//
//  OGGETTO SVILUPPATO IN MANIERA CUSTOM ESCLUSIVAMENTE PER L'OGGETTO BLOWVIEWER  //
//################################################################################//
/** oggetto HrifTextIconLabel 
* @ignore
* @class
* @param {object} form 			     - this.
* @param {string} idItem 		     - id dell'oggetto 
* @param {string} Text 	
* @param {hrifICON} Icon
* @param {string} Label
* @returns {object} Oggetto HrifTextIconLabel.
* @example 

	let jsonTextIconLabelParam = {}
	jsonTextIconLabelParam.Text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."; 
	jsonTextIconLabelParam.Label = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
	jsonTextIconLabelParam.Icon = hrifICON.ARROW_RIGHT 
	
	let til = new HrifTextIconLabel(this, jsonTextIconLabelParam);
	
	this.hrif_container0.Load(til);
*/
class HrifTextIconLabel {

	constructor(form, jsonTextIconLabelObjParam) {

		var jsonTextIconLabelObj = (typeof (jsonTextIconLabelObjParam) == 'string') ? JSON.parse(jsonTextIconLabelObjParam) : jsonTextIconLabelObjParam;

		this.form = form;
		this.idItem = HrifGetItem(jsonTextIconLabelObj.IdItem);
        
		// Definizione dei parametri
		this.text = jsonTextIconLabelObj.Text;
		this.icon = jsonTextIconLabelObj.Icon;
		this.label = jsonTextIconLabelObj.Label;

		this.portletId = this.form.formid;
		this.nameObj = "HrifTextIconLabelObj";

		// Definizione degli id
		let idTextIconLabel = this.idItem;
		this.idItem = idTextIconLabel;
		this.idContent = this.idItem + "_content";

		// Definizione delle classi
		this.classNameBase = "hrif2-text-icon-label";
		this.classNameItem = hrifCLASSBASE.ITEM;
		this.classNameInlineCTA = "hrif2-inline-cta";

		// Creo il div principale
		this.docTextIconLabelFrag = document.createDocumentFragment();
		documentFrag(this.docTextIconLabelFrag, 'div', idTextIconLabel, '', this.classNameBase);

		// Creo il text
		let jsonTextParam = {Label: this.text}
        let labelText = new HrifLabel(this.form, jsonTextParam);

		let inner = labelText.getObject().innerText;
		labelText.getObject().innerHTML = "";

		let span = document.createElement("span");
		span.innerHTML = inner;
		labelText.getObject().appendChild(span);

		// Creo la icon label in uno span
		this.docIconLabelFrag = document.createDocumentFragment();
		documentFrag(this.docIconLabelFrag, 'span', this.idItem, '', this.classNameInlineCTA);
		let icon = new HrifIcon(this.form, {Icon: this.icon});
		let label = new HrifLabel(this.form, {Label: this.label})
		// Aggiungo icon e label allo span
		this.docIconLabelFrag.firstElementChild.appendChild(icon.getObject());
		this.docIconLabelFrag.firstElementChild.appendChild(label.getObject());

		// Aggiungo span al text
		labelText.getObject().appendChild(this.docIconLabelFrag.firstElementChild);

		// Aggiungo text al div principale
		this.docTextIconLabelFrag.firstElementChild.appendChild(labelText.getObject());

		this.wrkObj = this.docTextIconLabelFrag;
	}

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml = function () {
		return this.wrkObj.childNodes[0].outerHTML;
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject = function () {
		return this.wrkObj;
	};

	/** Nasconde il TextIconLabel
	* @returns {null} Nasconde la TextIconLabel.
	*/
	Hide = function (preserveSpace) {
		var wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};

	/** Visualizza il TextIconLabel
	* @returns {null} Visualizza la TextIconLabel.
	*/
	Show = function () {
		if (!this.isLoaded) {
			hrifRemoveClass(this.wrkObj, hiddenDisplay);
			hrifRemoveClass(this.wrkObj, hiddenVisibility);
		} else {
			document.getElementById(this.idItem).classList.remove(hiddenDisplay);
			document.getElementById(this.idItem).classList.remove(hiddenVisibility);
		}
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

}
//#########################################################################################//

function hrifRemoveReturn(testo) {

	if (testo && typeof(testo)=='string')
		return testo.replace(/[\r\n]+/g, '');

}

function hrifGenerateGuid() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })+ Math.random().toString(36).substr(2, 4);
}




//###########################################################################################################################################//
//---------------------------------------------------------------- Action Drop- -------------------------------------------------------------//
//###########################################################################################################################################//
const _hrifACTIONDROPLAYOUT = {
	TOP_LEFT:			"hrif2-action-drop--left-top",
	TOP_RIGHT:			"hrif2-action-drop--right-top",
	BOTTOM_LEFT:		"hrif2-action-drop--left-down",
	BOTTOM_RIGHT:		"hrif2-action-drop--right-down"
}

/** oggetto HrifActionDrop 
* @ignore
* @class
* @alias HrifActionDrop 
* @param {object} form 			     		 - this.
* @param {string} idItem 		     		 - id dell'oggetto 
* @param {string} Label	     		 		 - label visualizzata nel action drop
* @param {json|object} Items 			 	 - array di item per il riempimento della label value group
* @param {json|object} Items 			 	 - array di item per il riempimento della label value group
* @param {json|object} Items 			 	 - array di item per il riempimento della label value group

* @returns {object} Oggetto HrifActionDrop.
* @example
  let jsonActionDrop = {};
  jsonActionDrop.Label = "Azioni";
  jsonActionDrop.Items = [];
  
  let jsonAction1 = {"Label": FormatMsg("Aggiungi"), "Action": "aggiungi"};
  jsonActionDrop.Items.push(jsonAction1);
  let jsonAction2 = {"Label": FormatMsg("Modifica"), "Action": "modifica", "Divider": true};
  jsonActionDrop.Items.push(jsonAction2);
  let jsonAction3 = {"Label": FormatMsg("Elimina"), "Action": "elimina"};
  jsonActionDrop.Items.push(jsonAction3);
  let jsonAction4 = {"Label": FormatMsg("Proprietà"), "Action": "proprieta"};
  jsonActionDrop.Items.push(jsonAction4);
  
  let actionDrop = new HrifActionDrop(this, jsonActionDrop);
	
  this.hrif_cntActionDrop.Load(actionDrop);  
*/
class HrifActionDropObj {
	constructor(form, jsonActionDropObjParam) {
		var jsonActionDropObj = (typeof (jsonActionDropObjParam) == 'string') ? JSON.parse(jsonActionDropObjParam) : jsonActionDropObjParam;
		this.form = form;
		this.idItem = HrifGetItem(jsonActionDropObj.IdItem);
        this.label = jsonActionDropObj.Label;
		this.items = jsonActionDropObj.Items;
		this.actionsLayout = (jsonActionDropObj.ActionsLayout) ? jsonActionDropObj.ActionsLayout  : hrifACTIONDROPLAYOUT.TOP_RIGHT;

		this.open = false;
		this.maxItemCount = 10;
		this.maxDividerCount = 3;

		this.portletId = this.form.formid;
		this.nameObj = "HrifActionDropObj";
		this.stringHtml = "";
		this.stringContentHtml = "";

		// Definizione IdItem
		let idActionDrop = this.idItem;
		this.idItem = idActionDrop;
		this.idContent = idActionDrop + "_content";
		this.idLabel = idActionDrop + "label";
		this.idContainer = idActionDrop + "_container";

		// definizioni classi
		this.classNameBase = hrifCLASSBASE.ACTIONDROP;
		this.classBaseActionDrop = this.classNameBase;
		this.classNameContent = hrifCLASSBASE.CONTENT;
		this.classNameContainer = hrifCLASSBASE.CONTAINER;
		this.classNameItem = hrifCLASSBASE.ITEM;

		// icone di default
		this.iconOpen = hrifICON.CLOSE;
		this.iconCollapsed = hrifICON.MENU_HAMBURGER;
		
		// creo div principale
		this.docActionDropFrag = document.createDocumentFragment();
		documentFrag(this.docActionDropFrag, 'div', this.idItem, '', this.classBaseActionDrop + " " + this.actionsLayout);
		this.stringHtml = this.docActionDropFrag.firstElementChild.outerHTML;

		// creo div del contente (bottone per aprire il menu)
		this.docActionDropActionFrag = document.createDocumentFragment();
		documentFrag(this.docActionDropActionFrag, 'div', this.idContent, '', this.classNameContent);

		let jsonButton = {Label: this.label, Icon: this.iconCollapsed};
		this.buttonObj = new HrifButton(this.form, jsonButton);
		// this.buttonObj.getObject().addEventListener("click", hrifToggleActionDrop.bind(null, JSON.stringify(this.idItem), this), false);

		// Mi salvo nel div del button this, per poter avercelo quando viene eseguito hrifToggleActionDrop 

		// N.B. eseguo il bind nel seguente modo per ovviare alla casistica in cui l'Action Drop sia in una card che ha a sua volta l'azione di click, evitando che venga sovrastato ed ignorato.
		// Eseguo un bind al tasto perla funzione al click, in cui 'this' è l'elemento html del button che viene premuto. Al suo interno ho conservato this (guarda istruzione precedente)
		this.buttonObj.getObject().setAttribute("onClick", "event.stopPropagation(); hrifToggleActionDrop.bind(null, " + JSON.stringify(this.idItem) +", this)()");
		this.stringContentHtml += this.docActionDropActionFrag.firstElementChild.outerHTML.replace("</div>", this.buttonObj.getHtml() + "</div>");
		// Aggiungo il div content all'interno del div principale
		this.docActionDropActionFrag.firstElementChild.appendChild(this.buttonObj.getObject());
		this.docActionDropFrag.firstElementChild.appendChild(this.docActionDropActionFrag.firstElementChild);

		// Creo div del container (lista di azioni)
		this.docActionDropContainerFrag = document.createDocumentFragment();
		documentFrag(this.docActionDropContainerFrag, 'div', this.idContainer, '', this.classNameContainer);

		let dividerUsed = 0;
		this.items.forEach((item,index) => {
			if(index == this.maxItemCount) return;

			if(item.Divider && dividerUsed < this.maxDividerCount) dividerUsed += 1;
			// per ogni azioni vado a creare un div item che contiene una HrifLabel per l'azione corrispondente
			this.docActionDropItemFrag = document.createDocumentFragment();
			documentFrag(this.docActionDropItemFrag, 'div', this.idItem + "_"+index, '', this.classNameItem + " " + ((item.Divider) ? " divider" : ""));
			let jsonLabel = {Label: item.Label};
			let label = new HrifLabel(this.form, jsonLabel);

			// Aggiungo il div item nel div container
			this.docActionDropItemFrag.firstElementChild.appendChild(label.getObject())
			// Eseguo un bind tra le label delle azioni e l'azione, e lo inserisco nell "onClick" dell'oggetto
			this.docActionDropItemFrag.firstElementChild.setAttribute("onClick", "event.stopPropagation(); execPortletAction.bind(null, " + JSON.stringify(this.portletId) +", " +JSON.stringify(item.Action) + ")(); hrifActionDropClickHandler.bind(null)()");

			this.docActionDropContainerFrag.firstElementChild.appendChild(this.docActionDropItemFrag.firstElementChild);
		})

		this.stringContentHtml += this.docActionDropContainerFrag.firstElementChild.outerHTML/* .replace("</div>", this.docActionDropContainerFrag.firstElementChild.innerHTML + "</div>"); */

		// Aggiungo il div container nel div principale
		this.docActionDropFrag.firstElementChild.appendChild(this.docActionDropContainerFrag.firstElementChild);

		// Controllo se ho tagliato degli item inseriti dall'utente
		if(this.items.length > this.maxItemCount)
			hrifConsole("[HRIF] HrifActionDrop: Sono state inserite "+ this.items.length +" azioni, ne visualizzo massimo "+ this.maxItemCount +".",'warn');


		this.wrkObj = this.docActionDropFrag.children[0];
		this.wrkObj.actionDropObj = this;
	}


	_setIcon = function (icon){
		this.buttonObj.setIcon(icon);
	}

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml = function () {
		// var resultHtml = this.wrkObj.outerHTML.replace('id', 'onclick ="event.stopPropagation();alert("A");" id');
		var htmlAction = this.stringHtml.replace('</div>', this.stringContentHtml + "</div>");
		return htmlAction;

		// return resultHtml;
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject = function () {
		return this.wrkObj;
	};

	/** Nasconde l'Action Drop
	* @returns {null} Nasconde l'Action Drop
	*/
	Hide = function (preserveSpace) {
		var wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace == true) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};

	/** Visualizza l'Action Drop
	* @returns {null} Visualizza l'Action Drop
	*/
	Show = function () {
		if (!this.isLoaded) {
			hrifRemoveClass(this.wrkObj, hiddenDisplay);
			hrifRemoveClass(this.wrkObj, hiddenVisibility);
		} else {
			document.getElementById(this.idItem).classList.remove(hiddenDisplay);
			document.getElementById(this.idItem).classList.remove(hiddenVisibility);
		}
	};

	/** Disabilita l'oggetto
	* @returns {null} Disabilita l'oggetto.
	*/
	Disabled = function () {
		this.buttonObj.Disabled();
		//		this.wrkObj.setAttribute("disabled","true");
	};

	/** Abilita l'oggetto
	* @returns {null} Abilita l'oggetto.
	*/
	Enabled = function () {
		this.buttonObj.Enabled();
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	/** Valorizzazione del Tooltip
	* @ignore
	* @param {string} tooltip - Descrizione del tooltip.
	* @returns {null} Valorizzazione del Tooltip.
	*/
	setTooltip = function (tooltip) {
		this.wrkObj.childNodes[0].title = tooltip;
	};
}

/** Cambio di visualizzazione del Action Drop
* @ignore
* @param {string} iditem - id dell'item su cui applicare la modifica.
* @returns {null} Valorizzazione del Tooltip.
*/
function hrifToggleActionDrop(idItem, object){
	let allActionDrops = document.querySelectorAll(".hrif2-action-drop");

	// Prendo l'elemento action drop, padre del tasto che ho premuto
	object = object.parentNode.parentNode;

	allActionDrops.forEach((item) => {
		if(item.id != object.id){
			item.classList.remove("open");
			let iconDiv = item.querySelector(".hrvg-icon");
			hrifReplaceClassWithPrefix(iconDiv, "hrvg-icon-", "menu-hamburger");
			// item.querySelector(".hrif2-button").actionDropObj._setIcon(object.iconCollapsed);
			item.open = false;
		}
	})

	if(object.open){
		// object._setIcon(object.iconCollapsed);
		let iconDiv = object.querySelector(".hrvg-icon");
		hrifReplaceClassWithPrefix(iconDiv, "hrvg-icon-", "menu-hamburger");
		// rimuovo l'id del action drop che ho chiuso
		this.activeActionDrop = null;

		object.classList.remove("open");
		// rimuovo l'event listener dalla window
		window.removeEventListener("click", hrifActionDropClickHandler);
	} else {
		// object._setIcon(object.iconOpen);
		let iconDiv = object.querySelector(".hrvg-icon");
		hrifReplaceClassWithPrefix(iconDiv, "hrvg-icon-", "close");
		object.classList.add("open");

		// aggiungo evento per il click al di fuori dell'oggetto per chiudere la lista di azioni
		window.addEventListener("click", hrifActionDropClickHandler);
		// mi salvo l'id del action drop che ho aperto
		this.activeActionDrop = idItem;
	}
	object.open = !object.open;
}

// HIDDEN - handler per il passaggio di parametri alla funzione per la chiusura del menu
hrifActionDropClickHandler = function(event){
	hrifActionDropOnClick(event, this.activeActionDrop);
}

// HIDDEN - funzionaper la chiusura del menu aperto al click
hrifActionDropOnClick = function(event, idItem){
	event?.stopPropagation();
	// controllo se ho fatto click sull'action drop, atlrimenti chiudo il menu
	if(!event || event.target.id != idItem){
		let openActDrop = document.getElementById(idItem);
		if(openActDrop){
			openActDrop.classList.remove("open");
			let iconDiv = openActDrop.querySelector(".hrvg-icon");
			hrifReplaceClassWithPrefix(iconDiv, "hrvg-icon-", "menu-hamburger");
			// openActDrop.querySelector(".hrif2-button").actionDropObj._setIcon(openActDrop.querySelector(".hrif2-button").actionDropObj.iconCollapsed);
			openActDrop.open = false;
		}
	}
	// rimuovo l'id del action drop che ho chiuso
	this.activeActionDrop = null;
	// rimuovo l'event listener dalla window
	window.removeEventListener("click", hrifActionDropClickHandler);
}


/** Definizione oggetto HrifACtionDrop
* @ignore
* @class
* @param {object} form 			- this.
* @param {json|object} jsonActionDropParam - Json contenente le proprietà dell'oggetto.
* @returns {object} Oggetto HrifToastOk.
*/
class HrifActionDrop extends HrifActionDropObj {
	constructor(form, jsonActionDropParam) {
		let jsonActionDrop = (typeof (jsonActionDropParam) == 'string') ? JSON.parse(jsonActionDropParam) : jsonActionDropParam;
		jsonActionDrop.ActionsLayout = _hrifACTIONDROPLAYOUT.TOP_LEFT;
		jsonActionDropParam = JSON.stringify(jsonActionDrop);
		
		super(form, jsonActionDropParam);
	}
}



//###########################################################################################################################################//
//---------------------------------------------------------------- Chat Banner Message ------------------------------------------------------//
//###########################################################################################################################################//

/** oggetto HrifBannerMessage 
* @ignore
* @class
* @alias HrifBannerMessage
* @param {object} form 			     		 - this.
* @param {string} idItem 		     		 - id dell'oggetto 
* @param {json|object} ChatMessageParam 		 - parametri di creazione del messaggio
* @returns {object} Oggetto HrifBannerMessage.
* @example
var jsonChatMessageParam = {
		"MessageType" : TPL_MSGTYPE_DEFAULT,
    "Title" : "Risposta ",
		"Message" : "Ti ho risposto subito!",
    "IdMsg": "risp",
    "Date" : "20-05-2024",
	}
  
  let BannerMessage = {ChatMessageParam : jsonChatMessageParam};
  
  let bannerMessage = new HrifBannerMessage(this,BannerMessage);
  
  this.hrif_cntBannerMessage.Load(bannerMessage);

*/
class HrifBannerMessageObj {
	constructor(form, jsonBannerMessageObjParam) {
		var jsonBannerMessageObj = (typeof (jsonBannerMessageObjParam) == 'string') ? JSON.parse(jsonBannerMessageObjParam) : jsonBannerMessageObjParam;
		this.form = form;
		this.idItem = HrifGetItem(jsonBannerMessageObj.IdItem);
		this.chatMessageParam = jsonBannerMessageObj.ChatMessageParam;

		this.portletId = this.form.formid;
		this.nameObj = "HrifBannerMessageObj";

		// Definizione IdItem
		let idBannerMessage = this.idItem;
		this.idItem = idBannerMessage;
		this.idContent = idBannerMessage + "_content";

		// definizioni classi
		this.classBaseBannerMessage = hrifCLASSBASE.BANNERMESSAGE;
		this.classNameContent = hrifCLASSBASE.CONTENT;
		
		// creo div principale
		this.docBannerMessageFrag = document.createDocumentFragment();
		documentFrag(this.docBannerMessageFrag, 'div', this.idItem, '', this.classBaseBannerMessage);

		// istanzio chat message tenendo solo il messaggio
		let jsonChatMessageParam = 
		{	MESSAGE: {
				Message: this.chatMessageParam.Message, 
				MessageType: this.chatMessageParam.MessageType
			},
			ShowDate: false
		};
		this.chatMessage = new HrifChatMessage(this.form, jsonChatMessageParam, this.chatMessageParam.MessageType);
		
		if(this.chatMessageParam.Title || this.chatMessageParam.Date){
			// istanzio titolo con titolo e data da far precedere al messaggio di ChatMessage
			let jsonTitle = {Title: (this.chatMessageParam.Title || "") + /* "\u00A0 \u00A0" */" " + 
					(this.chatMessageParam.Date || "")};
			let title = new HrifTitle(this.form, jsonTitle);
			this.chatMessage.getObject().firstElementChild.prepend(title.getObject());
		}
		

		this.docBannerMessageFrag.firstElementChild.appendChild(this.chatMessage.getObject());
		
		this.wrkObj = this.docBannerMessageFrag.children[0];
	}

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml = function () {
		// var resultHtml = this.wrkObj.outerHTML.replace('id', 'onclick ="event.stopPropagation();alert("A");" id');
		return this.wrkObj.outerHTML;

		// return resultHtml;
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject = function () {
		return this.wrkObj;
	};

	/** Nasconde l'Action Drop
	* @returns {null} Nasconde l'Action Drop
	*/
	Hide = function (preserveSpace) {
		var wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace == true) ? true : false;

		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};

	/** Visualizza l'Action Drop
	* @returns {null} Visualizza l'Action Drop
	*/
	Show = function () {
		if (!this.isLoaded) {
			hrifRemoveClass(this.wrkObj, hiddenDisplay);
			hrifRemoveClass(this.wrkObj, hiddenVisibility);
		} else {
			document.getElementById(this.idItem).classList.remove(hiddenDisplay);
			document.getElementById(this.idItem).classList.remove(hiddenVisibility);
		}
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkObj, parentObjIdParm);
		this.isLoaded = true;
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	/** Valorizzazione del Tooltip
	* @ignore
	* @param {string} tooltip - Descrizione del tooltip.
	* @returns {null} Valorizzazione del Tooltip.
	*/
	setTooltip = function (tooltip) {
		this.wrkObj.childNodes[0].title = tooltip;
	};
}

/** Definizione oggetto HrifChatBannerMessage
* @ignore
* @class
* @param {object} form 			- this.
* @param {json|object} jsonChatBannerMessageParam - Json contenente le proprietà dell'oggetto.
* @returns {object} Oggetto HrifToastOk.
*/
class HrifBannerMessage extends HrifBannerMessageObj {
	constructor(form, jsonChatBannerMessageParam) {
		let jsonChatBannerMessage = (typeof (jsonChatBannerMessageParam) == 'string') ? JSON.parse(jsonChatBannerMessageParam) : jsonChatBannerMessageParam;
		jsonChatBannerMessageParam = JSON.stringify(jsonChatBannerMessage);
		super(form, jsonChatBannerMessageParam);
		this.iconReturn = new HrifIcon(form, {"Icon": hrifICON.RETURN});
		this.getObject().prepend(this.iconReturn.getObject());
	}
}





/** Definizione oggetto HrifTooltip
 * @class
 * @memberof xxxxxx
 * @alias HrifTooltip 
 * @param {object} form - this.
 * @param {json|object} jsonProvaParm - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
 * @param {string} jsonProvaParm.Tooltip - Valore del tooltip
 * 
 * 
 * @example 
 * 
 * // Definizione proprietà dell'oggetto
 * let jsonProvaParm= {};
 * 
 * jsonProvaParm.xxxx = xxxxxxx,
 * jsonProvaParm.yyyy = yyyyyyy,
 * 
 * let provaObj = new HrifProva(this, jsonProvaParm)
 * this.hrif_cnt.Load(provaObj)
 */
class HrifTooltip {

	constructor(form, jsonTooltipParm) {

		const jsonTooltip = (typeof (jsonTooltipParm) == 'string') ? JSON.parse(jsonTooltipParm) : jsonTooltipParm;

		// Definizione delle proprietà dell'oggetto
		// this.wrkObj.innerHTML = converter.makeHtml(removeTagHTML(this.label));
		this.tooltip = converter.makeHtml(removeTagHTML(jsonTooltip.Tooltip));
		this.objectInto = jsonTooltip.ObjectInto;

		// Definizione della variabili di oggetto
		this.form = form;
		this.portletId = this.form.formid;
		this.nameObj = "HrifTooltip";

		// Definizione degli Item
		this.idItem = HrifGetItem(jsonTooltip.IdItem);

		// Definizione delle classi
		this.classNameBase = hrifCLASSBASE.TOOLTIP + "-content";

		// Valorizzio la struttura HTML
		this.wrkDocFrag = this.createStructure();

		this.objectInto.appendChild(this.wrkDocFrag);
		this.objectInto.classList.add(hrifCLASSBASE.TOOLTIP);

		// if (this.status)
		// 	this.setStatus(this.status);

		// if (this.action) {
		// 	this.setAction(this.action, this.actionParam);
		// }
	}

	// Crea la struttura HTML
	createStructure() {

		// Creo il documento in memoria
		this.docTooltipFrag = document.createDocumentFragment();
		documentFrag(this.docTooltipFrag, 'span', this.idItem, '', this.classNameBase);

		this.docTooltipFrag.children[0].innerHTML = this.tooltip;

		// Restituisco il markup
		return this.docTooltipFrag.children[0];

	}

	setTooltip(tooltipValue){
		this.tooltip = converter.makeHtml(removeTagHTML(tooltipValue));
		this.wrkDocFrag.innerHTML = this.tooltip;
	}

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass(className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	/** Rimozione classe sull'oggetto
	* @ignore
	* @param {string} className - Nome classe da rimuovere.
	* @returns {null} Viene rimossa la classe passata dall'oggetto.
	*/
	removeClass(className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml() {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna oggetto
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject() {
		return this.wrkDocFrag;
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load(parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
	};

}

/** Definizione oggetto HrifImgLogo
 * @class
 * @memberof xxxxxx
 * @alias HrifImgLogo 
 * @param {object} form - this.
 * @param {json|object} jsonProvaParm - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
 * @param {string} jsonProvaParm.xxxx - xxxx
 * @param {string} [jsonProvaParm.yyyy] - yyyy
 * 
 * 
 * @example 
 * 
 * // Definizione proprietà dell'oggetto
 * let jsonProvaParm= {};
 * 
 * jsonProvaParm.xxxx = xxxxxxx,
 * jsonProvaParm.yyyy = yyyyyyy,
 * 
 * let provaObj = new HrifProva(this, jsonProvaParm)
 * this.hrif_cnt.Load(provaObj)
 */
class HrifImgLogo {

	constructor(form, jsonImgLogoParm) {

		const jsonImgLogo = (typeof (jsonImgLogoParm) == 'string') ? JSON.parse(jsonImgLogoParm) : jsonImgLogoParm;

		// Definizione delle proprietà dell'oggetto
		this.type = jsonImgLogo.Type;
		this.itemValue = jsonImgLogo.ItemValue;

		// Definizione della variabili di oggetto
		this.form = form;
		this.portletId = this.form.formid;
		this.nameObj = "HrifImgLogo";

		// Definizione degli Item
		this.idItem = HrifGetItem(jsonImgLogo.IdItem);

		// Definizione delle classi
		this.classNameBase = hrifCLASSBASE.IMGLOGO;

		// Valorizzio la struttura HTML
		this.wrkDocFrag = this.createStructure();
	}

	// Crea la struttura HTML
	createStructure() {

		// Creo il documento in memoria
		this.docMainFrag = document.createDocumentFragment();
		documentFrag(this.docMainFrag, 'div', this.idItem, '', this.classNameBase);

		this.imgIconItem = null
		
		if(this.type===hrifIMGLOGOTYPE.IMAGE) {
			let chkValue=null;
			for (const key in hrifIMGTITLE) {
				if (hrifIMGTITLE[key].Url === this.itemValue.Url) {
					chkValue = key;
				}
			}
			if(chkValue) {
				this.imgIconItem = new HrifImage(this.form,{"Value":this.itemValue.Url})
				this.imgIconItem.addClass(this.itemValue.class)
			}
				
			else
				hrifConsole("[HRIF] HrifImgLogo: immagine non prevista", 'error');
		}

		if(this.type===hrifIMGLOGOTYPE.IMAGECUSTOM) {
			this.imgIconItem = new HrifImage(this.form,{"Value":this.itemValue});
			let classCustom = this.imgIconItem.className + "-custom";
			this.imgIconItem.addClass(classCustom);
		}

		if(this.type===hrifIMGLOGOTYPE.ICON) {
			this.imgIconItem = new HrifIcon(this.form,{"Icon":this.itemValue});
		}
		
		if(this.imgIconItem)
			this.docMainFrag.getElementById(this.idItem).appendChild(this.imgIconItem.getObject());

		// Restituisco il markup
		return this.docMainFrag.children[0];
	}


	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass(className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	/** Rimozione classe sull'oggetto
	* @ignore
	* @param {string} className - Nome classe da rimuovere.
	* @returns {null} Viene rimossa la classe passata dall'oggetto.
	*/
	removeClass(className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

	/** Nasconde HrifTitleCounter
	* @returns {null} Nasconde HrifTitleCounter
	*/
	Hide(preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace == true) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkDocFrag.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};

	/** Visualizza HrifTitleCounter
	* @returns {null} Visualizza HrifTitleCounter
	*/
	Show() {
		if (!this.isLoaded) {
			hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
			hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
		} else {
			document.getElementById(this.idItem).classList.remove(hiddenDisplay);
			document.getElementById(this.idItem).classList.remove(hiddenVisibility);
		}
	};

	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} Codice Html.
	*/
	getHtml() {
		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna oggetto
	* @ignore
	* @returns {null} Oggetto.
	*/
	getObject() {
		return this.wrkDocFrag;
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load(parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

}

/** Definizione oggetto HrifButtonGroupActionDrop
* @class
* @alias HrifButtonGroupActionDrop
* @memberOf Button
* @param {object} form - this.
* @param {int} jsonButtonGroupActionParm.MaxFixedButtons - Numero massimo di button visualizzati
* @param {json[]} jsonButtonGroupActionParm.Items - Array contenente parametri di riempimento per gli item dell'oggetto
* @param {string} jsonButtonGroupActionParm.Items.IdItem - Id identificativo del singolo item nell'oggetto
* @param {string} jsonButtonGroupActionParm.Items.Label - Label dell'item
* @param {string} jsonButtonGroupActionParm.Items.Action - Azione di callback del singolo item
* @param {boolean} [jsonButtonGroupActionParm.Items.Divider] - Determina se l'azione, quando è nel ActionDrop, presenta una linea divisoria
* @param {json} [jsonButtonGroupActionParm.ButtonGroupParm] - Paramtri per la costruzione del HrifButtonGroup
* @param {json} [jsonButtonGroupActionParm.ButtonGroupParm.Type] - Tipologia del ButtonGroup
* @param {json} jsonButtonGroupParm.ActionDropParm - Paramtri per la costruzione del HrifActiondrop
* @param {json} jsonButtonGroupParm.ActionDropParm.Label - Label del ActionDrop
* @returns {object} Oggetto HrifButtonGroupActionDrop
*
* @example
	let jsonButtonsAction = {
	"Properties":{
		"MaxFixedButtons": 2
	}
    "ButtonGroupParm":{      
      "Type": hrifBUTTONGROUPTYPE.NORMAL,
    },
    "ActionDropParm":{
      "Label" : "Azioni",
    },
    "Items" :[
      	{"IdItem": "Btn1", "Label": FormatMsg("Assegnazione manuale"), 		"Action": "execBottone1"},
      	{"IdItem": "Btn2", "Label": FormatMsg("Assegnazione automatica"), 	"Action": "execBottone1"},
      	{"IdItem": "Btn3", "Label": FormatMsg("Assegnazione programmata"),	"Action": "execBottone1"},
        {"IdItem": "Btn4", "Label": FormatMsg("Aggiungi"), 					"Action": "aggiungi"},
        {"IdItem": "Btn5", "Label": FormatMsg("Modifica"), 					"Action": "modifica"},
        {"IdItem": "Btn6", "Label": FormatMsg("Elimina"), 					"Action": "elimina", 	"Divider": true},
        {"IdItem": "Btn7", "Label": FormatMsg("Proprietà"), 				"Action": "proprieta"},
      ]
  }

  let buttons = new HrifButtonGroupActionDrop(this, jsonButtonsAction);
  this.hrif_cntButtons.Load(buttons);
*/
class HrifButtonGroupActionDrop {
	static resizeHandleEvent = null;
	static loadHandleEvent = null;

	constructor(form, jsonButtonGroupActionParm){

		this._handleResize = this._handleResize.bind(this);
		this._handleLoad = this._handleLoad.bind(this);

		var jsonButtonGroupAction = (typeof (jsonButtonGroupActionParm) == 'string') ? JSON.parse(jsonButtonGroupActionParm) : jsonButtonGroupActionParm;

		this.form = form;
		this.idItem = this.form.formid + "_" + HrifGetItem(jsonButtonGroupAction.IdItem);
		this.items = jsonButtonGroupAction.Items;
		this.buttonGroupParm = jsonButtonGroupAction.ButtonGroupParm;
		this.actionDropParm = jsonButtonGroupAction.ActionDropParm;
		this.maxFixedButtons = jsonButtonGroupAction.MaxFixedButtons;
	
		this.portletId = this.form.formid;
		this.nameObj = "HrifButtonGroupAction";
		this.stringHtml = "";
		this.stringButtonsHtml = "";

		// Variabili operative
		this.defaultMaxButtons = 3
		this.maxButtonGroupElements =  (this.maxFixedButtons > 0 && this.maxFixedButtons <= this.defaultMaxButtons) ? this.maxFixedButtons : this.defaultMaxButtons;
		this.oldSize;
		
		// Definizione IdItem
		this.idContent = this.idItem + "_content";
		this.idContainer = this.idItem + "_container";

		// definizioni classi
		this.classNameBase = hrifCLASSBASE.BUTTONGROUPACTIONDROP;

		// Gestione degli eventi resize e load --------------------------------------|
		if (HrifButtonGroupActionDrop.resizeHandleEvent) {
            window.removeEventListener("resize", HrifButtonGroupActionDrop.resizeHandleEvent);
        }
		// Imposta l'event listener corrente
		window.addEventListener("resize", this._handleResize);
		HrifButtonGroupActionDrop.resizeHandleEvent = this._handleResize;

		if (HrifButtonGroupActionDrop.loadHandleEvent) {
            window.removeEventListener("load", HrifCarouselObj.loadHandleEvent);
        }
		// Imposta l'event listener corrente
		window.addEventListener("load", this._handleLoad);
		HrifButtonGroupActionDrop.loadHandleEvent = this._handleLoad;
		// --------------------------------------------------------------------------|

		// creo il div principale
        this.docButtonGroupActionFrag = document.createDocumentFragment();
        documentFrag(this.docButtonGroupActionFrag, 'div', this.idItem, '', this.classNameBase);
		this.stringHtml = this.docButtonGroupActionFrag.children[0].outerHTML;

		// preparo i parametri per il ButtonGroup
		this.jsonButtonGroup = {
			Type: this.buttonGroupParm.Type,
			Orientation: hrifORIENTATION.HORIZONTAL,
			Buttons: []
		}

		// preparo i parametri per l'ActionDrop
		this.jsonActionDrop = {
			Label: this.actionDropParm.Label,
			ActionsLayout: this.actionDropParm.ActionsLayout,
			Orientation: this.actionDropParm.Orientation,
			Items: []
		}

		// divido gli item tra button del ButtonGroup e azioni del ActionDrop
		this.items.forEach((item,index) => {
			if(index < this.maxButtonGroupElements){
				this.jsonButtonGroup.Buttons.push(item);
			}else{
				this.jsonActionDrop.Items.push(item);
			}
		});

		// creo il ButtonGroup
		this.buttonGroup = new HrifButtonGroup(this.form, this.jsonButtonGroup);
		this.docButtonGroupActionFrag.firstElementChild.appendChild(this.buttonGroup.getObject());
		this.stringButtonsHtml += this.buttonGroup.getHtml();
		
		// creo l'ActionDrop
		this.actionDrop = new HrifActionDrop(this.form, this.jsonActionDrop);
		this.docButtonGroupActionFrag.firstElementChild.appendChild(this.actionDrop.getObject());
		this.stringButtonsHtml += this.actionDrop.getHtml();

		this.wrkDocFrag = this.docButtonGroupActionFrag.children[0];
	}

	/** Funzione che aggiorna l'oggetto quando viene caricato nel Document
	 * @ignore
	 */
	_handleLoad = function() {
		this.oldSize = this.getObject().getBoundingClientRect().width;
		this._updateVisibleButtons();

		if(this.jsonActionDrop.Items.length === 0){
			this.actionDrop.Disabled();
		} else {
			this.actionDrop.Enabled();
		}
	}

	/** Funzione che aggiorna l'oggetto quando viene ridimensionata la finestra
	 * @ignore
	 */
	_handleResize = function()  {
		let newSize = this.getObject().getBoundingClientRect().width;
		let IdxBtn, reload = false;
		// mi salvo le coordinate per il button group istanziato nel document
		let btnGrpElemeRect = document.getElementById(this.buttonGroup.idItem).getBoundingClientRect();

		// controllo se la finestra è stata ingrandita o rimpicciolita
		if(newSize > this.oldSize){
			// ingrandita

			// per ogni button che è stato inserito nel ActionDrop precedentemente vado a reistanziare il ButtonGroup aggiungendoli uno alla volta,
			// eseguendo poi lo stesso controllo di quando rimpicciolisco, quindi se il button aggiunto non effettua overflow nel container.
			for(IdxBtn = this.jsonButtonGroup.Buttons.length; IdxBtn < this.maxButtonGroupElements; IdxBtn++){
				let oldBtnGroup = this.buttonGroup;
				this.jsonButtonGroup.Buttons.push(this.jsonActionDrop.Items.shift())
				this.buttonGroup = new HrifButtonGroup(this.form, this.jsonButtonGroup);
				document.getElementById(oldBtnGroup.idItem).replaceWith(this.buttonGroup.getObject());

				let oldActDrpId = this.actionDrop.idItem;
				this.actionDrop = new HrifActionDrop(this.form, this.jsonActionDrop)
				document.getElementById(oldActDrpId).replaceWith(this.actionDrop.getObject());

				if(!this._updateVisibleButtons()){
					break;
				}

			}
		} else {
			this._updateVisibleButtons();		
		}

		if(this.jsonActionDrop.Items.length === 0){
			this.actionDrop.Disabled();
		} else {
			this.actionDrop.Enabled();
		}

		this.oldSize = newSize;
	}

	/** Funzione ausiliaria che rimuove buttons dal ButtonGroup e li inserisce nel ActionDrop se risultano in overflow
	 * @ignore
	 */
	_updateVisibleButtons = function(){
		let IdxBtn, reload = false;
		let btnGrpElemeRect = document.getElementById(this.buttonGroup.idItem).getBoundingClientRect();

		// per ogni button a video vado a confrontare la coordinata x dell'estremo destro con quello del ButtonGroup, per verificare che non ci sia overflow
		for(IdxBtn = this.jsonButtonGroup.Buttons.length-1; IdxBtn > 0; IdxBtn--){
			let id = this.items[IdxBtn].IdItem;
			let btnElemRect = document.getElementById(this.buttonGroup.buttons[IdxBtn].idItem).getBoundingClientRect();

			if(btnElemRect.right > btnGrpElemeRect.right){
				// se ho overflow allora devo spostare un Item dal ButtonGroup al ActionDrop
				reload = true;
				this.jsonActionDrop.Items.unshift(this.jsonButtonGroup.Buttons.pop())
			} else
				break;
		}

		// infine se ho fatto degli spostamenti allora dovrò reinstanziare ButtonGroup e ActionDrop per vedere i cambiamenti.
		if(reload){
			let oldBtnGrpId = this.buttonGroup.idItem;
			this.buttonGroup = new HrifButtonGroup(this.form, this.jsonButtonGroup);
			document.getElementById(oldBtnGrpId).replaceWith(this.buttonGroup.getObject());

			let oldActDrpId = this.actionDrop.idItem;
			this.actionDrop = new HrifActionDrop(this.form, this.jsonActionDrop)
			document.getElementById(oldActDrpId).replaceWith(this.actionDrop.getObject());

			return false;
		}
		return true;
	}


	/** Disabilita l'oggetto
	* @returns {null} Disabilita l'oggetto.
	*/
	Disabled = function () {
		document.getElementById(this.idItem).setAttribute("disabled", "true");
		//		this.wrkObj.setAttribute("disabled","true");
	};

	/** Abilita l'oggetto
	* @returns {null} Abilita l'oggetto.
	*/
	Enabled = function () {
		document.getElementById(this.idItem).removeAttribute("disabled");
	};

	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};
	/** Rimozione classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Rimuove la classe.
	*/
	removeClass = function (className) {
		this.wrkDocFrag.classList.remove(className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	getHtml = function () {
		var htmlAction = this.stringHtml.replace('</div>', this.stringButtonsHtml + "</div>");
		return htmlAction;
		//		return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	getObject = function () {
		return this.wrkDocFrag;
	};

	// Caricamento dell'oggetto nel parentObjIdParm
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};
}

function hrifReplaceClassWithPrefix(object, classPrefix, classNew){

	object.classList.forEach(className => {
		if (className.startsWith(classPrefix)) {
			object.classList.remove(className);
		}
	});	

	hrifAddClass(object, classPrefix + classNew );
}

//# sourceURL=../../HRPORTAL/binframework/js/hrif2.js
