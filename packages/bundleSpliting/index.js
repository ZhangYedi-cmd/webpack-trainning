
import(/* webpackChunkName: "foo" */ './foo').then(m => {
    console.log(m.name)
})

import(/* webpackChunkName: "bar" */ './bar').then(m => {
    console.log(m.name)
})
