import { valuesRegExp } from "../regExp";
export function lookupParser (str: string) {
	let keywords=["FROM","WHERE","AS"],
		trm=valuesRegExp.replace.trimQuote(str),
		errorstr="";
	let lookup={};
	let options={
		from:'',
		localfield:'',
		foreignfield:'',
		as:''
	}

	let mapped=keywords.map((keyword)=>{

		return [
			trm.indexOf(keyword),
			keyword.length,
			keyword
		]
	})
	mapped.sort((a:[number, number, string],b:[number, number, string])=>{
		return b[0]-a[0];
	})

	for(let i=0;i < mapped.length;i++){
		if(mapped[i][0] === -1){
			errorstr +=` Missing ${mapped[i][2]} in lookup string;`;
		}
		else{
			let idx=mapped[i][0]  as number;
			let lgth=mapped[i][1]  as number;
			let key=mapped[i][2]  as string;
			let param=trm.slice(idx + lgth);
			let opts;
			trm=trm.slice(0,mapped[i][0] as number);

			switch(key) {
				case "WHERE":
					opts=param.split(/(=| eq )/);
					options.localfield=opts[0].trim();
					options.foreignfield=opts[2].trim();
					break;
				case "FROM":
					options.from=param.trim();
					break;
				case "AS":
					options.as=param.trim();
					break;
			}
		}
	}
	if(errorstr){
		lookup["$lookup"]=errorstr;
		return lookup;
	}
	else{
		lookup["$lookup"]=options;
		return lookup;
	}
};
