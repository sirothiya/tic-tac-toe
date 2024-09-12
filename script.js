const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currenPlayer;
let gameGrid;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// game initialization

const gameInit = () => {
  currenPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, indx) => {
    box.innerText = "";
    boxes[indx].style.pointerEvents = "all";

    box.classList=`box box${indx+1}`
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currenPlayer}`;
};

gameInit();

const swapTurn = () => {
  if (currenPlayer === "X") {
    currenPlayer = "O";
  } else currenPlayer = "X";
  gameInfo.innerText = `Current Player - ${currenPlayer}`;
};

const checkGameOver = () => {
  let ans = "";
  winningPosition.forEach((comb, indx) => {
    if (
      (gameGrid[comb[0]] !== "" ||
      gameGrid[comb[1]] !== "" ||
      gameGrid[comb[2]] !== "" )&&
      (gameGrid[comb[0]] === gameGrid[comb[1]] &&
      gameGrid[comb[0]] === gameGrid[comb[2]])
    ) {
        boxes.forEach((box)=>{
            box.style.pointerEvents="none"
        })
      ans = gameGrid[comb[0]];
      boxes[comb[0]].classList.add("win")
      boxes[comb[1]].classList.add("win")
      boxes[comb[2]].classList.add("win")
      
    }
    if(ans!==""){
        gameInfo.innerText=`Winner Player -${ans}`
        newGameBtn.classList.add("active");
        return
    }

    // when no game is draw

    let fillCount=0;
   gameGrid.forEach((box)=>{
    if(box!="")fillCount++;
   })
   if(fillCount===9){
    gameInfo.innerText="GAME DRAW"
    newGameBtn.classList.add("active");
    boxes.forEach((box)=>{
        box.classList.add("draw")
    })
   }
  });
};
const handleClick = (indx) => {
  if (gameGrid[indx] === "") {
    boxes[indx].innerText = currenPlayer;
    gameGrid[indx] = currenPlayer;
    boxes[indx].style.pointerEvents = "none";
    swapTurn();
    //check if any winner
    checkGameOver();
  }
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", () => {
  gameInit();
});
