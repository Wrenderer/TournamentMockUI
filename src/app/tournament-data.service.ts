import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Tournament } from './tournament/tournament.model';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {
  private readonly coreUrl = "http://localhost:8080/api/tournaments"; // TO DO: Retrieve from environment

  private currentTournamentCache$: ReplaySubject<Tournament> = new ReplaySubject<Tournament>(1);

  public constructor(private httpClient: HttpClient) { }

  // Create
  public createTournament(name: string) {
    const tournament = {id: 1, name: name, matches: []} as Tournament;
    return this.httpClient.post(this.coreUrl, tournament);
  }

  // Read
  public getCurrentTournament() : Observable<Tournament> {
    this.httpClient.get<Tournament[]>(this.coreUrl).pipe(
      map((responses: Tournament[]) => {
        const current = responses.find(r => r.id === 1);
        return current;
      }),
      filter((current: Tournament) => !!current),
      tap((current: Tournament) => {
        this.currentTournamentCache$.next(current);
      })
    ).subscribe();

    return this.currentTournamentCache$;
  }
}
