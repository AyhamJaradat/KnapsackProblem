// variable to hold information about each demo
var DEMO = new function() {

	this.numOfElements = 5;

	this.elements = {};

	this.maxCapacity = 55;

};

var DEMO_ID_INC = 0;
var NUM_OF_DEMOS = 0;
var CUURENT_OPEN_DEMO = null;

var MAIN_DEMOS = {};
// sample data 
var DATA_INPUT_SAMPLE = [ {
	lable : "sample Data 1",
	id : "sampleData1",
	numOfElements : 5,
	maxCapacity : 11,
	elements : [ {
		weight : 1,
		benefit : 1,
	}, {
		weight : 2,
		benefit : 6,
	}, {
		weight : 5,
		benefit : 18,
	}, {
		weight : 6,
		benefit : 22,
	}, {
		weight : 7,
		benefit : 28,
	} ]
}, {
	lable : "sample Data 2",
	id : "sampleData2",
	numOfElements : 14,
	maxCapacity : 100,
	elements : [ {
		weight : 99,
		benefit : 1,
	}, {
		weight : 94,
		benefit : 2,
	}, {
		weight : 79,
		benefit : 3,
	}, {
		weight : 64,
		benefit : 4,
	}, {
		weight : 50,
		benefit : 5,
	}, {
		weight : 46,
		benefit : 5,
	}, {
		weight : 43,
		benefit : 6,
	}, {
		weight : 37,
		benefit : 6,
	}, {
		weight : 32,
		benefit : 4,
	}, {
		weight : 19,
		benefit : 3,
	}, {
		weight : 18,
		benefit : 6,
	}, {
		weight : 7,
		benefit : 7,
	}, {
		weight : 6,
		benefit : 2,
	}, {
		weight : 3,
		benefit : 4,
	} ]
} ];

var SELECTED_DATA = DATA_INPUT_SAMPLE[0];

var GENERATION_SIZE = 200;
var MUTATION_RATE = 0.01;
var MAX_TO_STOP = 1000;

var IS_ELITESIM = true;
var CROSSOVER_TYPE = 1;
var IS_ANIMATION = true;
