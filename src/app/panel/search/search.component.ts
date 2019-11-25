import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { User } from 'src/app/models/user.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  term: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      let term = params['term'];
      this.term = term;
      this.search(term);
    });
  }

  search( term: string ) {
    this.searchService.search(term)
        .subscribe( (resp:any) => {
          console.log(resp);
          this.hospitals = resp.hospitals.hospitals;
          this.doctors = resp.doctors.doctors;
          this.users = resp.users.users;
        });
  }

  edit( type: string, id?: string ) {
    if (type === 'users') {
      this.router.navigate(['/users']);
    } else if ( type === 'hospitals') {
      this.router.navigate(['/hospitals']);
    } else {
      this.router.navigate(['/doctor', id]);
    }
  }

}
