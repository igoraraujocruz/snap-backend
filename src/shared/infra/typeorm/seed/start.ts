import { createConnection } from 'typeorm';

async function create() {
    const connection = await createConnection();

    await connection.query(
        `INSERT INTO PERMISSIONS(name)
    values('Listar Produto'),
    ('Editar Produto'),
    ('Cadastrar Produto'),
    ('Deletar Produto'),
    ('Listar Cliente'),
    ('Editar Cliente'),
    ('Cadastrar Cliente'),
    ('Deletar Cliente'),
    ('Listar Usuario'),
    ('Editar Usuario'),
    ('Cadastrar Usuario'),
    ('Deletar Usuario')
  `,
    );

    await connection.close();
}

create().then(() => console.log('Seed finish!'));
