type TypeOfPayment =
    | 'money'
    | 'debitPoints'
    | 'creditCard'
    | 'debitCard'
    | 'pix'
    | 'picpay';

export interface CreateShopDTO {
    typeOfPayment: TypeOfPayment;
    clientId: string;
    productId: string;
    userId: string;
}
