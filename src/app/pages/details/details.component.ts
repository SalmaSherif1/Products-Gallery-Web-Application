import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  prodData: Iproduct | null = null;
  prodID: string | null = null;

  isLoading = true;
  hasError = false;
  hasErrorButton = false;
  errorMessage = '';

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.isLoading = true;
    this.hasError = false;
    this.hasErrorButton = false;

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.prodID = params.get('id');

        if (this.prodID) {
          this.productsService.getSpecificProduct(this.prodID).subscribe({
            next: (res) => {
              this.prodData = res;
              this.isLoading = false;
              this.flowbiteService.loadFlowbite((flowbite) => {
                initFlowbite(); // required to activate modal after dynamic render
              });
            },
            error: (err) => {
              this.hasError = true;
              this.isLoading = false;
              this.errorMessage =
                err.status === 404
                  ? 'Product not found. Please check the ID.'
                  : 'Failed to load product details. Please try again later.';
            },
          });
        } else {
          this.hasError = true;
          this.isLoading = false;
          this.errorMessage = 'No product ID provided.';
        }
      },
    });
  }
  addToCart(product: Iproduct): void {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  }
}
