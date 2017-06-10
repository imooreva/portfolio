var calcDisplay = output => document.getElementById('result').innerHTML = output;
var getDisplay = () => document.getElementById('result').innerHTML;

//listener for buttons
var btnClass = document.getElementsByClassName('btn');
var keyValue = i => handleKeyValue(i.target.value);
Array.from(btnClass).forEach((x) => x.addEventListener('click', keyValue));


var handleKeyValue = value => {
    switch (value) {
        case 'equals':
            return calcEquals();
        case 'Ans':
                if (!isNaN(getDisplay())) {
                    return;
                }
        case 'AC': //Clear everything
            return calcDisplay('0');
        case 'CE': //Remove last digit or operator
            if (getDisplay().length < 2) {
                return calcDisplay('0');
            } else {
                return calcDisplay(getDisplay().slice(0, -1));
            }
        case '/':
        case '*': //Prevent double entry of the above operators, for semantic/aesthetic purposes
            return noDoubleOps(value);
        case '-':
        case '+': //Prevent triple entry of the above operators, for semantic/aesthetic purposes
            return noTripleOps(value);
        case '.':
            //Prevent double entry of decimal
            if (getDisplay().slice(-1) == '.') {
                return;
            } else {
                return calcDisplay(getDisplay() + '.');
            }
        }
    if (getDisplay() == '0') {
        calcDisplay(value);
    } else {
        calcDisplay(getDisplay() + value);
    }
}

var calcEquals = () => {
    let x = getDisplay().replace(/\-{2,}/g, '+'); //replace '--' with '+' operator, assuming user wants to subtract a negative number e.g. 5-(-3)=8
    x = x.replace(/\+{2,}/g, '+'); //replace '++' with '+' operator, assuming user wants to add a positive number e.g. 5+(+3)=8
    if (getDisplay()) {
        calcDisplay(math.format(math.eval(x), 14));
    } else {
        calcDisplay('0');
    }
}

var noDoubleOps = value => {
    let lastChar = getDisplay()[getDisplay().length - 1];
    //prevent adding additional operators to expression if last character in string is one of the following
    if (lastChar == '/' || lastChar == '*' || lastChar == '-' || lastChar == '+') {
        return;
    } else {
        switch (value == '/' || value == '*') {
            case (value == '/'):
                return calcDisplay(getDisplay() + '/');
            case (value == '*'):
                return calcDisplay(getDisplay() + '*');
        }
    }
}

var noTripleOps = value => {
    let lastChars = getDisplay().slice(-2);
    //prevent adding additional operators to expression if last two characters are one of the following
    if (lastChars == '--' || lastChars == '-+' || lastChars == '++' || lastChars == '+-') {
        return;
    } else {
        switch (value == '-' || value == '+') {
            case (value == '-'):
                return calcDisplay(getDisplay() + '-');
            case (value == '+'):
                return calcDisplay(getDisplay() + '+');
        }
    }
}
