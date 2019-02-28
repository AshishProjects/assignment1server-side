const Koa = require('koa')
const bodyParser = require('koa-body')
const pool = require('../../dbconfig/dbconfig')

const app = new Koa()

app.use(bodyParser())

app.use(async ctx => {
  const deleteBody = await ctx.request.body
  await deleteTodo(deleteBody.todoItem)
  ctx.body = `Deleted todoItem ${deleteBody.todoItem}`
})

async function deleteTodo(todoItem) {
  try {
    const deletedDataTodo = await pool.query(`DELETE FROM listtodo WHERE todoItem LIKE '%${todoItem}%';`)
    return deletedDataTodo
  }catch(e){
    console.error(e)
  }
}

module.exports = app.callback()
