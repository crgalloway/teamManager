import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

	constructor(private _http: HttpClient) { }
	getPlayers(){
		return this._http.get('/persons');
	}
	addPlayer(newPlayer){
		return this._http.post('/persons', newPlayer)
	}
	deletePerson(id){
		return this._http.delete('/persons/'+id)
	}
	getPerson(id){
		return this._http.get('/persons/'+id)
	}
	updatePerson(person){
		return this._http.put('/persons/'+person._id, person)
	}
	changeStatus(playerId, gameKey, status){
		return this._http.put('/persons/status/'+playerId, {status:status, gameKey:gameKey})
	}
}
	