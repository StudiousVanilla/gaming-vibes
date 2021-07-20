exports.handler = async (event, context) => {

    // in reality should be a database request
    const guides = [
        {title: 'Beat all Zelda Bosses Like a Boss', author: 'mario'},
        {title: 'Mario Kart Shortcuts You Never Knew Existed', author: 'luigi'},
        {title: 'Ultimate Street Fighter Guide', author: 'chun-li'},
    ]

    // context refers to the netlifyb response object not the React Context
    if (context.clientContext.user){
        //return response to the brrowser
        return{
            statusCode: 200,
            body: JSON.stringify(guides)
        }
    }

    return  {
        statusCode: 401,
        body: JSON.stringify({mssg: 'ah, ah, ah you must be logged in to see this'})
    }

}