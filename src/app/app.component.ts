import { AfterContentInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterContentInit {
  public gameState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  public playerWins: BehaviorSubject<number> = new BehaviorSubject(0);
  public drawState: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public gameMapping: Array<Array<number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  public winStates: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  public startingPlayer: number = Math.round(Math.random()) + 1;

  public currentPlayer: number = 0;

  public playerOneWins: boolean = false;

  public playerTwoWins: boolean = false;

  public ngAfterContentInit(): void {
    this.currentPlayer = this.startingPlayer;
  }

  public squareClicked(clickedSquare: number): void {
    if (this.playerWins.getValue() === 0) {
      if (this.gameState[clickedSquare] === 0) {
        this.gameState[clickedSquare] = this.currentPlayer;
        this.nextPlayer();
      }
      this.checkForWinState();
    }
  }

  public clearGameState(): void {
    this.gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.startingPlayer = Math.round(Math.random()) + 1;
    this.playerWins.next(0);
  }

  public isGameStateClean(): boolean {
    return this.gameState.every((item) => item === 0);
  }

  public returnTigTagValues(value: number): string {
    switch (value) {
      case 0:
        return '';
      case 1:
        return 'X';
      case 2:
        return 'O';
      default:
        return '';
    }
  }

  private checkForWinState() {
    this.winStates.forEach((winState: Array<number>) => {
      const check = winState.map((value: number) => this.gameState[value]);
      const player1Check = check.every((item) => item === 1);
      const player2Check = check.every((item) => item === 2);
      const drawState = this.gameState.every((item) => item !== 0);
      if (player1Check) {
        this.playerWins.next(1);
        return;
      }
      if (player2Check) {
        this.playerWins.next(2);
        return;
      }
      if (drawState) {
        this.drawState.next(true);
        return;
      }
    });
  }

  private nextPlayer(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }
}
