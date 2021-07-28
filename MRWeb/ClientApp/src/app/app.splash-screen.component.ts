import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
  selector: 'splash-screen',
  template: `
    <div class='app-splash-screen' [ngStyle]='{ left: windowWidth, opacity: opacityChange, transition: splashTransition }' *ngIf='showSplash'>
    <div class='app-splash-inner'>
      <div class='app-logo'></div>
      <div class='app-label'>M&R Solution</div>
      <div class='app-loader'></div>
    </div>
  </div>`,
  styles: [`
  .app-splash-screen {
    background: linear-gradient(to right, #35343e, #0f0b2b);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 1;
  }
  .app-label {
    margin-top: 65px;
    color: #fff;
    font-size: 2.5em;
    font-family: 'Pacifico', cursive;
  }
  .app-splash-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .app-logo {
    background: url('./../../assets/images/logo-small.png');
    background-repeat: no-repeat;
    max-width: 100%;
    background-position: center;
    background-size: contain;
    width: 100px;
    height: 100px;
  }
  .app-loader {
    background: url('./../../assets/images/three-dots.svg');
    background-repeat: no-repeat;
    max-width: 100%;
    background-position: center;
    background-size: contain;
    width: 80px;
    height: 80px;
    margin-top: 80px;
  }`],
  encapsulation: ViewEncapsulation.None
})
export class AppSplashscreenComponent implements OnInit {

  windowWidth: string;
  splashTransition: string;
  opacityChange: number = 1;
  showSplash = true;

  @Input() animationDuration: number = 0.5;
  @Input() duration: number = 3;
  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft;

  ngOnInit(): void {

    setTimeout(() => {

      let transitionStyle = '';
      switch (this.animationType) {

        case SplashAnimationType.SlideLeft:
          this.windowWidth = '-' + window.innerWidth + 'px';
          transitionStyle = 'left ' + this.animationDuration + 's';
          break;

        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + 'px';
          transitionStyle = 'left ' + this.animationDuration + 's';
          break;

        case SplashAnimationType.FadeOut:
          transitionStyle = 'opacity ' + this.animationDuration + 's';
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);

    }, this.duration * 1000);
  }
}

export enum SplashAnimationType {
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right',
  FadeOut = 'fade-out'
}