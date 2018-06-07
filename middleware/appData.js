import {getUser} from '~/service/getData'

export default function (context, next) {
  Promise.all([
    getUser()
  ]).then((arr) => {
    context.user = arr[0].user_info || null
    context.store.commit('setUser', context.user)
    next()
  }).catch((err) => {
    console.log(err)
    context.error({ statusCode: 404, message: 'Page not found' })
  })
}
