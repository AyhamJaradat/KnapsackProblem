// functions to handle uploading and opining new text file
function uploadDataFile() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		document.getElementById('files').addEventListener('change',
				handleFileSelect, false);
		// Setup the dnd listeners.
		var dropZone = document.getElementById('drop_zone');
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileDrageSelect, false);
		// show dialog
		$('#openFileContainer #files')[0].value = "";
		$('#openFileContainer').addClass('show');

		$('#openFileContainer').bind('click', function(e) {
			if ((e.target === e.currentTarget) && e.target === this) {
				$('#openFileContainer').removeClass('show');
			}
			e.stopPropagation();
		});
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}

}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	readSelectedFile(files);
}
function handleFileDrageSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	var files = evt.dataTransfer.files; // FileList object.
	readSelectedFile(files);
}
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function readSelectedFile(files) {
	// files is a FileList of File objects. List some properties.
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		reader.onerror = errorHandler;
		reader.onabort = function(e) {
			alert('File read cancelled');
		};
		reader.onloadstart = function(e) {
			$('#openFileDaialog .spinner').addClass('show');
		};

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// REad File
				var fileContent = e.target.result;
				var fileName = escape(theFile.name);
				$('#openFileDaialog .spinner').removeClass('show');
				$('#openFileContainer').removeClass('show');

				// handleFile
				parseSelectedFile(fileContent, fileName);
			};
		})(f);
		// Read in the image file as a data URL.
		// reader.readAsDataURL(f);
		reader.readAsText(f);

	}
}

function errorHandler(evt) {
	switch (evt.target.error.code) {
	case evt.target.error.NOT_FOUND_ERR:
		alert('File Not Found!');
		break;
	case evt.target.error.NOT_READABLE_ERR:
		alert('File is not readable');
		break;
	case evt.target.error.ABORT_ERR:
		break; // noop
	default:
		alert('An error occurred reading this file.');
	}

}
function updateProgress(evt) {
	// evt is an ProgressEvent.
	if (evt.lengthComputable) {
		var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
		// Increase the progress bar length.
		if (percentLoaded < 100) {
			$();
		}
	}
}

function parseSelectedFile(fileContent, fileName) {
	var data = {};
	data.lable = fileName;
	data.id = fileName.replace(/\s/g, '');

	var numOfElement = 0;
	var lines = fileContent.split("\n");
	var valuesList = [];
	data.maxCapacity = lines[0];
	for (var i = 1; i < lines.length; i++) {
		var values = lines[i].split("\t");
		valuesList.push({
			"weight" : parseInt(values[0]),
			"benefit" :parseInt(values[1])
		});
		numOfElement++;
	}

	data.elements = valuesList;
	data.numOfElements = numOfElement;
	DATA_INPUT_SAMPLE.push(data);
	initializeCombobox();
}