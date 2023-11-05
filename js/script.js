runApp();

function runApp () {
    alert(`Привет! Добро пожаловать в "Игромат" версии 0.1`);
    while (true) {
        let numberOfGame = chooseGame ();
        if (numberOfGame === null) {
            break;
        }
        alert(`Игра запускается...`);
        startGame(numberOfGame);
    }
    alert(`Пока, пока`);
}

function chooseGame () {
    while (true) {
        let userAnswer = prompt(`
        Выбери игру:
        1 - угадалка;
        2 - считалка;
        3 - кликалка;
        Для выхода введи "выход"
        `);
        switch (userAnswer) {
            case "1":
            case "угадалка":
                return 1;
            case "2":
            case "считалка":
                return 2;
            case "3":
            case "кликалка":
                return 3;
            case "выход":
                return null;
            default:
                alert(`Не правильный ввод, попробуй еще раз =(`);              
        }      
    }
}

function startGame (numberOfGame) {
    switch (numberOfGame) {
        case 1:
            runGuessGame ();
            break;
        case 2:
            runCalcGame ();
            break;
        case 3:
            runClickerGame ();
            break;
        default:
            throwGameError ();             
    }
}

function throwGameError () {
    alert(`Критическая ошибка!`);
}

function runGuessGame () {
    alert(`Игра "Угадалка"`);
    alert(`
        Я случайным образом загадаю число от 1 до 100.
        Твоя задача его угадать за минимальное количество попыток.
        После каждого твоего ввода я буду говорить больше твое число или меньше загаданного.
        Начнем?`);
    guessNumberFrom1To100 ();
}

function guessNumberFrom1To100 () {
    let randomNumberFrom1To100 = generateRandomNumber (0.5, 100);
    let attempts = 0;
    while (true) {
        
        attempts++;
        let isCorrectAnswer = askGuessGameQuest(randomNumberFrom1To100);
        if (isCorrectAnswer) {
            break;
        }
    } 
    alert(`Тебе удалось угадать за "${attempts}" попыток`);
}

function generateRandomNumber (from, to) {
    let randomNumber = from + Math.random() * to;
    let roundRandomNumber = Math.round(randomNumber);
    return roundRandomNumber;
}

function askGuessGameQuest(targetNumber) {
    while (true) {
        let numberUser = prompt(`Попробуй угадать`);
        if (!numberUser) {
            alert(`Неверный ввод =(`);
        } else if (numberUser < targetNumber) {
            alert(`Слишком мало`);
            return false;
        } else if (numberUser > targetNumber) {
            alert(`Слишком много`);
            return false;
        } else if (numberUser == targetNumber) {
            alert(`Угадал!`);
            return true;
        }
    }
}

function runCalcGame () {
    alert(`Игра "Считалка"`);
    alert(`
        Я случайным образом буду давать задание по арифметике.
        Твоя задача правильно решить 5 примеров.
        Начинаем?`);
    let correctAnswerCount = 0;      
    for (let i = 0; i < 5; i++) {
        let isCorrectAnswer = askCalcGameQuest ();
        if(isCorrectAnswer) {
            correctAnswerCount++;
        }
    }
    alert(`Правильных ответов: ${correctAnswerCount} из 5`);
}

function askCalcGameQuest () {
        let randomNumber_1 = randomNumberFrom0To20 ();
        let randomNumber_2 = randomNumberFrom0To20 ();
        let randomSign = generateRandomMathAction ();
        if (randomSign == "-") {
            if (randomNumber_1 < randomNumber_2) {
                let number_1 = randomNumber_1;
                randomNumber_1 = randomNumber_2;
                randomNumber_2 = number_1;
            }
        }
        let answerJSComputer = calcExampleJSComputer (randomNumber_1, randomNumber_2, randomSign);
        let example = randomNumber_1 + " " + randomSign + " " + randomNumber_2;
        let answerUser = prompt(example);
        let isCorrectAnswer = answerUser == answerJSComputer;
        return isCorrectAnswer; 
}

function randomNumberFrom0To20 () {
    let randomNumberFrom0To20 = generateRandomNumber (-0.5, 21);
    randomNumberFrom0To20 = (randomNumberFrom0To20 == -0) ? Math.abs(randomNumberFrom0To20) : randomNumberFrom0To20;
    return randomNumberFrom0To20;
}

function generateRandomMathAction () {
    let randomNumberFrom1To3 = generateRandomNumber (0.5, 3);
    switch (randomNumberFrom1To3) {
        case 1:
            return "+";
        case 2:
            return "-";
        case 3:
            return "*";      
        default:
            throwGameError ();     
    }
}

function calcExampleJSComputer (number_1, number_2, sign) {
    switch (sign) {
        case "+":
            return number_1 + number_2;
        case "-":
            return number_1 - number_2;
        case "*":
            return number_1 * number_2;
        default:
            throwGameError ();     
        
    }
}

function runClickerGame () {
    alert(`Игра "Кликалка"`);
    alert(`
        Я случайным образом буду показывать 10 системных окон.
        Твоя задача как можно скорее прокликать все.
        При этом в окне confirm нужно нажимать "Отмена".
        Начинаем?`);
    let errorCount = 0;
    for (let i = 0; i < 10; i++) {
        let isCorrectAnswer = askClickGameQuest ();
        if (!isCorrectAnswer) {
            errorCount++;
        }
    }    
    alert(`Ошибок: ${errorCount}`);
}

function askClickGameQuest () {
        let randomNumberFrom1To2 = generateRandomNumber (1, 1);
        switch (randomNumberFrom1To2) {
            case 1:
                let click = prompt(`Нажми "отмена"`);
                let clickUser = (!(click === null)) ? false : true;
                return clickUser;
            case 2:
                alert(`Просто нажми "ок"`);
                return true;   
        }
}

