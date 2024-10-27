export namespace main {
	
	export class AppSettings {
	    RootDir: string;
	
	    static createFrom(source: any = {}) {
	        return new AppSettings(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.RootDir = source["RootDir"];
	    }
	}
	export class MarkdownFile {
	    name: string;
	    path: string;
	    content: string;
	    lastSaved: number;
	
	    static createFrom(source: any = {}) {
	        return new MarkdownFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	        this.content = source["content"];
	        this.lastSaved = source["lastSaved"];
	    }
	}

}

