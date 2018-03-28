import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: '',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  searchText:string = '';
  detail:any;
  current_page:string = 'all';
  assignedUsers:any;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('/user').subscribe(data => {
      this.users = data;
      this.assignedUsers = this.users.filter((user)=> user.assigned === true);
    });
    if(this.users && this.users.length > 0){
      this.detail = this.users[0];
    }
    else{
      this.detail = new Object();
      this.detail.picture = new Object();
      this.detail.picture.large = "";
      this.detail.name = new Object();
      this.detail.name.first = "";
      this.detail.name.last = "";
      this.detail.assigned = false;
    }
  }
  clearSearch() {
    this.searchText = null;
  }
  assign(user){
    user.assigned = true;
    this.assignedUsers.push(user);
    this.http.patch(`/user/${user._id}`,user).subscribe(data =>{
      console.log(data);
    })
  }
  details(user){
    this.detail = user;
  }
  switchToAll(){
    this.current_page = "all";
  }
  switchToAssigned(){
    this.current_page = "assigned";
  }

}
