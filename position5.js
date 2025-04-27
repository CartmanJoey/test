---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
* Questo è uno spazio che contiene elementi di documentazione appartenenti alle Cards
*
* @namespace Cards
*
*/

/** Tipologia di Card
* @enum
* @type {string}
*/
let hrifCARDTYPE = {

	/** Con immagine ###Deprecate### */
	//	IMMAGINE: { 
	//		"PROPERTY" 	: {"CLASSBASE" : "" , "CLASSIMAGE" : hrifCLASSBASE.CARD + "--media-left"} , "HEADER" : "#HrifStatusObj#", "BODY" : "#HrifTitle#", "FOOTER" : "#HrifIconLabel#" },

	/** Nuovo elemento*/
	NEWITEM: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-add" },
		"HEADER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1 }] },
		"BODY": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }] }
	},

	/** Altri elementi*/
	MORE: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-more" },
		"HEADER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1 }] },
		"BODY": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }] }
	},

	/** Default*/
	DEFAULT: {
        "PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-default", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-fullsize" },
        "HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
        "BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1, "CLASSAGGN": hrifCLASSBASE.ICON + "--category" }, { "OBJ": "HrifMediaTitle", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifRatingStar", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 5 }] },{ "OBJ": "HrifLabelAmount", "REC": 1 },{ "OBJ": "HrifPeriodFull", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-card" }, { "OBJ": "HrifLabelValueList", "REC": 1 }, { "OBJ": "HrifPersonaGroup", "REC": 1 }, { "OBJ": "HrifTimelineHoursRange", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINE + "-card" },{ "OBJ": "HrifTimelineVerticalApprove", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINEVERTICAL + "-card" , "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 3 }]}, { "OBJ": "HrifSplitFull", "REC": 1 }, { "OBJ": "HrifScoreDetail", "REC": 1 }] },
        //      "BODY"      : {"MAXOBJ" : 5  , "OBJARR" : [{"OBJ" : "HrifTitle" , "REC" : 1},{"OBJ": "HrifTagsGroup" , "REC" : 1},{"OBJ": "HrifLabel" , "REC" : 1},{"OBJ": "HrifTextLong" , "REC" : 1},{"OBJ": "HrifLabelQuote" , "REC" : 1},{"OBJ" : "HrifIconLabelGroup" , "REC" : 1, "DEFPARM" : [{"NAME" :"MaxElement", "VALUE": 4}]}]},
        "FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 2 }] }, { "OBJ": "HrifActionDrop", "REC": 1 }, { "OBJ": "HrifButtonGroupActionDrop", "REC": 1 }] }
    },

	/** Default Flat*/
	DEFAULTFLAT: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-default" + " " + hrifCLASSBASE.CARD + "-defaultflat", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-fullsize" },
		"HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1, "CLASSAGGN": hrifCLASSBASE.ICON + "--category" }, { "OBJ": "HrifMediaTitle", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifEvent", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 5 }] }] },
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 2 }] }] }
	},

	/** MEDIA*/
	MEDIA: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-media" },
		"HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 4 }] }, { "OBJ": "HrifProgressbar", "REC": 1 }, { "OBJ": "HrifTimelineHoursRange", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINE + "-card" }, { "OBJ": "HrifProgressBarMarkerPeriod", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-marker-card" },{ "OBJ": "HrifPeriodFull", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-card" },{"OBJ" : "HrifProgressBarCircle", "REC" :1 },{ "OBJ": "HrifLabelValueList", "REC": 1 },{ "OBJ": "HrifLabelAmount", "REC": 1 },{ "OBJ": "HrifChartPie", "REC": 1 },{ "OBJ": "HrifTimelineVertical", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINEVERTICAL + "-card" }, { "OBJ": "HrifRatingStar", "REC": 1 }, { "OBJ": "HrifScoreDetail", "REC": 1 }], },
		"FOOTER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 2 }] }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }, { "NAME": "IsCardFooter", "VALUE": true }] }, { "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifPersonaGroup", "REC": 1 }, { "OBJ": "HrifActionDrop", "REC": 1 }, { "OBJ": "HrifButtonGroupActionDrop", "REC": 1 }] }
	},

	/** Comunicazioni ###Deprecate### */
	MEDIACOMMUNICATION: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-media-communication" },
		"HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifIconLabel", "REC": 1 },{ "OBJ": "HrifRatingStar", "REC": 1 }] },
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }] }
	},

	/** Media Left*/
	MEDIALEFT: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-media", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-left" },
		"FORCESTRUCT": {"TYPETAG": "div", "CLASS": "xxxxx", "OBJARR": ["Media","Header"]},		
		"HEADER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 6 }] },  { "OBJ": "HrifLabelValueList", "REC": 1 },{ "OBJ": "HrifLabelAmount", "REC": 1 }, { "OBJ": "HrifProgressBarMarkerPeriod", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-marker-card" },{ "OBJ": "HrifPeriodFull", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-card" },{ "OBJ": "HrifRatingStar", "REC": 1 }, { "OBJ": "HrifRatingGoal", "REC": 1 }, { "OBJ": "HrifBannerMessage", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 } , { "OBJ": "HrifScoreDetail", "REC": 1 }] },
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }]}, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] },{ "OBJ": "HrifButtonGroupActionDrop", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }]}] }
	},

	/** Media Flat*/
	MEDIAFLAT: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-media" + " " + hrifCLASSBASE.CARD + "-media-flat", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-fullsize" },
		"HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1, "CLASSAGGN": hrifCLASSBASE.ICON + "--category" }, { "OBJ": "HrifMediaTitle", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifEvent", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 5 }] },{ "OBJ": "HrifRatingStar", "REC": 1 }] },
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 2 }] }, { "OBJ": "HrifButtonGroupActionDrop", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }]}] }
	},


    CELLGRIDDEFAULT: {
        "PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-cellgrid--default" },
        "HEADER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconTinted", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifAvatar", "REC": 1 }] },
        "BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 4 }]}, { "OBJ": "HrifPersona", "REC": 1 }, { "OBJ": "HrifTimelineHoursRange", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINE + "-card" }, { "OBJ": "HrifTitleCounter", "REC": 1 }, { "OBJ": "HrifLabelValueList", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifRangeBlockGroup", "REC": 1 }, { "OBJ": "HrifTimelineBlock", "REC": 1 } ]},
        "FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 4 }] }, { "OBJ": "HrifActionDrop", "REC": 1}] }
    },

	FAVORITE: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-media", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-left", "CLASSAGGN": hrifCLASSBASE.CARD + "-favorite" },
		"HEADER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifStatusObj", "REC": 1 }] },
		"BODY": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 1 }] }] },
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }, { "NAME": "IsCardFooter", "VALUE": true }] }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }] }
	},

	/** RESOURCE*/
	RESOURCE: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-resource" },
		"BODY": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifResource", "REC": 1 }] },
	},

	/** PERSONA*/
	PERSONA: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-persona" },
		"BODY": { "MAXOBJ": 4, "OBJARR": [{ "OBJ": "HrifAvatar", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifIconLabel", "REC": 3 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 4 }] }] },
	},

	/** APP*/
	APP: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-app" },
		"BODY": { "MAXOBJ": 3, "OBJARR": [{ "OBJ": "HrifIconRecolorable", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }] },
	},

	/** Header, Body  - Horizontal*/
	HEADERBODY_HOR: {
		"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-headbody-hor", "CLASSIMAGE": hrifCLASSBASE.CARD + "--media-fullsize" },
		"HEADER": { "MAXOBJ": 2, "OBJARR": [{ "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 5 }] }, { "OBJ": "HrifPersona", "REC": 1 }] },
		"BODY": { "MAXOBJ": 5, "OBJARR": [{ "OBJ": "HrifIcon", "REC": 1, "CLASSAGGN": hrifCLASSBASE.ICON + "--category" }, { "OBJ": "HrifMediaTitle", "REC": 1 }, { "OBJ": "HrifTitle", "REC": 1 }, { "OBJ": "HrifTagsGroup", "REC": 1 }, { "OBJ": "HrifLabel", "REC": 1 }, { "OBJ": "HrifTextLong", "REC": 1 }, { "OBJ": "HrifLabelQuote", "REC": 1 }, { "OBJ": "HrifRatingStar", "REC": 1 }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 5 }] },{ "OBJ": "HrifLabelAmount", "REC": 1 },{ "OBJ": "HrifPeriodFull", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.PROGRESSBAR + "-card" }, { "OBJ": "HrifLabelValueList", "REC": 1 }, { "OBJ": "HrifPersonaGroup", "REC": 1 }, { "OBJ": "HrifTimelineHoursRange", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINE + "-card" },{ "OBJ": "HrifTimelineVerticalApprove", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINEVERTICAL + "-card" , "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 3 }]}, { "OBJ": "HrifSplitFull", "REC": 1 }, { "OBJ": "HrifTimelineBlock", "REC": 1 , "CLASSAGGN": hrifCLASSBASE.TIMELINEBLOCK + "-card" }] },
		//		"BODY" 		: {"MAXOBJ" : 5  , "OBJARR" : [{"OBJ" : "HrifTitle" , "REC" : 1},{"OBJ": "HrifTagsGroup" , "REC" : 1},{"OBJ": "HrifLabel" , "REC" : 1},{"OBJ": "HrifTextLong" , "REC" : 1},{"OBJ": "HrifLabelQuote" , "REC" : 1},{"OBJ" : "HrifIconLabelGroup" , "REC" : 1, "DEFPARM" : [{"NAME" :"MaxElement", "VALUE": 4}]}]},
		"FOOTER": { "MAXOBJ": 1, "OBJARR": [{ "OBJ": "HrifIconLabel", "REC": 1 }, { "OBJ": "HrifButtonGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifButtonIconGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxButton", "VALUE": 2 }] }, { "OBJ": "HrifIconLabelGroup", "REC": 1, "DEFPARM": [{ "NAME": "MaxElement", "VALUE": 2 }] }] }
	},
	

};

hrifCARDTYPE.CELLCOLDEFAULT = {
	"PROPERTY": { "CLASSBASE": hrifCLASSBASE.CARD + "-cellgrid--default"  + " " + hrifCLASSBASE.CARD + "--column"},
	"HEADER": hrifCARDTYPE.CELLGRIDDEFAULT.HEADER,
	"BODY": hrifCARDTYPE.CELLGRIDDEFAULT.BODY,
	"FOOTER": hrifCARDTYPE.CELLGRIDDEFAULT.FOOTER,
}


/** Costanti per la gestione dei Tipi di Grid
* @enum
* @type {string}
*/
const hrifGRIDCARDTYPE = {
	/** Default */
	DEFAULT: { "class": hrifCLASSBASE.GRID + "-default" },
	/** Default Flat */
	DEFAULTFLAT: { "class": hrifCLASSBASE.GRID + "-default-flat" },
	/** Blog */
	BLOG: { "class": hrifCLASSBASE.GRID + "-blog" },
	/** Media */
	MEDIA: { "class": hrifCLASSBASE.GRID + "-media" },
	/** Media Left*/
	MEDIA_LEFT: { "class": hrifCLASSBASE.GRID + "-media-left" },
	/** Media Left Row*/
	MEDIA_LEFT_ROW: { "class": hrifCLASSBASE.GRID + "-media-left-row" },
	/** Media Flat*/
	MEDIA_FLAT: { "class": hrifCLASSBASE.GRID + "-media-flat" },
	/** Favorite */
	FAVORITE: { "class": hrifCLASSBASE.GRID + "-favorite" },
	/** Resource */
	RESOURCE: { "class": hrifCLASSBASE.GRID + "-resource" },
	/** Card su una riga */
	CELLGRIDDEFAULT: { "class": hrifCLASSBASE.GRID + "-cellgrid-default" },
	/** Media FullWidth*/
	MEDIA_FULLWIDTH: { "class": hrifCLASSBASE.GRID + "-media " + hrifCLASSBASE.GRID + "-media-fullwidth" },
	/** Media Communication*/
	MEDIACOMMUNICATION: { "class": hrifCLASSBASE.GRID + "-media-communication" },
	/** Persona */
	PERSONA: { "class": hrifCLASSBASE.GRID + "-persona" },
	/** App */
	APP: { "class": hrifCLASSBASE.GRID + "-app" },
	/** Card su una riga */
	HEADERBODY_HOR: { "class": hrifCLASSBASE.GRID + "-header-body-hor" },
};


/** Costanti per la gestione dei Tipi di Layout di Card
* @enum
* @type {string}
*/
const hrifGRIDCARDLAYOUT = {
	/** Flat */
	FLAT: { "class": hrifCLASSBASE.GRIDCARD + "--flat" }
};


// @param {hrifCARDTYPE} jsonCardParm.Type - Tipologia dell'oggetto
/** Definizione Proprietà della Card
* @class
* @alias JsonCardParm
* @memberOf Cards
* @param {json|object} jsonCardParm - Caratteristiche della Card 
* @param {string} [jsonCardParm.Action] - Azione da eseguire al click 
* @param {hrifSTATUS} [jsonCardParm.Status] - Stato dell'oggetto 
* @param {boolean} [jsonCardParm.Evidence] - Oggetto in evidenza (true/false) 
* @param {boolean} [jsonCardParm.ToRead] - Oggetto "Da leggere" (true/false)
//* @param {boolean} [jsonCardParm.Shrinkable] - Shrinkable (true/false)
* @param {json|object} [jsonCardParm.MediaInfo] - Informazione "media" dell'oggetto 
* @param {hrifMEDIAINFOTYPE} jsonCardParm.MediaInfo.Type - Tipologia del media 
* @param {string} jsonCardParm.MediaInfo.Source - Sorgente del media 
* @returns {object} Oggetto HrifCard.
*/
function hrifGetJsonCardParm() {
	return {
		"IdItem": "",
		"Type": "",
		"Action": "",
		"Status": "",
		"Evidence": "",
		"ToRead": "",
		"Shrinkable": "",
		"MediaInfo":
		{
			"Type": "",
			"Source": ""
		}
	};
}

function hrifGetJsonCardObjParm() {
	return { "obj": [] };
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Communication
* @ignore
* @class
* @alias HrifCardCommunication
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @returns {object} Oggetto HrifCard.
*
* @example <caption>Esempio Card con caricamento in un contenitore </caption>
*
* var jsonCard = { 
*	"PROPERTY": {
*		"Status": hrifSTAUS.INFO,
*		"ToRead": true
*	},
*	"HEADER": {
*		"obj": [
*			{
*				"typeObj": "HrifStatusObj",
*				"param": {
*					"Label": "Stato di prova"
*				}
*			}
*		]
*	},
*	"BODY": {
*		"obj": [
*			{
*				"typeObj": "HrifTitle",
*				"param": {
*					"OverTitle": "Label dell'OverTitle",
*					"Title": "Questo è il titolo",
*					"SubTitle": "Descrizione del sottotitolo"
*				}
*			},
*			{
*				"typeObj": "HrifTagsGroup",
*				"param": {
*					"Tags": [
*						"Video",
*						"Evento normativo",
*						"Comunicazione"
*					]
*				}
*			}
*		]
*	},
*	"FOOTER": {
*		"obj": [
*			{
*				"typeObj": "HrifIconLabel",
*				"param": {
*					"Icon": hrifICON.PLUS,
*					"Label": "Questa è la descrizione della tua Label"
*				}
*			}
*		]
*	}
* }
* 
* // Definisco l'oggetto Card Communication
* card = new HrifCardCommunication(this, jsonCard);
* 
* // Carico la Card nel contenitore
* this.hrif_container.Load(card);
* 
* // Carico la Card nella Label [sulla Label deve essere settata la proprietà "Enable HTML"]
* this.LblProva.Value(card.getHtml());
*
*/
//this.HrifCardCommunication = function (form, jsonCardParm){
//	
//	var jsonCard = (typeof(jsonCardParm)=='string') ? JSON.parse(jsonCardParm) : jsonCardParm;
//	
//	this.jsonCardProperty = jsonCard.PROPERTY;
//	this.jsonCardHeaderParm = jsonCard.HEADER; 
//	this.jsonCardBodyParm = jsonCard.BODY;
//	this.jsonCardFooterParm = jsonCard.FOOTER;
//	
//	this.jsonCardProperty.Type = hrifCARDTYPE.COMMUNICATION;
//	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm); 
//	
//}


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card CommunicationList
* @ignore
* @class
* @alias HrifCardCommunicationList
* @memberOf Cards
* @param {object} form - this.
* @param {json|object} jsonCardParm - Caratteristiche della Card 
* @returns {object} Oggetto HrifCard.
*
* @example 
*
* // Definizione proprietà 
* var jsonCard = { 
*	"PROPERTY": {
*		"Status": hrifSTAUS.INFO,
*		"ToRead": true
*	},
*	"HEADER": {
*		"obj": [
*			{
*				"typeObj": "HrifStatusObj",
*				"param": {
*					"Label": "Stato di prova"
*				}
*			}
*		]
*	},
*	"BODY": {
*		"obj": [
*			{
*				"typeObj": "HrifTitle",
*				"param": {
*					"OverTitle": "Label dell'OverTitle",
*					"Title": "Questo è il titolo",
*					"SubTitle": "Descrizione del sottotitolo"
*				}
*			},
*			{
*				"typeObj": "HrifTagsGroup",
*				"param": {
*					"Tags": [
*						"Video",
*						"Evento normativo",
*						"Comunicazione"
*					]
*				}
*			}
*		]
*	}
* }
* 
* // Definisco l'oggetto Card Communication
* card = new HrifCardCommunication(this, jsonCard);
* 
* // Carico la Card nel contenitore
* this.hrif_CntCard.Load(card);
* 
* // Carico la Card nella Label [sulla Label deve essere settata la proprietà "Enable HTML"]
* this.LblProva.Value(card.getHtml());
*
*/
//this.HrifCardCommunicationList = function (form, jsonCardParm){
//	
//	var jsonCard = (typeof(jsonCardParm)=='string') ? JSON.parse(jsonCardParm) : jsonCardParm;
//	
//	this.jsonCardProperty = jsonCard.PROPERTY;
//	this.jsonCardHeaderParm = jsonCard.HEADER; 
//	this.jsonCardBodyParm = jsonCard.BODY;
//	this.jsonCardFooterParm = jsonCard.FOOTER;
//	
//	this.jsonCardProperty.Type = hrifCARDTYPE.COMMUNICATIONLIST;
//	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm); 
//	
//}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card MediaCommunication
* @class
* @alias HrifCardMediaCommunication
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {boolean} jsonCardParm.PROPERTY.ToRead - Da leggere  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer  
* @returns {object} Oggetto HrifCard.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
*  // Definizione delle proprietà della Card
*  var jsonCard = {
*    "PROPERTY": {
*      "Status": hrifSTATUS.EVIDENCE ,
*      "Evidence": true,
*      "MediaInfo": {
*        "Type": hrifMEDIAINFOTYPE.IMMAGINE,
*        "Source": "../images/zworkspace/callroom.jpg" 
*      }
*    },
*    "HEADER": {
*      "obj": [
*        {
*          "typeObj": "HrifStatusObj",
*          "param": {
*            "Label" : FormatMsg("Descrizione della label")
*          }
*        }
*      ]
*    },
*    "BODY": {
*      "obj": [
*        {
*          "typeObj": "HrifTitle",
*          "param": {
*            "OverTitle": FormatMsg("Area rossa"),
*            "Title": FormatMsg("Scrivania_12")
*          }
*        },
*        {
*          "typeObj": "HrifLabel",
*          "param": {
*            "Label": FormatMsg("Descrizione")
		  }
*        }
*      ]
*    },
*    "FOOTER":{
*      "obj": [
*        {
*          "typeObj":"HrifIconLabel",
*          "param": {
*            "Icon": hrifICON.STAR,
*            "Label": FormatMsg("Descrizione aggiuntiva all'icona"),
*          }
*        }
*      ]
*    }
*  };
* 
*  // Definisco l'oggetto Card 
*  cardMediaCom = new HrifCardMediaCommunication(this, jsonCard);
* 
*  // Carico la Card nel contenitore
*  this.hrif_Container.Load(cardMediaCom);
* 
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardMediaCommunication(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardMediaCommunication = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.MEDIACOMMUNICATION;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------	


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Default
* @class
* @alias HrifCardDefault
* @memberOf Cards
* @param {object} form - this.
* @param {json|object} jsonCardParm - Caratteristiche della Card 
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {boolean} jsonCardParm.PROPERTY.ToRead - Da leggere  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCardDefault.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption>  
*
* // Definizione delle proprietà della Card 
* var jsonCardParm = {
* 	"PROPERTY": {
* 		"Status": hrifSTATUS.INFO,
* 		"Evidence": true,
* 		"ToRead": true
* 	},
* 	"BODY": {
* 		"obj": [
* 			{
* 				"typeObj": "HrifIcon",
* 				"param": {
* 					"Icon": hrifICON.CALENDAR,
* 				}
* 			},
* 			{
* 				"typeObj": "HrifTitle",
* 				"param": {
* 					"Title": FormatMsg("Questo è il titolo"),
* 					"OverTitle": FormatMsg("Label dell'OverTitle"),
* 					"SubTitle": FormatMsg("Descrizione del sottotitolo")
* 				}
* 			},
* 			{
* 				"typeObj": "HrifTagsGroup",
* 				"param": {
* 					"Tags": [
* 						FormatMsg("Video"),
* 						FormatMsg("Evento normativo"),
* 						FormatMsg("Comunicazione")
* 					]
* 				}
* 			}
* 		]
* 	},
* 	"FOOTER": {
* 		"obj": [
* 			{
* 				"typeObj": "HrifIconLabel",
* 				"param": {
* 					"Icon": hrifICON.ALARM,
* 					"Label": FormatMsg("Questa è la descrizione della tua Label")
* 				}
* 			}
* 		]
* 	}
* };
*
*  // Istanzio la Card e la carico in un contenitore
*  var cardDef = HrifCardDefault(this, jsonCardParm);
*
*  this.hrifContainer.Load(cardDef);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardDefault(this, jsonCardParm).getHtml();
*	
* }
*
*/
this.HrifCardDefault = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	// La Card Default non può avere la MediaInfo valorizzata
	jsonCard.PROPERTY.MediaInfo = "undefined";

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.DEFAULT;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Default Flat
* @class
* @alias HrifCardDefaultFlat
* @memberOf Cards
* @param {object} form - this.
* @param {json|object} jsonCardParm - Caratteristiche della Card 
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {boolean} jsonCardParm.PROPERTY.ToRead - Da leggere  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCardDefaultFlat.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione delle proprietà della Card 
* var jsonCardParm = {
* 	"PROPERTY": {
* 		"Status": hrifSTATUS.INFO,
* 		"Evidence": true,
* 		"ToRead": true
* 	},
* 	"BODY": {
* 		"obj": [
* 			{
* 				"typeObj": "HrifIcon",
* 				"param": {
* 					"Icon": hrifICON.CALENDAR,
* 				}
* 			},
* 			{
* 				"typeObj": "HrifTitle",
* 				"param": {
* 					"Title": FormatMsg("Questo è il titolo"),
* 					"OverTitle": FormatMsg("Label dell'OverTitle"),
* 					"SubTitle": FormatMsg("Descrizione del sottotitolo")
* 				}
* 			},
* 			{
* 				"typeObj": "HrifTagsGroup",
* 				"param": {
* 					"Tags": [
* 						FormatMsg("Video"),
* 						FormatMsg("Evento normativo"),
* 						FormatMsg("Comunicazione")
* 					]
* 				}
* 			}
* 		]
* 	},
* 	"FOOTER": {
* 		"obj": [
* 			{
* 				"typeObj": "HrifIconLabel",
* 				"param": {
* 					"Icon": hrifICON.ALARM,
* 					"Label": FormatMsg("Questa è la descrizione della tua Label")
* 				}
* 			}
* 		]
* 	}
* };
*
*  // Istanzio la Card e la carico in un contenitore
*  var cardDefaultFlat = HrifCardDefaultFlat(this, jsonCardParm);
*
*  this.hrifContainer.Load(cardDefaultFlat);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardDefaultFlat(this, jsonCardParm).getHtml();
*	
* }
*
*/
this.HrifCardDefaultFlat = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	// La Card Default non può avere la MediaInfo valorizzata
	this.jsonCardProperty = jsonCard.PROPERTY;

	jsonCard.PROPERTY.MediaInfo = "undefined";

	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.DEFAULTFLAT;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Media
* @class
* @alias HrifCardMedia
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {boolean} jsonCardParm.PROPERTY.ToRead - Da leggere  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCard.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption>
*
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    "PROPERTY": {
*      "Status": hrifSTATUS.SUCCESS ,
*      "Evidence": true,
*      "MediaInfo": {
*        "Type": hrifMEDIAINFOTYPE.IMMAGINE,
*        "Source": "../images/zworkspace/callroom.jpg" 
*      }
*    },
*    "HEADER": {
*      "obj": [
*        {
*          "typeObj": "HrifStatusObj",
*          "param": {
*            "Label" : FormatMsg("Descrizione della label")
*          }
*        }
*      ]
*    },
*    "BODY": {
*      "obj": [
*        {
*          "typeObj": "HrifTitle",
*          "param": {
*            "OverTitle": FormatMsg("Area rossa"),
*            "Title": FormatMsg("Scrivania_12")
*          }
*        },
*        {
*          "typeObj": "HrifLabel",
*          "param": {
*            "Label": FormatMsg("Descrizione")
*          }
*        }
*      ]
*    },
*    "FOOTER":{
*      "obj": [
*        {
*          "typeObj":"HrifIconLabel",
*          "param": {
*            "Icon": hrifICON.STAR,
*            "Label": FormatMsg("Descrizione aggiuntiva all'icona"),
*          }
*        }
*      ]
*    }
*  };
*
* 
*  // Definisco l'oggetto Card 
*  cardMedia = new HrifCardMedia(this, jsonCard);
* 
*  // Carico la Card nel contenitore
*  this.hrif_Container.Load(cardMedia);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardMedia(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardMedia = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;
	
	this.jsonCardProperty = jsonCard.PROPERTY;
	
	let param = deleteJsonObj(jsonCard.HEADER, "HrifStatusObj");
	if (jsonCard.PROPERTY.Status && jsonCard.PROPERTY.Status!='') param.Status = jsonCard.PROPERTY.Status; 

	if (param)
		modificaJson(jsonCard.BODY, 'HrifTitle', param);
	
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.MEDIA;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card MediaLeft
* @class
* @alias HrifCardMediaLeft
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {boolean} jsonCardParm.PROPERTY.ToRead - Da leggere  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCardLeft.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione proprietà
*  var jsonCard = {
*    "PROPERTY": {
*      "Status": hrifSTATUS.SUCCESS ,
*      "Evidence": true,
*      "MediaInfo": {
*        "Type": hrifMEDIAINFOTYPE.IMMAGINE,
*        "Source": "../images/zworkspace/callroom.jpg" 
*      }
*    },
*    "HEADER": {
*      "obj": [
*        {
*          "typeObj": "HrifStatusObj",
*          "param": {
*            "Label" : FormatMsg("Descrizione della label")
*          }
*        }
*      ]
*    },
*    "BODY": {
*      "obj": [
*        {
*          "typeObj": "HrifTitle",
*          "param": {
*            "OverTitle": FormatMsg("Area rossa"),
*            "Title": FormatMsg("Scrivania_12")
*          }
*        },
*        {
*          "typeObj": "HrifLabel",
*          "param": {
*            "Label": FormatMsg("Descrizione")
*          }
*        }
*      ]
*    },
*    "FOOTER":{
*      "obj": [
*        {
*          "typeObj":"HrifIconLabel",
*          "param": {
*            "Icon": hrifICON.STAR,
*            "Label": FormatMsg("Descrizione aggiuntiva all'icona"),
*          }
*        },
*
*      ]
*    }
*  };
*
*  // Definisco l'oggetto Card 
*  cardMediaLeft = new HrifCardMediaLeft(this, jsonCard);
* 
*  // Carico la Card nel contenitore
*  this.hrif_Container.Load(cardMediaLeft);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardMediaLeft(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardMediaLeft = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	let param = deleteJsonObj(jsonCard.HEADER, "HrifStatusObj");
	if (param)
		if (jsonCard.PROPERTY.Status && jsonCard.PROPERTY.Status!='') param.Status = jsonCard.PROPERTY.Status; 

	if (param){
		jsonCard.PROPERTY.obj = [];
		var jsonObj = {}
		jsonObj.typeObj = "HrifStatusObj";
		jsonObj.param = param;
		jsonCard.PROPERTY.obj.push(jsonObj);
	}

	this.jsonCardProperty = jsonCard.PROPERTY;

	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.MEDIALEFT;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};
this.HrifCardMediaLeftRow = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.MEDIALEFT;
	this.jsonCardProperty.Type.PROPERTY.CLASSAGGN = hrifCLASSBASE.CARD + "--row";
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// da documentare
this.HrifCardMediaFLat = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.MEDIAFLAT;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};


// da documentare
this.HrifCardCellGridDefault = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	// La Card CellGridDefault non può avere la MediaInfo valorizzata
	jsonCard.PROPERTY.MediaInfo = "undefined";

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = structuredClone(hrifCARDTYPE.CELLGRIDDEFAULT);
	//	if (this.jsonCardProperty.MediaInfo)
	//		this.jsonCardProperty.MediaInfo.Type = hrifMEDIAINFOTYPE.SVGICON;

	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

this.HrifCardCellColDefault = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	// La Card CellGridDefault non può avere la MediaInfo valorizzata
	jsonCard.PROPERTY.MediaInfo = "undefined";

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = structuredClone(hrifCARDTYPE.CELLCOLDEFAULT);
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);;

};

// da documentare
this.HrifCardHeaderBodyHor = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	// La Card CellGridDefault non può avere la MediaInfo valorizzata
	jsonCard.PROPERTY.MediaInfo = "undefined";

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = structuredClone(hrifCARDTYPE.HEADERBODY_HOR);
	//	if (this.jsonCardProperty.MediaInfo)
	//		this.jsonCardProperty.MediaInfo.Type = hrifMEDIAINFOTYPE.SVGICON;

	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Favorite
* @class
* @alias HrifCardFavorite
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato  
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCardFavorite.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione delle prorietà e degli oggetti che compongono la Card
* var jsonCard = {
*	"PROPERTY": {
*		"Status": hrifSTATUS.SUCCESS,
*		"Evidence": true
*	},
*	"HEADER": {
*		"obj": [
*			{
*				"typeObj": "HrifStatusObj",
*				"param": {
*					"Label": "Stato di prova"
*				}
*			}
*		]
*	},
*	"BODY": {
*		"obj": [
*			{
*				"typeObj": "HrifTitle",
*				"param": {
*					"Title": "Questo è il titolo"
*				}
*			},
*			{
*				"typeObj": "HrifLabel",
*				"param": {
*					"Label": "Questo è il testo dell'oggetto Label"
*				}
*			},
*			{
*				"typeObj": "HrifIconLabelGroup",
*				"param": {
*					"IconLabelObj": [
*						{
*							"Icon": hrifICON.STAR,
*							"Label": "Label della stella"
*						},
*						{
*							"Icon": hrifICON.ALARM,
*							"Label": "Label Allarme"
*						},
*						{
*							"Icon": hrifICON.ARCHIVE,
*							"Label": "Label archivio"
*						}
*					]
*				}
*			}
*		]
*	},
*	"FOOTER": {
*		"obj": [
*			{
*				"typeObj": "HrifButtonGroup",
*				"param": {
*					"Buttons": [
*						{
*							"IdItem": "Btn1",
*							"Label": "Button 1",
*							"Action": "execBottone1"
*						}
*					]
*				}
*			}
*		]
*	}
* }
*
*  // Definisco l'oggetto Card 
*  cardFavorite = new HrifCardFavorite(this, jsonCard);
* 
*  // Carico la Card nel contenitore
*  this.hrif_Container.Load(cardFavorite);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardFavorite(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardFavorite = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = jsonCard.PROPERTY;
	// By Design l'icona è valorizzata dalla stessa card 
	this.jsonCardProperty.MediaInfo = {};
	this.jsonCardProperty.MediaInfo.Type = hrifMEDIAINFOTYPE.ICON;
	this.jsonCardProperty.MediaInfo.Source = hrifICON.STAR;
	this.jsonCardHeaderParm = jsonCard.HEADER;
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = jsonCard.FOOTER;

	this.jsonCardProperty.Type = hrifCARDTYPE.FAVORITE;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Resource
* @class
* @alias HrifCardResource
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @returns {object} Oggetto HrifCardResource.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione delle proprietà della Card
* var jsonCard = {
*	"BODY": {
*		"obj": [
*			{
*				"typeObj": "HrifResource",
*				"param": {
					"Type" : hrifRESOURCETYPE.ATTACHMENT, 
*					"FileName": "DocumentazioneHrif.pdf",
*					"LabelInfo": 223584,
*					"DownloadAction" : "download_click",
*					"OpenAction" : "open_Click"
*				}
* 			}
* 		]
* 	}
* }
* 
*  // Definisco l'oggetto Card 
*  cardResource = new HrifCardResource(this, jsonCard);
* 
*  // Carico la Card nel contenitore
*  this.hrif_Container.Load(cardResource);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardMedia(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardResource = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = {};
	this.jsonCardHeaderParm = "";
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = "";

	this.jsonCardProperty.Type = hrifCARDTYPE.RESOURCE;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card Persona
* @class
* @alias HrifCardPersona
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {hrifSTATUS} jsonCardParm.PROPERTY.Status - Definizione stato
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {object[]} jsonCardParm.HEADER - Oggetti HRIF previsti per la sezione Header 
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @param {object[]} jsonCardParm.FOOTER - Oggetti HRIF previsti per la sezione Footer 
* @returns {object} Oggetto HrifCardPersona.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione delle proprietà della Card
* var jsonCard = {
* 	"BODY": {
* 		"obj": [
* 			{
*				"typeObj": "HrifAvatar",
*				"param": {
*					"Image": {
*						"Type": hrifIMAGETYPE.IMAGE,
*						"Value": "../SpTheme_NG/images/avatar/HRW.jpg"
*					},
*					"Name": "Luigi Mario",
*					"Surname": "Rossi",
*					"Status": hrifSTATUS.WARNING
*				}
* 			},
* 	  {
* 				"typeObj": "HrifTitle",
* 				"param": {
* 					"Title": FormatMsg("Questo è il titolo"),
* 					"OverTitle": FormatMsg("Label dell'OverTitle"),
* 					"SubTitle": FormatMsg("Descrizione del sottotitolo")
* 				}
* 			},
* 	  {
* 				"typeObj": "HrifLabel",
* 				"param": {
* 					"Label": "luigimario.rossi@zucchetti.it"
* 				}
* 			},
* 	  {
* 				"typeObj": "HrifIconLabel",
* 				"param": {
* 					"Icon": hrifICON.CALENDAR,
* 					"Label": FormatMsg("Questa è la descrizione della tua Label")
* 				}
* 			}   
* 	
* 		]
* 	}
* }
*
* // Definisco l'oggetto Card 
* cardPersona = new HrifCardPersona(this, jsonCard);
* 
* // Carico la Card nel contenitore
* this.hrif_Container.Load(cardPersona);
*
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardPersona(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardPersona = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = {};
	this.jsonCardHeaderParm = "";
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = "";

	this.jsonCardProperty.Type = hrifCARDTYPE.PERSONA;
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};
this.HrifCardPersonaRow = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = {};
	this.jsonCardHeaderParm = "";
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = "";

	this.jsonCardProperty.Type = hrifCARDTYPE.PERSONA;

	this.jsonCardProperty.Type.PROPERTY.CLASSAGGN = hrifCLASSBASE.CARD + "--row";
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/** Definizione oggetto Card App<br>Nella proprietà di card generiche (PROPERTY), l'unica proprietà disponibile è la "Evidence", se settata a true viene visualizzato un "badge" sull'icona.
* @class
* @classdesc 
* @alias HrifCardApp
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @param {json} jsonCardParm.PROPERTY - Proprietà generiche della Card 
* @param {boolean} jsonCardParm.PROPERTY.Evidence - In evidenza  
* @param {hrifTYPEINFO} jsonCardParm.PROPERTY.TypeInfo - Nuovo Contenuto  
* @param {object[]} jsonCardParm.BODY - Oggetti HRIF previsti per la sezione Body 
* @returns {object} Oggetto HrifCardApp.
*
* @example <caption>Esempio 1: Card con caricamento in un contenitore </caption> 
*
* // Definizione delle proprietà della Card
* var jsonCard = {
*	"PROPERTY": {
*		"Evidence": true,
*		"TypeInfo": true,
*	},  
*	"BODY": {
*		"obj": [
*			{
*				"typeObj": "HrifIconRecolorable",
*				"param": {
*					"Icon": hrifICONRECOLORABLE.BUSINESS_DOCUMENTATION,
*					"Action": "execAction",
*					"Tooltip": FormatMsg("Questo è il tooltip del TitleSection")
*				}
*			},
*			{
*				"typeObj": "HrifTitle",
*				"param": {
*					"Title": FormatMsg("Documenti personali"),
*					"OverTitle": FormatMsg("Label dell'OverTitle"),
*					"SubTitle": FormatMsg("Accedi ai tuoi documenti personali")
*				}
*			},
*			{
*				"typeObj": "HrifLabel",
*				"param": {
*					"Label": FormatMsg("Questa è la descrizione della tua Label")
*				}
*			}      
*		]
*	}
* }
*
* // Definisco l'oggetto Card 
* cardApp = new HrifCardApp(this, jsonCard);
* 
* // Carico la Card nel contenitore
* this.hrif_Container.Load(cardApp);
* 
* @example <caption>Esempio 2: Card con funzione che ritorna il codice HTML da passare ad una Grid </caption>
*
* function getCard(){
*
*  // la valorizzazione del Json è uguale all'esempio 1
*  // Definizione delle proprietà della card
*  var jsonCard = {
*    ...
*    ...
*  }
*	
*  return new HrifCardApp(this, jsonCard).getHtml();
*	
* }
*
*/
this.HrifCardApp = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = jsonCard.PROPERTY;
	this.jsonCardHeaderParm = "";
	this.jsonCardBodyParm = jsonCard.BODY;
	this.jsonCardFooterParm = "";

	this.jsonCardProperty.Type = structuredClone(hrifCARDTYPE.APP);

	if (this.jsonCardProperty.Evidence) {
		for (IdxObj = 0; IdxObj < this.jsonCardBodyParm.obj.length; IdxObj++) {
			if (this.jsonCardBodyParm.obj[IdxObj].typeObj == "HrifIconRecolorable") {
				this.jsonCardBodyParm.obj[IdxObj].param.Evidence = this.jsonCardProperty.Evidence;
				break;
			}
		}
	}
	 
	if (this.jsonCardProperty.TypeInfo) {
		this.jsonCardProperty.Type.PROPERTY.CLASSBASE += " " + hrifCLASSBASE.CARD + "--" + this.jsonCardProperty.TypeInfo;
	}
	
	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, this.jsonCardFooterParm);

};


/** Definizione oggetto HrifCardMore
* @class
* @alias HrifCardMore
* @memberOf Cards
* @param {object} form - this.
* @param {json|object} jsonCardParm - Proprietà della Card
* @param {string} jsonCardParm.Title - Descrizione del titolo 
* @param {string} jsonCardParm.Message - Descrizione del messaggio 
* @param {string} jsonCardParm.Action - Azione di callback 
* @returns {object} Oggetto HrifCardMore.
*
* @example <caption>Esempio 1 </caption>
*
* // Definizione delle proprietà della Card
* var jsonCardParm = {};
* jsonCardParm.Title = FormatMsg("Sono presenti altre comunicazioni, news ed eventi");
* jsonCardParm.Message = FormatMsg("Apri l'archivio");
*
* //  Istanzio l'oggetto Card
* var card = new HrifCardMore(this, jsonCardParm);
* // Inserisco la Card in Grid
* hrifGridAddRowCustomObject(this, this.Grid, card);
*
* @example <caption>Esempio 2 </caption>
* 
* // Definizione delle proprietà della Card
* var jsonCardParm = {};
* jsonCardParm.Title = FormatMsg("Sono presenti altre comunicazioni, news ed eventi");
* jsonCardParm.Message = FormatMsg("Apri l'archivio");
* jsonCardParm.Action = "openMore"
* // Inserisco la Card in Grid
* hrifGridAddRowCustomObject(this, this.Grid, new HrifCardMore(this, jsonCardParm));
* 
*/
this.HrifCardMore = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = {};
	this.jsonCardProperty.Action = jsonCard.Action;
	this.jsonCardProperty.Type = hrifCARDTYPE.MORE;

	// HEADER	
	this.jsonCardHeaderParm = {};
	this.jsonCardHeaderParm.obj = [];
	var obj = {};
	obj.typeObj = "HrifIcon";
	obj.param = {};
	obj.param.Icon = (jsonCard.Icon) ? jsonCard.Icon : hrifICON_CARDNEWMORE.ARROW_RIGHT_ROUND;
	//	obj.param.Style = hrifICONSTYLE.TINTED;
	obj.param.Size = hrifSIZE.XLARGE;
	this.jsonCardHeaderParm.obj.push(obj);

	// BODY
	this.jsonCardBodyParm = {};
	this.jsonCardBodyParm.obj = [];
	var obj = {};
	obj.typeObj = "HrifTitle";
	obj.param = {};
	obj.param.Title = jsonCard.Title;
	this.jsonCardBodyParm.obj.push(obj);

	var obj = {};
	obj.typeObj = "HrifLabel";
	obj.param = {};
	obj.param.Label = jsonCard.Message;
	this.jsonCardBodyParm.obj.push(obj);

	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, "");

};


/** Definizione oggetto Card New Item
* @class
* @alias HrifCardNewItem
* @memberOf Cards
* @param {object} form - this.
* @param {json|object} jsonCardParm - Proprietà della Card
* @param {string} jsonCardParm.Title - Descrizione del titolo 
* @param {string} jsonCardParm.Message - Descrizione del messaggio 
* @param {string} jsonCardParm.Action - Azione di callback 
* @returns {object} Oggetto HrifCardNewItem.
*
* @example
*
* // Definizione delle proprietà della Card
* var jsonCardParm = {};
* jsonCardParm.Title = FormatMsg("Nuova Comunicazione");
* jsonCardParm.Message = FormatMsg("Crea una nuova comunicazione, evento o news");
*
* //  Istanzio l'oggetto Card
* var card = new HrifCardNewItem(this, jsonCardParm);
* // Inserisco la Card in Grid
* hrifGridAddRowCustomObjectBefore(this, this.Grid, card);
*
* @example <caption>Esempio 2 </caption>
* 
* // Definizione delle proprietà della Card
* var jsonCardParm = {};
* jsonCardParm.Title = FormatMsg("Nuova richiesta");
* jsonCardParm.Message = FormatMsg("Crea una nuova richiesta di assistenza o supporto");
* jsonCardParm.Action = "openNew"
* // Inserisco la Card in Grid
* hrifGridAddRowCustomObjectBefore(this, this.Grid, new HrifCardNewItem(this, jsonCardParm));
* 
*/
this.HrifCardNewItem = function (form, jsonCardParm) {

	var jsonCard = (typeof (jsonCardParm) == 'string') ? JSON.parse(jsonCardParm) : jsonCardParm;

	this.jsonCardProperty = {};
	this.jsonCardProperty.Action = jsonCard.Action;
	this.jsonCardProperty.Type = hrifCARDTYPE.NEWITEM;

	// HEADER	
	this.jsonCardHeaderParm = {};
	this.jsonCardHeaderParm.obj = [];
	var obj = {};
	obj.typeObj = "HrifIcon";
	obj.param = {};
	obj.param.Icon = (jsonCard.Icon) ? jsonCard.Icon : hrifICON_CARDNEWMORE.PLUS;
	//	obj.param.Style = hrifICONSTYLE.TINTED;
	obj.param.Size = hrifSIZE.XLARGE;
	this.jsonCardHeaderParm.obj.push(obj);

	// BODY
	this.jsonCardBodyParm = {};
	this.jsonCardBodyParm.obj = [];
	var obj = {};
	obj.typeObj = "HrifTitle";
	obj.param = {};
	obj.param.Title = jsonCard.Title;
	this.jsonCardBodyParm.obj.push(obj);

	var obj = {};
	obj.typeObj = "HrifLabel";
	obj.param = {};
	obj.param.Label = jsonCard.Message;
	this.jsonCardBodyParm.obj.push(obj);

	return new HrifCard(form, this.jsonCardProperty, this.jsonCardHeaderParm, this.jsonCardBodyParm, "");

};

/** Definizione oggetto Card [PS - new HrifCard()]
* @ignore
* @class
* @alias HrifCard
* @memberOf Cards
* @param {object} form - this.
* @param {jsonCardParm} jsonCardParm - Caratteristiche della Card 
* @param {jsonCardHeaderParm} jsonCardHeaderParm - Oggetti che compongono la Testata della Card 
* @param {jsonCardBodyParm} jsonCardBodyParm - Oggetti che compongono il Corpo della Card
* @param {jsonCardFooterParm} jsonCardFooterParm - Oggetti che compongono il Footer della Card
* @returns {object} Oggetto HrifCard.
*
*/
this.HrifCard = function (form, jsonCardParm, jsonCardHeaderParm, jsonCardBodyParm, jsonCardFooterParm) {

	this.form = form;
	this.idItemCalc = HrifGetItem(jsonCardParm.IdItem);
	this.idItem = this.form.formid + "_" + this.idItemCalc;
	this.cardType = jsonCardParm.Type;
	this.action = jsonCardParm.Action;
	this.evidence = jsonCardParm.Evidence;
	this.mediaInfo = jsonCardParm.MediaInfo;
	this.toRead = jsonCardParm.ToRead;
	this.shrinkable = jsonCardParm.Shrinkable;
	this.more = jsonCardParm.More;
	this.objectName = "card";

	this.portletId = this.form.formid;
	this.isLoaded = false;
	this.actionOld = "";

	this.mapObjHeader = new Map();
	this.mapObjBody = new Map();
	this.mapObjFooter = new Map();

	this.mapParmObjHeader = new Map();
	this.mapParmObjBody = new Map();
	this.mapParmObjFooter = new Map();

	this.mapClassAggnHeader = new Map();
	this.mapClassAggnObjBody = new Map();
	this.mapClassAggnFooter = new Map();

	this.classNameBase = hrifCLASSBASE.CARD;
	this.classNameHeader = this.classNameBase + "__header";
	this.classNameBody = this.classNameBase + "__body";
	this.classNameFooter = this.classNameBase + "__footer";

	this.classNameEvidence = this.classNameBase + "--evidence";
	this.classNameToRead = this.classNameBase + "--toread";
	this.classNameShrinkable = this.classNameBase + "--shrinkable";

	this.idItem = this.idItem;
	this.idItemHeader = this.idItem + "_header";
	this.idItemBody = this.idItem + "_body";
	this.idItemFooter = this.idItem + "_footer";
	this.idItemMedia = this.idItem + "_media";
	this.idItemStruct = this.idItem + "_strfor";

	this.stringHtml = "";
	this.stringImageHtml = "";
	this.stringHeaderHtml = "";
	this.stringHeaderContentHtml = "";
	this.stringBodyHtml = "";
	this.stringBodyContentHtml = "";
	this.stringFooterHtml = "";
	this.stringFooterContentHtml = "";

	// Creo il documento in memoria
	this.docCardFrag = document.createDocumentFragment();
	documentFrag(this.docCardFrag, 'div', this.idItem, '', this.classNameBase);


	// Imposto le proprietà della CARD -------------------------------------
	if (typeof (this.cardType.PROPERTY.CLASSBASE) != "undefined" && this.cardType.PROPERTY.CLASSBASE != "") {
		hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSBASE);
	}

	// Controllo e Gestisco il ToRead
	this.setToRead = function (value) {
		if (value) {
			hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.classNameToRead);
		} else {
			hrifRemoveClass(this.docCardFrag.getElementById(this.idItem), this.classNameToRead);
		}
	};
	if (typeof (this.toRead) != "undefined" && this.toRead != "")
		this.setToRead(this.toRead);

	this.setShrinkable = function (value) {
		if (value) {
			hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.classNameShrinkable);
		} else {
			hrifRemoveClass(this.docCardFrag.getElementById(this.idItem), this.classNameShrinkable);
		}
	};
	if (typeof (this.shrinkable) != "undefined")
		this.setShrinkable(this.shrinkable);

	// Controllo e gestisco l'Evidence	
	this.setEvidence = function (value) {
		if (value) {
			if (typeof (this.classNameEvidence) != "undefined" && this.classNameEvidence != "")
				hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.classNameEvidence);
		} else {
			hrifRemoveClass(this.docCardFrag.getElementById(this.idItem), this.classNameEvidence);
		}
	};
	if (typeof (this.evidence) != "undefined" && this.evidence != "")
		this.setEvidence(this.evidence);

	/** Setta lo stato dell'oggetto
	* @param {hrifSTATUS} status - Stato dell'oggetto'.
	* @returns {null} Setta lo stato dell'oggetto.
	*/
	this.setStatus = function (statusVal) {
		this.docCardFrag.getElementById(this.idItem).classList.remove(hrifCLASSBASE.CARD + "--primary", hrifCLASSBASE.CARD + "--success", hrifCLASSBASE.CARD + "--warning", hrifCLASSBASE.CARD + "--danger", hrifCLASSBASE.CARD + "--info");
		if (statusVal)
			hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.classNameBase + "--" + statusVal);
	};
	if (typeof (jsonCardParm.Status) != 'undefined' && jsonCardParm.Status != "") {
		this.setStatus(jsonCardParm.Status);
	}

	// Vado ad impostare la classe sul Media
	if (typeof (this.mediaInfo) != "undefined" && typeof (this.mediaInfo.Type) != "undefined" && this.mediaInfo.Type != "") {
		if (this.cardType.PROPERTY.CLASSIMAGE)
			hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSIMAGE);
		switch (jsonCardParm.MediaInfo.Type) {
			case hrifMEDIAINFOTYPE.IMMAGINE:
				break;
			case hrifMEDIAINFOTYPE.ICON:
			case hrifMEDIAINFOTYPE.SVGICON:
				hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSBASE + '--media-icon');
				//				hrifAddClass(this.docMediaFrag.getElementById(this.idItemMedia), hrifCLASSBASE.CARD +'__media media-icon');
				break;
		}
	}
	if (this.cardType.PROPERTY.CLASSAGGN)
		hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSAGGN);


	// Salvo la stringa HTML del DIV principale	--------------------------------------------
	this.stringHtml = this.docCardFrag.children[0].outerHTML;

	// Solo dopo essermi salvato HTML del DIV principale vado ad impostare il DIV dell'immagine 
	this.docMediaFrag = null;

	// var wrkDoc = this.docCardFrag.getElementById(this.idItem);
	// // Controllo se devo gestire una forzatura nella struttura HTML
	// if (this.cardType.FORCESTRUCT){
	// 	// Creo il la nuova struttura
	// 	this.docCardStructFrag = document.createDocumentFragment();
	// 	documentFrag(this.docCardStructFrag, this.cardType.FORCESTRUCT.TYPETAG, this.idItemStruct, '', this.cardType.FORCESTRUCT.CLASS);
	// 	this.stringStrForHtml = this.docCardStructFrag.children[0].outerHTML;
	// 	// this.docCardFrag.getElementById(this.idItem).appendChild(this.docCardStructFrag.children[0]);
	// }

	// Istanzio l'oggetto parametricamente
	this.getItemObject = function (jsonParmObj) {
		objStr = 'new ' + jsonParmObj.typeObj + '(this.form ,' + JSON.stringify(jsonParmObj.param) + ')';
		obj = eval(objStr);
		return obj;
	};

	// Controllo e Gestione Media	
	if (typeof (this.mediaInfo) != "undefined" && typeof (this.mediaInfo.Type) != "undefined" && this.mediaInfo.Type != "") {

		this.docCardStructFrag = document.createDocumentFragment();
		documentFrag(this.docCardStructFrag, "div", this.idItemStruct, '', "xxxxxx");

		this.docMediaFrag = document.createDocumentFragment();
		switch (jsonCardParm.MediaInfo.Type) {
			case hrifMEDIAINFOTYPE.IMMAGINE:
				if (this.cardType.PROPERTY.CLASSIMAGE)
					hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSIMAGE);
				//				if (hrifCheckImage(jsonCardParm.MediaInfo.Source)){
				documentFrag(this.docMediaFrag, 'div', this.idItemMedia, '', hrifCLASSBASE.CARD + '__media media-image');
				this.docMediaFrag.children[0].setAttribute("style", "background-image:url('" + jsonCardParm.MediaInfo.Source + "');");
				// this.stringImageHtml = this.docMediaFrag.children[0].outerHTML;
				// this.docCardStructFrag.getElementById(this.idItemStruct).appendChild(this.docMediaFrag.children[0]);
				//				} else {
				//					hrifConsole("[HRIF] HrifCard.MediaInfo.Source: l'immagine inserita non è corretta",'warn');
				//				}
				break;
			case hrifMEDIAINFOTYPE.ICON:
				if (this.cardType.PROPERTY.CLASSIMAGE) {
					hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSIMAGE);
				}
				documentFrag(this.docMediaFrag, 'div', this.idItemMedia, '', hrifCLASSBASE.CARD + '__media media-icon');
				var iconParm = {};
				iconParm.IdItem = this.idItemCalc + "_crd";
				iconParm.Icon = jsonCardParm.MediaInfo.Source;
				this.icon = new HrifIcon(this.form, iconParm);
				this.docMediaFrag.getElementById(this.idItemMedia).appendChild(this.icon.getObject());
				// this.stringImageHtml = this.docMediaFrag.children[0].outerHTML;
				// this.docCardStructFrag.getElementById(this.idItemStruct).appendChild(this.docMediaFrag.children[0]);
				break;
			case hrifMEDIAINFOTYPE.SVGICON:
				if (this.cardType.PROPERTY.CLASSIMAGE) {
					hrifAddClass(this.docCardFrag.getElementById(this.idItem), this.cardType.PROPERTY.CLASSIMAGE);
				}
				documentFrag(this.docMediaFrag, 'div', this.idItemMedia, '', hrifCLASSBASE.CARD + '__media media-icon');
				var jsonIcon = {};
				jsonIcon.Icon = jsonCardParm.MediaInfo.Source;
				// Istanzio l'oggetto
				this.iconSvgRecol = new HrifIconRecolorable(this, jsonIcon);
				this.docMediaFrag.getElementById(this.idItemMedia).appendChild(this.iconSvgRecol.getObject());
				// this.stringImageHtml = this.docMediaFrag.children[0].outerHTML;
				// this.docCardFrag.getElementById(this.idItem).appendChild(this.docMediaFrag.children[0]);
				break;
			case 'avatar':
				break;
		}

		
		this.docCardStructFrag.getElementById(this.idItemStruct).appendChild(this.docMediaFrag.children[0]);

		if (jsonCardParm.obj && jsonCardParm.obj.length>0){
			obj = this.getItemObject(jsonCardParm.obj[0]);
			if (obj.getObject() != null) {
				this.docCardStructFrag.getElementById(this.idItemStruct).appendChild(obj.getObject());
			}
		}


		this.stringImageHtml = this.docCardStructFrag.children[0].outerHTML;
		this.docCardFrag.getElementById(this.idItem).appendChild(this.docCardStructFrag.children[0]);

	}

	// Creo il documento in memoria per Header  ------------------------------
	if (jsonCardHeaderParm) {
		this.docCardHeaderFrag = document.createDocumentFragment();
		documentFrag(this.docCardHeaderFrag, 'div', this.idItemHeader, '', this.classNameHeader);
		this.stringHeaderHtml = this.docCardHeaderFrag.children[0].outerHTML;
		this.docCardFrag.getElementById(this.idItem).appendChild(this.docCardHeaderFrag.children[0]);
	}

	// Fraiva: in generale i 3 div devono essere condizionati alla presenza della Sezione Header/Body/Footer

	// Creo il documento in memoria per il Body ------------------------------
	this.docCardBodyFrag = document.createDocumentFragment();
	documentFrag(this.docCardBodyFrag, 'div', this.idItemBody, '', this.classNameBody);
	this.stringBodyHtml = this.docCardBodyFrag.children[0].outerHTML;
	this.docCardFrag.getElementById(this.idItem).appendChild(this.docCardBodyFrag.children[0]);

	// Fraiva: da riportare e condizionare al caricamento del Footer, altrimenti non deve essere visualizzato
	// Inserisco il Divider prima del Footer	
	//	this.sectionDivider = new HrifSectionDividerObj(this.form, "card_sc", hrifDIVIDERTYPE.SIMPLE);
	//	this.docCardFrag.getElementById(this.idItem).appendChild(this.sectionDivider.getObject());

	// Creo il documento in memoria per il Footer -------------------
	if (jsonCardFooterParm) {
		this.docCardFooterFrag = document.createDocumentFragment();
		documentFrag(this.docCardFooterFrag, 'div', this.idItemFooter, '', this.classNameFooter);
		this.stringFooterHtml = this.docCardFooterFrag.children[0].outerHTML;
		this.docCardFrag.getElementById(this.idItem).appendChild(this.docCardFooterFrag.children[0]);
	}


	this.wrkDocFrag = this.docCardFrag.children[0];

	// Aggoingo l'oggetto istanziato
	this.addCustomObject = function (object, idItem, className) {
		if (document.getElementById(idItem)) {
			// Aggiungo il custom object nel document
			document.getElementById(idItem).appendChild(object.getObject());
		} else {
			// Aggiungo il custom object nell'oggetto
			if (this.wrkDocFrag.getElementsByClassName(className)[0])
				this.wrkDocFrag.getElementsByClassName(className)[0].appendChild(object.getObject());
		}
	};

	// Metodo di controllo generico sulla sezione
	this.checkSection = function (cardTypeSection, typeObj, section) {
		var result = true;
		var foundObj = false;
		Object.values(cardTypeSection.OBJARR).forEach(key => {

			if (key.OBJ == typeObj) {
				foundObj = true;
				counter = 0;
				wrkMap = eval("this.mapObj" + section);
				if (!wrkMap.has(typeObj)) {
					counter = 1;
					wrkMap.set(typeObj, counter);
				} else {
					counter = wrkMap.get(typeObj) + 1;
					if (counter > key.REC) {
						result = false;
						hrifConsole("[HRIF] HrifCard." + section + ": Impossibile aggiungere [" + typeObj + "] raggiunto il limite massimo [" + key.REC + "] per l'oggetto", 'warn');
					}
				}
				if (result) {
					if (typeof (key.DEFPARM) != "undefined") {
						wrkParMap = eval("this.mapParmObj" + section);
						wrkParMap.set(typeObj, JSON.stringify(key.DEFPARM));
					}
					if (typeof (key.CLASSAGGN) != "undefined") {
						wrkClassMap = eval("this.mapClassAggnObj" + section);
						wrkClassMap.set(typeObj, JSON.stringify(key.CLASSAGGN));
					}
				}

			}

		});
		if (!foundObj) {
			result = false;
			hrifConsole("[HRIF] HrifCard." + section + ": Oggetto [" + typeObj + "] non previsto per la card", 'warn');
		}

		return result;

	};

	/** Carica gli oggetti passati nel Json nella sezione Header -----------------------------------------------<
	* @param {hrifGetJsonCardObjParm} json - json contenente gli oggetti da caricare
	* @returns {null} Carica gli oggetti passati nel Json nella sezione 
	*/
	this.addHeader = function (jsonParmObj) {
		if (jsonParmObj.obj) {
			var maxElements = (this.cardType.HEADER.MAXOBJ < jsonParmObj.obj.length) ? this.cardType.HEADER.MAXOBJ : jsonParmObj.obj.length;
			//			for(IdxTit=0; IdxTit < jsonParmObj.obj.length; IdxTit++){
			for (IdxTit = 0; IdxTit < maxElements; IdxTit++) {
				if (this.checkHeader(this.cardType, jsonParmObj.obj[IdxTit].typeObj)) {
					// Se impostati i parametri di defaul per l'oggetto, devo reimpostare il parametro  
					if (this.mapParmObjHeader.has(jsonParmObj.obj[IdxTit].typeObj)) {
						var parmDef = JSON.parse(this.mapParmObjHeader.get(jsonParmObj.obj[IdxTit].typeObj));
						for (IdxPar = 0; IdxPar < parmDef.length; IdxPar++) {
							var name = parmDef[IdxPar].NAME;
							var value = parmDef[IdxPar].VALUE;
							jsonParmObj.obj[IdxTit].param[name] = value;
						}
					}
					obj = this.getItemObject(jsonParmObj.obj[IdxTit]);
					if (obj.getObject() != null) {
						this.addCustomObject(obj, this.idItemHeader, this.classNameHeader);
						this.stringHeaderContentHtml += obj.getHtml();
					}
				}
			}
			if (this.cardType.HEADER.MAXOBJ < jsonParmObj.obj.length) {
				hrifConsole("[HRIF] HrifCard.HEADER: superato il numero massimo di oggetti [" + this.cardType.HEADER.MAXOBJ + "] per la sezione", 'warn');
			}
		}
	};
	// Gestione dei controlli del HEADER
	this.checkHeader = function (cardType, typeObj) {
		// eventualmente qui devono essere inseriti controlli futuri strettamente del HEADER
		return this.checkSection(cardType.HEADER, typeObj, 'Header');
	};
	if (typeof (jsonCardHeaderParm) != 'undefined' && jsonCardHeaderParm != "") {
		this.addHeader(jsonCardHeaderParm);
	}


	/** Carica gli oggetti passati nel Json nella sezione Body -------------------------------------------------<
	* @param {hrifGetJsonCardObjParm} json - json contenente gli oggetti da caricare
	* @returns {null} Carica gli oggetti passati nel Json nella sezione Body.
	*/
	this.addBody = function (jsonParmObj) {

        this.cardColumns = [];
		this.ColoumnFrag = null;
        if (jsonParmObj.ColAmount && jsonParmObj.ColAmount > 0){
            for (let IdxCol = 0; IdxCol < jsonParmObj.ColAmount; IdxCol++){
                this.ColoumnFrag = document.createDocumentFragment();
                documentFrag(this.ColoumnFrag, 'div', this.idItemBody + "_col" + IdxCol, '', this.classNameBody + "--col" + IdxCol);
                this.cardColumns.push(this.ColoumnFrag.firstElementChild);
            }
        }

		if (jsonParmObj.obj) {
			var maxElements = (this.cardType.BODY.MAXOBJ < jsonParmObj.obj.length) ? this.cardType.BODY.MAXOBJ : jsonParmObj.obj.length;
			//			for(IdxTit=0; IdxTit < jsonParmObj.obj.length; IdxTit++){
			for (IdxTit = 0; IdxTit < maxElements; IdxTit++) {
				if (this.checkBody(this.cardType, jsonParmObj.obj[IdxTit].typeObj)) {
					// Se impostati i parametri di defaul per l'oggetto, devo reimpostare il parametro  
					if (this.mapParmObjBody.has(jsonParmObj.obj[IdxTit].typeObj)) {
						var parmDef = JSON.parse(this.mapParmObjBody.get(jsonParmObj.obj[IdxTit].typeObj));
						for (IdxPar = 0; IdxPar < parmDef.length; IdxPar++) {
							var name = parmDef[IdxPar].NAME;
							var value = parmDef[IdxPar].VALUE;
							jsonParmObj.obj[IdxTit].param[name] = value;
						}
					}
					obj = this.getItemObject(jsonParmObj.obj[IdxTit]);

					if (this.mapClassAggnObjBody.has(jsonParmObj.obj[IdxTit].typeObj)) {
						//						var classAggn = ;
						obj.addClass(JSON.parse(this.mapClassAggnObjBody.get(jsonParmObj.obj[IdxTit].typeObj)));
					}

					// devo modificare qui facendomi passare anche la colonna, se colonna compilata lo aggiungo al div della colonna
                    if (this.cardColumns && this.cardColumns.length > 0){
                        if(jsonParmObj.obj[IdxTit].Col <= this.cardColumns.length){
                            this.cardColumns[jsonParmObj.obj[IdxTit].Col-1].appendChild(obj.getObject());
                        }else
                            hrifConsole("[HRIF] HrifCard.Body: l'oggetto inserito specifica una colonna che non esiste, non è stato possibile aggiungerlo.",'warn');
                    } else {
						this.stringBodyContentHtml += obj.getHtml();
                        this.addCustomObject(obj, this.idItemBody, this.classNameBody);
					}
				}
			}

            if (this.cardColumns && this.cardColumns.length > 0){
                for (let IdxCol = 0; IdxCol < this.cardColumns.length; IdxCol++){
                    // this.addCustomObject(this.cardColumns[IdxCol], this.idItemBody, this.classNameBody);
					if (this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0]){
						this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0].appendChild(this.cardColumns[IdxCol]);
					}
                }
				if (this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0])
					this.stringBodyContentHtml += this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0].innerHTML;
            }

			if (this.cardType.BODY.MAXOBJ < jsonParmObj.obj.length) {
				hrifConsole("[HRIF] HrifCard.BODY: superato il numero massimo di oggetti [" + this.cardType.BODY.MAXOBJ + "] per la sezione", 'warn');
			}
		}
	};
	// Gestione dei controlli del BODY
	this.checkBody = function (cardType, typeObj) {
		// eventualmente qui devono essere inseriti controlli futuri strettamente del HEADER
		return this.checkSection(cardType.BODY, typeObj, 'Body');
	};
	if (typeof (jsonCardBodyParm) != 'undefined' && jsonCardBodyParm != "") {
		this.addBody(jsonCardBodyParm);
	}


	/** Carica gli oggetti passati nel Json nella sezione Footer -----------------------------------------------<
	* @param {hrifGetJsonCardObjParm} json - json contenente gli oggetti da caricare
	* @returns {null} Carica gli oggetti passati nel Json nella sezione Footer.
	*/
	this.addFooter = function (jsonParmObj) {
		if (jsonParmObj.obj) {
			var maxElements = (this.cardType.FOOTER.MAXOBJ < jsonParmObj.obj.length) ? this.cardType.FOOTER.MAXOBJ : jsonParmObj.obj.length;
			//			for(IdxTit=0; IdxTit < jsonParmObj.obj.length; IdxTit++){
			for (IdxTit = 0; IdxTit < maxElements; IdxTit++) {
				if (this.checkFooter(this.cardType, jsonParmObj.obj[IdxTit].typeObj)) {
					// Se impostati i parametri di defaul per l'oggetto, devo reimpostare il parametro  
					if (this.mapParmObjFooter.has(jsonParmObj.obj[IdxTit].typeObj)) {
						var parmDef = JSON.parse(this.mapParmObjFooter.get(jsonParmObj.obj[IdxTit].typeObj));
						for (IdxPar = 0; IdxPar < parmDef.length; IdxPar++) {
							var name = parmDef[IdxPar].NAME;
							var value = parmDef[IdxPar].VALUE;
							jsonParmObj.obj[IdxTit].param[name] = value;
						}
					}
					obj = this.getItemObject(jsonParmObj.obj[IdxTit]);
					this.addCustomObject(obj, this.idItemFooter, this.classNameFooter);
					this.stringFooterContentHtml += obj.getHtml();
				}
			}
			if (this.cardType.FOOTER.MAXOBJ < jsonParmObj.obj.length) {
				hrifConsole("[HRIF] HrifCard.FOOTER: superato il numero massimo di oggetti [" + this.cardType.FOOTER.MAXOBJ + "] per la sezione", 'warn');
			}
		}
	};
	// Gestione dei controlli del FOOTER
	this.checkFooter = function (cardType, typeObj) {
		// eventualmente qui devono essere inseriti controlli futuri strettamente del HEADER
		return this.checkSection(cardType.FOOTER, typeObj, 'Footer');
	};
	if (typeof (jsonCardFooterParm) != 'undefined' && jsonCardFooterParm != "") {
		this.addFooter(jsonCardFooterParm);
	}
	
	/** Azione da eseguire al Click
	* @param {string} action - Indica la funzione da eseguire.
	* @returns {null} Richiama l'azione indicata.
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
	// Carico l'azione passata 
	this.setAction(this.action);


	this.refreshHeader = function (jsonParmObj) {
		this.mapObjHeader.clear();
		this.removeSection(this.idItemHeader);
		this.addHeader(jsonParmObj);
	};
	this.refreshBody = function (jsonParmObj) {
		this.mapObjBody.clear();
		this.removeSection(this.idItemBody);
		this.addBody(jsonParmObj);
	};
	this.refreshFooter = function (jsonParmObj) {
		this.mapObjFooter.clear();
		this.removeSection(this.idItemFooter);
		this.addFooter(jsonParmObj);
	};

	this.removeSection = function (idItemSection) {
		var wrkRemove = document.getElementById(idItemSection);
		if (Ne(wrkRemove, null)) {
			// Cancello tutti i figli 
			while (wrkRemove.hasChildNodes()) {
				wrkRemove.removeChild(wrkRemove.firstChild);
			}
		}
	};

	/** Ritorna la stringa contenente il codice html
	* @returns {null} carica l'oggetto.
	*/
	this.getHtml = function () {
		if (this.wrkDocFrag.getElementsByClassName(this.classNameHeader) && typeof (this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0]) != 'undefined') {
			if (!this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0].hasChildNodes())
				this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0].remove();
		}

		this.wrkDocFrag = null;

		resultHeaderHtml = this.stringHeaderHtml.replace("</div>", this.stringHeaderContentHtml + "</div>");
		resultBodyHtml = this.stringBodyHtml.replace("</div>", this.stringBodyContentHtml + "</div>");
		resultFooterHtml = this.stringFooterHtml.replace("</div>", this.stringFooterContentHtml + "</div>");

		resultHtml = this.stringHtml.replace("</div>", this.stringImageHtml + resultHeaderHtml + resultBodyHtml + resultFooterHtml + "</div>");

		//		wrkOuterHTML = this.wrkDocFrag.outerHTML;
		//		if (stringBodyHtml!=""){
		//			bodyOuterHTML =  this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0].outerHTML;
		//			replaceBody = OuterHTML.replace("</div>", stringBodyHtml + "</div>");
		//			bbbb = wrkOuterHTML.replace(this.wrkDocFrag.getElementsByClassName(this.classNameBody)[0].outerHTML, replaceBody);
		//		} else {
		//			resultOuterHTML = wrkOuterHTML;
		//		}

		return resultHtml;
		//		return resultOuterHTML;
		//return this.wrkDocFrag.outerHTML;
	};

	/** Ritorna l'oggetto
	* @ignore
	* @returns {null} Ritorna l'oggetto.
	*/
	this.getObject = function () {
		return this.wrkDocFrag;
	};

	/** Definizione del tooltip
	* @param {string} tooltip - Testo del tooltip
	* @returns {string} Visualizzazione del tooltip aggiornato.
	*/
	this.setTooltip = function (tooltip) {
		this.tooltip = tooltip;
		this.wrkDocFrag.header = this.tooltip;
	};
	if (typeof (this.tooltip) != "undefined" && this.tooltip != "")
		this.setTooltip(this.tooltip);

	this.addClass = function (className) {
		hrifAddClass(this.docCardFrag.getElementById(this.idItem), className);
	};


	// Caricamento dell'oggetto nel parentObjIdParm
	this.Load = function (parentObjIdParm) {
		if (this.wrkDocFrag.getElementsByClassName(this.classNameHeader) && typeof (this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0]) != 'undefined') {
			if (!this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0].hasChildNodes())
				this.wrkDocFrag.getElementsByClassName(this.classNameHeader)[0].remove();
		}

		appendObjectIntoDocument(this.wrkDocFrag, parentObjIdParm);
		this.isLoaded = true;
	};

};



/** Aggiunge un ultimo elemento customizzato alla grid card
* @ignore
* @class hrifGridAddRowCustomObject
* @memberOf Grid
* @param {object} form - Oggetto "Portlet" (this)
* @param {object} grid - Oggetto "Grid" (this.nomeGrid)
* @param {object} customObject - Oggetto custom
* @returns {null} Aggiunge un ultimo elemento customizzato alla grid card
*/
function hrifGridAddRowCustomObject(form, grid, customObject, viewMode) {

	this.docFrag = document.createDocumentFragment();
	documentFrag(this.docFrag, 'div', grid.ctrlid + 'hrifmore', '', "grid__more");
	this.docFrag.getElementById(grid.ctrlid + 'hrifmore').appendChild(customObject.getObject());

	if (viewMode == hrifVIEWMODE.WEB)
		hrifAddClass(this.docFrag.children[0], "mobile-hidden-display");
	else if (viewMode == hrifVIEWMODE.MOBILE)
		hrifAddClass(this.docFrag.children[0], "web-hidden-display");

	var wrkDoc = document.getElementById('tbl' + grid.ctrlid);
	wrkDoc.appendChild(this.docFrag.children[0]);

}

/** Aggiunge, come primo oggetto della grid, l'elemento customizzato
* @ignore 
* @class hrifGridAddRowCustomObjectBefore
* @memberOf Cards
* @memberOf Grid
* @param {object} form - Oggetto "Portlet" (this)
* @param {object} grid - Oggetto "Grid" (this.nomeGrid)
* @param {object} customObject - Oggetto custom
* @returns {null} Aggiunge un ultimo elemento customizzato alla grid card
*/
function hrifGridAddRowCustomObjectBefore(form, grid, customObject, viewMode) {

	this.docFrag = document.createDocumentFragment();
	documentFrag(this.docFrag, 'div', grid.ctrlid + 'hrifaddfirst', '', "grid__addfirst");
	this.docFrag.getElementById(grid.ctrlid + 'hrifaddfirst').prepend(customObject.getObject());

	//	if (viewMode==hrifVIEWMODE.WEB)
	//		hrifAddClass(this.docFrag.children[0], "mobile-hidden-display");
	//	else if (viewMode==hrifVIEWMODE.MOBILE)
	//		hrifAddClass(this.docFrag.children[0], "web-hidden-display");
	
	// Rimuovo l'elemento formid_GridBooked_grid_no_data se presente
	let wrkGridNoData = document.getElementById(grid.ctrlid + '_grid_no_data');
	if (wrkGridNoData)	wrkGridNoData.remove();

	var wrkDoc = document.getElementById('tbl' + grid.ctrlid);
	wrkDoc.prepend(this.docFrag.children[0]);

}

// /** Area parametri per la gestione del Highlightbox
// * @class
// * @param {json|object} JsonCardHighlightbox
// * @param {string} jsonLabelParm.IdItem - Id (chiave) del Button.
// * @param {string} jsonLabelParm.Label - Testo da inserire nella Label.
// * @param {string} jsonLabelParm.Tooltip - Tooltip.
// * @param {string} jsonLabelParm.Action - Azione da eseguire al click.
// * @param {string} jsonLabelParm.Image - Percorso immagine da visualizzare nel Button.
// * @param {json|object} jsonLabelParm.Style - Oggetto contenente tutte le proprietà di style relative .
// * @returns.
// */
function hrifGetJsonCardHighlightbox() {

	var jsonHighlightbox = hrifGetJsonHighlightbox();
	return {
		typeObj: "HrifHighlightbox",
		param: jsonHighlightbox
	};

}



/** Aggiunge un ultimo elemento customizzato alla grid card - Da cancellare
* @ignore
* @class hrifGridAddRowCustomObject
* @memberOf Grid
* @param {object} form - Oggetto "Portlet" (this)
* @param {object} grid - Oggetto "Grid" (this.nomeGrid)
* @param {object} customObject - Oggetto custom
* @returns {null} Aggiunge un ultimo elemento customizzato alla grid card
*/
function hrifGridAddRowCard(form, grid, customObject, viewMode) {

	this.docFrag = document.createDocumentFragment();
	documentFrag(this.docFrag, 'div', grid.ctrlid + 'hrifmore', '', "grid_card_container grid__more");
	this.docFrag.getElementById(grid.ctrlid + 'hrifmore').appendChild(customObject.getObject());

	if (viewMode == hrifVIEWMODE.WEB)
		hrifAddClass(this.docFrag.children[0], "mobile-hidden-display");
	else if (viewMode == hrifVIEWMODE.MOBILE)
		hrifAddClass(this.docFrag.children[0], "web-hidden-display");

	var wrkDoc = document.getElementById('tbl' + grid.ctrlid);
	wrkDoc.appendChild(this.docFrag.children[0]);

}

/** Aggiunge un ultimo elemento customizzato alla grid card - Da cancellare
* @ignore
* @class hrifGridAddRowCustomObject
* @memberOf Grid
* @param {object} form - Oggetto "Portlet" (this)
* @param {object} grid - Oggetto "Grid" (this.nomeGrid)
* @param {object} customObject - Oggetto custom
* @returns {null} Aggiunge un ultimo elemento customizzato alla grid card
*/
function hrifGridAddRowCardBefore(form, grid, customObject, viewMode) {

	this.docFrag = document.createDocumentFragment();
	documentFrag(this.docFrag, 'div', grid.ctrlid + 'hrifmore', '', "grid_card_container grid_card__first");
	this.docFrag.getElementById(grid.ctrlid + 'hrifmore').prepend(customObject.getObject());

	if (viewMode == hrifVIEWMODE.WEB)
		hrifAddClass(this.docFrag.children[0], "mobile-hidden-display");
	else if (viewMode == hrifVIEWMODE.MOBILE)
		hrifAddClass(this.docFrag.children[0], "web-hidden-display");

	var wrkDoc = document.getElementById('tbl' + grid.ctrlid);
	wrkDoc.prepend(this.docFrag.children[0]);

}


function deleteJsonObj(json, jsonObj){
	
	if (json && json.obj) {
    	for (let idx = 0; idx < json.obj.length; idx++) {
      		if (json.obj[idx].typeObj === jsonObj) {
        		// Rimuovi l'oggetto dall'array obj
        		let param = json.obj[idx].param; 
        		json.obj.splice(idx, 1);
        		return param;
      		}
    	}
  	}
	
}

//deleteJsonObj(jsonCard.HEADER, "HrifTitle");
function modificaJson(json, jsonObj, param) {
	
  if (json && json.obj) {
    for (let idx = 0; idx < json.obj.length; idx++) {
      if (json.obj[idx].typeObj === jsonObj) {
        // Modifica l'oggetto trovato 
        if (param.Status) json.obj[idx].param['Status'] = param.Status;
        if (param.Label) json.obj[idx].param['StatusValue'] = param.Label;
        break;
      }
    }
  }

  // Restituisci il JSON modificato
  return json;
  
}




//function HrifLabelMarkDown(form, jsonLabelParam){
//
//	var label = new HrifLabel(form,jsonLabelParam);
//	label.ValueMarkdown(jsonLabelParam.Label);
//	return label;
//
//}

//# sourceURL=../../HRPORTAL/binframework/js/hrif2_card.js
