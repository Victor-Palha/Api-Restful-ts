const db_name = process.env.DB_NAME
const db_pass = process.env.DB_PASS
export default {
    port: 3000,
    dbUrl: `mongodb+srv://${db_name}:${db_pass}@cluster0.xdzpwwf.mongodb.net/?retryWrites=true&w=majority`,
    env: "development",
}