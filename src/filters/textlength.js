export default function (text) {
  let len = 30
  let textlen = text.length
  if(textlen>len){
    text = text.substring(0,len-1)+"...";
  }
  return text
}