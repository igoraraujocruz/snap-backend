type TypeOfPayment =
    | 'money'
    | 'debitPoints'
    | 'creditCard'
    | 'debitCard'
    | 'pix'
    | 'picpay'
    | 'creditPoints';

export interface CreateShopDTO {
    quantity: number;
    typeOfPayment: TypeOfPayment;
    clientId: string;
    productId: string;
    userId: string;
}
