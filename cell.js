class Cell{
  constructor(i, j, lado, bomba){
    this.i = i;
    this.j=j;
    this.lado=lado;
    this.tenhoBomba = bomba;
    this.aberto = false;
    this.bombasAoRedor = 0;
    this.pesquisado = false;
    this.marcado = false;
  }
 
  desenhar(){
    if(this.aberto){
      if(this.tenhoBomba){
        fill(color("red"));  
        rect(this.j*this.lado, this.i*this.lado, this.lado);
      }else{
        fill("#CCFFCC"); 
        rect(this.j*this.lado, this.i*this.lado, this.lado);
        if(this.bombasAoRedor!=0){
          let cor = color(0,0,0);
          switch(this.bombasAoRedor){
              case 1:
                cor = color(0,128,255);
                break;
              case 2:
                cor = color(0,200,0);
                break;
              case 3:
                cor = color(255,0,0);
                break;
              case 4:
                cor = color(127,0,255);
                break;
              case 5:
                cor = color(255,0,255);
                break;
              default:
            }
          push();
            fill(cor);
            strokeWeight(7);
            textAlign(CENTER,CENTER);
            textSize(18);
          textStyle(BOLD);
            text(this.bombasAoRedor,
                 this.j*this.lado+this.lado/2,
                 this.i*this.lado+this.lado/2,
                );
          pop();
        }
      }
     
    }else{
      if(this.marcado){
         fill(color("pink"));
        rect(this.j*this.lado, this.i*this.lado, this.lado);  
      }else{
        fill(color("grey"));
        rect(this.j*this.lado, this.i*this.lado, this.lado);  
      }
     
    }
   
    if(this.aberto && this.tenhoBomba){
      push();
        fill(color('black'));
        strokeWeight(4);
        circle(this.j*this.lado+this.lado/2,
               this.i*this.lado+this.lado/2,
               this.lado/4)
      pop();
    }
   
  }
 
  setQuantidadeBombasAoRedor(num){
    this.bombasAoRedor = num;
  }
 
  temBomba(){
    return this.tenhoBomba;
  }
 
  abrir(){
    this.aberto = true;
  }
 
  setBomba(){
    this.tenhoBomba = true;
  }
 
  setPesquisado(){
    this.pesquisado = true;
  }
 
  marcarBomba(){
    this.marcado = !this.marcado;
  }
}
