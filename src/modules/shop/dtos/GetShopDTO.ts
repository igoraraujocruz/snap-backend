type TypeOfPayment =
    | 'money'
    | 'debitPoints'
    | 'creditCard'
    | 'debitCard'
    | 'pix'
    | 'picpay';

export interface GetShopDTO {
    typeOfPayment?: TypeOfPayment;
    clientId?: string;
    productId?: string;
    userId?: string;
}
