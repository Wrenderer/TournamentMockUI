import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{
  public constructor() { }

  public createDb() {
    let tournaments = [];

    let participants = [
      { id: 1, name: 'Jigglypuff' },
      { id: 2, name: 'Kirby' },
      { id: 3, name: 'Link' },
      { id: 4, name: 'Lucas' },
      { id: 5, name: 'Mario' },
      { id: 6, name: 'Ness' },
      { id: 7, name: 'Pikachu' },
      { id: 8, name: 'Rosalina' },
      { id: 9, name: 'Sheik' },
      { id: 10, name: 'Wario' },
      { id: 11, name: 'Zelda' },
    ];

    return {tournaments, participants};
  }
}
