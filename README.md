## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Database Migrations

### Create Database

- Either create new db as mentioned in .env file or update the database credentials in .env.

### Running migrations

- `pnpm migration:run` - to run all migrations

### Available Commands

- `pnpm typeorm <cmd>` -- TypeORM CLI for manual command execution.
- `pnpm migration:show` -- Show all migrations and their status.
- `pnpm migration:run` -- Run all pending migrations.
- `pnpm migration:revert` -- Revert the last executed migration.
- `pnpm migration:create <path>` -- Create a new empty migration file.
- `pnpm migration:generate <path>` -- Generate a new migration file with SQL to update the schema based on entities.

### Example Workflow

- Update entities.
- Generate a migration file using `pnpm migration:generate src/database/migrations/add-x-to-users`.
- `pnpm migration:run`

## Compile and run the project

```bash
# watch mode
$ pnpm run start:dev
```
