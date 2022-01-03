//Amount of columns and rows is linked to slider's value
let columnsAndRows = myRange.value;
let numberOfDivs = myRange.value ** 2;

//Container rows and columns layout with CSS grid
let container = document.querySelector('.container');
container.style.gridTemplateRows = `repeat(${columnsAndRows}, 1fr)`;
container.style.gridTemplateColumns = `repeat(${columnsAndRows}, 1fr)`;

//Button selectors
let resetButton = document.querySelector('.reset');
let rainbowButton = document.querySelector('.rainbow');
let blackAndWhiteButton = document.querySelector('.blackAndWhite');
let lightBlackButton = document.querySelector('.lightBlack');

//Slider selectors
let slider = document.getElementById('myRange');
let sliderNumber = document.getElementById('sliderNumber');
sliderNumber.innerHTML = myRange.value;




//Creates a single div within the container
  function createDiv() {

    let gridDiv = document.createElement('div');

    gridDiv.className = 'gridDiv';
    gridDiv.innerText = '';

    //Loads to black and white by default
    gridDiv.addEventListener('mouseover', function(e) {
      gridDiv.style.backgroundColor = 'black';
    })

    let clearColor = function() {
      myDivs.forEach(div => div.style.backgroundColor = 'white');
    }

    let buttonEffect = function(buttonName, backgroundColor) {
      buttonName.addEventListener('click', function(e) {
        clearColor();
        gridDiv.addEventListener('mouseover', function(e) {
          gridDiv.style.opacity = 1;
          gridDiv.style.backgroundColor = backgroundColor;
        })
      })
    }

    buttonEffect(blackAndWhiteButton, 'black')

    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    buttonEffect(rainbowButton, randomColor)

    lightBlackButton.addEventListener('click', function(e) {
      clearColor();
      let opacity = gridDiv.style.opacity;
      opacity = 0;

      gridDiv.addEventListener('mouseover', function(e) {
        gridDiv.style.backgroundColor = 'black';
        opacity += .1;
        gridDiv.style.opacity = opacity;
        console.log(opacity);
      });
    });
    return gridDiv;
  }


  //Takes created div, pushes to array myDivs, and appends to container
  function createAndModifyDivs() {

    columnsAndRows = myRange.value
    numberOfDivs = myRange.value ** 2;

    container.style.gridTemplateRows = `repeat(${columnsAndRows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${columnsAndRows}, 1fr)`;

    myDivs = [];

    for(i = 0; i < numberOfDivs; i++) {
      myDivs.push(createDiv());
      container.appendChild(myDivs[i]);
    }

    resetButton.addEventListener('click', (e) => {
      myDivs.forEach(div => div.style.backgroundColor = 'white');   
    });
  }

  createAndModifyDivs();


  slider.oninput = function() {
    myDivs.forEach(item => container.removeChild(item));
    myDivs.length = 0;
    sliderNumber.innerHTML = myRange.value;
    createAndModifyDivs();
  }

