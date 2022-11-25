import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-item, [lib-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit{
  @Input('item') item: any;

  constructor() {
  }

  ngOnInit() {
    console.log(16, this.item)
  }
}
