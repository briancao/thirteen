const fs = require('fs')
const files = fs.readdirSync(__dirname)

var x = 'J'
var y = 'jack'

for (const file of files) {
    if (file.startsWith(x)) {
      fs.rename(
        __dirname + '/' + file,
        __dirname + '/' + file.replace(x, y),
        err => {
          console.log(err)
        }
      )
    }
  }