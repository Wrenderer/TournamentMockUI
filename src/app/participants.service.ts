import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Participant } from './participant/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private readonly coreUrl = "http://localhost:8080/api/participants"; // TO DO: Retrieve from environment

  public constructor(private httpClient: HttpClient) { }

  // Read
  public getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(this.coreUrl);
  }
}
