import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
  //canDeactivate eka true nam me guard eka dala tyna route eka deactivate wenawa
  canDeactivate(
    component: MemberEditComponent,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.editform.dirty){
        //function confirm(message?: string): boolean
        return confirm('Are you sure you want to continue? Any unsaved changes will be lost.!');
      }
    return true;
  }
}
