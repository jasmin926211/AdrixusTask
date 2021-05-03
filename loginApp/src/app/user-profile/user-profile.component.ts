import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import {MatTableDataSource} from '@angular/material/table';
import { Employee } from '../shared/user.model';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {

  public displayedColumns = ['name', 'lastname', 'gender', 'email'];
  public dataSource  = new MatTableDataSource<Employee>();

  userDetails;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  activePage: any =1;
  pager: any ={};
  totalCount: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
      this.getPage();
    // this.userService.getUserProfile().subscribe(
    //   (res) => {
    //     this.userDetails = res["user"];
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
}

getPage() {
  this.userService.pagination(this.activePage).subscribe(
    (res) => {
      console.log(res);
      this.totalCount = res['user']['totalCounts']
      this.dataSource.data = res["user"]['resultUser'] as Employee[];

      console.log("############################################");
      console.log(this.userDetails);
      this.pager = this.userService.getPager(this.totalCount, this.activePage);
    },
    (err) => {
      console.log(err);
    }
  );
}

setPage(page: number) {
  this.activePage = page;
  
  console.log("-------------------------------------------");
  console.log(this.activePage);

   if(page < 1 || page > this.pager.totalPages){
      return;
   }

   this.getPage();
}

  onLogout(){
    console.log('Inside logout function');

    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  
}
