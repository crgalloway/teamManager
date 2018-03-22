import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	playerList:any
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this.getPlayers()
	}
	getPlayers(){
		this._httpService.getPlayers().subscribe(data=>{
			if(!data['error']){
				this.playerList = data['data']
			}
		})
	}
	deletePlayer(id){
		if(confirm("Are you sure you want to remove"+"?")){
			this._httpService.deletePerson(id).subscribe(data=>{
				this.getPlayers()
			})
		}
	}
}
	