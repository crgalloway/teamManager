import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { StatusComponent } from './status/status.component';
import { ListComponent } from './players/list/list.component';
import { AddplayerComponent } from './players/addplayer/addplayer.component';
import { GameComponent } from './status/game/game.component';

const routes: Routes = [
	{path: 'players', component:PlayersComponent, children: [
		{path: '*', redirectTo: 'list', pathMatch:'full'},
		{path: 'list', component:ListComponent},
		{path: 'addplayer', component:AddplayerComponent},
	]},
	{path: 'status', component:StatusComponent, children: [
		{path: '*', redirectTo: 'game', pathMatch:'full'},
		{path: 'game/:id', component:GameComponent},
	]},
	{ path: '**', redirectTo: '/players/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
