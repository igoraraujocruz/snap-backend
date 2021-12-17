export interface IBaseService<T> {
    create(item: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(item_id: string): Promise<T | undefined>;
    update(item: Partial<T>): Promise<T>;
    delete(item_id: string): Promise<void>;
}
