
// Genetic Algorithm, for knapsack problem

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- crossover DNA with another set of DNA
//      -- mutate DNA

// Constructor (makes a random DNA)
function DNA(myData) {
	// The genetic sequence
	this.genes = []; // values of the gene (0,...1)
	this.data = myData; // holds info about items
	this.elements = myData.elements;
	var num = this.elements.length; // number of elements to choose from
	this.fitness = 0; // fitness of this gene
	this.totalWeight = 0; // total weight of gene
	this.totalBenefit = 0; // total benefits by this gene

	// generate this gene randomly
	for (var i = 0; i < num; i++) {
		this.genes[i] = Math.floor(Math.random() * 2); // Pick 0 or 1 randomly
	}

	// Converts character array to a String
	this.getPhrase = function() {
		return this.genes.join("");
	};

	// Fitness function (returns floating point % of "correct" characters)
	this.calcFitness = function() {
		// var score = 0;
		var totalBenefit = 0;
		var totalWeight = 0;
		for (var i = 0; i < this.genes.length; i++) {
			if (this.genes[i] == 1) {
				totalWeight += this.elements[i].weight;
				totalBenefit += this.elements[i].benefit;
			}
		}
		// if the Weight is over remove random element
		while (totalWeight > this.data.maxCapacity) {
			var randomIndex = Math.floor(Math.random() * num);
			while (this.genes[randomIndex] == 0) {
				randomIndex = Math.floor(Math.random() * num);
			}
			// found element to delete, update gene
			this.genes[randomIndex] = 0;
			totalWeight -= this.elements[randomIndex].weight;
			totalBenefit -= this.elements[randomIndex].benefit;
		}
		// update gene totals
		this.totalWeight = totalWeight;
		this.totalBenefit = totalBenefit;
		// calculate final-fitness of the gene
		this.fitness = totalBenefit * totalBenefit;
		return this.fitness;
		// this.fitness = score / target.length;
	};

	// Crossover Random
	this.crossoverRandom = function(partner) {
		// A new child
		var child = new DNA(this.data);
		var midpoint = Math.floor(Math.random() * this.genes.length); // Pick
		// a
		// random
		// midpoint
		// cross over , Half from one, half from the other
		for (var i = 0; i < this.genes.length; i++) {
			if (i > midpoint)
				child.genes[i] = this.genes[i];
			else
				child.genes[i] = partner.genes[i];
		}
		return child;
	};
	// cross over in the middle
	this.crossoverMiddle = function(partner) {
		// A new child
		var child = new DNA(this.data);
		var midpoint = Math.floor(this.genes.length / 2);// midpoint
		// cross over , Half from one, half from the other
		for (var i = 0; i < this.genes.length; i++) {
			if (i > midpoint)
				child.genes[i] = this.genes[i];
			else
				child.genes[i] = partner.genes[i];
		}
		return child;
	};
	// uniform cross over
	this.crossoverUniform = function(partner) {
		// A new child
		var child = new DNA(this.data);
		var mixingRatio = 0.5;
		// cross over , Half from one, half from the other
		for (var i = 0; i < this.genes.length; i++) {
			if (Math.random() < mixingRatio)
				child.genes[i] = this.genes[i];
			else
				child.genes[i] = partner.genes[i];
		}
		return child;
	};

	// Based on a mutation probability, picks a new random character
	this.mutate = function(mutationRate) {
		for (var i = 0; i < this.genes.length; i++) {
			if (Math.random() < mutationRate) {
				if (this.genes[i] == 1) {
					this.genes[i] = 0;
				} else {
					this.genes[i] = 1;
				}
			}
		}
	};
}
