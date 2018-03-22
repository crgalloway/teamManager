import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-addplayer',
	templateUrl: './addplayer.component.html',
	styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
	newPlayer:any
	error = ""
	constructor(
		private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }
	ngOnInit() {
		this.newPlayer = {
			name:"",
			position:""
		}
	}
	goToList(){
		this._router.navigate(['players/list'])
	}
	onSubmit(id){
		this._httpService.addPlayer(this.newPlayer).subscribe(data=>{
			if(data['error']){
				this.error = data['error']
			}
			else{
				this.goToList()
			}
			
		})
	}
}