import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../shared/interfaces/iproduct';

@Component({
  imports: [CommonModule],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: Iproduct[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
  }

  removeCartItemById(id: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
