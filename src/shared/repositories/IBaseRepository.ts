export interface IBaseRepository<T> {
    create(item: Partial<T>): Promise<T>;
    update(item: Partial<T>): Promise<T>;
    delete(item: T): Promise<void>;
    findById(id: string): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    save(item: Partial<T>): Promise<T>;
}
