

let config = {
	onError(err:any){}
};
process.env.NODE_DEV == 'development' && (config.onError = (err:ErrorEvent)=>{
	console.error(err.message);
});
export const dva = {config};
