import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { StatusComponent } from './status/status.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './players/list/list.component';
import { AddplayerComponent } from './players/addplayer/addplayer.component';
import { GameComponent } from './status/game/game.component';

@NgModule({
	declarations: [
		AppComponent,
		PlayersComponent,
		StatusComponent,
		ListComponent,
		AddplayerComponent,
		GameComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [HttpService],
	bootstrap: [AppComponent]
})
export class AppModule { }
