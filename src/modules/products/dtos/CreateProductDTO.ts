export interface CreateProductDTO {
    name: string;
    slug: string;
    price: number;
    creditPoints: number;
    debitPoints: number;
    description: string;
    userId: string;
}
