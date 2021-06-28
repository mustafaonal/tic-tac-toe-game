function Board(CSize, cells) {
   this.cells = cells;
   
   this.w = round((CSize - 2) /  this.cells);
   
   this.board = [];
   for (var i = 0; i < this.cells; i++) {
      this.board[i] = [];
   }
   
   for (i = 0; i < this.cells; i++) {
      for (var j = 0; j < this.cells; j++) {
         this.board[i][j] = new Cell((j * this.w), (i * this.w), this.w);
      }
   }

   this.index;
   this.Player_1;
   this.Player_2;

   this.selectPiece = function() {
      if (random(1) < 0.5) {
         this.index = 0;
         this.Player_1 = 0;
         this.Player_2 = 1;

         return["X", "O"];
      }
      else{
         this.index = 1;
         this.Player_1 = 1;
         this.Player_2 = 0;
         return["O", "X"];
      }
   }
   
   this.boardShow = function() {
      for (var i = 0; i < this.cells; i++) {
         for (var j = 0; j < this.cells; j++) {
         	stroke(0);
            
            if (this.Onit(this.board[i][j])) {
               fill(150, 150, 255, 255);
            }
            else {
               fill(255);
            }
            
            rect(this.board[i][j].x, this.board[i][j].y, (this.board[i][j].s + 1), (this.board[i][j].s + 1));
            
            if (this.board[i][j].input == "O") {
               noFill();
               ellipseMode(CENTER);
               ellipse(this.board[i][j].cenX, this.board[i][j].cenY, (this.board[i][j].s / 1.5));
            }
            
            if (this.board[i][j].input == "X") {
               var offset = (this.board[i][j].s / 1.3);
               line((this.board[i][j].x + offset), (this.board[i][j].y + offset), (this.board[i][j].x + this.board[i][j].s - offset), (this.board[i][j].y + this.board[i][j].s - offset));
               line((this.board[i][j].x + this.board[i][j].s - offset), (this.board[i][j].y + offset), (this.board[i][j].x + offset), (this.board[i][j].y + this.board[i][j].s - offset));
               
            }
         }
      }
   }

   this.Player_update = function() {
      background(0);
      textAlign(CENTER, TOP);
      textSize(24);

      if (this.index === this.Player_1) {
         fill(255, 0, 0);
         text("Player 1", (width / 2), (height - 35));
      }
      else{
         fill(0, 255, 0);
         text("Player 2", (width / 2), (height - 35));
      }
   }

   this.show = function() {
      var Winner = this.check_Win();

      if ((Winner[0] != 1) && (Winner[0] != 2)) {
         this.Player_update();
         this.boardShow();
         
         fill(255, 0, 255);
         text("Turn: ", ((width / 2) - textWidth("Player 1")), (height - 35));
      }
      else{
         if (Winner[0] == 1) {
            if (this.index === 0) {
               this.index = 1;
            }
            else{
               this.index = 0;
            }

            this.Player_update();
            this.boardShow();
            this.drawLine(Winner[1], Winner[2]);

            fill(0, 100, 255);
            text("WON", ((width / 2) + textWidth("Player 1") + 10), (height - 35));
         }
         else if (Winner[0] == 2) {
            background(0);
            this.boardShow();

            fill(0, 100, 255);
            text("TIE", (width / 2), (height - 35));
         }

         noLoop();
      }
   }
   
   this.Onit = function(Cell) {
      var x1 = Cell.x;
      var y1 = Cell.y;
      var x2 = (Cell.x + Cell.s);
      var y2 = (Cell.y + Cell.s);
      
      if (((mouseX >= x1) && (mouseX <= x2)) && ((mouseY >= y1) && (mouseY <= y2))) {
         return(true);
         
      }
   }
   
   this.turn = function() {
      for (var i = 0; i < this.cells; i++) {
         for (var j = 0; j < this.cells; j++) {
            if (this.Onit(this.board[i][j])) {
               if ((this.board[i][j].input != "X") && ((this.board[i][j].input != "O"))) {
                  if (this.index == 1) {
                     this.board[i][j].input = "O";
                  }
                  else {
                     this.board[i][j].input = "X";
                  }
                  
                  this.index++;
                  
                  if (this.index > 1) {
                     this.index = 0;
                  }
                  
                  return(this.index);
               }
            }
         }
      }
      return(this.index);
   }

   this.drawLine = function(x, y) {
      var x1;
      var y1;
      var x2;
      var y2;

      stroke(255, 0, 0);

      // Drawing line

      // Verticals
      if (y !== -1) {
         x1 = this.board[y][0].cenX;
         y1 = this.board[y][0].cenY;
         x2 = this.board[y][(this.cells - 1)].cenX;
         y2 = y1;

         line(x1, y1, x2, y2);
      }

      // Horizentals
      if ((x !== -1) && (x !== "LD") && (x !== "RD")) {
         x1 = this.board[0][x].cenX;
         y1 = this.board[0][x].cenY;
         x2 = x1;
         y2 = this.board[(this.cells - 1)][x].cenY;
         
         line(x1, y1, x2, y2);
      }
      
      // Left Diagonal
      if (x == "LD") {
         x1 = this.board[0][0].cenX;
         y1 = this.board[0][0].cenY;
         x2 = this.board[(this.cells - 1)][(this.cells - 1)].cenX;
         y2 = this.board[(this.cells - 1)][(this.cells - 1)].cenY;

         line(x1, y1, x2, y2);
      }
      
      // Right Diagonal
      if (x == "RD") {
         x1 = this.board[0][(this.cells - 1)].cenX;
         y1 = this.board[0][(this.cells - 1)].cenY;
         x2 = this.board[(this.cells - 1)][0].cenX;
         y2 = this.board[(this.cells - 1)][0].cenY;

         line(x1, y1, x2, y2);
      }

      noStroke();
   }
   
   this.check_Win = function() {
      var win = false;
      var x = -1;
      var y = -1;
      
      for (var i = 0; i < this.cells; i++) {
          if (win === false) {
            // Verticals
            var temp = this.board[i][0].input;
            if (temp !== undefined) {
               var flag = 0;
               
               for (var j = 1; j < this.cells; j++) {
                  if (temp === this.board[i][j].input) {
                     temp = this.board[i][j].input;
                  }
                  else{
                     flag = 1;
                     break;
                  }
               }

               if (flag === 0) {
                  y = i;
                  win = true;
               }
            }
         }
         
         if (win === false) {
            // Horizentals
            temp = this.board[0][i].input;
            if (temp !== undefined) {
               flag = 0;
               
               for (j = 1; j < this.cells; j++) {
                  if (temp === this.board[j][i].input) {
                     temp = this.board[j][i].input;
                  }
                  else{
                     flag = 1;
                     break;
                  }
               }

               if (flag === 0) {
                  x = i;
                  win = true;
               }
            }
         }

         if (win)
            break;
      }
      
      if (win === false) {
         // Left Diagonal
         temp = this.board[0][0].input;
         if (temp !== undefined) {
            flag = 0;
            for (i = 1; i < this.cells; i++) {
               if (temp === this.board[i][i].input) {
                  temp = this.board[i][i].input;
               }
               else{
                  flag = 1;
                  break;
               }
            }
            
            if (flag === 0) {
               x = "LD";
               win = true;
            }
         }
      }

      if (win === false) {
         // Right Diagonal
         temp = this.board[0][(this.cells - 1)].input;
         if (temp !== undefined) {
            flag = 0;
            for (i = 1, j = (this.cells - 2); i < this.cells; i++, j--) {
               if (temp === this.board[i][j].input) {
                  temp = this.board[i][j].input;
               }
               else{
                  flag = 1;
                  break;
               }
            }
            
            if (flag === 0) {
               x = "RD";
               win = true;
            }
         }
      }
      
      if (win) {
         return[1, x, y];
      }
      
      // Tie check
      if (win === false) {
         var count = 0;
         for (i = 0; i < this.cells; i++) {
            for (j = 0; j < this.cells; j++) {
               if (this.board[i][j].input !== undefined) {
                  count++;
               }
               else
                  break;
            }
         }
         if (count == (this.cells * this.cells)) {
            return[2, x, y];
         }
      }

      return[0, x, y];
   }
}

function Cell(xn, yn, sn){
   this.x = xn;
   this.y = yn;
   this.s = sn;
   this.input = undefined;

   this.cenX = (this.x + (this.s / 2));
   this.cenY = (this.y + (this.s / 2));
}
