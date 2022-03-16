import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';

export class BCryptHashProviders implements IHashProvider {
    public async generateHash(decrypted: string): Promise<string> {
        return hash(decrypted, 8);
    }

    public async compareHash(
        decrypted: string,
        hashed: string,
    ): Promise<boolean> {
        return compare(decrypted, hashed);
    }
}
