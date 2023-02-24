import { Stream } from '@cloudflare/stream-react';
import { useState } from 'react';
import VimeoPlayer from 'react-vimeo-progress';
import { VimeoMediaUploader } from './VimeoMediaUploader';

const Index = () => {
  const[currentTimeCloudflare, setCurrentTimeCloudflare] = useState(0);
  const[currentTimeVimeo, setCurrentTimeVimeo] = useState(0);
  const[comment, setComment] = useState('')
  const[comments, setComments] = useState([{id: 0, commentText: '', time: ''}])

    const timeFormatter = (t: number) => {
      const totalTime = t 
        const minutes = Math.floor(totalTime / 60);
        const seconds = Math.floor(totalTime - minutes * 60);
        const currentTime = str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
        return currentTime;}
        const str_pad_left = (string: number, pad: string, length: number) => {
          return (new Array(length+1).join(pad)+string).slice(-length);
      }
  return (
    <>
    <VimeoMediaUploader />
    <p>Vimeo</p>
    <VimeoPlayer id='sample' link='https://player.vimeo.com/video/800866567?h' widthPercentage={0.3} onProgress={(e)=>{
    setCurrentTimeVimeo((t)=> t+ 1 )}} onVideoEnded={() => setCurrentTimeVimeo(0)} progressInterval={1000}/>
    <p>{timeFormatter(currentTimeVimeo)}</p>
    {comments.map((comment, key)=> {<li>{comment.commentText} video time: {comment.time}</li>})}
    <input type='text' onChange={(e)=>setComment(e.target.value)}></input> <button 
   onClick={(e) => {
    console.log(comments)
    setComments([...comments, {id: comments.length, commentText: comment, time: timeFormatter(currentTimeVimeo)}]) }}
    >Comment</button>
    
  <p>Cloudflare stream</p>
  <Stream controls src={'2eb763b361044626ce207f8a878e6394'} width="300" responsive={false} onTimeUpdate={(e)=>{
    setCurrentTimeCloudflare((t)=> t+0.25 )}} onEnded={() => setCurrentTimeCloudflare(0)}/>
    <p>{timeFormatter(currentTimeCloudflare)}</p>
    </>
  );
};

export default Index;
