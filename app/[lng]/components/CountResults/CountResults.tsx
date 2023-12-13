import type { Question } from "@/app/globalContext";

function multiplyWeights(answer: Question) {
	if (answer.value <= 2) {
		return answer.value * 0.3;
	} else if (answer.value <= 4) {
		return answer.value;
	} else if (answer.value == 5) {
		return answer.value * 2;
	} else {
		return answer.value * 3;
	}
}

export function CountResults(answerList: Question[]) {
	const result = new Map();
	const resultArray: Array<{ category: string; weight: number }> = [];
	for (let i = 0; i < answerList.length; i++) {
		if (result.has(answerList[i].type)) {
			result.set(
				answerList[i].type,
				result.get(answerList[i].type) + multiplyWeights(answerList[i])
			);
		} else {
			result.set(answerList[i].type, multiplyWeights(answerList[i]));
		}
	}
	result.forEach((value, key) => {
		resultArray.push({ category: key, weight: value });
	});

	return resultArray;
}
