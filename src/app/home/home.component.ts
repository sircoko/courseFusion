import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/Leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  promotionErrMess: string;
  featuredLeader: Leader;
  leaderErrMess: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.promotionErrMess = <any>errmess);

    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);

    this.leaderService.getFeaturedLeader()
    .subscribe(leadership => this.featuredLeader = leadership,
      errmess => this.leaderErrMess = <any>errmess);
  }

}
