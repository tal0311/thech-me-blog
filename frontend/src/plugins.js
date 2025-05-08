const globalLoader = {
    install(app) {

        function show() {

            dispatchEvent(new CustomEvent('show', { detail: {} }))
        }

        function hide() {
            dispatchEvent(new CustomEvent('hide', { detail: {} }))
        }

        app.config.globalProperties.$loader = { show, hide }
    }
}


export default {
    globalLoader
}