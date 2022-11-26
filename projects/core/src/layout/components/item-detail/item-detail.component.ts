import {Component} from '@angular/core';
import {EntityService} from "../../services/entity.service";
import {Location} from "@angular/common";

@Component({
  selector: 'lib-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  constructor(public entityService: EntityService, private location: Location) {
  }

  back() {
    this.location.back();
  }
}
