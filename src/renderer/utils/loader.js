import store from '../store'

export default {
  wrapPromise(promise) {
    return store.dispatch('initLoading')
      .then(() => promise())
      .catch((err) => err)
      .then((err) => {
        return store.dispatch('finishLoading')
          .then(() => {
            if (err) {
              setTimeout(() => { alert('An error occurred. Please check the console for more details.') }, 100)
            }
          })
      })
  }
}
