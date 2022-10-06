class url {
    constructor (protocol="http:", hostname="localhost", port="80", path="/", search="", hash="") {
        this.protocol = protocol
        this.hostname = hostname
        this.port = port
        this.path = path
        this.search = search
        this.hash = hash
    }

    get host () {return this.hostname + (this.port ? ":" + this.port : "")}
    get origin () {return (this.protocol ? this.protocol : "http:") + "//" + this.host}
    get href () {return this.origin + (this.path ? this.path : "/") + (this.hash ? this.hash : "") + (this.search ? this.search : "")}

    clone = (options={}) => {
        return new url((options.protocol || this.protocol), (options.hostname || this.hostname), (options.port || this.port), (options.path || this.path) + (options.content ? options.content : ""), (options.search || this.search), (options.hash || this.hash))
    }
}



export const urls = {
    "api": new url("http:", location.hostname, "5099"),
    "tourimg": new url("http:", location.hostname, "5099", "/images/tours/"),
    "aboutimg": new url("http:", location.hostname, "5099", "/images/about/"),
    "assets": new url(location.protocol, location.hostname, "80", "/assets"),
    "icons": new url(location.protocol, location.hostname, "80", "/assets/icons/"),
    "logos": new url(location.protocol, location.hostname, "80", "/assets/logo/")
}
