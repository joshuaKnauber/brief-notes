// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';

export function CreateNote(arg1:string):Promise<void>;

export function GetListOfFiles():Promise<Array<main.MarkdownFile>>;

export function GetSettings():Promise<main.AppSettings>;

export function RenameFile(arg1:string,arg2:string):Promise<boolean>;

export function SaveContent(arg1:string,arg2:string):Promise<void>;

export function WriteSettings(arg1:main.AppSettings):Promise<void>;
