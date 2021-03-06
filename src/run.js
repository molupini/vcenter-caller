// REFER TO VMWARE API EXPLORER DOCUMENTATION 

var argv = require('minimist')(process.argv.slice(2))

const {
    login,
    getPath,
    getPathRegEx,
    getDataStore,
    getFolder,
    logoff 
} = require('./util/vmw')

// TEST VMW FETCH, IN PROGRESS
var main = async() => {

    // PARAMS, ARGS
    // ._[0] = FUNCTION, ARRAY = ARGUMENTS
    const key = Object.keys(argv)
    
    // debugging
    // console.log('main, argv =')
    // console.log(argv)
    
    if (key.indexOf('vCenterHost') === -1 || key.indexOf('resource') === -1 || key.indexOf('folder') === -1 || key.indexOf('regex') === -1){
        throw 'Missing Parameter'
    }
    
    const path = argv["resource"]
    const query = argv["folder"] === '' ? argv["folder"] : `?filter.folders=${argv["folder"]}`
    const re = argv["regex"]  === '' ? '.*' : argv["regex"] 
    var result = null

    // VALIDATION
    if (!path.match(/^(datacenter|cluster|datastore|host|network)$/)){
        throw 'Bad Resource'
    }

    // ENV
    const vc = process.env.VCENTER_HOST !== undefined ? process.env.VCENTER_HOST : argv["vCenterHost"]
    const un = process.env.VCENTER_USER !== undefined ? process.env.VCENTER_USER : argv["vCenterUser"]
    const pw = process.env.VCENTER_PASSWORD !== undefined ? process.env.VCENTER_PASSWORD : argv["vCenterPassword"]
    // debugging
    // console.log('env =')
    // console.log({vc, un, pw}) 

    // VARS  
    var cookie = null

    try {

        // LOGIN
        cookie = await login(vc, un, pw)
        // debugging
        // console.log('main, cookie =')
        // console.log(cookie)

        if(cookie === undefined || !cookie){
            throw 'Bad Session'
        }

        // Important conditional - getPath, getPathRegEx, clusterRegEx, dataStore
        if(argv._[0] === 'getPath'){
            result = await getPath(vc, un, pw, cookie, path, query)
        }
        else if(argv._[0] === 'getPathRegEx'){
            result = await getPathRegEx(vc, un, pw, cookie, `/rest/vcenter/${path}`, query, re)
        }
        else if(argv._[0] === 'getFolder'){
            result = await getFolder(vc, un, pw, cookie, path, re)
        }
        else if(argv._[0] === 'getDataStore'){
            result = await getDataStore(vc, un, pw, cookie, query, re)
        }
        else {
            throw 'Bad Method'
        }
        // debugging
        // console.log('main, result =')
        // console.log(result)
        if(result.length === 0){
            throw 'Bad Result'
        }
        process.stdout.write(JSON.stringify(result, null, 2))
    } catch (e) {
        console.log('main, error =')
        console.error(e)
        process.stderr.write('1')
    } finally {
        await logoff(vc, un, pw, cookie)
    }
}

main()