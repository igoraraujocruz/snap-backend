import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { createConnection } from 'typeorm';

async function create() {
    const connection = await createConnection();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
        `INSERT INTO USERS(id, name, username, email, "mobilePhone", password, "createdAt", "updatedAt")
      values('${id}', 'administrator', 'admin', 'admin@email.com.br', '5527997998673', '${password}', 'now()', 'now()')
    `,
    );

    await connection.close();
}

create().then(() => console.log('User admin created!'));
