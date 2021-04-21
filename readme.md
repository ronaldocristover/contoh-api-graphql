GraphQL Sample API
By: Ronaldo 2079006


How to install
1. Clone Repo
```bash
git clone  https://github.com/ronaldocristover/contoh-api-graphql.git
```

2. Install Depedensi
```bash
npm install
```

3. Jalankan Server
```bash
node server.js
```

4. Cek API via GraphQL client dengan membuka browser
```
http://localhost:4000
```

5. Ketikan QUery yang diinginkan
```
# Get Superhero
{
  superhero {
    name, group
  }
}
```
```
# Add Superhero with Group
mutation{
	addSuperhero(name:"Messi", group:"Xmen"){
    name, group
  }
}
```