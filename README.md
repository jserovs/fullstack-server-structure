# fullstack-server-structure

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