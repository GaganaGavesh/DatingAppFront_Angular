import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MemberListComponent } from "./member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";

//appRoutes kiyanne router object tyna array ekak meke Routes kiyana thanata 
//Routes[] kiyala dammath aulak ne
export const appRoutes : Routes =[
    { path : 'home', component : HomeComponent },
    {
      path: '',//me path eka athule balanwa, habai children la match wenawada balanne AuthGuard eka access dunnoth witharai
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path : 'members', component : MemberListComponent },
        { path : 'messages', component : MessagesComponent },
        { path : 'lists', component : ListComponent }
      ]
    },
    { path : '**', redirectTo : 'home', pathMatch : 'full'},
]