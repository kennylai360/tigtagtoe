import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { GamelogComponent } from './gamelog/gamelog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, ChatboxComponent, GamelogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tic-tag-toe';
}
