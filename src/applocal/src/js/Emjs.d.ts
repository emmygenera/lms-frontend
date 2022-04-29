//declare export function object_merge(...value:any[]):object;
//declare export function object_entries(value:object):any[];
declare function _callbacks({key,value,index}):object; 
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
/**
 * Split string and return default index value
 * 
 * @param value string
 * @param search string
 * @param index number
 * @return string
 * */ 
declare export function split (value : string, search: string, index:number):string;
/**
 * Loop through objects and convert to array value pairs
 * @param obj object
 * @return array
 * @results [[key,value],[key,value]]
 * */ 
declare export function object_entries(obj:object):any[];

/**
 * Combine one or more objects as one
 * @param obj Array[]
 * @return object
 * */ 
declare export function object_merge(...obj:object):object;

/**
 * Convert object data to string key : pair
 * 
 * @param value object
 * @param niddle string
 * @return string
 * @results  key:value,key:value
 * */ 
declare export function implode(value:object,niddle:string):string;

