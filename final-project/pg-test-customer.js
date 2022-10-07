const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'smartant',
  port: 5432,
})
pool.query('SELECT * FROM CUSTOMER', (err, res) => {
  console.log(err, res)
  res.rows.map((customer)=>{
    console.log(JSON.stringify(customer));
  })
  pool.end()
})

