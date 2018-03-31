const MyDelegate = Hyperloop.defineClass('MyDelegate', 'NSObject', ['UIDocumentMenuDelegate', 'UIDocumentPickerDelegate', 'UINavigationControllerDelegate']);

// iOS 8-10 (Deprecated in iOS 11)
MyDelegate.addMethod({
	selector: 'documentPicker:didPickDocumentAtURL:',
	arguments: ['UIDocumentPickerViewController', 'NSURL'],
	callback: function (controller, url) {
		if (this.didPickDocumentAtURL) {
			this.didPickDocumentAtURL(controller, url);
		}
	}
});

// iOS 11+
MyDelegate.addMethod({
	selector: 'documentPicker:didPickDocumentsAtURLs:',
	arguments: ['UIDocumentPickerViewController', 'NSArray'],
	callback: function (controller, urls) {
		if (this.didPickDocumentAtURLs) {
			this.didPickDocumentAtURLs(controller, urls);
		}
	}
});

MyDelegate.addMethod({
	selector: 'documentMenu:didPickDocumentPicker:',
	arguments: ['UIDocumentMenuViewController', 'UIDocumentPickerViewController'],
	callback: function (documentMenu, documentPicker) {
		if (this.didPickDocumentPicker) {
			this.didPickDocumentPicker(documentMenu, documentPicker);
		}
	}
});

MyDelegate.addMethod({
	selector: 'documentMenuWasCancelled:',
	arguments: ['UIDocumentMenuViewController'],
	callback: function (documentMenu) {
		if (this.documentMenuWasCancelled) {
			this.documentMenuWasCancelled(documentMenu);
		}
	}
});

module.exports = MyDelegate;
