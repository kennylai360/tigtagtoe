import { AfterContentInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterContentInit {
  public gameState: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  public gameMapping: Array<Array<number>> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  public startingPlayer: number = Math.round(Math.random()) + 1;

  public currentPlayer: number = 0;

  public ngAfterContentInit(): void {
    this.currentPlayer = this.startingPlayer;
  }

  public squareClicked(clickedSquare: number): void {
    if (this.gameState[clickedSquare] === 0) {
      this.gameState[clickedSquare] = this.currentPlayer;
      this.nextPlayer();
    }
    console.log(this.gameState);
  }

  public clearGameState(): void {
    this.gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.startingPlayer = Math.round(Math.random()) + 1;
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

  private nextPlayer(): void {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }
}
