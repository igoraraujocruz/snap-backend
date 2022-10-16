import { Product } from "@modules/products/infra/typeorm/entities/Product";

export interface ProductsAndQuantityOfProducts {
    quantityOfProduct: number;
    products: Product[]
}