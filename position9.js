// Gestione della toolbar presente in Title_Form 
// ----------------------------------------------------------------------------------------------------------------

// Aggiorna in automatico le azioni presenti nella toolbar/titolo in base ai parametri passati
function hrifTitleAppendButton(xportletName,xtitle,xtooltip,xaction,ximage,xid){

  // Se non viene passato Id assegno un valore randomico (tra 0 e 10000)
  if (Empty(xid))
    xid=this.getRndInteger(0,10000);
  
  // Ridetermino il this del portlet che dovrà contenere le azioni
  if (ZtVWeb.getPortlet(xportletName)){
  	portletTitle = ZtVWeb.getPortlet(xportletName);
  }
  
  // Per l'immagine istanzio un oggetto JSON da utilizzare poi nel 'AppendeButton'
  var fontFamilyWrk = '{"fontFamily":"icons8_win10", "value":\"'+ximage+'\" }';
  var fontFamilyJSON = '';
  if (!Empty(ximage)){
	var fontFamilyWrk = '{"fontFamily":"icons8_win10", "value":\"'+ximage+'\" }';
	var fontFamilyJSON = JSON.parse(fontFamilyWrk);
  }
  
  // Utilizzo il metodo 'nativo' di PortalStudio
  portletTitle.getTitlePortlet().AppendButton({
    id:xid,
    title: xtitle,
    tooltip: xtooltip,
    action: 'javascript:' + xaction ,
    image: fontFamilyJSON
  });
  
}

//Elimina dalla toolbar tutti i bottoni presenti
function hrifTitleRemoveAllButtons(xportletName){
  if (ZtVWeb.getPortlet(xportletName)){
  	portletTitle = ZtVWeb.getPortlet(xportletName);
  }
  portletTitle.getTitlePortlet().RemoveButtons();
}

// Determino un valore numerico randomico
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// SPToolBar	
// Aggiorna in automatico le azioni presenti nella toolbar/titolo in base ai parametri passati
function hrifSPToolbarAppend(form, xtoolbarname,xtitle,xtooltip,xaction,ximage,xid){

  // Se non viene passato Id assegno un valore randomico (tra 0 e 10000)
  if (Empty(xid))
    xid=this.getRndInteger(0,10000);

  var toolbarWrk = new Object();
  toolbarWrk = eval(xtoolbarname);
  LibJavascript.CssClassNameUtils.addClass(toolbarWrk.Ctrl, "sptoolbar--styled");

  var icon = null;
  var iconImg = '';
  if (ximage){
	var jsonIconParam = {};
	jsonIconParam.Icon = ximage;
  	icon = new HrifIcon(form, jsonIconParam);
	iconImg = icon.getHtml();
  }
  
  xtoolbarname.Append({
    id:xid,
    title: FormatMsg(xtitle),
    tooltip:FormatMsg(xtooltip),
    action: 'javascript:' + xaction ,
   	image: iconImg
  })
  
}

// ----------------------------------------------------------------------------------------------------------------
// Gestione dei tiles
// ----------------------------------------------------------------------------------------------------------------
function hrifCreateTile(xTile,val){
	
  // Su tutti i tiles forzo il tooltip uguale alla descrizione del tile stesso (vedere se prevedere anche un parametro)	
  // Se la descrizione risulta troppo lunga, quindi troncata, viene visualizzata correttamente nel tooltip
  var tooltip=' title=\"'+xTile+'\"';
  
  if (!Empty(xTile) && (val!=undefined && !Empty(val.toString()))){
  	// VALORE + DESCRIZIONE
    return '<div></div><div><span>'+val+'</span><span'+tooltip+'>'+xTile+'</span></div>';
  } else if (!Empty(xTile)){
    // SOLO DESCRIZIONE
    return '<div></div><div><span'+tooltip+'>'+xTile+'</span></div>';
  }
  
}

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
// Utilizzo degli ICON-FONT/ZIC di progetto
// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
var HRIFIMG = {
	
  LINK: [ "ecf5" , "" ],
	
  //ZIC
  USER: [ "ee99" , "zic-user"],
  ADD_USER: [ "f263" , "zic-user-add" ],
  MENU: [ "ed44" , "zic-menu-hamburger" ],
  MENU2: [ "ed45" , "zic-menu-dots" ],
  MENU_MORE: [ "ed73" , "zic-more" ],
  ANGLE_DOWN: [ "f143" , "zic-angle-down" ],
  ANGLE_LEFT: [ "f144" , "zic-angle-left" ],
  ANGLE_RIGHT: [ "f145" , "zic-angle-right" ],
  ANGLE_UP: [ "f146" , "zic-angle-up" ],

  ERROR: [ "ee0d" , "" ],
  INFO: [ "ef46" , "zic-info" ],
  HELP: [ "eeff" , "" ],
  CANCEL_2: [ "f220" , "" ],
  HIGH_IMPORTANCE: [ "ef06" , "zic-priority-high" ],
  APPOINTMENT_REMIDERS: [ "f152" , "" ],
  CALENDAR: [ "f20f" , "zic-calendar" ],
  DOCUMENT: [ "f07f" , "zic-document" ],
  EMPTY_FILTER: [ "f0d4" , "zic-filter" ],
  PLUS: [ "ebeb" , "zic-plus" ],
  ADD: [ "ebed" , "zic-add" ],
  MINUS: [ "ed62" , "zic-minus" ],
  CLOSE: [ "f048" , "zic-close" ],
  MESSAGE: [ "ed4b", "zic-email" ],
  CLOCK: [ "efb8" , "" ],
  TIME: [ "eb10" , "zic-timer" ],
  COPY: [ "eff9" , "zic-copy" ],
  REFRESH: [ "ec4d" , "zic-refresh" ],
  SETTINGS: [ "ea0f" , "zic-settings" ],
  COPYRIGHT: [ "effb" , "zic-copyright" ],
  FOLDER: [ "ee6c" , "zic-folder" ],
  CHECKMARK: [ "ef8b" , "zic-checkmark" ],
  CHECKED: [ "f253" , "zic-checkmark-round" ],
  LOCK: [ "ed03" , "zic-lock" ],
  UNLOCK: [ "e91d" , "zic-unlock" ],
  ABOUT: [ "f105" , "" ],
  UPLOAD: [ "e927" , "zic-upload" ],
  DOWNLOAD: [ "f09e" , "zic-download" ],
//  MINUS: [ "ed60" , "" ],
  //PLUS: [ "ebeb" , "" ],
  ATTACH: [ "f173" , "zic-attachment" ],
  WORK: [ "e9bc" , "" ],
  
  DOC: [ "f07b" , "zic-document" ],
  XLS: [ "e9db" , "" ],
  PPT: [ "ec04" , "" ],
  CSV: [ "f01c" , "" ],
  PDF: [ "ebb4" , "zic-open-pdf" ],
  PNG: [ "ebf0" , "" ],
  TXT: [ "e90b" , "" ],
  EXE: [ "ee15" , "" ],
  GIF: [ "eea9" , "" ],
  JPG: [ "ef73" , "" ],
  ARCHIVE: [ "f15d" , "zic-archive" ],
  FILE: [ "ee39" , "" ],
  DELETE_FILE: [ "f045" , "zic-file-delete" ],
  FAVOURITE_FILE: [ "ee2d" , "" ],
  EDIT_FILE: [ "f0bb" , "" ],
  ADD_FILE: [ "f10e" , "" ],
  FILLED_STAR: [ "ee40" , "zic-filled-star" ],
  STAR: [ "ea9d" , "zic-star" ],
  THUMBS_UP: [ "eb0a" , "" ],
  THUMBS_DOWN: [ "eb09" , "" ],
  HOURGLASS: [ "ef20" , "zic-hourglass" ],
  PRINTER_ERROR: [ "f3fb" , "" ],
  CLEAR_FILTERS: [ "efaf" , "zic-clear-filters" ],
  
  RELOAD: [ "f77d" , "" ],
  COMBO_CHART: [ "efd6" , "zic-chart-combo" ],
  FULL_IMAGE: [ "" , "" ],
  SPEED: [ "" , "" ],
  
  LAW: [ "ecd1" , "zic-law" ],
  DISCLAIMER: [ "f065" , "" ],
  INSTALLING_UPDATES: [ "f446" , "" ],

  OPEN_IN_WINDOW: [ "f2ca" , "" ],
  RETURN: [ "ec69" , "zic-return" ],
  SEARCH: [ "e9fb" , "zic-search" ],
  EDIT: [ "f0ba" , "zic-edit" ],  
  SAVE: [ "ecb3" , "zic-save" ],
  PRINT: [ "ec0b" , "zic-print" ],
  DELETE: [ "f041" , "zic-delete" ],
  WIPES: [ "e9b2" , "zic-wipes" ],
  LIGHTNING_BOLT: [ "ecef" , "" ],
  VIEW_FILE: [ "e950" , "" ],
  TIME_SPAN: [ "f36b" , "zic-time-span" ],
  USER_GROUP: [ "f294" , "zic-user-group" ],
  
  WAIT: [ "ef20" , "" ],
  AGREEMENT: [ "f122" , "" ],
  
  SHEET_OF_PAPER: [ "f3ff" , "" ],
  SHEETS: [ "f566" , "" ],
  LEFT_ROUND: [ "ecdc" , "" ],
  GENERIC_SORTING: [ "ee9f" , "" ],
  INSPECTION: [ "ef52" , "" ],
    
  ARROW_UP: [ "e920" , "zic-arrow-up" ],
  ARROW_DOWN: [ "f097" , "zic-arrow-down" ],
  ARROW_LEFT: [ "ecdb" , "zic-arrow-left" ],
  ARROW_RIGHT: [ "ec72" , "zic-arrow-right" ],
  DOWN_RIGHT: [ "f7f8" , "" ],
  
  CURSOR: [ "f024" , "zic-cursor" ],
  GROUP_OBJECTS: [ "eecf" , "zic-gruop-objects" ],
  
  ALIGN_BOTTON: [ "" , "zic-alignment-bottom" ],
  ALIGN_LEFT: [ "" , "zic-alignment-left" ],
  ALIGN_RIGHT: [ "" , "zic-alignment-right" ],
  ALIGN_TOP: [ "" , "zic-alignment-top" ],
  
  DISTRIBUTE_VERTICAL: [ "" , "zic-distribute-vertical" ],
  DISTRIBUTE_HORIZONTAL: [ "" , "zic-distribute-horizontal" ],
  CART: [ "" , "zic-cart" ],
  DESK: [ "ebb2" , "zic-desk" ],
  MARKER: [ "ed2e" , "zic-marker" ],
  CHECKMARK: [ "ef8b" , "zic-checkmark" ],
  MORE: [ "ed73" , "zic-more" ],
  SUBTRACT: [ "ed62" , "zic-subtract" ],
  WARNING: [ "ef06" , "zic-warning" ],
  MAINTENANCE: [ "ed1b" , "zic-maintenance" ],
  CLEANING: [ "ef24" , "zic-cleaning" ],
  APPROVE: [ "eb0a" , "zic-approve" ],
  FACE_SAD: [ "" , "zic-sad" ],
  FACE_NEUTRAL: [ "" , "zic-neutral" ],
  FACE_HAPPY: [ "" , "zic-happy" ],
  TOAPP: [ "" , "zic-hourglass-sand-top" ],
  
  // Stati
  STATUS_GREEN: [ "green" , "green" ],
  STATUS_RED: [ "red" , "red" ],
  STATUS_BROWN: [ "brown" , "brown" ],
  STATUS_YELLOW: [ "yellow" , "yellow" ],
  STATUS_BLACK: [ "black" , "black" ],
  STATUS_BLUE: [ "blue" , "blue" ],
  STATUS_GREY: [ "ardesia" , "ardesia" ]
  
}


// ----------------------------------------------------------------------------------------------------------------
// Gestione delle Icon Font di Progetto
function hrifGetImg(Img,xTooltip,pClass,pSize,pColor){

  switch (Img){
	  
    // Stati
    case HRIFIMG.STATUS_GREEN: 
    case HRIFIMG.STATUS_RED: 
    case HRIFIMG.STATUS_BROWN: 
    case HRIFIMG.STATUS_YELLOW: 
    case HRIFIMG.STATUS_BLACK: 
	case HRIFIMG.STATUS_BLUE: 
    case HRIFIMG.STATUS_GREY: 
      return this.getImgSta(Img);
	  
	// In tutti gli altri casi...
    default:
      return this.getImg(Img,xTooltip,pClass,pSize,pColor);
	  
  }
 
}

// ----------------------------------------------------------------------------------------------------------------
// Gestione delle Icon Font di Progetto per le GRID
function hrifGetImgGrid(Img,xTooltip){

  var tooltip='';
  if (!Empty(xTooltip))
	tooltip=' title=\"'+xTooltip+'\"';

  switch (Img){
	
    // L'icona Cancella deve essere rossa	  
	case HRIFIMG.DELETE:
	  return '<span class="icon_font fakeDelete"'+tooltip+'>'+'&#x'+Img[0]+'</span>';
	  
	// Gestisco l'immagine per gli Stati  
	case HRIFIMG.STATUS_GREEN: 
    case HRIFIMG.STATUS_RED: 
    case HRIFIMG.STATUS_BROWN: 
    case HRIFIMG.STATUS_YELLOW: 
    case HRIFIMG.STATUS_BLACK: 
	case HRIFIMG.STATUS_BLUE: 
    case HRIFIMG.STATUS_GREY: 
	  return '<div class="statusCell"'+tooltip+'><div class=\"'+Img[0]+'\"></div></div>';
      //return this.getImgSta(Img);
	
	// In tutti gli altri casi...
    default:
      return '<span class="icon_font_16"'+tooltip+'>'+'&#x'+Img[0]+'</span>';
	  
   }
 
}


function getZicClass(Img){
	var wrkImg = (typeof(Img)=="string") ? eval(Img) : Img;
	return wrkImg[1];
}
// ----------------------------------------------------------------------------------------------------------------
// Gestione delle Icon Font di Progetto per le GRID
function hrifGetImgGridNew(Img,xTooltip,color){

  var tooltip='';
  if (!Empty(xTooltip))
	tooltip=' title=\"'+xTooltip+'\"';

  switch (Img){
	
    // L'icona Cancella deve essere rossa	  
	case HRIFIMG.DELETE:
	  return '<span class="icon_font fakeDelete"'+tooltip+'>'+'&#x'+Img[0]+'</span>';
	  
	// Gestisco l'immagine per gli Stati  
	case HRIFIMG.STATUS_GREEN: 
    case HRIFIMG.STATUS_RED: 
    case HRIFIMG.STATUS_BROWN: 
    case HRIFIMG.STATUS_YELLOW: 
    case HRIFIMG.STATUS_BLACK: 
	case HRIFIMG.STATUS_BLUE: 
    case HRIFIMG.STATUS_GREY: 
	  return '<div class="statusCell"'+tooltip+'><div class=\"'+Img[0]+'\"></div></div>';
      //return this.getImgSta(Img);
	
	// In tutti gli altri casi...
    default:
	  return getImg(Img, tooltip,'', 'xsmall', color);
      //return '<span class="zic '+ Img[1] + ' zic-xsmall ' + color + '" ' +tooltip+'></span>';
	  
   }
 
}

// ----------------------------------------------------------------------------------------------------------------
// Gestione delle Icon Font di Progetto Generica
function getImg(Img,xTooltip,pClass,pSize,pColor){

  var tooltip='';
  var html = '';
  if (!Empty(xTooltip))
	tooltip=' title=\"'+xTooltip+'\"';

  html += '<span class="zic ' + Img[1] ;
  html += (!Empty(pSize) ? ' zic--' + pSize.toLowerCase() : '');
  html += (!Empty(pColor) ? ' colored ' + pColor.toLowerCase() : '');
  html += '" '+tooltip+'>';
  html += '</span>';

  //return '<span class="' + (!Empty(pClass) ? pClass : 'icon_font') + '" '+tooltip+'>'+'&#x'+Img+'</span>';
  return html;
}
function getImgSta(Img,xTooltip){
  var tooltip='';
  if (!Empty(xTooltip))
	tooltip=' title=\"'+xTooltip+'\"';

  return '<span class="icon_font"'+tooltip+'>'+'&#x'+Img+'</span>';
  //return '<div class=\"'+Img+'\"></div>';
}

// ----------------------------------------------------------------------------------------------------------------
// Gestione delle Icon Font di Progetto per le TREEVIEW
function hrifGetImgTreeView(Img){

  switch (Img){
	  
    // Stati
    case HRIFIMG.STATUS_GREEN: 
    case HRIFIMG.STATUS_RED: 
    case HRIFIMG.STATUS_BROWN: 
    case HRIFIMG.STATUS_YELLOW: 
    case HRIFIMG.STATUS_BLACK: 
	case HRIFIMG.STATUS_BLUE: 
    case HRIFIMG.STATUS_GREY: 
      return '<div class=\"'+Img+'\"></div>';
	  
	// In tutti gli altri casi...
    default:
      var valoreDecimale = parseInt(Img, 16);
      return '[{"Char":'+valoreDecimale+',"FontName":"icons8_win10","Size":"20"}]';
	  
   }
 
}

// ----------------------------------------------------------------------------------------------------------------
// Reperisce il codice dell'icon font
function hrifGetImgCode(Img){
  return '&#x'+Img[0];
}


// ----------------------------------------------------------------------------------------------------------------
// 
function hrifGetInitials(name,surname){

  // Elimino eventuali caratteti speciali
	this.xname = (name) ? name.replace(/[^a-zA-Z0-9]/g, '') : '';
  this.surname = (surname) ? surname.replace(/[^a-zA-Z0-9]/g, '') : '';
  
	this.initials = null;
  
	if (this.xname && this.surname){
		this.initials = this.xname.substring(0,1).toUpperCase() + this.surname.substring(0,1).toUpperCase();
	} else if (this.xname){
    	var nameSplit = this.xname.split(' ');
    	if (nameSplit.length>1)
    		this.initials = nameSplit[0].substring(0,1).toUpperCase() + nameSplit[1].substring(0,1).toUpperCase();
    	else 
			this.initials = this.xname.substring(0,2).toUpperCase();
	} else if (this.surname){
    	var surnameSplit = this.surname.split(' ');
    	if (surnameSplit.length>1)
    		this.initials = surnameSplit[0].substring(0,1).toUpperCase() + surnameSplit[1].substring(0,1).toUpperCase();
    	else 
			this.initials = this.surname.substring(0,2).toUpperCase();
	}

  	return this.initials;

}

// ----------------------------------------------------------------------------------------------------------------
// 
function hrifGetComponentLangs(InfinityLang) {
	
	if (!InfinityLang)
		InfinityLang = ZtVWeb.Language;
		
	InfinityLang = InfinityLang.toUpperCase();	
	let nationMap = new Map([
		["ITA","IT"],
		["ENG","EN"],
		["SPA","ES"],
		["DEU","DE"],
		["POL","PL"],
		["FRA","FR"],
		["ROM","RO"],
		["POR","PT"],
		["ZHO","ZH"],
		["JPN","JA"],
		["SRP","SR"],
		["EUS","EU"],
		["SLK","SK"]
	]);

	let componentLang = nationMap.get(InfinityLang);
	componentLang = (componentLang)?componentLang:InfinityLang;
	return componentLang;
}


// ----------------------------------------------------------------------------------------------------------------
//
function hrifGetMobiscrollLangs(InfinityLang) {

	if (!InfinityLang)
        InfinityLang = ZtVWeb.Language;
        
	InfinityLang = InfinityLang.toUpperCase();    
    let nationMap = new Map([
        ["ITA","It"],
        ["ENG","En"],
        ["SPA","Es"],
        ["DEU","De"],
        ["POL","Pl"],
        ["FRA","Fr"],
        ["ROM","Ro"],
        ["POR","PtPT"],
        ["ZHO","Zh"],
        ["JPN","Ja"],
        ["SRP","Sr"],
        ["EUS","Es"],
        ["SLK","Sk"]
    ]);
	let componentLang = nationMap.get(InfinityLang);
    componentLang = (componentLang)?componentLang:InfinityLang;
    return componentLang;
    
}


// ----------------------------------------------------------------------------------------------------------------
// 
function hrifGetAmChartLangs(InfinityLang) {

  if (!InfinityLang)
    InfinityLang = ZtVWeb.Language;

  InfinityLang = InfinityLang.toUpperCase();
  let nationAmChartMap = new Map([
    ["ITA", "it_IT"],
    ["ENG", "en"],
    ["SPA", "es_ES"],
    ["DEU", "de_DE"],
    ["POL", "pl_PL"],
    ["FRA", "fr_FR"],
    ["ROM", "ro_RO"],
    ["POR", "pt_PT"],
    ["ZHO", "zh_Hans"],
    ["JPN", "ja_JA"],
    ["SRP", "sr_RS"],
    ["EUS", "es_ES"],
    ["SLK", "sk_SK"]
  ]);

  let componentAmChartLang = nationAmChartMap.get(InfinityLang);
  componentAmChartLang = (componentAmChartLang) ? componentAmChartLang : InfinityLang;
  return componentAmChartLang;
}

// ----------------------------------------------------------------------------------------------------------------
// Controllo intervalli di tempo
// ----------------------------------------------------------------------------------------------------------------

/**
 * @ignore
 * @param {string} from - Da ora ("HH:MM")
 * @param {string} to  - A ora ("HH:MM")
 * @returns {object} jsonResult -> jsonResult.result, jsonResult.error
 */
function hrifStringCheckFromToTime(from,to){
  var jsonResult = {};
  var timeSep = ":";
  // Ho orari o le date descrivevano lo stesso giorno
  var hourFrom = (isNaN(parseInt(from.split(timeSep)[0]))) ? -1 : parseInt(from.split(timeSep)[0]);
  var minuteFrom = (isNaN(parseInt(from.split(timeSep)[1]))) ? -1 : parseInt(from.split(timeSep)[1]);
  var hourTo = (isNaN(parseInt(to.split(timeSep)[0]))) ? -1 : parseInt(to.split(timeSep)[0]);   // parseInt(to.split(timeSep)[1]) || -1;
  var minuteTo = (isNaN(parseInt(to.split(timeSep)[1]))) ? -1 : parseInt(to.split(timeSep)[1]);

  // Controllo che se sono le ore 24 i minuti debbano essere 0.
  if((hourFrom == 24 && minuteFrom > 0) || (hourTo == 24 && minuteTo > 0)){
    jsonResult.result = false;
    jsonResult.error = FormatMsg("Le ore 24 non ammettono un valore dei minuti diverso da 0.");
    return jsonResult;
  }

  // Controllo che le ore e i minuti abbiano il formato corretto (0->24, 0->59)
  if(hourFrom < 0 || hourFrom > 24 || minuteFrom < 0 || minuteFrom > 59 || hourTo < 0 || hourTo > 24 || minuteTo < 0 || minuteTo > 59){
    jsonResult.result = false;
    jsonResult.error = FormatMsg("Il formato delle ore o minuti non è corretto.");
    return jsonResult;
  }
  // Controllo che l'orario DA sia minore dell'orario A
  if(((hourFrom == hourTo) && (minuteFrom > minuteTo)) || (hourFrom > hourTo) ){
      jsonResult.result = false;
      jsonResult.error = FormatMsg("L'intervallo non è corretto.");
      return jsonResult;
  }

  jsonResult.result = true;
  return jsonResult;
}


/**
 * @ignore
 * @param {string|date} from - Da ora ("HH:MM") | data ("GG-MM-YYYY") | data+ora ("GG-MM-YYYY HH:MM")
 * @param {string|date} to  - A ora ("HH:MM") | data ("GG-MM-YYYY") | data+ora ("GG-MM-YYYY HH:MM")
 * @returns {object} jsonResult -> jsonResult.result, jsonResult.error
 */
function hrifCheckFromTo(from, to){
  var jsonResult = {};
  jsonResult.Type = "";
  var hasTime = false , sameDay = false;
  var dateSep = "-";
  var dateFrom, dateTo;
  let timePtrn = /^[0-9]{2}:[0-9]{2}$/; // hh:mm
  let datePtrn = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/; // gg-mm-yyyy
  let datetimePtrn = /^[0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}$/; // gg-mm-yyyy hh:mm

  //Controllo sul tipo dei dati inseriti (string|date)
  if(typeof from == "string" && typeof to == "string"){
    //Se è stringa controllo la lunghezza e la sua formattazione
    switch(from.length+to.length){

      case 10: // ------------------------------------------------------ Entrambi Orari --------------|
        if(!timePtrn.test(from) || !timePtrn.test(to)){
          jsonResult.result = false;
          jsonResult.error = FormatMsg("Il formato degli orari non è corretto. (hh:mm)");
          return jsonResult;
        }
        jsonResult = hrifStringCheckFromToTime(from, to);
        jsonResult.Type = "time";
        return jsonResult;

      case 20: // ------------------------------------------------------ Entrambe Date --------------|
        if(!datePtrn.test(from) || !datePtrn.test(to)){
          jsonResult.result = false;
          jsonResult.error = FormatMsg("Il formato delle date non è corretto. (gg-mm-yyyy)");
        }
        // Sistemo i valori di giorno e mese per rispettare sintassi nel new Date()
        from = from.split(dateSep)[1] + dateSep + from.split(dateSep)[0] + dateSep + from.split(dateSep)[2];
        to = to.split(dateSep)[1] + dateSep + to.split(dateSep)[0] + dateSep + to.split(dateSep)[2];
        dateFrom = new Date(from);
        dateTo = new Date(to);
        jsonResult.Type = "date";
        break;

      case 32: // ------------------------------------------------------ Entrambi Data + Ora --------------|
        if(!datetimePtrn.test(from) || !datetimePtrn.test(to)){
          jsonResult.result = false;
          jsonResult.error = FormatMsg("Il formato della data + orario non è corretto. (gg-mm-yyyy hh:mm)");
          return jsonResult;
        }
        var wrkFrom = from.split(" "); // Separo in Data e Orario
        var wrkTo = to.split(" ");

        // Sistemo i valori di giorno e mese per rispettare sintassi nel new Date() 
        dateFrom = new Date(wrkFrom[0].split(dateSep)[1] + dateSep + wrkFrom[0].split(dateSep)[0] + dateSep + wrkFrom[0].split(dateSep)[2] + " " + wrkFrom[1]);
        dateTo = new Date(wrkTo[0].split(dateSep)[1] + dateSep + wrkTo[0].split(dateSep)[0] + dateSep + wrkTo[0].split(dateSep)[2] + " " + wrkTo[1]);
        hasTime = true;
        jsonResult.Type = "datetime";
        break;

      default: // Formati diversi o non riconosciuti
        jsonResult.result = false;
        jsonResult.error = FormatMsg("I formati inseriti non sono corretti, o sono diversi.");
        return jsonResult;   
    }
  } else if(from instanceof Date && to instanceof Date){
    // Se è un istanza di Date, assegno le variabili di lavoro
    dateFrom = from;
    dateTo = to;
    hasTime = true;
  } else {
    jsonResult.result = false;
    jsonResult.error = FormatMsg("Parametri inseriti di tipo non valido.");
    return jsonResult;
  }

  // Controllo la validità dalla data
  if(dateFrom.toString() == "Invalid Date" || dateTo.toString() == "Invalid Date"){
    jsonResult.result = false;
    jsonResult.error = FormatMsg("Le date o orari inseriti non sono validi.");
    return jsonResult;
  }

  var err = false
  // console.log(dateFrom + "   |||   " + dateTo);
  // console.log(dateFrom.getDate()+"-"+dateFrom.getMonth()+"-"+dateFrom.getFullYear() + "   |||  " + dateTo.getDate()+"-"+dateTo.getMonth()+"-"+dateTo.getFullYear());
  // Controllo sulla validità dell'intervallo
  if(dateFrom.getFullYear() > dateTo.getFullYear())
    err = true;
  else if(dateFrom.getFullYear() == dateTo.getFullYear() && dateFrom.getMonth() > dateTo.getMonth())
    err = true;
  else if(dateFrom.getFullYear() == dateTo.getFullYear() && dateFrom.getMonth() == dateTo.getMonth() && dateFrom.getDate() > dateTo.getDate())
    err = true;
  else if(dateFrom.getFullYear() == dateTo.getFullYear() && dateFrom.getMonth() == dateTo.getMonth() && dateFrom.getDate() == dateTo.getDate())
    sameDay = true;
  // console.log("err="+err+"  sameday="+sameDay+"   hastime="+hasTime);
  if(err){
    // Data from maggiore della Data to
    jsonResult.result = false;
    jsonResult.error = FormatMsg("Intervallo di date non valido.");
    return jsonResult;
  }

  if(hasTime && sameDay){
    if(((dateFrom.getHours() == dateTo.getHours()) && (dateFrom.getMinutes() > dateTo.getMinutes())) || (dateFrom.getHours() > dateTo.getHours())){
      jsonResult.result = false;
      jsonResult.error = FormatMsg("L'intervallo di orario non valido.");
      return jsonResult;
    }
  }
  jsonResult.result = true;
  return jsonResult;
}

function hrifGetVersion() {
	//	return hrifVer;
	var fileVersion = "https://hrportal.network-contacts.it/HRPORTAL/binframework/hrifver.ini";
	var version = "";

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", fileVersion, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				version = rawFile.responseText;
			}
		}
	};
	rawFile.send(null);

	return version;

}

function hrifGetVariantVersion(theme) {

	var fileVariant = "../" + theme + "/variant_hr.css";
	var version = "";

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", fileVariant, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				from = allText.indexOf("/*!") + 3;
				to = allText.indexOf("*/");
				version = allText.substring(from, to);

			}
		}
	};
	rawFile.send(null);

	return version;

}


function hrifVersionIsBeta(){

  var versionCheck = hrifGetVersion();
  if (versionCheck.includes("beta")) {
    return true;
  } else {
    return false;
  }
}

/** verifico che la versione di hrif passata come parametro sia minore o uguale a quella installata
 * @ignore
 * @param {string} requiredVersion 
 * @returns boolean 
 */
function checkMinVersion(requiredVersion) {

  let installedVersion = hrifGetVersion();

    // rimuovo eventuale beta
    installedVersion = installedVersion.replace('_beta', '');
    installedVersion = installedVersion.replace('beta', '');
    installedVersion = installedVersion.trim();
    requiredVersion = requiredVersion.trim();

    return requiredVersion<=installedVersion
}


/** Determina le dimensioni della finestra e ne calcola le percentuali width/height
 * @ignore
 * @param {number} widthPercent
 * @param {number} heightPercent
 * @returns json size
 */
function hrifeGetWindowSizePercentage(widthPercent, heightPercent) {

  // Ottieni le dimensioni attuali della finestra
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Calcola la percentuale specificata per larghezza e altezza
  const widthPercentage = width * (widthPercent / 100);
  const heightPercentage = height * (heightPercent / 100);

  // Restituisce un oggetto con i valori calcolati
  return {
      width: widthPercentage,
      height: heightPercentage
  };
}

//# sourceURL=../../HRPORTAL/binframework/js/hrif2_tools.js
