export interface AllClientsDTO {
    totalClients: number;
    clients: [
        {
            id: string;
            name: string;
            neighborhood: string;
            points: number;
            birthday: Date;
            email: string;
            mobilePhone: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
        },
    ];
}
