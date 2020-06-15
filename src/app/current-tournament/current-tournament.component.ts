import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { ParticipantsService } from '../participants.service';
import { TournamentDataService } from '../tournament-data.service';
import { Tournament } from '../tournament/tournament.model';
import { map } from 'rxjs/operators';
import { Participant } from '../participant/participant.model';

@Component({
  selector: 'app-current-tournament',
  templateUrl: './current-tournament.component.html',
  styleUrls: ['./current-tournament.component.scss']
})
export class CurrentTournamentComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public currentTournament$: Observable<Tournament>;
  public participants$: Observable<string[]>;

  public constructor(private participantsService: ParticipantsService, private tournamentDataService: TournamentDataService) {}

  public ngOnInit(): void {
    this.participants$ = this.participantsService.getParticipants().pipe(
      map((participants: Participant[]) => {
        return participants.map(p => p.name);
      })
    );
    this.currentTournament$ = this.tournamentDataService.getCurrentTournament();
  }

  public createTournament(): void {
    this.tournamentDataService.createTournament('default').subscribe();
    this.currentTournament$ = this.tournamentDataService.getCurrentTournament();
  }
}
