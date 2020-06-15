# Super Smash Bros. Tournament Analysis System

## Synopsis
This is a project I'm doing for a friend as I was looking for an excuse to both make a portfolio piece for myself whilst contributing something that someone would actually use. Basically, this is the administrative front-end for a [Smash Brothers](https://www.smashbros.com/en_US/) Tournament (though it has potential for other tournament uses). You would be able to define a tournament with participants and match-ups, submit winners/losers and match footage, and these data entries would subsequently be analyzed and the data aggregated to influence "bets" (no real money here!). The intent is to analyze the footage programatically to pull out match statistics and create a matchup profile for each participant. The full project will utilize message queues, functional programming, video analysis, Identity Server authorization, microservices, and more written across C# (.Net Core + Entity Framework), Java, Ruby, and Angular.

## Demo
If you want to play around with the current Mock UI, click [here](https://wildrender-analysis.azurewebsites.net). Please note, functionality is low (after logging in and clicking the create button, that's currently the limit of function). It was mainly written as a code example, so there is far more to see in the "code-behind" at this point (unit tests, services, etc.).

### Demo Caveats
As of present day, this repository holds a mock UI that was built ahead of schedule for exemplary purposes. In addition to some small inconsistencies that may/may not be present as a result. There are a few notable things that should not be considered exemplary and are strictly temporary:
 * Current tournament is chosen due to a hardcoded id only. This is temporary and not at all how a current tournament should be chosen. (I'm thinking it should be determined by date or worse, by current flag. There may also be business logic behind the determination such as whether the tournament is active or closed)
 * Some tests are missing as the entire mock UI project and hosting was made from scratch over the weekend and personal dev time went into Monday morning. The initial components and services all have exemplary tests; the absence of tests is not something I would usually do on a regular task!
 * Minor inconsistencies with whitespace would be eliminated with slightly more time; I had not yet set up my linter on my personal PC.
 * The bulk of the mock UI would be broken up into smaller stories to begin with. Doing it as one story was only for this weekend's brevity as I simultaneously wanted to get Azure hosting configured.
 * Using mock data in the first place - naturally this must be replaced for production

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

