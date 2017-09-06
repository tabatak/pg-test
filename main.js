const {Pool, Client} = require('pg')
const connectionString = 'postgresql://postgres:postgres@localhost:5432/testdb'


if (process.argv.length < 3) {
  console.log("input command")

}else{
  if (process.argv[2] === 'insert'){
    console.log('insert into user')
    insertUser(process.argv[3])
  }else if (process.argv[2] === 'select'){
    console.log('select from user')
    selecttUser(process.argv[3])
  }
}

function insertUser(name){
  const client = new Client({
    connectionString: connectionString
  })
  client.connect()

  const query = {
    name: 'insert-user',
    text: "INSERT INTO public.user (name) VALUES ($1)",
    values: [name]
  }
  client.query(query, (err, res) => {
    console.log(err)

    // for(let i = 0; i < res.rowCount; i++){
    //   console.log(res.rows[i].name)
    // }
    client.end()
  })

}


function selecttUser(name){
  const client = new Client({
    connectionString: connectionString
  })
  client.connect()

  const query = {
    name: 'select-user',
    text: 'SELECT * FROM public.user WHERE name = $1',
    values: [name]
  }
  client.query(query, (err, res) => {

    for(let i = 0; i < res.rowCount; i++){
      console.log(res.rows[i].name)
    }
    client.end()
  })

}
