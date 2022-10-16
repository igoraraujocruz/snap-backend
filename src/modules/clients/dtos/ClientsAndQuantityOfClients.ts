import { Client } from "../infra/typeorm/entities/Client";

export interface ClientsAndQuantityOfClients {
    quantityOfClient: number;
    clients: Client[]
}