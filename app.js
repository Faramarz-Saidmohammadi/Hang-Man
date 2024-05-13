// Getting html elements
const wrongLetters = document.getElementById('wrong-letter-contianer');
const word = document.getElementById('word-letter-container');
const modal = document.getElementById('modal');
const playAgain = document.getElementById('play-again');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figurePart = document.querySelectorAll('.figure-part');


// Make word array
const letters = ['programming' , 'class' , 'javascript' , 'book'];

// Find the random word from array
let selectedWord = letters[Math.floor(Math.random() * letters.length )];

// Correct letters and wrong letters
const correctLetter = [];
const wrongLetter = [];


// The display word function
function displayWord(){
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter =>
                ` <span class='letter'>
                    ${correctLetter.includes(letter)? letter : ''}
                  </span>
                `       
            ).join('')
        }
    `   

    const innerWord = word.innerText.replace(/\n/g , '');
    if(innerWord === selectedWord){
        modal.style.display = "flex";
        finalMessage.innerHTML = "Congratulations!!!! You have Won The game 😎";  
    }
 
}

// The user input and guess the world function

window.addEventListener('keydown' , e =>{
    const keyPrssed = e.key;
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if(selectedWord.includes(keyPrssed)){
            if(!correctLetter.includes(keyPrssed)){
                correctLetter.push(keyPrssed);
                displayWord();
            } else {
                showNotification();  
            }
        } else {
            if(!wrongLetter.includes(keyPrssed)){
                wrongLetter.push(keyPrssed);
                updateWrongLetter();
            } else {
                showNotification();
            }
        }
    }

})


// Show notification function
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    } , 3000)
}  


// Update Wrong Letter
function updateWrongLetter(){
    wrongLetters.innerHTML = `
        ${wrongLetter.length > 0 ? "<p>Wrong</p>" : ''}
        ${wrongLetter.map(letter => `<span>${letter}</span>`)}
    `

    figurePart.forEach((part, index)=>{
    
        if(index < wrongLetter.length){
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    if(figurePart.length === wrongLetter.length){
        finalMessage.innerHTML = "OHHH Noo you lost!!!😢";
        modal.style.display = 'flex';
    }
}


displayWord();
