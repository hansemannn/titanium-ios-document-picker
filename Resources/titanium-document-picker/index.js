var TiApp = require('Titanium/TiApp');
var UIDocumentMenuViewController = require('UIKit/UIDocumentMenuViewController');
var UIDocumentPickerModeImport = require('UIKit').UIDocumentPickerModeImport;
var UIModalPresentationFormSheet = require('UIKit').UIModalPresentationFormSheet;

var DocumentPickerDelegate = require('./document-picker-delegate.js')

export default class TiDocumentPicker {
	static show(params = {}) {
		const selectCallback = params.select;
		const cancelCallback = params.cancel;
		const utis = params.utis;
		
		if (!selectCallback) {
			throw 'Missing "select" callback';
			return;
		}
		
		if (!utis) {
			throw 'Missing uti\'s';
			return;
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

			return results;
		};
		
		pickerDelegate.didPickDocumentPicker = function(documentMenu, documentPicker) {
			documentPicker.delegate = pickerDelegate;
			TiApp.app().showModalController(documentPicker, true);
		};
		
		pickerDelegate.documentMenuWasCancelled = function(documentMenu) {
			cancelCallback && cancelCallback();
		};

		importMenu.delegate = pickerDelegate;
		importMenu.modalPresentationStyle = UIModalPresentationFormSheet;
		TiApp.app().showModalController(importMenu, true);
	}
}
