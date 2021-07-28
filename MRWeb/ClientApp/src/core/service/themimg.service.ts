import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ThemingService {

    themes = ['light-theme', 'dark-theme'];
    theme = new BehaviorSubject('light-theme');

    constructor(private ref: ApplicationRef) {

        // // initially trigger dark mode if preference is set to dark mode on system
        // const darkModeOn = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // if (darkModeOn) {
        //     this.theme.next('dark-theme');
        // } 

        // watch for changes of the preference 
        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", (e) => {

            const turnOn = e.matches;
            this.theme.next(turnOn ? 'dark-theme' : 'light-theme');

            // trigger refresh of UI
            this.ref.tick();
        });
    }
}
