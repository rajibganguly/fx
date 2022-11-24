import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { IPrice } from '../model/price.model';
import { TITLE } from './../constant/constant';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit, OnDestroy {
  loader: boolean = true;
  header = TITLE.HEADER;
  subHeader = TITLE.SUBHEADER;
  buttons = TITLE.BUTTONS;
  paragraph = TITLE.PARA;
  lengthArr: number = 0;
  allPricebutton: boolean = false;;
  latestPricebutton: boolean = false;
  expectedFormat = `${TITLE.DATEFORMAT} ${TITLE.TIMEFORMAT}`;
  allPriceSubscription: Subscription | undefined;
  allLatestPriceSubscription: Subscription | undefined;
  allPrice: IPrice[] = [];
  constructor(private service: AppService) {}

  ngOnInit(): void {}

  /*
   * @description: for all price list
   */
  getAllPrices() {
    this.loader = true;
    this.allPricebutton = true;
    this.allPriceSubscription = this.service
      .getAllPrices()
      .subscribe((data: IPrice[]) => {
        if (data) {
          this.loader = false;
          this.allPricebutton = false;
          const localData: IPrice[] = [...data];
          this.allPrice = this.timeToUTC(localData);
          this.subHeader = TITLE.PRICE.ALL;
        } else {
          this.subHeader = TITLE.PRICE.NO;
          alert(this.subHeader);
          this.allPricebutton = true;
        }
      },
      error => {
        alert(TITLE.PRICE.NO);
      });
  }

  /*
   * @description: To set format
   */
  private timeToUTC(arr: IPrice[]) {
    arr.filter((ele) => {
      ele.timestamp = moment(ele.timestamp).utc().format(this.expectedFormat);
    });
    return arr;
  }

  /*
   * @description: Latest Price
   */
  async getLatestPrices() {
    this.loader = true;
    this.latestPricebutton = true;
    this.allPriceSubscription = await this.service
      .getAllPrices()
      .subscribe((data: IPrice[]) => {
        if (data) {
          const localData: IPrice[] = [...data];
          this.allPrice = this.timeToUTC(localData);
          this.lengthArr = localData.length;

          // Separate private function should move for latest call
          this.allLatestPriceSubscription = this.service
            .getLatestPrice(this.lengthArr)
            .subscribe((data: IPrice) => {
              if (data) {
                this.allPrice.length = 0;
                this.allPrice.push(data);
                this.subHeader = TITLE.PRICE.LATEST;
                this.loader = false;
                this.latestPricebutton = false;
              }
            });
        }
      },
      error => {
        alert(TITLE.PRICE.NO);
        this.latestPricebutton = true;
      });
  }

  ngOnDestroy() {
    this.allPriceSubscription?.unsubscribe();
    this.allLatestPriceSubscription?.unsubscribe();
  }
}
