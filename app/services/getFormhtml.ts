export const getFormhtml = async (url: string, cookies: string) : Promise< null | string> => {
    try{
    let res = await fetch(url, {
      method:"GET",
      "headers":{
        "Cookie": cookies,
      }, 
    })
    
    if(!res.ok){
        console.log("error in fetching form html", res.status)
        return null
    }
    let data = await res.text()
    return data
    }
    catch(err){
        console.log(err)
        return null
    }
}