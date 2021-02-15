import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: Product
  id: string

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.id = '';
    this.product = { name: 'Produto não encontrado', price: 0}
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct();
  }
  getProduct(): void{
    this.productService.readById(this.id).subscribe(product => {
      this.product = product
    });
  }
  updateProduct(): void{
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto foi alterado com sucesso!');
      this.router.navigate(['/products']);
    })
  }
  cancel():void {
    this.router.navigate(['/products']);
  }
}
