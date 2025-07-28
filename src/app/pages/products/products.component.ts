import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { SortPipe } from '../../shared/pipes/sort/sort.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, SearchPipe, SortPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  products: Iproduct[] = [];
  searchInput: string = '';
  sortDropdown: string = '';

  isLoading: boolean = false;
  hasError: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.getAllProducts();
  }
  addToCart(product: Iproduct): void {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  }

  getAllProducts(): void {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage =
          err.status === 0
            ? 'Unable to connect. Please check your network.'
            : 'Failed to load products. Please try again later.';
      },
    });
  }
}
