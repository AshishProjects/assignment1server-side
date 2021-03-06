const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const postBody = await ctx.request.body
  const postDataItem = await postTodo(postBody.todoItem, postBody.todoDateAdded, postBody.todoStatus, postBody.todoDueBy)
  ctx.body = `New todo created with todoID ${postDataItem[0].insertId}`
})

async function postTodo(todoItem, todoDateAdded, todoStatus, todoDueBy) {
  try {
    const postedTodo = await pool.query(`
    INSERT INTO listtodo (todoItem, todoDateAdded, todoStatus, todoDueBy) 
    VALUES ("${todoItem}", "${todoDateAdded}", "${todoStatus}", "${todoDueBy}");
    `)
    return postedTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()
