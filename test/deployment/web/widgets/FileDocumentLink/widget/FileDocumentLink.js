/*
    FileDocumentLink
    ========================

    @file      : FileDocumentLink.js
    @version   : 1.0
    @author    : Eric Tieniber
    @date      : Fri, 18 Sep 2015 01:04:45 GMT
    @copyright : 
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
	"dojo/dom-attr",
	"dojo/query",
    "dojo/_base/event",
    "dojo/text!FileDocumentLink/widget/template/FileDocumentLink.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoClass, dojoStyle, dojoArray, dojoLang, dojoText, dojoHtml, dojoAttr, domQuery, dojoEvent, widgetTemplate) {
    "use strict";
    
    // Declare widget's prototype.
    return declare("FileDocumentLink.widget.FileDocumentLink", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        aNode: null,

        // Parameters configured in the Modeler.
		linktext: null,

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            console.log(this.id + ".postCreate");
            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            console.log(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function() {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function() {},

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function(box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own. 
        },

        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function(e) {
            if (typeof document.ontouchstart !== "undefined") {
                dojoEvent.stop(e);
            }
        },

        // Attach events to HTML dom elements
        _setupEvents: function() {

        },

        // Rerender the interface.
        _updateRendering: function() {
			//Set the link text
			this.aNode.innerHTML = this._contextObj.get(this.linktext);
			
			//Set new tab or not
			if (this.showNewTab) {
				dojoAttr.set(this.aNode, "target", "_blank");
			}
			
			//Set the link href
			if (this._contextObj && this._contextObj.getAttribute('HasContents'))  {
				dojoAttr.set(this.aNode, "href", this._getFileUrl());
			} else {
				dojoAttr.set(this.aNode, "href", mx.moduleUrl("FileDocumentLink.widget", "ui/blank.html"));
			}
        },

        // Handle validations.
        _handleValidation: function(validations) {

        },

        // Clear validations.
        _clearValidations: function() {

        },

        // Show an error message.
        _showError: function(message) {

        },

        // Add a validation.
        _addValidation: function(message) {
            this._showError(message);
        },

        // Reset subscriptions.
        _resetSubscriptions: function() {
            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function(handle) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }
        },
		
		//Gets the context fileDocument URL
		_getFileUrl : function() {
			var url;
			if (this._contextObj === null || this._contextObj.getAttribute("Name") === null) {
				url = mx.moduleUrl("FileDocumentLink.widget", "ui/error.html");
			} else {
				url ="file?target=window&guid=" + this._contextObj.getGUID() + "&csrfToken=" + mx.session.getCSRFToken() + "&time=" + Date.now();
			}
			return url;
		}
    });
});

require(["FileDocumentLink/widget/FileDocumentLink"], function() {
    "use strict";
});
