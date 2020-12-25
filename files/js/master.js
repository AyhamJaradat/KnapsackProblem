/**
 * The main Run starts from here
 */
$(document).ready(function() {
	// create left panel menu buttons
	createLeftPanelMenuButtons();
	// create Main page layout
	createMainPageLayout($("#mainPageContainer"));
	// create user option panel
	createUserOptionPanel($("#mainPageInfoPanel"));

	// createNewDemo
	createNewDemo();

});

// function to close or open left menu
function closeOpenLeftPanel() {
	var leftPanelElement = $('#leftPanel');
	// check status and open or close it
	if (leftPanelElement.hasClass('closed')) {
		// it is closed .. open it
		leftPanelElement.removeClass('closed');
	} else {
		// it is open .. close it
		leftPanelElement.addClass('closed');
	}
}
/**
 * function to create Left Menu buttons
 */
function createLeftPanelMenuButtons() {
	var leftPanelElement = $('#leftPanelMenu');
	var html = "";
	html += "<div id='newMenuBtn' class='menuItem' onclick='createNewDemo()'><div class='menuIcon' />"
			+ "<div class='itemText'>New</div></div>";
	html += "<div id='openMenuBtn' class='menuItem' onclick='uploadDataFile()' ><div class='menuIcon'/>"
			+ "<div class='itemText'>Upload Data</div></div>";

	html += "<div class='settingsMenu' >";
	html += "<div class='mainLable'>Settings</div>";
	html += "<div class='elitism group'><div class='mainLable'>Use Elitism:</div>"
			+ "<input type='radio' name='elitism' value='2' onclick='checkElitism(this.value)' checked><span>Yes (2)</span><br>"
			+ "<input type='radio' name='elitism' value='0' onclick='checkElitism(this.value)'><span>No</span><br><br>"
			+ "</div>";
	html += "<div class='crossover group'><div class='mainLable'>Crossover:</div>"
			+ "<input type='radio' name='crossover' value='1' onclick='checkCrossover(this.value)' checked><span>middle point</span><br>"
			+ "<input type='radio' name='crossover' value='2'onclick='checkCrossover(this.value)'><span>random point</span><br>"
			+ "<input type='radio' name='crossover' value='3'onclick='checkCrossover(this.value)'><span>uniform</span><br>"
			+ "</div>";

	html += "<div class='speed group'><div class='mainLable'>Speed:</div>"
			+ "<input type='radio' name='speed' value='0' onclick='checkSpeed(this.value)'><span>real time</span><br>"
			+ "<input type='radio' name='speed' value='1' onclick='checkSpeed(this.value)' checked><span>animation</span><br>"
			+ "</div>";
	html += "</div>";

	$(leftPanelElement).html(html);
}

// Radio buttons setting on change functions
function checkElitism(value) {
	IS_ELITESIM = value == 0 ? false : true;
}
function checkCrossover(value) {
	CROSSOVER_TYPE = parseInt(value);
}
function checkSpeed(value) {
	IS_ANIMATION = value == 0 ? false : true;
}

/**
 * create user options panel
 * 
 * @param element
 */
function createUserOptionPanel(element) {
	var dataInputHTML = $('<div class="row"><div class="lable" >Data Input:</div><div class="dataCompobox value"></div></div>');
	var dataSizeHTML = $('<div class="row"><div class="lable" >Num Of Elements:</div><div class="numOfEleValue value"></div></div>');
	var maxCapacityHTML = $('<div class="row"><div class="lable" >Max Capacity:</div><div class="maxCapValue value"></div></div>');
	var button = $("<div class='button' onclick='runDemo()'><div class='lable'>Run</div></div>");

	var firstPanel = $('<div class="leftUserOption"></div>');
	firstPanel.append(dataInputHTML).append(dataSizeHTML).append(
			maxCapacityHTML).append(button);

	var SecondPanel = $('<div class="rightUserOption"></div>');

	var generationSize = $('<div class="row"><div class="lable" >Generatio Size:</div><div class="userInput value"><input type="number" name="generationSize" min="1" value="200" id="generationSize" onchange="changeGenerationSize(this)"/></div></div>');
	var mutationRate = $('<div class="row"><div class="lable" >Mutation Rate:</div><div class="userInput value"><input type="number" name="mutationRate" min="0" value="0.01" id="mutationRate" onchange="changeMutation(this)"/></div></div>');
	var maxGeneration = $('<div class="row"><div class="lable" ># of Gener. to STOP:</div><div class="userInput value"><input type="number" name="maxGeneration" min="1" value="1000" id="maxGeneration" onchange="changeMaxStop(this)"/></div></div>');
	SecondPanel.append(generationSize).append(mutationRate).append(
			maxGeneration);

	element.append(firstPanel).append(SecondPanel);

	// initialize inputData compobox
	initializeCombobox();

}
/**
 * function to change the generation size
 * 
 * @param element
 */
function changeGenerationSize(element) {
	if (element.value > 0) {
		GENERATION_SIZE = element.value;
	} else {
		element.value = 200;
		alert("Generation Size should be positive");
	}
}
/**
 * To change the Mutation ratio
 * 
 * @param element
 */
function changeMutation(element) {
	if (element.value > 0 && element.value < 1) {
		MUTATION_RATE = element.value;
	} else {
		element.value = 0.01;
		alert("Mutation Rate should be between 0 and 1");
	}
}
/**
 * To change the stop condition maximum
 * 
 * @param element
 */
function changeMaxStop(element) {
	if (element.value > 0) {
		MAX_TO_STOP = element.value;
	} else {
		element.value = 1000;
		alert("Generation Size should be positive");
	}
}
/**
 * To initialize the combo box of input data
 */
function initializeCombobox() {
	var listOfData = DATA_INPUT_SAMPLE;
	var compoboxHTML = '<select id="mCP" onchange="dataInputChange(this)">';
	for (var i = 0; i < listOfData.length; i++) {
		compoboxHTML += '<option value="' + listOfData[i].id + '">'
				+ listOfData[i].lable + '</option>';
	}
	compoboxHTML += '</select>';
	$("#mainPageInfoPanel .dataCompobox").html(compoboxHTML);
	// view info
	$("#mainPageInfoPanel .numOfEleValue").html(listOfData[0].numOfElements);
	$("#mainPageInfoPanel .maxCapValue").html(listOfData[0].maxCapacity);
}
/**
 * When changing the data sample input combo box
 * 
 * @param comboBox
 */
function dataInputChange(comboBox) {

	var id = comboBox.value;
	var listOfData = DATA_INPUT_SAMPLE;

	var selectedData = null;
	for (var i = 0; i < listOfData.length; i++) {
		if (listOfData[i].id == id) {
			selectedData = listOfData[i];
		}
	}
	SELECTED_DATA = selectedData;
	// view info
	$("#mainPageInfoPanel .numOfEleValue").html(SELECTED_DATA.numOfElements);
	$("#mainPageInfoPanel .maxCapValue").html(SELECTED_DATA.maxCapacity);

}
/**
 * function to create main page layout
 */
function createMainPageLayout(element) {
	var html = "";
	html += "<div id='mainPageInfoPanel' ></div>";
	html += "<div id='mainPageDemosContainer'>" + "<div id='MainTabs'></div>"
			+ "</div>";
	element.append($(html));
}

/**
 * function to create new graph area
 */
function createNewDemo(demoOptions) {
	if (!demoOptions)
		demoOptions = {};
	demoOptions = $.extend(true, {}, DEMO, demoOptions);

	var container = $("#mainPageDemosContainer");
	var grapHeaderContainer = $("#MainTabs");

	DEMO_ID_INC++;
	NUM_OF_DEMOS++;
	var demoId = "demo" + DEMO_ID_INC;
	var graphHeaderHtml = $("<div id="
			+ demoId
			+ "Header class='demoAreaHeader'><div class='title'>Demo"
			+ DEMO_ID_INC
			+ " </div><div class='changeBetween'></div><div class='closeDemo'></div></div>");
	graphHeaderHtml.click(function(e) {

		if (e.target.className == "closeDemo") {
			$('#' + demoId + 'Header').remove();
			$('#' + demoId + 'Area').remove();
			delete MAIN_DEMOS[demoId];
			NUM_OF_DEMOS--;
			if (NUM_OF_DEMOS > 0) {
				// get last graphId
				var i = 0;
				for ( var property in MAIN_DEMOS) {
					if (MAIN_DEMOS.hasOwnProperty(property)) {
						i++;
						if (i < NUM_OF_DEMOS)
							continue;
						// do stuff
						// MAIN_GRAPHS[property].graphTitle
						selectDemo(property);
						break;
					}
				}
			} else {
				// hide drawing menu
				$('.drawingMenuItem').addClass('hiden');
			}
		} else if (e.target.className.indexOf('changeBetween') !== -1) {
		// no time to be implemented now
		} else {
			selectDemo(demoId);
		}
		e.stopPropagation();

	});

	var demoAreaHtml = $("<div id="
			+ demoId
			+ "Area class='demoArea' ><div class='demoDataDrawing'><div class='allEleents'></div>"
			+ "<div class='allGenerations'></div></div><div class='demoBagDrawing'></div></div>");

	container.append(demoAreaHtml);

	grapHeaderContainer.append(graphHeaderHtml);
	if (!MAIN_DEMOS[demoId]) {
		MAIN_DEMOS[demoId] = $.extend(true, {}, demoOptions, {
			demoTitle : "Demo" + DEMO_ID_INC,
			demoId : demoId,
		});
	}
	if (MAIN_DEMOS[demoId].elements != null)
		selectDemo(demoId);
}

/**
 * function to be called when selecting a graph header
 * 
 * @param graphId
 */
function selectDemo(demoId) {
	$('.demoAreaHeader').removeClass('selected');
	$('.demoArea').removeClass('selected');

	$('#' + demoId + 'Header').addClass('selected');
	$('#' + demoId + 'Area').addClass('selected');

	CUURENT_OPEN_DEMO = demoId;

	// show add node button
	$('.drawingMenuItem').removeClass('hiden');
}

function runDemo() {
	var demoId = CUURENT_OPEN_DEMO;
	MAIN_DEMOS[demoId].numOfElements = SELECTED_DATA.numOfElements;
	MAIN_DEMOS[demoId].maxCapacity = SELECTED_DATA.maxCapacity;
	MAIN_DEMOS[demoId].elements = SELECTED_DATA.elements;
	// draw initial things
	drawDemo(demoId);
	// start the Algorithm
	setup(demoId);
}

//function to draw new demo tab
function drawDemo(demoId) {
	var container = $('#' + demoId + 'Area .allEleents');
	container.html('');
	var demo = MAIN_DEMOS[demoId];
	var elements = demo.elements;
	var elementsHTML = '';
	for (var i = 0; i < elements.length; i++) {
		var info = '<div class="info" ><div class="w" >w: '
				+ elements[i].weight + '</div><div class="b" >b: '
				+ elements[i].benefit + '</div><div class="i" >i: ' + i
				+ '</div></div>';
		elementsHTML += '<div class="wrap">' + '<div class="cube">'
				+ '<div class="front"></div>' + '<div class="back"></div>'
				+ '<div class="top"></div>' + '<div class="bottom"></div>'
				+ '<div class="left"></div>'
				+ '<div class="right"></div></div>' + info + '</div>';
	}

	container.append($(elementsHTML));

	// draw bag
	var container = $('#' + demoId + 'Area .demoBagDrawing');
	container.html('');
	var elementsHTML = '';
	var info = '<div class="mainBagInfo" ><div class="status" >Status: Not started yet! </div><div class="w" >Total Weight: '
			+ '</div><div class="b" >Total benefit :'
			+ '</div><div class="capacity" >Max Capacity: '
			+ '</div><div class="numberOfGenerations" >Total generation:'
			+ '</div>'
			+ '<div class="bestGene" ></div>'
			+ '<div class="time" >Time in ms:'
			+ '</div></div>';
	container.append($(info));
	elementsHTML += '<div class="mainWrap">' + '<div class="mainCube">'
			+ '<div class="front wall"></div>'
			+ '<div class="back wall"></div>' + '<div class="top"></div>'
			+ '<div class="bottom"></div>' + '<div class="left wall"></div>'
			+ '<div class="right wall"></div></div></div>';

	container.append($(elementsHTML));
}
