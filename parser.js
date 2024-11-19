function betaEvaluator(obj){
    console.log(`${obj.firstNumber}${obj.opperand}${obj.secondNumber}`);
}

let mathExpression = {
    index: 0,
    firstNumber: 0,
    secondNumber: 0,
    opperand: '',
};

const opperands = {
    plus: {symbol: '+', precedence: 1},
    minus: {symbol: '-', precedence: 1},
    mult: {symbol: '*', precedence: 2},
    div: {symbol: '/', precedence: 2},
    mod: {symbol: '%', precedence: 2},
    exp: {symbol: '^', precedence: 3},
}

let maxPrecedence = 0;

// Finds first max precedence event. PEMDAS without parenthesis behaviour.

function noParenthesisParser(mathString) {
    let i = 0;
    array = mathString.split('');
    for (character of array){
        for (key in opperands){
            if (opperands[key].symbol === character){
                if (opperands[key].precedence>maxPrecedence){
                    maxPrecedence = opperands[key].precedence;
                    mathExpression.index = i;
                    mathExpression.firstNumber = array[i-1];
                    mathExpression.secondNumber = array[i+1];
                    mathExpression.opperand = character;
                }
            }
        }
        i++;
    }
    betaEvaluator(mathExpression);
}