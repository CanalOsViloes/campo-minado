let grid = [];
let lin = 10;
let col = 10;
let lado = 40;
let qtdeBombas = 10;
let fimDeJogo = false;
let celulasFechadas = 0;
let vitoria = false;
let tempo = 0;

function criaArray2D(colunas, linhas){
  let arr = new Array(linhas);
  
  for(let i=0;i<colunas;i++){
    arr[i] = new Array(colunas);
  }
  
  return arr;
}

function setup() {
  createCanvas(401, 401);
  
  grid = criaArray2D(col, lin);
  
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      grid[i][j] = new Cell(i, j,lado,false);
      celulasFechadas++;
    }
  }
  
  let bombasTemp = qtdeBombas;
  
  while(bombasTemp>0){
    let randomI = floor(random(0,col-1));
    let randomJ = floor(random(0,lin-1));
    
    if(!grid[randomI][randomJ].temBomba()){
      grid[randomI][randomJ].setBomba();
      bombasTemp--;
    }
  }
  
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      
      let bombasAoRedor = 0;
      
      for(let x=-1;x<2;x++){
        for(let y=-1;y<2;y++){
          
          if(x==0 && y==0){
            continue;
          }
          
          let linhaCheck = i+y;
          let colunaCheck = j+x;
          
          if(linhaCheck<0 || colunaCheck<0 || linhaCheck>=lin || colunaCheck>=col){
            continue;
          }
          
          if(grid[linhaCheck][colunaCheck].temBomba()){
            bombasAoRedor++;
          }
          
        }
      }
      
      grid[i][j].setQuantidadeBombasAoRedor(bombasAoRedor);
    }
  }
  
}

function draw() {
  background(220);
  for(let i=0;i<lin;i++){
    for(let j=0;j<col;j++){
      grid[i][j].desenhar();
    }
  }
  
  if(frameCount%60==0 && !fimDeJogo){
    tempo++;
  }
  
  if(fimDeJogo){
    if(vitoria){
      push();
        fill('black');
        textStyle(BOLD);
        textSize(30);
        textAlign(CENTER,CENTER);
        text("VITÓRIA!",200,130);
        text("Tempo:"+tempo+"s",200,200);
      pop();
    }else{
      push();
        fill('black');
        textStyle(BOLD);
        textSize(30);
        textAlign(CENTER,CENTER);
        text("DERROTA!",200,200);
      pop();
    }
  }
}

function gameOver(){
  fimDeJogo = true;
  abreCelulasBomba();
}

function abreCelulasBomba(){
  for(let i=0;i<lin;i++){
      for(let j=0;j<col;j++){
        if(grid[i][j].temBomba()){
          grid[i][j].abrir();
        }
      }
  }
}

function abrirCelula(i,j){
  if(!grid[i][j].marcado && !grid[i][j].aberto){
    grid[i][j].abrir();  
    celulasFechadas--;
    console.log(celulasFechadas);
    if(grid[i][j].temBomba()){
      gameOver();
    }
    if(grid[i][j].bombasAoRedor==0){
      floodFill(i,j);
    }
  }
  
  
}

function floodFill(iOrigem, jOrigem){
  grid[iOrigem][jOrigem].setPesquisado();
  
  for(let x=-1;x<2;x++){
    for(let y=-1;y<2;y++){
      
      if(x==0 && y==0){
        continue;
      }
      
      let linhaCheck = iOrigem+y;
      let colunaCheck = jOrigem+x;
      
      if(linhaCheck<0 || colunaCheck<0 || linhaCheck>=lin || colunaCheck>=col){
        continue;
      }   
      
      if(!grid[linhaCheck][colunaCheck].pesquisado){
        grid[linhaCheck][colunaCheck].setPesquisado();
        if(!grid[linhaCheck][colunaCheck].temBomba()){
           abrirCelula(linhaCheck,colunaCheck);
        }
      }
      
      
    }
  }
  
  
}

function checarVitoria(){
  if(celulasFechadas<=qtdeBombas){
    fimDeJogo = true;
    vitoria = true;
    abreCelulasBomba();
  }
}

function marcarCelula(i,j){
  grid[i][j].marcarBomba();
}

function mouseClicked(){

  let j = floor(mouseX/lado);
  let i = floor(mouseY/lado);
  
  if(!fimDeJogo){
    if(keyIsDown(18)){
      marcarCelula(i,j);
    }else{
      abrirCelula(i,j);  
    }
  
    checarVitoria();  
  }
  
 
}
