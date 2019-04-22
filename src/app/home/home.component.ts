import { Component, OnInit } from '@angular/core';
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
  promotion: Promotion;
  featuredLeader: Leader;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService) { }

  ngOnInit() {
    this.promotionService.getFeaturedPromotion()
    .then(promotion => this.promotion = promotion);

    this.dishService.getFeaturedDish()
    .then(dish => this.dish = dish);

    this.leaderService.getFeaturedLeader()
    .then(featuredLeader => this.featuredLeader = featuredLeader);
  }

}
