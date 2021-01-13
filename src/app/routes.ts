import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./list/list.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";

//appRoutes kiyanne router object tyna array ekak meke Routes kiyana thanata 
//Routes[] kiyala dammath aulak ne
export const appRoutes : Routes =[
    { path : 'home', component : HomeComponent },
    {
      path: '',//me path eka athule balanwa, habai children la match wenawada balanne AuthGuard eka access dunnoth witharai
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
        { path : 'members', component : MemberListComponent, resolve : {users : MemberListResolver} },
        { path : 'members/:id', component : MemberDetailComponent, resolve : {user : MemberDetailResolver}},
        { path : 'messages', component : MessagesComponent },
        { path : 'lists', component : ListComponent }
      ]
    },
    { path : '**', redirectTo : 'home', pathMatch : 'full'},
]
//'members/:id' parameter ekak expect karanawa nam : danwa
//api snapshot eka use karana than wala me d kyana ekama use karanna ona id ekata adala number eka ganna 