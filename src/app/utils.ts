import { InputModel } from './models/InputModel';

const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

export function computeSimilarityIndex(firstInput: InputModel, secondInput: InputModel) {
    console.log('First Input time BTW keys: ', firstInput.timeBetweenKeys);
    console.log('Second Input time BTW keys: ', secondInput.timeBetweenKeys);

    let similarityIndex = 0;

    if (firstInput.value.length === secondInput.value.length) {
        similarityIndex += 100;
    }

    if (firstInput.value === secondInput.value) {
        similarityIndex += 200;
    }

    if (firstInput.timeBetweenKeys.length !== secondInput.timeBetweenKeys.length) {
        // console.log('The number of pressed keys are not equal!');
        return similarityIndex;
    }

    similarityIndex += computeTimeBetweenIndex(firstInput.timeBetweenKeys, secondInput.timeBetweenKeys);

    return similarityIndex;
}

function computeTimeBetweenIndex(firstInput: number[], secondInput: number[]) {
    let timeSimilarityIndex = 0;

    const difference = [];

    firstInput.forEach((val, i) => {
        difference.push(Math.abs(val - secondInput[i]));
    });

    console.log('Difference: ', difference);

    const max = Math.max(...difference);
    console.log('Max difference: ' + max);

    if (max > 500 && max < 1000) {
        timeSimilarityIndex += 50;
    } else if (max > 200 && max <= 500) {
        timeSimilarityIndex += 100;
    } else if (max <= 200) {
        timeSimilarityIndex += (300 - max);
    }

    const avg = average(difference);
    console.log('Average difference: ' + avg);

    if (avg <= 300) {
        timeSimilarityIndex += (300 - avg);
    }

    timeSimilarityIndex += computeTypingRythmIndex(difference);

    return timeSimilarityIndex;
}

function computeTypingRythmIndex(differenceArray: number[]) {
    let typingRythmIndex = 0;

    const arrayGradient = [];

    if (differenceArray.length < 2) {
        return typingRythmIndex;
    }

    for (let i = 0; i < differenceArray.length - 1; i++) {
        arrayGradient.push(differenceArray[i + 1] - differenceArray[i]);
    }

    console.log('Array gradient: ' + arrayGradient);

    const max = Math.max(...arrayGradient);
    const min = Math.min(...arrayGradient);
    const avg = average(arrayGradient);

    if (avg <= 200) {
        typingRythmIndex += (200 - avg);
    }

    if (max - min <= 100) {
        typingRythmIndex += (100 - (max - min));
    }

    return typingRythmIndex;
}
