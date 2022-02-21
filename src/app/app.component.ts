import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GeoService } from '../model/geo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  theForm: FormGroup;
  
  geolocation: Geolocation;


  constructor(fb: FormBuilder, public geo: GeoService) {

    this.theForm = fb.group({
      lat: [''],
      long: ['']
    });
  }

  ngOnInit() {
    this.geolocation = navigator.geolocation;
  }

  ngAfterViewInit() {
    this.geo.updateSize();
  }

  navigateToLatLong() {
    debugger
    if (this.theForm.controls.lat.value.trim() !== "" && this.theForm.controls.long.value.trim() !== "") { 
      navigator.geolocation.getCurrentPosition(position => {
        this.geo.setView(10, [Number(this.theForm.controls.long.value.trim()), Number(this.theForm.controls.lat.value.trim())]);
      });
    };
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geo.setView(10, [position.coords.longitude, position.coords.latitude]);
      });
    }
  }
}
