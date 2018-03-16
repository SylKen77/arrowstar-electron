import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CommandService} from '../services/command-service';
import {Injectable} from '@angular/core';

@Injectable()
export class InitializeCommandsResolver implements Resolve<boolean> {

  constructor(private commandService: CommandService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.commandService.initialize();
        resolve();
      });
    });
  }

}
