import { Component, OnInit } from '@angular/core';
import { Alltime, Summary } from '../../model/products';

import { NAMKUBAPIService } from '../../Service/namkub-api.service';
import { data } from 'jquery';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public summaries: Summary[];  
  public AlltimeSum : Alltime[];
  

  constructor(private apiService: NAMKUBAPIService) {}

  ngOnInit() {
    this.loadSummaries();
    this.loadAlltime();
  }

  loadSummaries() {
    this.apiService.getSummary().subscribe(
      data => {
        this.summaries = data;
      },
      error => {
        console.error('Error fetching summaries', error);
      }
    );
  }
  loadAlltime(){
    this.apiService.getAlltime().subscribe(
      data => {
        this.AlltimeSum = data;
      },
      error => {
        console.error('Error fetching summaries', error);
      }
    );
  }
}
