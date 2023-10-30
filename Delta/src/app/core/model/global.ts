import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class Globals {
  static Url = environment.APIEndpoint;
  static Back = 'Back';
  static Lay = 'Lay';
   

constructor() {
 
}

}

