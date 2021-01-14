# fullstack-server-structure

https://fullstackopen.com/en/part4

[x] 4.1
[x] 4.2
[x] 4.3
[x] 4.4
[x] 4.5
[x] 4.6
[x] 4.7
[x] 4.8

jest

[x] 4.9
[x] 4.10
[x] 4.11
[x] 4.12
[x] 4.13
[x] 4.14
[x] 4.15
[x] 4.16
[x] 4.17
[x] 4.18
[x] 4.19
[x] 4.20
[x] 4.21
[x] 4.22

## Steps to do
`npm init`

`npm install express`

Add to package.json
```
"start": "node index.js",
"watch": "nodemon index.js"
```



## Run single test

node run cross-env NODE_ENV=test jest --verbose --runInBand -t 'post added to DB'


```
"test": "cross-env NODE_ENV=test jest --verbose --runInBand -t 'post added to DB'"
```


copy 1 db to other 
`sudo mongodump --uri mongodb+srv://dbUser:<pass>@cluster0.5xwh4.mongodb.net/fullstack-part4 --archive --forceTableScan | mongorestore --uri mongodb+srv://dbUser:<pass>@cluster0.5xwh4.mongodb.net/ --archive  --nsFrom='fullstack-part4.*' --nsTo='fullstack-part4-test.*'`


4.15 -done

npm install eslint-plugin-jest --save-dev

4.21 ,  4.22 

    const useAuth = {
      username: 'test_user',
      password: 'body.password'
    }

    const jwt = await api.post('/api/login')
      .set('Content-type', 'application/json')
      .send(useAuth).expect(200)


      .set('Authorization', 'Bearer ' + jwt.body.token)      