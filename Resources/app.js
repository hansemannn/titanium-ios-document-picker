import TiDocumentPicker from 'titanium-document-picker';

const win = Ti.UI.createWindow({
	backgroundColor: '#fff'
});

var btn = Ti.UI.createButton({
	title: 'Select Document'
});

btn.addEventListener('click', () => {
	TiDocumentPicker.show({
		utis: ['com.adobe.pdf'],
		select: (urls) => {
			Ti.API.info(urls);
		},
		cancel: () => {
			Ti.API.debug('**** TiDocumentPicker => CANCEL');
		},
		popoverView: btn
	});
});

win.add(btn);
win.open();
