import {tweetsData} from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetText = document.getElementById('tweet-text')
const feed = document.getElementById('feed')

document.addEventListener('click',function(e){
    if(e.target.id === 'tweet-btn')
    {
         addNewTweet()
    }
    else if(e.target.dataset.like)
    {
        handleLikeClick(e.target.dataset.like)
        
    }
    else if(e.target.dataset.retweet)
    {
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply)
    { 
    
         document.getElementById(`replies-${e.target.dataset.reply}`).classList.toggle('hidden') 
           
    }
    
    
    if(e.target.dataset.tweetBtn)
    {
         
        const textComment = document.getElementById(`${e.target.dataset.tweetBtn}-tweet-text`)
        addNewTweetOnReply(e.target.dataset.tweetBtn, textComment)
                
    }
    
    if(e.target.dataset.retweetLike)
    {
        handleReplyLikeClick(e.target.dataset.retweetLike)
    }
    else if(e.target.dataset.retweetRetweet)
    {
        handleReplyRetweetClick(e.target.dataset.retweetRetweet)
    }

})

function addNewTweet(){
    if(tweetText.value)
    {
  tweetsData.unshift({
      handle: `@JocelynPungwe 🧑🏽‍💻✔️`,
        profilePic: `images/IMG-0330.JPG`,
        likes: 0,
        retweets: 0,
        tweetText: tweetText.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    })   
    renderHtml()   
    tweetText.value = '' 
    }   
}

function addNewTweetOnReply(tweetId,inputText){

if(inputText.value)
{   
    tweetsData.forEach(function(tweet){    
        if(tweetId === tweet.uuid)
        {         
 
 tweet.replies.unshift({
                handle: `@JocelynPungwe 🧑🏽‍💻✔️`,
                profilePic: `images/IMG-0330.JPG`,
                tweetText: inputText.value,
                likes: 0,
                retweets: 0,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid:uuidv4(),
                })
             renderHtml() 
             inputText.value = ''  
        }
})
}

}

function handleReplyLikeClick(tweetId)
{
    tweetsData.forEach(function(tweet){
         const tweetTweetReplyObj = tweet.replies.filter(function(reply){
            return reply.uuid === tweetId
            
         })[0]
         
           if(tweetTweetReplyObj)
           {
               if(tweetTweetReplyObj.isLiked)
               {
                   tweetTweetReplyObj.likes--
               }
               else
               {
                  tweetTweetReplyObj.likes++
               }
               
              tweetTweetReplyObj.isLiked = !tweetTweetReplyObj.isLiked
              renderHtml()
              
           }   
                         
         })
     
}

function handleReplyRetweetClick(tweetId){
    
    tweetsData.forEach(function(tweet){
        const targetTweetObj = tweet.replies.filter(function(reply){
            return reply.uuid === tweetId
        })[0]
        
        if(targetTweetObj)
        {
            if(targetTweetObj.isRetweeted)
            {
             targetTweetObj.retweets--   
            }
            else
            {
             targetTweetObj.retweets++   
            }
            
            targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
            renderHtml()
        }
    })
}

function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    renderHtml()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    renderHtml()
}


function renderHtml(){
    let htmlStr = ''
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = ''
        let retweetIconClass = ''
        let renderReplyHtml = ''
        let replyTweetBtn = ''

        
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        if(tweet.replies.length > 0)
        {
                        tweet.replies.forEach(function(reply){
                            
                            let likeTweetIconClass = ''
                            let retweetTweetIconClass = ''
                            
                             if(reply.isLiked)
                             {
                                 likeTweetIconClass = 'liked'
                             }
                             if(reply.isRetweeted)
                             {
                                 retweetTweetIconClass = 'retweeted'
                             }
                            
                renderReplyHtml += `
                            <div class="tweet-reply">
                                <div class="tweet-inner">
                                    <img src="${reply.profilePic}" class="profile-pic">
                                        <div>
                                            <p class="handle">${reply.handle}</p>
                                            <p class="tweet-text">${reply.tweetText}</p>
                                            <div class="tweet-details">
                                                <span class="tweet-detail">
                                                    <i class="fa-regular fa-comment-dots"
                                                    data-retweet-reply="${reply.uuid}"
                                                    ></i>
                                                    ${reply.replies.length}
                                                </span>
                                                <span class="tweet-detail">
                                                    <i class="fa-solid fa-heart ${likeTweetIconClass}"
                                                    data-retweet-like="${reply.uuid}"
                                                    ></i>
                                                    ${reply.likes}
                                                </span>
                                                <span class="tweet-detail">
                                                    <i class="fa-solid fa-retweet ${retweetTweetIconClass}"
                                                    data-retweet-retweet="${reply.uuid}"
                                                    ></i>
                                                    ${reply.retweets}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            `
                            
            })
        }
        
        htmlStr +=  `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden border" id="replies-${tweet.uuid}">
         <div class="reply-input-area">
                    <img src="images/IMG-0330.JPG" class="profile-pic">
                    <textarea id='${tweet.uuid}-tweet-text' placeholder="What's happening"></textarea>
		</div>
        <button id="${tweet.uuid}-tweet-btn" data-tweet-btn='${tweet.uuid}'>Tweet</button>        
        ${renderReplyHtml}
    </div>   
</div>
`
    })
    
    feed.innerHTML = htmlStr
        
}

renderHtml()

