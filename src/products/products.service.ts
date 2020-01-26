import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number): string {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        // The [...var] sintax helps creting a copy of the 
        // variable this.products. This is recommended in order to avoid
        // returning javaScript reference tzype variables (arrays, objects)
        // Which would provide means to manipulate the values 
        // outside this service
        return [...this.products];
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];
        return { ...product };
    }

    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = {...product}
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.description = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    deleteProduct(prodId: string) {
        const index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }

    private findProduct(prodId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id == prodId);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException('Product not found');
        }
        return [product, productIndex];
    }
}