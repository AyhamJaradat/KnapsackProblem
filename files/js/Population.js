// Genetic Algorithm,  for knapsack problem

/**
 * @param m:
 *            mutation Ratio
 * @param num:
 *            size of population
 * @param myData:
 *            elements data object
 */
function Population(m, num, myData) {

	this.population; // Array to hold the current population
	this.generations = 0; // Number of generations evaluated for now
	this.finished = false; // Are we finished evolving?
	this.mutationRate = m; // Mutation rate
	// this.perfectScore = 1; // perfect score for now
	this.data = myData;
	// summation of benefits of all popuation
	// used for prop calculation
	this.totalBenefit = 0;
	this.best = null;
	this.secondBest = null;
	this.population = [];
	// this.firstBestIndex = null;
	// this.secondBestIndex = null;
	// generate first random population
	for (var i = 0; i < num; i++) {
		this.population[i] = new DNA(this.data);
	}

	// Fill our fitness array with a value for every member of the population
	this.calcFitness = function() {
		this.totalBenefit = 0;
		for (var i = 0; i < this.population.length; i++) {
			var benefet = this.population[i].calcFitness();
			this.totalBenefit += benefet;
		}
	};
	// calculate fitness for all genes in the population
	this.calcFitness();

	// select a random parent randomly
	this.naturalSelection = function() {
		var rand = Math.random() * this.totalBenefit;
		for (var i = 0; i < this.population.length; i++) {
			var population = this.population[i];
			if (rand < population.fitness) {
				return population;
			}
			rand -= population.fitness;
		}
	};
	// Create a new generation from the old generation using cross over
	this.generate = function() {
		var newPopulation = [];
		var i = 0;
		// if Elitism is enabled
		if (IS_ELITESIM && this.best && this.secondBest) {
			newPopulation.push(this.best);
			newPopulation.push(this.secondBest);
			i = 2;
		}
		// Refill the population with children from the mating pool
		for (; i < this.population.length; i++) {
			var partnerA = this.naturalSelection();
			var partnerB = this.naturalSelection();
			// do cross over
			var child = null;
			if (CROSSOVER_TYPE == 1) {
				child = partnerA.crossoverMiddle(partnerB);
			} else if (CROSSOVER_TYPE == 2) {
				child = partnerA.crossoverRandom(partnerB);
			} else {
				child = partnerA.crossoverUniform(partnerB);
			}

			// do mutation
			child.mutate(this.mutationRate);
			// add obtained child
			newPopulation[i] = child;
		}
		// update the new generation
		this.population = newPopulation;
		this.generations++; // update number of generation
	};

	// get the best gene in this population
	this.getBest = function() {
		return this.best;
	};
	this.getSecondBest = function() {
		return this.secondBest;
	};

	// Compute the current "most fit" member of the population
	this.evaluate = function() {
		var worldrecord1 = 0;
		var worldrecord2 = 0;
		var index1 = 0;
		var index2 = 0;
		for (var i = 0; i < this.population.length; i++) {
			if (this.population[i].fitness > worldrecord1) {
				worldrecord2 = worldrecord1;
				index2 = index1;
				index1 = i;
				worldrecord1 = this.population[i].fitness;
			} else if (this.population[i].fitness > worldrecord2) {
				index2 = i;
				worldrecord2 = this.population[i].fitness;
			}
		}

		// Good , but don't affect the drawing
		// var currentBest = this.population[index];
		// if(!this.best || this.best.fitness <= currentBest.fitness ){
		// this.best = this.population[index];
		// }
		this.best = this.population[index1];
		this.secondBest = this.population[index2];
		// check stop condition
		if (this.isNintyPercentTheSame() || this.generations >= MAX_TO_STOP) {
			this.finished = true;
		}
	};

	// check if finish condition is accomplished
	this.isFinished = function() {
		return this.finished;
	};
	// get Number of generations evaluated for now
	this.getGenerations = function() {
		return this.generations;
	};

	// get all genes phrases to be print out
	this.allPhrases = function() {
		var everything = "";
		for (var i = 0; i < this.population.length; i++) {
			everything += ("<div class='gene' >"
					+ this.population[i].getPhrase() + "</div>");
		}
		return everything;
	};
	this.isNintyPercentTheSame = function(arr) {

		var arr = this.population;
		var dupsCount = {};// , result = [];
		var nintyPercentCount = arr.length * .9;

		for (var i = 0; i < arr.length; i++) {
			if (typeof dupsCount[arr[i].fitness] == "undefined") {
				dupsCount[arr[i].fitness] = 0;
			} else {
				dupsCount[arr[i].fitness]++;
			}
		}

		for ( var key in dupsCount) {
			if (dupsCount[key] > nintyPercentCount) {
				return true;
				// result.push(Number(key));
			}
		}
		// return result;
		return false;
	};
}
