# Vue.js + Express.js Full Stack Web Application Template

A template for creating a full stack web application with Vue.js and Express.js, none database oriented.


## Feature
1. vue.js client project created by `vue/cli`
2. express.js server side created by  `express-generator`, with `nodemon`
3. linting before commit, with FGG js/vue style
4. integrate with any database you like, Mongo, MySQL, Oracle whatsoever...
5. error codes provived in `error_code.json`


## Guides
1. config your routes in `routes/prod/*.json`, coding your controllers in `controllers/*.js`

## Get Started

```
1. git clone git@github.com:fagougou/fgg-template-express-vue.git
2. cd fgg-template-express-vue
3. npm install
4. npm start
```

Finally, visit `localhost:3000`.


## some pre-installed depandencies:
1. request
2. nodemon
3. pre-commit
4. lint-staged

## Error Handle

Use the error code defined in `server/error_code.json`, 

```javascript
const err = new Error('')
err.code = '10003'
throw err
```

