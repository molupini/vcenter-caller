const { httpFetch } = require('./fetch')


// if Hostname getaddrinfo ENOTFOUND use IP
// STEP 1
var login = async function(vCenter, user, password){
    try {
        const session = await httpFetch(443, vCenter, '/rest/com/vmware/cis/session', true, '', 'POST', user, password)    
        // debugging
        // console.log(session.body.value)
        const cookie = `vmware-api-session-id=${session.body.value}`
        return cookie
    } catch (e) {
        // console.Error(e)
        throw new Error(e)
    }
}

// GET PATH FOR A FULL RETURN 
var getPath = async function (vCenter, user, password, cookie, path, query){
    try {
        const list = await httpFetch(443, vCenter, `/rest/vcenter/${path}`, true, query, 'GET', user, password, cookie)
        return list.body.value
    } catch (e) {
        throw new Error(e)
    }
}

// GET PATH REGEX WILL INCLUDE A MATCH 
// NEED FULL PATH UNLIKE ABOVE 
// REGEX WHITELIST 
var getPathRegEx = async function (vCenter, user, password, cookie, path, query, regex){
    try {
        const upper = regex.toUpperCase()
        const re = new RegExp(upper)
        // debugging
        // console.log('getPathRegEx, re =')
        // console.log(re)
        // console.log(query)
        const list = await httpFetch(443, vCenter, path, true, query, 'GET', user, password, cookie)
        // debugging
        // console.log(list.body.value)
        array = []
        list.body.value.forEach(element => {
            if(element.name.toUpperCase().match(re)){
                const object = {
                    ...element
                }
                array.push(object)
            }
        })
        // debugging
        // console.log(array)
        return array
    } catch (e) {
        throw new Error(e)
    }
}

// DATA STORE SPECIFIC REQUEST, 
// REGEX WHITELIST 
var getDataStore = async function (vCenter, user, password, cookie, query, regex){
    try {
        const upper = regex.toUpperCase()
        const re = new RegExp(upper)
        // debugging
        // console.log('dataStore, re =')
        // console.log(re)
        const list = await httpFetch(443, vCenter, '/rest/vcenter/datastore', true, query, 'GET', user, password, cookie)
        array = []
        list.body.value.forEach(ds => {
            if(ds.name.toUpperCase().match(regex)){
                const object = {
                    name: ds.name,
                    id: ds.datastore,
                    bytesUsed: ds.capacity,
                    bytesFree: ds.free_space,
                    percentFree: (ds.free_space/ds.capacity)
                }
                array.push(object)
            }
        })
        // debugging
        // console.log(array)
        return array
    } catch (e) {
        throw new Error(e)
    }
}

// FOLDER SPECIFIC REQUEST, 
// REGEX WHITELIST 
var getFolder = async function (vCenter, user, password, cookie, query, regex){
    try {
        const upper = regex.toUpperCase()
        const re = new RegExp(upper)
        // debugging
        // console.log('folder, re =')
        // console.log(re)
        const list = await httpFetch(443, vCenter, '/rest/vcenter/folder', true, `?filter.type=${query.toUpperCase()}`, 'GET', user, password, cookie)
        array = []
        list.body.value.forEach(fold => {
            // CONDITIONAL, EXCLUDE DEFAULTS AND INCLUDE WHITELIST 
            if(fold.name !== query.toLowerCase() && fold.name.toUpperCase().match(re)){
                const object = {
                    ...fold
                }
                array.push(object)
            }
        })
        // debugging
        // console.log(array)
        return array
    } catch (e) {
        throw new Error(e)
    }
}

// LASTLY, LOGOFF 
var logoff = async function(vCenter, user, password, cookie){
    try {
        const session = await httpFetch(443, vCenter, '/rest/com/vmware/cis/session', true, '', 'DELETE', user, password, cookie)
        // console.log(`session deleted ${session.statusCode}`)
        return session.statusCode
    } catch (e) {
        throw new Error(e)
    }
}


module.exports = {
    login,
    getPath,
    getPathRegEx,
    getDataStore,
    getFolder,
    logoff
}

