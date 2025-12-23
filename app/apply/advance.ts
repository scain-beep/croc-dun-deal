export function dropAndGo(setOpen: (b:boolean)=>void, push: (p:string)=>void, path:string) {
  setOpen(true);
  setTimeout(() => push(path), 550); // matches curtain duration
}
