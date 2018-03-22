import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
	playerList:any
	gameKey:String
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this._route.params.subscribe((params: Params) => {
			this.gameKey="game"+params['id']
		})
		this.getPlayers()
	}
	getPlayers(){
		this._httpService.getPlayers().subscribe(data=>{
			if(!data['error']){
				this.playerList = data['data']
			}
		})
	}
	changeStatus(playerId, status){
		this._httpService.changeStatus(playerId, this.gameKey, status).subscribe(data=>{
			this.getPlayers()
		})
	}
}
