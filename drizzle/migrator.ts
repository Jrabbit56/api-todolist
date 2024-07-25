
import mysql2 from "mysql2/promise";
import { migrate} from 'drizzle-orm/mysql2/migrator'
import path from "path"
import { drizzle } from "drizzle-orm/mysql2";
import * as  dotenv from "dotenv"
import { sql } from "drizzle-orm/sql";

dotenv.config()

const doMigarte = async () => {

    try {
        const dbConnection = await mysql2.createConnection({
            host: process.env.DB_URL,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            port: Number(process.env.DB_PORT)
        });

        const dbMigrator = drizzle(dbConnection)

        await migrate(dbMigrator,{
           migrationsFolder:path.resolve("./drizzle","migrations")
        });

        console.log("Migration Done!");
        process.exit(0);//close connection automatically
    
    } catch (e) {
        console.log("Migration Error:",e);
        process.exit(0);//close connection automatically
    }
}

doMigarte()

/************* Drop table manually *****************/
// const dropTable = async (tableName: string) => {
//     try {
//         const dbConnection = await mysql2.createConnection({
//             host: process.env.DB_URL,
//             database: process.env.MYSQL_DATABASE,
//             user: process.env.MYSQL_USER,
//             password: process.env.MYSQL_PASSWORD,
//             port: Number(process.env.DB_PORT)
//         });

//         const db = drizzle(dbConnection);

//         await db.execute(sql`DROP TABLE IF EXISTS ${sql.raw(tableName)}`);

//         console.log(`Table ${tableName} dropped successfully`);
//         await dbConnection.end();
//     } catch (e) {
//         console.log("Error dropping table:", e);
//     }
// }
// // Usage
// dropTable('task');
// dropTable('users');

