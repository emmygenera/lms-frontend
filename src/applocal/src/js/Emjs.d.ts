declare export function object_merge(...value:any[]):object;
declare export function object_entries(value:object):any[];
declare function _callbacks({key,value,index}); 
declare export class Emjs{
    constructor(value:object);
    parse:()=>object;
    toString:()=>string;
    urlValidate:()=>true|false;
    objList:(callback=_callbacks)=>CallableFunction;
    isArray:()=>boolean;
    isJson:()=>boolean;
    arrayMap:()=>any[];
    arrayObjectMerge:(object_to_merge:object)=>any[];
};
declare export function EmjsF<T extends Emjs>():T;

