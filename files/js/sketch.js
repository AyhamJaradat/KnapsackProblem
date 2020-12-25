
// Genetic Algorithm, Evolving Knapsack Problem
var population;

var bestPhrase;
var allPhrases;
var stats;

function setup(demoId) {

	population = new Population(MUTATION_RATE, GENERATION_SIZE,
			MAIN_DEMOS[demoId]);

	draw(demoId);
}

function draw(demoId) {
	MAIN_DEMOS[demoId].sTime = new Date().getTime();
	dotheJob(demoId);
	// while (population.isFinished() == false) {
	//		
	// // Create next generation
	// population.generate();
	// // Calculate fitness
	// population.calcFitness();
	//
	// population.evaluate();
	//
	// // // If we found the target phrase, stop
	// // if (population.isFinished()) {
	// // // println(millis()/1000.0);
	// // noLoop();
	// // }
	//
	// displayInfo(demoId);
	//		
	//
	// }
}

function dotheJob(demoId) {
	// Create next generation
	population.generate();
	// Calculate fitness
	population.calcFitness();
	population.evaluate();
	displayInfo(demoId);
	if (population.isFinished() == false) {
		setTimeout(function() {
			dotheJob(demoId);
		}, IS_ANIMATION ? 100: 0);
	} else {
		// update status to finished
		var container = $('#' + demoId + 'Area .demoBagDrawing');
		container.find('.mainBagInfo .status').addClass('finish').html(
				"Status: GA Algo finished :)");
		// finish Time
		MAIN_DEMOS[demoId].fTime = new Date().getTime();
		container.find('.mainBagInfo .time').html(
		"Time in ms: "+(MAIN_DEMOS[demoId].fTime-MAIN_DEMOS[demoId].sTime));
		
	}
}

function displayInfo(demoId) {

	var container = $('#' + demoId + 'Area .demoBagDrawing');
	// Display current status of population
	var answer = population.getBest();

	container.find('.mainBagInfo .status').removeClass('finish').html(
			"Status: GA Algo is running ...");
	container.find('.mainBagInfo .numberOfGenerations').html(
			"Total generation: "+population.getGenerations());
	container.find('.mainBagInfo .bestGene').html(
			"Best choice: " + answer.getPhrase());
	container.find('.mainBagInfo .w').html(
			"Total Weight: " + answer.totalWeight);
	container.find('.mainBagInfo .b').html(
			"Total benefit: " + answer.totalBenefit);
	container.find('.mainBagInfo .capacity').html(
			"Max Capacity: " + MAIN_DEMOS[demoId].maxCapacity);
	MAIN_DEMOS[demoId].fTime = new Date().getTime();
	container.find('.mainBagInfo .time').html(
			"Time in ms: "+(MAIN_DEMOS[demoId].fTime-MAIN_DEMOS[demoId].sTime));

	// draw effect
	var hightOfWall = (answer.totalWeight * 200 / MAIN_DEMOS[demoId].maxCapacity)
			.toFixed(0);
	container.find('.mainWrap .mainCube .wall').css('box-shadow',
			('0px -' + hightOfWall + 'px 0px 0px rgba(0, 0, 0, 0.35) inset'));

	// hilight the selected boxes
	var boxesWrapers = $('#' + demoId + 'Area .allEleents .wrap');
	var bestGene = answer.genes;
	for (var i = 0; i < boxesWrapers.length; i++) {
		if (typeof i != "undefined") {
			if (bestGene[i] == 1) {
				$(boxesWrapers[i]).addClass('selected ');
			} else {
				$(boxesWrapers[i]).removeClass('selected ');
			}
		}
	}
	// draw all generation
	var container = $('#' + demoId + 'Area .allGenerations');
	container.html("<div>Generations:</div>" + population.allPhrases());

}
