export class Favorite{
    constructor({text,url,comments}){
        this.text = text
        this.url = url
        this.comments = comments
        this.fid = crypto.randomUUID()
    }
}