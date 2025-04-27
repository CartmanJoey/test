// Title
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
* Questo è uno spazio che contiene elementi di documentazione appartenenti alla Gestione dei Titoli
*
* @namespace Titles
*
*/


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Title 
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Title
* @class 
* @alias HrifTitle
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitle - Json contenente le proprietà dell'oggetto.
* @param {string} [jsonTitle.OverTitle] - Descrizione del 'sopra' Titolo.
* @param {string} [jsonTitle.OverTitleAdd] - Descrizione aggiuntiva del 'sopra' Titolo (effetto OverTitle + effettografico + OverTitleAdd).
* @param {string} jsonTitle.Title - Descrizione del Titolo.
* @param {string} [jsonTitle.SubTitle] - Descrizione del sotto titolo.
* @param {string} [jsonTitle.SearchFilter] -  Descrizione da ricercare nel testo del <b>Titolo</b>. <br>(nell'OverTitle e Subtitle se abilitata la ricerca) - *** da utilizzare solo per la ricerca all'interno di una card
* @param {boolean} [jsonTitle.SearchOverTitle] - Abilita la ricerca sull'OverTitle - *** da utilizzare solo per la ricerca all'interno di una card
* @param {boolean} [jsonTitle.SearchSubTitle] - Abilita la ricerca sull'SubTitle - *** da utilizzare solo per la ricerca all'interno di una card
* @param {string} [jsonTitle.Tooltip] - Descrizione del Tooltip.
* @returns {object} Oggetto Title.
*
* @example
*
* // Definisco le prorietà del Titolo
* var jsonTitle = {};
* jsonTitle.OverTitle = FormatMsg("Descrizione del OverTitle");
* jsonTitle.OverTitleAdd = FormatMsg("Descrizione aggiuntiva");
* jsonTitle.Title = FormatMsg("Questo è il Title");
* jsonTitle.SubTitle = FormatMsg("Descrizione del SubTitle");
* 
* // Istanzio l'oggetto
* var title = new HrifTitle(this, jsonTitle);
* 
* // Carico l'oggetto in un contenitore
* this.hrif_container.Load(title);
*
*/
class HrifTitle {

	constructor (form, jsonTitleParam){ 

		var jsonTitle = (typeof (jsonTitleParam) == 'string') ? JSON.parse(jsonTitleParam) : jsonTitleParam;

		this.form = form;
		this.idItemCalc = HrifGetItem(jsonTitle.IdItem);
		this.idItem = this.form.formid + "_" + this.idItemCalc + "_tit";
		this.overTitle = (typeof (jsonTitle.OverTitle) == 'number') ? jsonTitle.OverTitle.toString() : jsonTitle.OverTitle;
		this.overTitleAdd = (typeof (jsonTitle.OverTitleAdd) == 'number') ? jsonTitle.OverTitleAdd.toString() : jsonTitle.OverTitleAdd;
		this.title = (typeof (jsonTitle.Title) == 'number') ? jsonTitle.Title.toString() : jsonTitle.Title;
		this.subTitle = (typeof (jsonTitle.SubTitle) == 'number') ? jsonTitle.SubTitle.toString() : jsonTitle.SubTitle;
		this.searchFilter = jsonTitle.SearchFilter;
		this.searchOverTitle = jsonTitle.SearchOverTitle;
		this.searchSubTitle = jsonTitle.SearchSubTitle;
		this.tooltipValue = jsonTitle.Tooltip;
		this.status = jsonTitle.Status;
		this.statusValue = jsonTitle.StatusValue;
		//	this.titleType = jsonTitle.Type;

		this.typeObj = "pattern";
		this.nameObj = "HrifTitle";

		this.error = false;

		this.portletId = this.form.formid;

		this.classNameBase = hrifCLASSBASE.TITLE;
		this.classNameOverTitleContainer = this.classNameBase + "__over-container";
		this.classNameOverTitle = this.classNameBase + "__over";
		this.classNameOverTitleAdd = this.classNameBase + "__over-add";
		this.classNameTitle = this.classNameBase + "__title";
		this.classNameSubTitle = this.classNameBase + "__subtitle";

		this.idItemOverTitleContainer = this.idItemCalc + "_ovtitle_cont";
		this.idItemOverTitle = this.idItemCalc + "_ovtitle";
		this.idItemOverTitleadd = this.idItemCalc + "_ovtitleadd";
		this.idItemTitle = this.idItemCalc + "_title";
		this.idItemSubTitle = this.idItemCalc + "_sutitle";
		this.idItemStatus = this.idItemCalc + "_status";
		
		if (typeof (this.title) == 'undefined' || this.title.trim() == "") {
			hrifConsole("[HRIF] HrifTitle: impossibile definire un oggetto titolo senza valorizzare il titolo stesso", "warn");
			this.title = "undefined";
		}
		
		// Definizione del documento in memoria
		this.docTitleFrag = document.createDocumentFragment();
		documentFrag(this.docTitleFrag, 'div', this.idItem, '', this.classNameBase);
		
		// Definizione dello Status		
		if (this.statusValue && this.statusValue.trim() != "") {
			var jsonSubTitleParm = {};
			jsonSubTitleParm.IdItem = this.idItemStatus;
			jsonSubTitleParm.Label = this.statusValue;
			this.statusObj = new HrifLabel(this.form, jsonSubTitleParm);
			this.statusObj.addClass(this.classNameStatus);
			if (this.status)  this.statusObj.addClass(hrifCLASSBASE.HIGHLIGHTBOX + " " + this.status);
			this.docTitleFrag.getElementById(this.idItem).appendChild(this.statusObj.getObject());
		} 

		// Definizione dell'overTitle
		if (this.overTitle && this.overTitle.trim() != "") {
			// Definizione in memoria del 'overtitle
			this.docOverTitleFrag = document.createDocumentFragment();
			documentFrag(this.docOverTitleFrag, 'div', this.idItemOverTitleContainer, '', this.classNameOverTitleContainer);
			
			var jsonOverTitleParm = {};
			jsonOverTitleParm.IdItem = this.idItemOverTitle;
			jsonOverTitleParm.Label = this.overTitle;
			if (this.searchOverTitle) jsonOverTitleParm.SearchFilter = this.searchFilter;
			this.overTitleObj = new HrifLabel(this.form, jsonOverTitleParm);
			this.overTitleObj.addClass(this.classNameOverTitle);
			this.docOverTitleFrag.getElementById(this.idItemOverTitleContainer).appendChild(this.overTitleObj.getObject());
			
			// Se Compilato anche OverTitle 'Aggiuntivo'
			if (this.overTitleAdd && this.overTitleAdd.trim() != "") {
				var jsonSubTitleAddParm = {};
				jsonSubTitleAddParm.IdItem = this.idItemOverTitleadd;
				jsonSubTitleAddParm.Label = this.overTitleAdd;
				this.overTitleAddObj = new HrifLabel(this.form, jsonSubTitleAddParm);
				this.overTitleAddObj.addClass(this.classNameOverTitleAdd);
				this.docOverTitleFrag.getElementById(this.idItemOverTitleContainer).appendChild(this.overTitleAddObj.getObject());
			}
			
			this.docTitleFrag.getElementById(this.idItem).appendChild(this.docOverTitleFrag.children[0]);
		}

		//Definizione del Title
		if (this.title && this.title.trim() != "") {
			var jsonTitleParm = {};
			jsonTitleParm.IdItem = this.idItemTitle;
			jsonTitleParm.Label = this.title;
			jsonTitleParm.SearchFilter = this.searchFilter;
			this.titleObj = new HrifLabel(this.form, jsonTitleParm);
			this.titleObj.addClass(this.classNameTitle);
			this.docTitleFrag.getElementById(this.idItem).appendChild(this.titleObj.getObject());
		} 

		// Definizione del SubTitle
		if (this.subTitle && this.subTitle.trim() != "") {
			var jsonSubTitleParm = {};
			jsonSubTitleParm.IdItem = this.idItemSubTitle;
			jsonSubTitleParm.Label = this.subTitle;
			if (this.searchSubTitle) jsonSubTitleParm.SearchFilter = this.searchFilter;
			this.subTitleObj = new HrifLabel(this.form, jsonSubTitleParm);
			this.subTitleObj.addClass(this.classNameSubTitle);
			this.docTitleFrag.getElementById(this.idItem).appendChild(this.subTitleObj.getObject());
		}
		
		// Se compilato il tooltip
		if (this.tooltipValue)
			this.docTitleFrag.children[0].title = this.tooltipValue;
		
		this.wrkDocFrag = this.docTitleFrag.children[0];
	}
	
	/** Valorizza il Tooltip della Label
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	setTooltip = function (tooltipValue) {
		this.wrkDocFrag.title = tooltipValue;
	};
	

	/** Nasconde l'oggetto
	* @param {boolean} preserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde l'oggetto.
	*/
	Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkDocFrag, wrkClass);
	};

	/** Visualizza l'oggetto
	* @returns {null} Visualizza l'oggetto.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkDocFrag, hiddenDisplay);
		hrifRemoveClass(this.wrkDocFrag, hiddenVisibility);
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
		return this.wrkDocFrag.outerHTML;
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

};





// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TitleSection 
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto TitleSection 
* @class 
* @alias HrifTitleSection
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleSection - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleSection.Title - Descrizione del Titolo.
* @param {string} [jsonTitleSection.Subtitle] - Descrizione della Sezione.
* @returns {object} Oggetto TitleSection.
*
* @example
*
* // Definisco le proprietà dell'oggetto
* var jsonTitleSection = {};
* jsonTitleSection.Title = FormatMsg('Titolo del TitleSection');
* jsonTitleSection.Subtitle = FormatMsg('Questa è la descrizione di esempio del SottoTitolo del TitleSection');
*
* // Istanzio l'oggetto 
* var titleSection = new HrifTitleSection(this, jsonTitleSection);
*
* // Carico l'oggetto nel contenitore
* this.hrif_container.Load(titleSection);
* 
*/
this.HrifTitleSection = function (form, jsonTitleSectionParam) {

	var jsonTitleSection = (typeof (jsonTitleSectionParam) == 'string') ? JSON.parse(jsonTitleSectionParam) : jsonTitleSectionParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonTitleSection.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.title = jsonTitleSection.Title;
	this.subTitle = jsonTitleSection.Subtitle;
	this.size = (jsonTitleSection.Size) ? jsonTitleSection.Size : null;

	this.typeObj = "pattern";
	this.nameObj = "HrifTitleSection";
	this.isLoaded = false;

	// Definizione delle classi
	this.classNameGen = hrifCLASSBASE.TITLESECTION;
	this.classNameBase = this.classNameGen + "-section";
	this.classNameTitle = this.classNameBase + "__title";
	this.classNameSubTitle = this.classNameBase + "__subtitle";

	// Definizione degli idItem
	this.idItemTitleSection = this.idItem + "_ts";
	this.idItemTitle = this.idItemCalc + "_tst";
	this.idItemSubTitle = this.idItemCalc + "_tss";

	// Definizione oggetto SectionTitle, contiene gli oggetti Icona, Label e Counter
	this.wrkObj = {
		"title": null,
		"subTitle": null
	};

	// Definizione del documento in memoria
	this.docTitleSectionFrag = document.createDocumentFragment();
	documentFrag(this.docTitleSectionFrag, 'div', this.idItemTitleSection, '', this.classNameGen);
	
	this.wrkDocFrag = this.docTitleSectionFrag.children[0];
	hrifAddClass(this.wrkDocFrag, this.classNameBase);

	
	this.setSize = function (size) {
		this.size = size;
		if (this.size != null)
			this.wrkDocFrag.setAttribute("size",this.size);
	}
	if (this.size != null)
		this.setSize(this.size);

	// Controllo obbligatorietà del Titolo
	if (typeof (this.title) == 'undefined' || this.title.trim() == "") {
		hrifConsole("[HRIF] HrifTitleSection: 'title' obbligatorio", "warn");
		this.title = "undefined";
	}


	/** Ritorna la stringa contenente il codice html
	* @ignore
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		if (this.isLoaded) {
			return this.wrkDocFrag.outerHTML;
		} else {
			return this.docTitleSectionFrag.children[0].outerHTML;
		}
	};

	this.setTitle = function (titleValue) {
		if (titleValue.trim() != "") {
			this.title = titleValue;
			if (this.wrkObj.title == null) {
				// La prima parola deve rientrare in uno span, vado a rettificare HTML (da rivedere)
//				var firstWord = this.title.split(' ')[0];
//				if (firstWord.length < 3)
//					firstWord = this.title.split(' ')[0] + " " + this.title.split(' ')[1];
				var jsonTitleParm = {};
				jsonTitleParm.IdItem = this.idItemTitle;
				//				jsonTitleParm.Label = this.title.replace(firstWord,"");
				jsonTitleParm.Label = this.title;
				this.wrkObj.title = new HrifLabel(this.form, jsonTitleParm);
				this.wrkObj.title.addClass(this.classNameTitle);
//				var titleObj = this.wrkObj.title.getObject();
//				//				titleObj.innerHTML = '<span>' + firstWord + '<\span>' + titleObj.innerHTML;
//				titleObj.innerHTML = titleObj.innerHTML.replace(firstWord, '<span>' + firstWord + '</span>');
				this.wrkDocFrag.appendChild(this.wrkObj.title.getObject());
			} else {
				this.wrkObj.title.Value(this.title);
			}
		} else {
			var wrkDoc = document.getElementById(this.form.formid + "_" + this.idItemTitle);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.labelObj = null;
			}
		}

	};
	if (typeof (this.title) != "undefined" && this.title != "") {
		this.setTitle(this.title);
	}


	this.setSubTitle = function (subTitleValue) {
		if (subTitleValue.trim() != "") {
			this.subTitle = subTitleValue;
			if (this.wrkObj.subTitle == null) {
				var jsonSubTitleParm = hrifGetJsonLabel();
				jsonSubTitleParm.IdItem = this.idItemSubTitle;
				jsonSubTitleParm.Label = this.subTitle;
				this.wrkObj.subTitle = new HrifLabel(this.form, jsonSubTitleParm);
				this.wrkObj.subTitle.addClass(this.classNameSubTitle);
				this.wrkDocFrag.appendChild(this.wrkObj.subTitle.getObject());
			} else {
				this.wrkObj.subTitle.Value(this.subTitle);
			}
		} else {
			var wrkDoc = document.getElementById(this.form.formid + "_" + this.idItemSubTitle);
			if (wrkDoc) {
				wrkDoc.remove();
				this.wrkObj.labelObj = null;
			}
		}

	};
	if (typeof (this.subTitle) != "undefined" && this.subTitle != "") {
		this.setSubTitle(this.subTitle);
	}

	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		if (this.isLoaded) {
			var wrkDoc = document.getElementById(this.idItemTitleSection);
			let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
			var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
			hrifAddClass(wrkDoc, wrkClass);
		}
	};

	/** Visualizza la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	this.Show = function () {
		if (this.isLoaded) {
			var wrkDoc = document.getElementById(this.idItemTitleSection);
			hrifRemoveClass(wrkDoc, hiddenDisplay);
			hrifRemoveClass(wrkDoc, hiddenVisibility);
		}
	};

	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.hideAction = function (preserveSpace) {
		if (this.isLoaded) {
			var wrkDoc = document.getElementById(this.idItemAction);
			let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
			var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
			hrifAddClass(wrkDoc, wrkClass);
		}
	};

	/** Nasconde la Label
	* @ignore
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} PreserveSpace - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.showAction = function () {
		if (this.isLoaded) {
			var wrkDoc = document.getElementById(this.idItemAction);
			hrifRemoveClass(wrkDoc, hiddenDisplay);
			hrifRemoveClass(wrkDoc, hiddenVisibility);
		}
	};

	/** Imposta la modalità "esclusiva" di visualizzazione
	* @ignore
	* @param {string} viewMode - Modalità di visualizzazione hrifVIEWMODE.WEB/MOBILE 
	* @returns {null} Imposta la modalità "esclusiva" di visualizzazione.
	*/
	this.setViewMode = function (viewMode) {
		if (viewMode == hrifVIEWMODE.WEB)
			hrifAddClass(this.wrkDocFrag, "mobile-hidden-display");
		else if (viewMode == hrifVIEWMODE.MOBILE)
			hrifAddClass(this.wrkDocFrag, "web-hidden-display");
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	/** Caricamento del Section Title
	* @ignore
	* @returns {null} carica il Section Title.
	*/
	this.Load = function (parentObjIdParm) {
		// appendObjectIntoDocument(this.docSectionTitleFrag.children[0], parentObjIdParm);
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


//class HrifTitleObject (form, jsonTitleParam){
class HrifTitleObj {

	constructor(form, jsonTitleParam) {
		this.jsonTitle = (typeof (jsonTitleParam) == 'string') ? JSON.parse(jsonTitleParam) : jsonTitleParam;
		this.form = form;

		this.idItemCalc = HrifGetItem(this.jsonTitle.IdItem);
		this.idItem = this.form.formid + "_" + this.idItemCalc;
		this.title = this.jsonTitle.Title;
		this.typeObj = "pattern";
		this.nameObj = "";

		this.isLoaded = false;

		this.classNameGen = hrifCLASSBASE.TITLE;

		this.idItemTitle = this.idItemCalc + "_t";

		var wrkTitle = document.createElement('div');
		wrkTitle.id = this.idItem;
		wrkTitle.innerText = this.title;

		hrifAddClass(wrkTitle, this.classNameGen);

		this.wrkObj = wrkTitle;
	}

	/** Valorizza il Tooltip della Label
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Valorizza il testo della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	Value = function (label) {
		this.title = label;
		// this.wrkObj.innerHTML = label;
		this.wrkObj.innerHTML = ToHTag(this.title, "xssPrevent");
	};

	/** Nasconde la Label
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		hrifAddClass(this.wrkObj, wrkClass);
	};

	/** Visualizza la Label
	* @param {string} IdItem - Id Label Item.
	* @returns {null} Visualizza la label.
	*/
	Show = function () {
		hrifRemoveClass(this.wrkObj, hiddenDisplay);
		hrifRemoveClass(this.wrkObj, hiddenVisibility);
	};

	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};

	removeClass = function (className) {
		hrifRemoveClass(this.wrkObj, className);
	};

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	/** Reperimento dell'oggetto
	* @returns {object} Oggetto Label.
	*/
	getObject = function () {
		return this.wrkObj;
	};

	/** Carica l'oggetto
	* @ ignore
	* @returns {object} Carica l'oggetto .
	*/
	Load = function (IdNameInto) {
		appendObjectIntoDocument(this.wrkObj, IdNameInto);
	};

}


/** Definizione oggetto TitleObject
*  
* @class 
* @alias HrifTitleObject
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleObject - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleObject.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitlePage.
*
* @example 
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitlePageParm = {}
* jsonTitlePageParm.Title = FormatMsg("Descrizione del Title Page")
*
* // Istanzio l'oggetto 
* var titlePage = new HrifTitlePage(this, jsonTitlePageParm);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titlePage);
*
*/
class HrifTitleObject extends HrifTitleObj {

	constructor(form, jsonTitleParam) {
		super(form, jsonTitleParam);
		this.nameObj = "HrifTitleObject";
		this.addClass(hrifCLASSBASE.TITLEOBJECT);
		this.removeClass(hrifCLASSBASE.TITLE);
	}

}

/** Definizione oggetto TitlePage
*  
* @class 
* @alias HrifTitlePage
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitlePage - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitlePage.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitlePage.
*
* @example 
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitlePageParm = {}
* jsonTitlePageParm.Title = FormatMsg("Descrizione del Title Page")
*
* // Istanzio l'oggetto 
* var titlePage = new HrifTitlePage(this, jsonTitlePageParm);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titlePage);
*
*/
class HrifTitlePage extends HrifTitleObj {

	constructor(form, jsonTitleParam) {
		super(form, jsonTitleParam);
		this.nameObj = "HrifTitlePage";
		this.addClass(hrifCLASSBASE.TITLEPAGE);
	}

}

/** Definizione oggetto TitleZone
*  
* @class 
* @alias HrifTitleZone
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleZone - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleZone.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitleZone.
*
* @example 
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitleZoneParm = {}
* jsonTitleZoneParm.Title = FormatMsg("Descrizione del Title Zone")
*
* // Istanzio l'oggetto 
* var titleZone = new HrifTitleZone(this, jsonTitleZoneParm);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titleZone);
*
*/
class HrifTitleZone extends HrifTitleObj {

	constructor(form, jsonTitleParam) {
		super(form, jsonTitleParam);
		this.nameObj = "HrifTitleZone";
		this.addClass(hrifCLASSBASE.TITLEZONE);
	}

}


/** Definizione oggetto TitleFilter
*  
* @class 
* @alias HrifTitleFilter
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleFilter - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleFilter.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitleFilter.
*
* @example 
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitleFilterParm = {}
* jsonTitleFilterParm.Title = FormatMsg("Descrizione del Title Filter")
*
* // Istanzio l'oggetto 
* var titleFilter = new HrifTitleFilter(this, jsonTitleFilterParm);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titleFilter);
*
*/
class HrifTitleFilter extends HrifTitleObj {

	constructor(form, jsonTitleParam) {
		super(form, jsonTitleParam);
		this.nameObj = "HrifTitleFilter";
		this.addClass(hrifCLASSBASE.TITLEFILTER);
	}

}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TitleZone - NEW
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto TitleZone
* @ignore  
* @class 
* @alias HrifTitleZone
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleZone - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleZone.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitleZone.
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitleZoneParm = {}
* jsonTitleZoneParm.Title = FormatMsg("Title Zone da Container")
*
* // Istanzio l'oggetto 
* var titleZone = new HrifTitleZone(this, jsonTitleZoneParm);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titleZone);
*
*/
this.HrifTitleZoneOld = function (form, jsonTitleZoneParam) {

	var jsonTitleZone = (typeof (jsonTitleZoneParam) == 'string') ? JSON.parse(jsonTitleZoneParam) : jsonTitleZoneParam;

	this.typeObj = "pattern";
	this.nameObj = "HrifTitleZone";

	this.isLoaded = false;

	this.classNameGen = hrifCLASSBASE.TITLEZONE;

	this.title = new HrifTitleObject(form, jsonTitleZone);
	this.title.addClass(hrifCLASSBASE.TITLEZONE);

	this.wrkObj = this.title.getObject();

	/** Valorizza il Tooltip della Label
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Valorizza il testo della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.Value = function (label) {
		this.title = label;
		// this.wrkObj.innerHTML = label;
		this.wrkObj.innerHTML = ToHTag(this.title, "xssPrevent");
	};

	/** Nasconde la Label
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
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

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	/** Reperimento dell'oggetto
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



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// TitleFilter
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto TitleFilter 
* @ignore
* @class 
* @alias HrifTitleFilter
* @memberOf Titles
* @param {object} form - this.
* @param {json|object} jsonTitleFilter - Json contenente le proprietà dell'oggetto.
* @param {string} jsonTitleFilter.Title - Descrizione del Titolo.
* @returns {object} Oggetto TitleFilter.
*
* @example 
*
* // Definizione delle proprietà dell'oggetto 
* var jsonTitleFilter = {}
* jsonTitleFilter.Title = FormatMsg("Title Filter da Container")
*
* // Istanzio l'oggetto 
* var titleFilter = new HrifTitleFilter(this, jsonTitleFilter);
*
* // Carico l'oggetto nel contenitore
* this.hrif_CntTitle.Load(titleFilter);
*
*/
this.HrifTitleFilterOld = function (form, jsonTitleFilterParam) {

	var jsonTitleFilter = (typeof (jsonTitleFilterParam) == 'string') ? JSON.parse(jsonTitleFilterParam) : jsonTitleFilterParam;

	this.typeObj = "pattern";
	this.nameObj = "HrifTitleFilter";

	this.isLoaded = false;

	this.classNameGen = hrifCLASSBASE.TITLEFILTER;

	this.title = new HrifTitleObject(form, jsonTitleFilter);
	this.title.addClass(hrifCLASSBASE.TITLEFILTER);

	this.wrkObj = this.title.getObject();

	/** Valorizza il Tooltip della Label
	* @param {string} tooltipValue - Testo del tootip.
	* @returns {null} Valorizza il Tooltip della Label.
	*/
	this.setTooltip = function (tooltipValue) {
		this.wrkObj.title = tooltipValue;
	};

	/** Valorizza il testo della Label
	* @param {string} label - Testo della Label.
	* @returns {null} Nasconde la Label.
	*/
	this.Value = function (label) {
		this.title = label;
		// this.wrkObj.innerHTML = label;
		this.wrkObj.innerHTML = ToHTag(this.title, "xssPrevent");
	};

	/** Nasconde la Label
	* @param {string} IdItem - Id Label Item.
	* @param {boolean} [preserveSpace] - Preserva lo spazio (true/false).
	* @returns {null} Nasconde la Label.
	*/
	this.Hide = function (preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
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

	/** Reperimento codice Html dell'oggetto
	* @returns {String} Stringa contenente il codice Html dell'oggetto.
	*/
	this.getHtml = function () {
		return this.wrkObj.outerHTML;
	};

	/** Reperimento dell'oggetto
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



/** Definizione oggetto MediaTiTle
* @class
* @memberof Title
* @alias HrifMediaTitle 
* @param {object} form - this.
* @param {json|object} jsonMediaTitleParm - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
* @param {hrifICON} jsonMediaTitleParm.Icon - Icona 
* @param {string} jsonMediaTitleParm.OverTitle - Descrizione dell'overtitle
* @param {string} jsonMediaTitleParm.Title - Descrizione del Titolo
* @param {string} [jsonMediaTitleParm.SubTitle] - Descrizione del subtitle
* @param {hrifSTATUS} [jsonMediaTitleParm.Status] - Stato dell'oggetto 
* @param {string} [jsonMediaTitleParm.Action] - Azione di callback 
* @param {string} [jsonMediaTitleParm.Tooltip] - Descrizione del tooltip 
* @returns {object} Oggetto FunctionPersona.
*
* @example 
*
* // Definizione proprietà dell'oggetto
* var jsonMediaTitleParm = {};
* jsonMediaTitleParm.Icon = hrifICON.ALARM;
* jsonMediaTitleParm.OverTitle = 'Questa è la descrizione del overtitle';
* jsonMediaTitleParm.Title = 'Questo è il titolo';
* jsonMediaTitleParm.Description = "Questo è il testo del sottotitolo"
* jsonMediaTitleParm.Status = hrifSTATUS.DANGER;
* jsonMediaTitleParm.Tooltip = "Questo è il testo del tooltip";
* jsonMediaTitleParm.Action = "execFunctionPersona";
*
* // Istanzio l'oggetto
* var mediaTitle = new HrifMediaTitle(this, jsonMediaTitleParm);
* this.hrif_cntTitle.Load(mediaTitle)
*/
this.HrifMediaTitle = function (form, jsonMediaTitleParam) {

	var jsonMediaTitle = (typeof (jsonMediaTitleParam) == 'string') ? JSON.parse(jsonMediaTitleParam) : jsonMediaTitleParam;

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonMediaTitle.IdItem);
	this.idItem = this.form.formid + "_fpe_" + this.idItemCalc;
	this.mediaInfo = jsonMediaTitle.MediaInfo;
	this.overTitle = jsonMediaTitle.OverTitle;
	this.title = jsonMediaTitle.Title;
	this.subTitle = jsonMediaTitle.SubTitle;
	this.status = jsonMediaTitle.Status;
	this.action = jsonMediaTitle.Action;
	this.tooltip = jsonMediaTitle.Tooltip;
	this.portletId = this.form.formid;

	this.typeObj = "pattern";
	this.objectName = "HrifMediaTitle";

	//-----

	this.isLoaded = false;

	this.classNameBase = hrifCLASSBASE.MEDIATITLE;
	this.classNameMedia = this.classNameBase + "__media";
	//	this.classNameStatus = this.classNameBase + "--";
	this.classNameImagePos = this.classNameBase + "--align-";
	this.classNameContent = this.classNameBase + "__content";
	//	this.classNameSize = this.classNameBase + "--";
	this.classNameTitle = this.classNameBase + "__title";

	this.idItemMedia = this.idItem + '_med';
	this.idItemImageCircle = this.idItem + '_cir';
	this.idItemIcon = this.idItem + "ico";
	this.idItemContent = this.idItem + "_con";

	// Definizione oggetto 
	this.wrkObj = {
		"media": null,
		"title": null
	};

	// Definizione dell'oggetto in memoria e ne carico i songoli oggetti
	this.docMediaTitleFrag = document.createDocumentFragment();
	documentFrag(this.docMediaTitleFrag, 'div', this.idItem, '', this.classNameBase);

	if (this.mediaInfo) {
		this.docMediaFrag = document.createDocumentFragment();
		documentFrag(this.docMediaFrag, 'div', this.idItemMedia, '', this.classNameMedia);

		if (this.mediaInfo.Type == "ico") {
			var jsonIconParam = {};
			jsonIconParam.Icon = this.mediaInfo.Source;
			this.wrkObj.media = new HrifIcon(this.form, jsonIconParam);

		}

		this.docMediaFrag.getElementById(this.idItemMedia).appendChild(this.wrkObj.media.getObject());
		// Aggiungo il media al documento
		this.docMediaTitleFrag.getElementById(this.idItem).appendChild(this.docMediaFrag);
	}

	// Div contenitore delle Label
	this.docContentFrag = document.createDocumentFragment();
	documentFrag(this.docContentFrag, 'div', this.idItemContent, '', this.classNameContent);

	// Se compilato, istanzio un oggetto Title 

	var jsonTitleParm = {};
	jsonTitleParm.OverTitle = this.overTitle;
	jsonTitleParm.Title = this.title;
	jsonTitleParm.SubTitle = this.subTitle;
	this.wrkObj.title = new HrifTitle(this.form, jsonTitleParm);
	// Aggiungo il Title al documento
	this.docContentFrag.getElementById(this.idItemContent).appendChild(this.wrkObj.title.getObject());


	// Aggiungo il content al documento
	this.docMediaTitleFrag.getElementById(this.idItem).appendChild(this.docContentFrag);

	this.wrkDocFrag = this.docMediaTitleFrag.children[0];

	/** Definisce il titolo
	* @ignore 
	* @param {string} titleValue - Valore del titolo
	* @returns {null} Visualizza il titolo settato.
	*/
	this.setTitle = function (titleValue) {
		this.title = titleValue;
		this.wrkInformation.wrkObj.title.setTitle(this.title);
	};

	/** Carica le Informazioni
	* @ignore
	* @param {string} infoValue - Valore delle informazioni
	* @returns {null} Carica le Informazioni.
	*/
	this.setInfo = function (infoValue) {
		this.info = infoValue;
		this.wrkInformation.wrkObj.title.setSubTitle(this.info);
	};

	/** Carica l'immagine
	* @ignore
	* @param {string} urlImage - Percorso relativo dell'immagine
	* @returns {null} Carica l'immagine.
	*/
	this.setImage = function (urlImage) {
		this.urlImage = urlImage;
		if (this.urlImage.trim() != "") {
			this.wrkInformation.wrkObj.image.Value(this.urlImage);
		} else {
			document.getElementById(this.wrkInformation.idItemImage).removeAttribute("style");
		}
	};

	/** Definisce lo stato dell'Persona
	* @ignore
	* @param {hrifSTATUS} status - Stato dell'oggetto
	* @returns {null} Visualizza le informazioni con lo stato settato.
	*/
	this.setStatus = function (newStatus) {
		//var wrkDoc = document.getElementById(this.idItem);
		hrifAddClass(this.wrkDocFrag, this.classStatus + newStatus);
	};

	/** Definisce la dimenszione dell'oggetto Persona
	* @ignore
	* @param {hrifSIZE} size - Valori ammessi: SMALL/MEDIUM/LARGE.
	* @returns {null} Visualizza le informazioni alla dimesione settata.
	*/
	this.setSize = function (size) {
		if (size == hrifSIZE.XSMALL || size == hrifSIZE.XLARGE) hrifConsole("[HRIF] HrifPersona.setSize: non previste le dimensioni impostate (XSMALL/XLARGE)", 'warn');
		this.wrkDocFrag.classList.remove(this.classNameBase + "--small", this.classNameBase + "--medium", this.classNameBase + "--large");
		this.classSize = this.baseClassName + "--" + size;
		hrifAddClass(this.wrkDocFrag, this.classSize);
	};

	/** Imposta l'immagine nella posizione indicata
	* @ignore
	* @param {hrifPOSITION} position - Posizione, valori ammessi: left/right.
	* @returns {null} Visualizza l'immagine nella posizione.
	*/
	this.setImagePosition = function (position) {
		this.wrkDocFrag.classList.remove(this.classNameBase + "--align-right", this.classNameBase + "--align-left");
		if (position == hrifPOSITION.BOTTOM || position == hrifPOSITION.TOP) {
			hrifConsole("[HRIF] HrifPersona.setPosition: posizione non prevista per l'oggetto (Valori ammessi : LEFT/RIGHT)", 'warn');
		} else {
			var wrkClassPosition = this.classNameImagePos + position;
			hrifAddClass(this.wrkDocFrag, wrkClassPosition);
		}
	};

	/** Valorizzazione del Tooltip
	* @ignore
	* @param {string} tooltip - Descrizione del tooltip.
	* @returns {null} Valorizzazione del Tooltip.
	*/
	this.setTooltip = function (tooltip) {
		this.wrkDocFrag.title = tooltip;
	};
	if (this.tooltip)
		this.setTooltip(this.tooltip);

	/** Azione da eseguire al Click
	* @ignore
	* @param {string} action - Indica la funzione da eseguire.
	* @returns {null} Richiama l'azione indicata.
	*/
	this.setAction = function (action) {

		this.action = action;

		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkDocFrag, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action);
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
	this.setAction(this.action);


	/** Aggiunta classe sull'oggetto
	* @ignore
	* @param {string} className - Nome classe da aggiungere.
	* @returns {null} Viene aggiunta la classe passata sull'oggetto.
	*/
	this.addClass = function (className) {
		hrifAddClass(this.wrkDocFrag, className);
	};

	/** Rimozione classe sull'oggetto
	* @ignore
	* @param {string} className - Nome classe da rimuovere.
	* @returns {null} Viene rimossa la classe passata dall'oggetto.
	*/
	this.removeClass = function (className) {
		hrifRemoveClass(this.wrkDocFrag, className);
	};

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

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	this.Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};


/** Definizione oggetto Stepper
* @class
* @memberof Title
* @alias HrifStepper 
* @param {object} form - this.
* @param {json|object} jsonStepperParam - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
* @param {json[]} jsonStepperParam.StepperArray - Array contenente le proprietà dello stepper
* @param {string} jsonStepperParam.StepperArray.Label - Descrizione dello stepper 
* @param {string} [jsonStepperParam.Action] - Azione di callback al click sullo stepper 
* @returns {object} Oggetto Stepper.
*
* @example 
*
* // Definizione proprietà dell'oggetto
* var jsonStepperParm = {};
* jsonStepperParm.StepperArray = [];
* var jsonStep = {};
* jsonStep.Type = hrifSTEPTYPE.NUMBER;
* jsonStep.Step = 1;
* jsonStep.Label = FormatMsg('Primo Step');
* jsonStepperParm.StepperArray.push(jsonStep)
* var jsonStep = {};
* jsonStep.Type = hrifSTEPTYPE.NUMBER;
* jsonStep.Step = 2;
* jsonStep.Label = FormatMsg('Secondo Step');
* jsonStepperParm.StepperArray.push(jsonStep)
* var jsonStep = {};
* jsonStep.Type = hrifSTEPTYPE.NUMBER;
* jsonStep.Step = 3;
* jsonStep.Label = FormatMsg('Terzo Step');
* jsonStepperParm.StepperArray.push(jsonStep)
* var jsonStep = {};
* jsonStep.Type = hrifSTEPTYPE.ICON;
* jsonStep.Step = hrifICON.CERTIFICATE;
* jsonStep.Label = FormatMsg('Quarto Step');
* jsonStepperParm.StepperArray.push(jsonStep)
* jsonStepperParm.Action = "onClickStep";
* 
* 
* var stepper = new HrifStepper(this, jsonStepperParm);
*
* this.hrif_cntStepper.Load(stepper);
*/
class HrifStepper {

	constructor(form, jsonStepperParam) {

		var jsonStepper = (typeof (jsonStepperParam) == 'string') ? JSON.parse(jsonStepperParam) : jsonStepperParam;

		this.form = form;
		this.idItemCalc = HrifGetItem(jsonStepper.IdItem);
		this.idItem = this.form.formid + "_" + this.idItemCalc;
		this.stepperArray = jsonStepper.StepperArray;
		this.action = jsonStepper.Action;
		this.actionOld = null;
		this.portletId = this.form.formid;
		this.idxStepCurr = 0;
		this.idxStepOld = null;

		this.typeObj = "pattern";
		this.objectName = "HrifStepper";

		this.isLoaded = false;
		this.title = "";

		this.classNameBase = hrifCLASSBASE.STEPPER;
		this.classNameBaseItem = this.classNameBase + "-step";
		this.classNameBaseStepIcon = this.classNameBaseItem + "__icon";

		this.idItemItem = this.idItem + '_it';

		// Definizione dell'oggetto in memoria e ne carico i songoli oggetti
		this.docStepperFrag = document.createDocumentFragment();
		documentFrag(this.docStepperFrag, 'div', this.idItem, '', this.classNameBase);

		// Ciclo sugli elementi dello stepper
		for (let IdxStep = 0; IdxStep < this.stepperArray.length; IdxStep++) {

			this.idxStepCurr = 0;

			// Definizione div item
			this.docStepperItem = document.createDocumentFragment();
			documentFrag(this.docStepperItem, 'div', this.idItemItem + IdxStep, '', this.classNameBaseItem);
			this.docStepperItem.children[0].setAttribute("name", this.idItemItem + IdxStep);

			this.docStepperItem.children[0].addEventListener("click", this.clickStep.bind(null, this, IdxStep), false);

			// Definizione dello span per la gestione del progressivo
			if (typeof (this.stepperArray[IdxStep].Type) == 'undefined' || this.stepperArray[IdxStep].Type == hrifSTEPTYPE.NUMBER) {
				this.docStepperCircleFrag = document.createDocumentFragment();
				documentFrag(this.docStepperCircleFrag, 'span', this.idItemItem + IdxStep + '_c', '', this.classNameBaseStepIcon);
				this.docStepperCircleFrag.children[0].innerText = (typeof (this.stepperArray[IdxStep].Step) != 'undefined') ? this.stepperArray[IdxStep].Step : '';
				this.docStepperItem.getElementById(this.idItemItem + IdxStep).appendChild(this.docStepperCircleFrag);
			} else if (this.stepperArray[IdxStep].Type == hrifSTEPTYPE.ICON) {
				var jsonIconParam = {};
				jsonIconParam.Icon = this.stepperArray[IdxStep].Step;
				this.icon = new HrifIcon(this.form, jsonIconParam);
				this.docStepperItem.getElementById(this.idItemItem + IdxStep).appendChild(this.icon.getObject());
			}

			// Valorizzo la label ed aggiungo la label
			var jsonLabelParm = {};
			jsonLabelParm.IdItem = this.idItemItem + IdxStep + '_l';
			jsonLabelParm.Label = this.stepperArray[IdxStep].Label;
			this.label = new HrifLabel(this.form, jsonLabelParm);
			this.docStepperItem.getElementById(this.idItemItem + IdxStep).appendChild(this.label.getObject());

			// Aggiungo l'elemento al div principale			
			this.docStepperFrag.getElementById(this.idItem).appendChild(this.docStepperItem);

		}

		this.wrkDocFrag = this.docStepperFrag.children[0];

	}

	clickStep = function (object, idxStep) {
		if (idxStep != object.idxStepOld) {
			object.wrkDocFrag.getElementsByClassName(object.classNameBaseItem)[object.idItemItem + object.idxStepOld].classList.remove("active");
			object.wrkDocFrag.getElementsByClassName(object.classNameBaseItem)[object.idItemItem + idxStep].classList.add("active");
		}

		execPortletAction(object.portletId, object.action, '"' + idxStep + '","' + object.idxStepOld + '"');

		object.idxStepOld = idxStep;
		object.idxStepCurr = idxStep;
	};

	/** Setta lo stato dello step
	* @method
	* @param {number} idxStep - Indice dell'elemento dello stepper. 
	* @param {string} status - Stato dello step. 
	* @returns {null} Setta lo stato dello step .
	*/
	setStepStatus = function (idxStep, status) {
		this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.add(status);
	};

	/** Disabilita/Abilita lo step
	* @method	
	* @param {number} dxStep - Indice dell'elemento dello stepper. 
	* @param {boolean} disable - Stato dello step. 
	* @returns {null} Setta lo stato dello step .
	*/
	setStepDisable = function (idxStep, disable) {
		if (disable)
			this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.add("disable");
		else
			this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.remove("disable");
	};


	/** Posizionamento sull'elemento di indice (passato tramite parametro)
	* @method	
	* @param {number} idxStep - Indice dell'elemento dello stepper.
	* @returns {null} Posizionamento sull'elemento di indice (passato tramite parametro).
	*/
	goTo = function (idxStep) {
		if(this.idxStepOld!=null)
			this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + this.idxStepOld].classList.remove("active");
		this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.add("active");
		this.idxStepOld = idxStep;
		this.idxStepCurr = idxStep;
	};

	/** Posizionamento sull'elemento di indice (passato tramite parametro)
	* @method	
	* @param {number} idxStep - Indice dell'elemento dello stepper.
	* @returns {null} Posizionamento sull'elemento di indice (passato tramite parametro).
	*/
	Hide = function (idxStep) {
		this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.add(hiddenDisplay);
	};

	/** Posizionamento sull'elemento di indice (passato tramite parametro)
	* @method	
	* @param {number} idxStep - Indice dell'elemento dello stepper.
	* @returns {null} Posizionamento sull'elemento di indice (passato tramite parametro).
	*/
	Show = function (idxStep) {
		this.wrkDocFrag.getElementsByClassName(this.classNameBaseItem)[this.idItemItem + idxStep].classList.remove(hiddenDisplay);
	};

	/** Posizionamento sull'elemento successivo
	* @method	
	* @returns {null} Posizionamento sull'elemento successivo.
	*/
	goNext = function () {
		if (this.idxStepCurr < this.stepperArray.length - 1) {
			this.idxStepCurr = this.idxStepCurr + 1;
			this.clickStep(this, this.idxStepCurr);
		}
	};

	/** Posizionamento sull'elemento precedente
	* @method	
	* @returns {null} Posizionamento sull'elemento precedente.
	*/
	goPrev = function () {
		if (this.idxStepCurr > 0) {
			this.idxStepCurr = this.idxStepCurr - 1;
			this.clickStep(this, this.idxStepCurr);
		}
	};

	/** Posizionamento al primo elemento dello stepper
	* @method	
	* @returns {null} Posizionamento al primo elemento dello stepper.
	*/
	goFirst = function () {
		this.idxStepCurr = 0;
		this.clickStep(this, this.idxStepCurr);
	};

	/** Posizionamento all'ultimo elemento dello stepper
	* @method	
	* @returns {null} Posizionamento all'ultimo elemento dello stepper.
	*/
	goLast = function () {
		this.idxStepCurr = this.stepperArray.length - 1;
		this.clickStep(this, this.idxStepCurr);
	};

	/** Restituisce l'indice dello step corrente
	* @method	
	* @returns {number} Restituisce l'indice dello step corrente.
	*/
	getCurrentStepIndex = function () {
		return this.idxStepCurr;
	};

	/** Caricamento dell'oggetto
	* @ignore
	* @param {string} parentObjIdParm - Codice Item in cui caricare l'oggetto.
	* @returns {null} carica l'oggetto.
	*/
	Load = function (parentObjIdParm) {
		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

}

class HrifTitleCounterGroup {
	
	constructor(form, jsonHrifTitleCounterGroupParam) {
		const jsonHrifTitleCounterGroup = (typeof (jsonHrifTitleCounterGroupParam) == 'string') ? JSON.parse(jsonHrifTitleCounterGroupParam) : jsonHrifTitleCounterGroupParam;
		
		this.title = jsonHrifTitleCounterGroup.Title;
		this.items = jsonHrifTitleCounterGroup.Items;
		this.status = jsonHrifTitleCounterGroup.Status;
		this.direction = jsonHrifTitleCounterGroup.Direction;
		this.action = jsonHrifTitleCounterGroup.Action;

		this.form = form;
        this.idItem = HrifGetItem(jsonHrifTitleCounterGroup.IdItem);
        this.portletId = this.form.formid;
        this.nameObj = "hrifTitleCounterGroup";

		this.classNameBase = hrifCLASSBASE.TITLECOUNTERGROUP;
		this.classNameContainer = hrifCLASSBASE.CONTAINER;

		// definisco classe direction
		let directionClass = (this.direction) ? " " + this.classNameBase + this.direction.class : " " + this.classNameBase + hrifDIRECTION.HORIZONTAL.class;

		this.docTitleCounterFrag = document.createDocumentFragment();
		documentFrag(this.docTitleCounterFrag, 'div', this.idItem, '', this.classNameBase + directionClass);


		// creo il div principale
        this.docContainerFrag = document.createDocumentFragment();
        documentFrag(this.docContainerFrag, 'div', '', '', this.classNameContainer);
        
        this.titleObj = null;
        if (this.title){
			this.titleObj = new HrifTitleObject(this.form,{"Title":this.title});
			this.docTitleCounterFrag.firstElementChild.appendChild(this.titleObj.getObject());
		}

		for (const item of this.items) {
			item.Action = (this.action) ? this.action : item.Action;
			item.ActionParam = (item.Name) ? item.Name : item.ActionParam; 
            let hrifTitleCounter = new HrifTitleCounter(this.form,item);
			// aggiungo hrifTitleCounter al div principale
			this.docContainerFrag.firstElementChild.appendChild(hrifTitleCounter.getObject());
		}
		this.docTitleCounterFrag.firstElementChild.appendChild(this.docContainerFrag.firstElementChild);

		this.wrkObj = this.docTitleCounterFrag.children[0];

		if(this.status)
			hrifAddClass(this.wrkObj, this.classNameBase+"--"+this.status);
	}

		/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};


   
    /** Ritorna la stringa contenente il codice html
    * @ignore
    * @returns {null} Codice Html.
    */
    getHtml = function () {
        return this.wrkObj.outerHTML;
    };

    /** Ritorna oggetto
    * @ignore
    * @returns {null} Oggetto.
    */
    getObject = function () {
        return this.wrkObj;
    };

    /** Nasconde HrifTitleCounter
    * @returns {null} Nasconde HrifTitleCounter
    */
    Hide = function (preserveSpace) {
        let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
        var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
        if (!this.isLoaded)
            hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
        else
            document.getElementById(this.idItem).classList.add(wrkClass);
    };

    /** Visualizza HrifTitleCounter
    * @returns {null} Visualizza HrifTitleCounter
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
}

/** Definizione oggetto HrifTitleCounter
* @class
* @memberof Titles
* @alias HrifTitleCounter 
* @param {object} form - this.
* @param {json|object} jsonHrifTitleCounterParam - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
* @param {string} jsonHrifTitleCounterParam.Title - Titolo
* @param {string} jsonHrifTitleCounterParam.Counter - valore in formato stringa 
* @param {string} [jsonHrifTitleCounterParam.UnitOfMeasure] - unità di misura
* @returns {object} Oggetto HrifTitleCounter.
*
* @example 
*
* // Definizione proprietà dell'oggetto
* const confObj =  {}
* confObj.Title = "Ferie godute mese";
* confObj.Counter="20,00"
* confObj.UnitOfMeasure="giorni";
*
* const htc = new HrifTitleCounter(this,confObj)
* this.hrif_cnt.Load(htc)
*/
class HrifTitleCounter {

    constructor(form, jsonHrifTitleCounterParam) {
	
        // controllo se il parametro è stringa o obj
        const jsonHrifTitleCounter = (typeof (jsonHrifTitleCounterParam) == 'string') ? JSON.parse(jsonHrifTitleCounterParam) : jsonHrifTitleCounterParam;
        
        // inizializzo variabili work
		this.title = jsonHrifTitleCounter.Title;
		this.icon = jsonHrifTitleCounter.Icon;
		this.iconFilled = (jsonHrifTitleCounter.IconFilled)?jsonHrifTitleCounter.IconFilled:false;
		this.counter = (isNaN(parseFloat(jsonHrifTitleCounter.Counter))) ? "undefined" : jsonHrifTitleCounter.Counter;
		this.unitOfMeasure = jsonHrifTitleCounter.UnitOfMeasure;
		this.action = jsonHrifTitleCounter.Action;
		this.actionParam = jsonHrifTitleCounter.ActionParam;
		this.status = (jsonHrifTitleCounter.Status)?jsonHrifTitleCounter.Status:"";
		this.showTitle = (jsonHrifTitleCounter.ShowTitle == false) ? jsonHrifTitleCounter.ShowTitle : true;
		this.evidence = (jsonHrifTitleCounter.Evidence) ? jsonHrifTitleCounter.Evidence : false;


        this.form = form;
        this.idItem = HrifGetItem(jsonHrifTitleCounter.IdItem);
        this.portletId = this.form.formid;
        this.nameObj = "HrifTitleCounter";
        

        // ----------------------------------------------------------------------------------
        // inizializzo variabili con id

        // ----------------------------------------------------------------------------------
        // inizializzo variabili classi
        this.classNameBase = hrifCLASSBASE.TITLECOUNTER;

        // ----------------------------------------------------------------------------------
        // creo il div principale
        this.docContainerFrag = document.createDocumentFragment();
        documentFrag(this.docContainerFrag, 'div', this.idItem, '', this.classNameBase);
 		
		// creo oggetto Title
		if(this.showTitle){
			this.wrkTitle = new HrifTitle(this.form,{"Title":this.title});
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkTitle.getObject());
		}

        this.iconObj = null;
        if (this.icon){
			var jsonIcon = {};
			jsonIcon.Icon = this.icon;
			this.iconObj = new HrifIcon(this.form,jsonIcon);
			if(this.iconFilled)
				this.iconObj.addClass(this.iconObj.classNameBase+"--"+hrifICONSTYLE.FILLED);
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.iconObj.getObject());
		}
		
		// creo oggetto label - counter
		this.wrkCounter = new HrifLabel(this.form,{"Label":this.counter});
		this.wrkCounter.getObject().setAttribute("role",hrifROLE.VALUE);
		this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkCounter.getObject());

		// creo oggetto label - unità di misura
		if(this.unitOfMeasure) {
			this.wrkUnitOfMeasure = new HrifLabel(this.form,{"Label":this.unitOfMeasure});
			this.wrkUnitOfMeasure.getObject().setAttribute("role",hrifROLE.LABEL);
			this.docContainerFrag.getElementById(this.idItem).appendChild(this.wrkUnitOfMeasure.getObject());
		}

		if (this.evidence) {
			this.wrkObjBadgeFrag = document.createDocumentFragment();
			documentFrag(this.wrkObjBadgeFrag, 'span', this.idItem + "_b", '', hrifCLASSBASE.BADGE);
			if (this.status)
				hrifAddClass(this.wrkObjBadgeFrag.children[0], hrifCLASSBASE.BADGE + "--" + this.status);
			this.docContainerFrag.getElementById(this.wrkTitle.idItem).appendChild(this.wrkObjBadgeFrag.children[0]);
		}

        this.wrkObj = this.docContainerFrag.children[0];

		

		if(this.status)
			hrifAddClass(this.wrkObj, this.classNameBase+"--"+this.status);


		if(this.action) {
			this.setAction(this.action,this.actionParam)
		}
    }
	
	
	/** Azione da eseguire al Click
	* @ignore
	* @param {string} action - Indica la funzione da eseguire.
	* @returns {null} Richiama l'azione indicata.
	*/
	setAction(action,param) {

		this.action = action;
		this.param = param;
		// Rimuovo l'eventuale vecchia azione
		if (this.actionOld != null) {
			hrifDocumentRemoveClick(this.wrkObj, this.wrkAction);
			hrifRemoveClass(this.wrkObj, "cursor_pointer");
		}

		// Memorizzo l'azione in una variabile perchè "handle" deve sempre rimanere lo stesso 
		// altrimenti non riuscirebbe ad eliminarlo
		this.wrkAction = execPortletAction.bind(null, this.portletId, this.action,this.param);
		// Valorizzo la nuova azione
		if ((this.action != null && this.action != "")) {
			if (this.wrkObj.addEventListener)
				this.wrkObj.addEventListener("click", this.wrkAction, false);
			else if (this.wrkObj.attachEvent) {
				this.wrkObj.attachEvent("onclick", this.wrkAction);
			}
			hrifAddClass(this.wrkObj, 'cursor_pointer');
		}

		this.actionOld = this.action;
	};

	
	/** Aggiunta classe
	* @ignore
	* @param {string} className - Nome della classe.
	* @returns {null} Aggiunge la classe.
	*/
	addClass = function (className) {
		hrifAddClass(this.wrkObj, className);
	};


   
    /** Ritorna la stringa contenente il codice html
    * @ignore
    * @returns {null} Codice Html.
    */
    getHtml = function () {
        return this.wrkObj.outerHTML;
    };

    /** Ritorna oggetto
    * @ignore
    * @returns {null} Oggetto.
    */
    getObject = function () {
        return this.wrkObj;
    };

    /** Nasconde HrifTitleCounter
    * @returns {null} Nasconde HrifTitleCounter
    */
    Hide = function (preserveSpace) {
        let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
        var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
        if (!this.isLoaded)
            hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
        else
            document.getElementById(this.idItem).classList.add(wrkClass);
    };

    /** Visualizza HrifTitleCounter
    * @returns {null} Visualizza HrifTitleCounter
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
}
/** Definizione oggetto HrifTitleCounter ( NON E' STAT VOLUTAMENTE AGGIUNTA NESSUNA CLASSE SPECIFICA A QUESTA ESTENSIONE )
* @class
* @memberof Titles
* @param {object} form - this.
* @param {json|object} jsonHrifScoreDetailParam - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
* @example 
*
* // Definizione proprietà dell'oggetto
* const confObj =  {}
* confObj.Counter="20,00"
* confObj.UnitOfMeasure="giorni";
*
* const hsd = new HrifScoreDetail(this,confObj)
* this.hrif_cnt.Load(hsd)
*/

class HrifScoreDetail extends HrifTitleCounter {

	constructor(form, jsonHrifScoreDetailParam) {
		// controllo se il parametro è stringa o obj
        const jsonHrifScoreDetail = (typeof (jsonHrifScoreDetailParam) == 'string') ? JSON.parse(jsonHrifScoreDetailParam) : jsonHrifScoreDetailParam;
		jsonHrifScoreDetail.ShowTitle = false;
		super(form,jsonHrifScoreDetail);
		this.nameObj = "HrifScoreDetail";
	}
}


class HrifTitleToolbarObj {
	constructor(form, jsonTitleToolbarParam) {
		// controllo se il parametro è stringa o obj
		let jsonTitleToolbar = (typeof (jsonTitleToolbarParam) == 'string') ? JSON.parse(jsonTitleToolbarParam) : jsonTitleToolbarParam;
		// inizializzo variabili work
		this.title = jsonTitleToolbar.Title;
		this.subTitle = jsonTitleToolbar.Subtitle;
		this.size = jsonTitleToolbar.Size;
		this.footerActionMob = jsonTitleToolbar.FooterActionMob;
		this.buttons = (jsonTitleToolbar.Buttons)?jsonTitleToolbar.Buttons:[]; // array degli elementi

		this.form = form;
		this.idItem = HrifGetItem(jsonTitleToolbar.IdItem);
		this.portletId = this.form.formid;

		// inizializzo variabili id
		this.idNav = this.idItem+"_nv";
		this.idUl = this.idItem+"ul";
		this.idLi = this.idItem+"li";
		this.idLiMore = this.idItem+"lm";
		this.idUlMore = this.idItem+"_toggle";

		// inizializzo variabili classi
		this.classNameBase = hrifCLASSBASE.TITLETOOLBAR;
		this.classItem = hrifCLASSBASE.ITEM;
		this.classFooterAction = this.classNameBase+"__sticky-bottom";
		this.classUlMore = "hidden";

		this.buttonMap = new Map();
		this.visibleTitleBarButtons =[];
		// ----------------------------------------------------------------------------------

		var _self = this;

// verifico se ho 0 elementi forzo footerActionMob a false
if(this.buttons.length===0)
	this.footerActionMob = false;

if(this.footerActionMob===true) {
	
// Seleziona il div di cui vuoi monitorare la proprietà height
const targetDiv = form.Ctrl_container

// Crea un nuovo oggetto MutationObserver con una funzione di callback
		
		const observer = new MutationObserver(mutationsList => {
			// Itera attraverso tutte le mutazioni osservate
			for (const mutation of mutationsList) {
				// Verifica se la mutazione riguarda la proprietà 'style'
				if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
					// disconnetto observer per non mandarlo in loop
					observer.disconnect();
					var tabStripHeight = document.getElementById(_self.form.formid + '_tabcontainer') ? document.getElementById(_self.form.formid + '_tabcontainer').offsetHeight : 0;
					var titleHeight = _self.form.isPortletTitled() ? document.getElementById(_self.form.getTitlePortletId() + '_title_container').offsetHeight : 0;
					var bottomHeight = (window.innerWidth <= 768) ? document.getElementById(_self.idNav).offsetHeight+12 : 0;
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


		// creo il div principale
		this.docContainerFrag = document.createDocumentFragment();
		documentFrag(this.docContainerFrag, 'div', this.idItem, '', this.classNameBase);

		// creo TitleSection
		if(this.title) {
			let jsonTitleSection = {};
			jsonTitleSection.Title = this.title;
			if(this.subTitle)
				jsonTitleSection.Subtitle = this.subTitle
			if(this.size)
				jsonTitleSection.Size = this.size
	
			let titleSection = new HrifTitleSection(this.form, jsonTitleSection);
			this.docContainerFrag.getElementById(this.idItem).appendChild(titleSection.getObject());
		}
		

		// creo nav
		let classNav = (this.footerActionMob===true)?this.classFooterAction:"";
		this.docNavFrag = document.createDocumentFragment();
		documentFrag(this.docNavFrag, 'nav', this.idNav, '',classNav);

		// creo ul
		this.docUlFrag = document.createDocumentFragment();
		documentFrag(this.docUlFrag, 'ul', this.idUl, '','');


		// ciclo i primi 3 bottoni
		
		let buttonNumber = (this.buttons.length>3)?3:this.buttons.length;

		for (let idxButton = 0; idxButton < buttonNumber; idxButton++) {
			// creo li
			this.docLiFrag = document.createDocumentFragment();

			let classMoreDesktop = (idxButton===2)?"  mobile-hidden":"";
			let classButtonDesktop = (this.footerActionMob)?"":" mobile-hidden";
			documentFrag(this.docLiFrag, 'li', this.idLi+"_"+idxButton, '', this.classItem+classMoreDesktop+classButtonDesktop);
			
			let wrkButton = this.createButtonObj(this.buttons[idxButton]);
			let buttonConf = this.buttons[idxButton];
			buttonConf.IdItem = buttonConf.IdItem+"hidden";
			if(!this.footerActionMob) {
				this.visibleTitleBarButtons.push(this.createButtonObj(buttonConf));
			} else if(idxButton===2) {
				this.visibleTitleBarButtons.push(this.createButtonObj(buttonConf));
			}
			
			// aggiungo bottone a li 
			this.docLiFrag.getElementById(this.idLi+"_"+idxButton).appendChild(wrkButton.getObject());

			// aggiungo li a ul 
			this.docUlFrag.getElementById(this.idUl).appendChild(this.docLiFrag.children[0]);
		}

		

		// se ho piu di 3 bottoni devo gestirli
		// il div more lo creo anche se ho 3 elementi
		if (this.buttons.length >= 1) {

			let destkopClass = (this.buttons.length<=3)?" desktop-hidden":"";
			let mobileClass = (this.buttons.length<=2 && this.footerActionMob===true)?" mobile-hidden":"";

			// if(this.buttons.length >= 3) {

				// creo li
			this.docLiFragMore = document.createDocumentFragment();
			documentFrag(this.docLiFragMore, 'li', this.idLiMore, '', this.classItem+destkopClass+mobileClass,"dropdown");


				let wrkIcon = new HrifIcon(this.form, { "Icon": hrifICON.MORE });

				wrkIcon.getObject().addEventListener('click',()=>{
					document.getElementById(this.idUlMore).classList.toggle('show')
					document.getElementById(this.idUlMore).classList.toggle('hidden')
				})
				
				hrifAddClass(wrkIcon.getObject(), 'cursor_pointer');
				
	
				this.docLiFragMore.getElementById(this.idLiMore).appendChild(wrkIcon.getObject());
			// }

			
			
			// creo ul more
			this.docUlMoreFrag = document.createDocumentFragment();
			documentFrag(this.docUlMoreFrag, 'ul', this.idUlMore, '',this.classUlMore);

			// il primo elemento nel more è ultimo elemento di quelli visibili
			// creo li
			// ciclo array degli elementi visibili
			for (let idxButtonVisible = 0;idxButtonVisible<this.visibleTitleBarButtons.length;idxButtonVisible++) {
				this.docLiFrag = document.createDocumentFragment();
				documentFrag(this.docLiFrag, 'li', this.idLi+idxButtonVisible+"_morehide", '', this.classItem+" desktop-hidden");
				let wrkButton = this.visibleTitleBarButtons[idxButtonVisible];
				// aggiungo bottone a li 
				this.docLiFrag.getElementById(this.idLi+idxButtonVisible+"_morehide").appendChild(wrkButton.getObject());
	
				// aggiungo li a ulmore 
				this.docUlMoreFrag.getElementById(this.idUlMore).appendChild(this.docLiFrag.children[0]);
			}
			
			


			for (let idxButton = 3; idxButton < this.buttons.length; idxButton++) {

				// creo li
				this.docLiFrag = document.createDocumentFragment();
				documentFrag(this.docLiFrag, 'li', this.idLi+"_"+idxButton, '', this.classItem);
				let wrkButton = this.createButtonObj(this.buttons[idxButton]);
				// aggiungo bottone a li 
				this.docLiFrag.getElementById(this.idLi+"_"+idxButton).appendChild(wrkButton.getObject());
	
				// aggiungo li a ulmore 
				this.docUlMoreFrag.getElementById(this.idUlMore).appendChild(this.docLiFrag.children[0]);
			}

			// aggiungo ul more a li 
			if(this.docLiFragMore) {
				this.docLiFragMore.getElementById(this.idLiMore).appendChild(this.docUlMoreFrag.children[0]);

				// aggiungo li a ul 
				this.docUlFrag.getElementById(this.idUl).appendChild(this.docLiFragMore.children[0]);
			}
				
		}


		

		// aggiungo ul a nav 
		this.docNavFrag.getElementById(this.idNav).appendChild(this.docUlFrag.children[0]);
		
		// aggiungo nav a div principale 
		this.docContainerFrag.getElementById(this.idItem).appendChild(this.docNavFrag.children[0]);

		this.wrkObj = this.docContainerFrag.children[0];
	}

	// prendo oggetto button e inserisco solo le proprietà definite per l'oggetto
	/**
	 * @ignore 
	 * @param {object} buttonParam  parametri del button
	 * @returns object oggetto di parametri button
	 */
	createButtonObj(buttonParam) {
		let wrkButtonParam = {
			"IdItem": buttonParam.IdItem,
			"Label":  buttonParam.Label,
			"Action":  buttonParam.Action,
			"ActionParam":  buttonParam.ActionParam,
			"Tooltip":  buttonParam.Tooltip,
			"Type":buttonParam.Type,
		  }

		let button = new HrifButton(this.form, wrkButtonParam);
		this.buttonMap.set(buttonParam.IdItem,button)
		return button;
	}

	/**
	 * disabilito il button
	 * @ignore
	 * @param {string} idButton id del button da disabilitare
	 */
	disableButton(idButton) {
		let button = this.buttonMap.get(idButton);
		if(button)
			button.Disabled()

		// cerco hidden
		button = this.buttonMap.get(idButton+"hidden");
		if(button)
			button.Disabled()
	}

	/**
	 * abilito il button
	 * @ignore
	 * @param {string} idButton id del button da abilitare
	 */
	enableButton(idButton) {
		let button = this.buttonMap.get(idButton);
		if(button)
			button.Enabled()

		// cerco hidden
		button = this.buttonMap.get(idButton+"hidden");
		if(button)
			button.Enabled()
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
	/** Nasconde oggetto
	* @returns {null} Nasconde oggetto.
	*/
	Hide(preserveSpace) {
		let wrkPreserveSpace = (typeof (preserveSpace) != 'undefined' && preserveSpace) ? true : false;
		var wrkClass = (wrkPreserveSpace) ? hiddenVisibility : hiddenDisplay;
		if (!this.isLoaded)
			hrifAddClass(this.wrkObj.childNodes[0], wrkClass);
		else
			document.getElementById(this.idItem).classList.add(wrkClass);
	};
	/** Visualizza oggetto
	* @returns {null} Visualizza oggetto.
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
		if(this.footerActionMob) {
			// Seleziona il div di cui vuoi monitorare la proprietà height
			const targetDiv = document.getElementById(parentObjIdParm);
			// forzo lo z-index
			targetDiv.style.zIndex = "99999";
		}
		this.isLoaded = true;
	};
}

/** Definizione oggetto HrifTitleToolbar
* @class
* @memberof Titles
* @alias HrifTitleToolbar 
* @param {object} form - this.
* @param {json|object} jsonTitleToolbarParam - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
* @param {string} jsonTitleToolbarParam.Title - Titolo
* @param {string} [jsonTitleToolbarParam.Subtitle] - Sottotitolo
* @param {boolean} [jsonTitleToolbarParam.FooterActionMob] - Imposta sezione di button per mobile
* @param {Array<object>} [jsonTitleToolbarParam.Buttons] - array di oggetti con le proprietà del button
* @param {string|number} jsonTitleToolbarParam.Buttons.IdItem - Id button
* @param {string} jsonTitleToolbarParam.Buttons.Label - label
* @param {string} [jsonTitleToolbarParam.Buttons.Tooltip] - tooltip
* @param {string} jsonTitleToolbarParam.Buttons.Action - function da chiamare al click
* @param {string} [jsonTitleToolbarParam.Buttons.ActionParam] - parametri per la function
* @param {string} [jsonTitleToolbarParam.Buttons.Type] - Tipologia di button

* 
*
* @example 
*
* // Definizione proprietà dell'oggetto
* let titleToolbarConf= {};

* titleToolbarConf.Title = "Titolo di prova"
* titleToolbarConf.Subtitle = "sottotitolo"

* titleToolbarConf.Buttons = [{
*     "IdItem": "Btn1",
*     "Label": "Button 1",
*     "Action": "execBottone1",
*   	"Tooltip":"Tooltip",
*   "ActionParam":"Btn1"
*   },
*   {
*     "IdItem": "Btn2",
*     "Label": "Button 2",
*     "Action": "execBottone1"
*   },
*   {
*     "IdItem": "Btn3",
*     "Label": "Button 3",
*     "Action": "execBottone1",
*	  "Type": hrifBUTTONTYPE.PRIMARY
*   }] 
* 
* let titleToolbar = new HrifTitleToolbar(this,titleToolbarConf)
* this.hrif_cnt.Load(titleToolbar)
*/
class HrifTitleToolbar extends HrifTitleToolbarObj {
	constructor(form, jsonTitleToolbarParam) {
		let jsonTitleToolbar = (typeof (jsonTitleToolbarParam) == 'string') ? JSON.parse(jsonTitleToolbarParam) : jsonTitleToolbarParam;

		jsonTitleToolbar.Title = (jsonTitleToolbar.Title)?jsonTitleToolbar.Title:"undefined";
		// controllo se il parametro è stringa o obj
		
		super(form, jsonTitleToolbar);
		this.nameObj = "HrifTitleToolbar";
	}
}

/** Definizione oggetto HrifTitleImgLogo
 * @alias HrifTitleImgLogo 
 * @param {object} form - this.
 * @param {json|object} jsonLayerParam - Oggetto Json contenente tutti i parametri per la gestione dell'oggetto.
 * @param {string} jsonLayerParam.Title - Titolo 
 * @param {string} [jsonLayerParam.SubTitle] - SottoTitolo 
 * @param {hrifIMGLOGOTYPE} jsonLayerParam.Type - Tipologia logo
 * @param {string|hrifIMGTITLE|hrifICON} jsonLayerParam.ItemValue - Value logo
 * 
 * 
 * 
 * 
 */
class HrifTitleImgLogo {

	constructor(form, jsonTitleImgLogoParm) {

		const jsonTitleImgLogo = (typeof (jsonTitleImgLogoParm) == 'string') ? JSON.parse(jsonTitleImgLogoParm) : jsonTitleImgLogoParm;

		// Definizione delle proprietà dell'oggetto
		this.title = jsonTitleImgLogo.Title;
		this.subTitle = jsonTitleImgLogo.SubTitle;
		this.overTitle = jsonTitleImgLogo.OverTitle;
		this.type = jsonTitleImgLogo.Type;
		this.itemValue = jsonTitleImgLogo.ItemValue;

		// Definizione della variabili di oggetto
		this.form = form;
		this.portletId = this.form.formid;
		this.nameObj = "HrifTitleImgLogo";

		// Definizione degli Item
		this.idItem = HrifGetItem(jsonTitleImgLogo.IdItem);

		// Definizione delle classi
		this.classNameBase = hrifCLASSBASE.TITLEIMGLOGO;

		// Valorizzio la struttura HTML
		this.wrkDocFrag = this.createStructure();
	}

	// Crea la struttura HTML
	createStructure() {

		// Creo il documento in memoria
		this.docMainFrag = document.createDocumentFragment();
		documentFrag(this.docMainFrag, 'div', this.idItem, '', this.classNameBase);


		this.wrkTitle = new HrifTitleSection(this.form,{"Title":this.title,"Subtitle":this.subTitle,"Size":hrifSIZE.XLARGE});
		this.wkrImgLogo = new HrifImgLogo(this.form,{"Type":this.type,"ItemValue":this.itemValue});

		this.docMainFrag.getElementById(this.idItem).appendChild(this.wrkTitle.getObject());
		this.docMainFrag.getElementById(this.idItem).appendChild(this.wkrImgLogo.getObject());

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

//# sourceURL=../../HRPORTAL/binframework/js/hrif2_title.js
