const mutations = {
    LOGOUT(state) {
        state.token = null;
        state.isLogged = false;
    },
    switchProgress(state) {
        state.progress = !state.progress;
    },
    saveUserId (state, id) {
        state.userId = id
    },
    saveUserToken (state, token) {
        state.isLogged = true;
        state.token = token;
    },
    deleteToken(state){
        state.token = null;
    },
    // Channels & Fields
    setCanals(state, payload){
        state.canals = payload;
    },
    setCanal(state, payload){
        state.canal = payload;
    },
    setFields(state, payload){
        state.fields = payload;
    },
    // Triggers & Commands
    setTriggers(state, payload){
        state.triggers = payload;
    },
    setTrigger(state, payload){
        state.trigger = payload;
    },
    setCommands(state, payload){
        state.commands = payload;
    },

    // React
    setReacts(state, payload){
        state.reacts = payload;
    },
    setReact(state, payload){
        state.react = payload;
    },

    changeLocale(state, lang){
        state.locale = lang.language;
        state.flag = lang.flag;
    }
}
export default mutations
