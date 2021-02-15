import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  id: string;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { 
    this.product = { name: '', price: 0}
    this.id = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProduct();
  }
  getProduct(): void{
    this.productService.readById(this.id).subscribe(product => {
      this.product = product;
    });
  }
  deleteProduct(): void{
    this.productService.destroy(Number(this.product.id)).subscribe((product)=>{
      this.productService.showMessage('Produto excluido com sucesso');
      this.router.navigate(['/products']);
    });
  }
  cancel(): void{
    this.router.navigate(['/products']);
  }
}
