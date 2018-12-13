var TiApp = require('Titanium/TiApp');
var UIDocumentMenuViewController = require('UIKit/UIDocumentMenuViewController');
var UIDocumentPickerModeImport = require('UIKit').UIDocumentPickerModeImport;
if (Ti.Platform.osname === 'ipad') {
	var UIModalPresentation = require('UIKit').UIModalPresentationPopover;
} else {
	var UIModalPresentation = require('UIKit').UIModalPresentationFormSheet;
}

var DocumentPickerDelegate = require('./document-picker-delegate.js')

export default class TiDocumentPicker {
	static show(params = {}) {
		const selectCallback = params.select;
		const cancelCallback = params.cancel;
		const utis = params.utis;
		const sourceView = params.sourceView;
		
		if (!selectCallback) {
			throw new Error('Missing "select" callback');
			return;
		}
		
		if (!utis) {
			throw new Error('Missing required "utis" property');
			return;
		}
		
		if (Ti.Platform.osname === 'ipad' && !sourceView) {
			throw new Error('Missing required sourceView for iPad');
		}

		const importMenu = UIDocumentMenuViewController.alloc().initWithDocumentTypesInMode(utis || [], UIDocumentPickerModeImport);
		const pickerDelegate = new DocumentPickerDelegate();
		
		pickerDelegate.didPickDocumentAtURL = function(controller, url) {
			selectCallback([url.absoluteString]);
		};
		
		pickerDelegate.didPickDocumentAtURLs = function(controller, urls) {
			let results = [];

			for (let i = 0; i < urls.count; i++) {
				results.push(urls.objectAtIndex(i).absoluteString);
			}

			selectCallback(results);
		};
		
		pickerDelegate.didPickDocumentPicker = function(documentMenu, documentPicker) {
			documentPicker.delegate = pickerDelegate;
			TiApp.app().showModalController(documentPicker, true);
		};
		
		pickerDelegate.documentMenuWasCancelled = function(documentMenu) {
			cancelCallback && cancelCallback();
		};

		importMenu.delegate = pickerDelegate;
		importMenu.modalPresentationStyle = UIModalPresentation;

		// Assign source view to support iPad
		if (Ti.Platform.osname === 'ipad' && sourceView) {
			importMenu.popoverPresentationController.sourceView = sourceView;
		}

		TiApp.app().showModalController(importMenu, true);
	}
}
