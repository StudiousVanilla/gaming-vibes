exports.handler = async () => {
    console.log('function ran');

    const data = {name: 'mario', age: 35, job: 'plumber'}

    //return respons eto the brrowser
    return{
        statusCode: 200,
        body: JSON.stringify(data)
    }
}