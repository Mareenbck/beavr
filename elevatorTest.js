const recalculateRoad = (demandStair, currentStair) => {
	const up = demandStair.filter(a => a >= currentStair).sort((a, b) => a - b);
	const down = demandStair.filter(a => a < currentStair).sort((a, b) => b - a);

	// choosing the direction based on the shortest
	if (up[up.length - 1] - currentStair < currentStair - down[down.length - 1]) {
		return up.concat(down)
	} else {
		return down.concat(up);
	}
};

const elevator = (requests) => {
	if (requests.length === 0) {
		return [];
	}

	// init values with first demand
	let elevatorRoute = [requests[0].currentStair];
	let currentStair = requests[0].currentStair;
	let requestedStairs = requests[0].demandStair;
	let visitedStairs = new Set([currentStair]);

	// new calcul with other passengers
	for (let i = 0; i < requests.length; i++) {
		requestedStairs.push(requests[i].demandStair)
		const newRoute = recalculateRoad(requestedStairs, currentStair);

		for (let j = 0; j < newRoute.length; j++) {
			if (!visitedStairs.has(newRoute[j])) {
				elevatorRoute.push(newRoute[j]);
				visitedStairs.add(newRoute[j]);
			}
			currentStair = newRoute[j];
		}
	}
	return elevatorRoute;
};

const data = [
	{
		currentStair: 0,
		demandStair: [2, 3, 1, 5, -1, 0],
	},
	{
		currentStair: 0,
		demandStair: 7,
	},
	{
		currentStair: 5,
		demandStair: -2,
	},
	{
		currentStair: 3,
		demandStair: -4,
	}
];

const compareOutput = (output, expected) => {
	const outputStr = output.join(',');
	return outputStr === expected;
};

const expectedResult = '0,-1,1,2,3,5,7,-2,-4';
const result = elevator(data);

console.log(result, compareOutput(result, expectedResult));

