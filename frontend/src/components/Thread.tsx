import React, { useState, useEffect } from 'react';

interface Comment{
    comment: String;
}
function Thread() {
    const [post, setPost] = useState('');
    const [comments,setComments] = useState<Comment[]>([]);
   
    async function fetchComments(){
        try{
            const response = await fetch('http://localhost:3001/posts/api');
            if (response.ok){
                const commentsData = await response.json();
                setComments(commentsData);
            }
        } catch(err){
            console.error(err);
        }

    }

    useEffect(()=>{
        fetchComments();
    },[]);

    async function AddPost() {
        try {
            const response = await fetch('http://localhost:3001/posts/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post
                })
            });

            if (response.ok) {
                console.log("Post added to Mongo");
            } else {
                console.log("Failed to add Post");
            }
        } catch (err) {
            console.error(err);
        }
    await fetchComments();
    }

    return (
        <>
        
            <section className="thread">
                <div className="comments-container">
                    <input
                        id="comment-input"
                        placeholder="Write your comment here..."
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                    ></input>
                    <button id="submit-btn" onClick={AddPost}>Submit Comment</button>
                </div>
                <div className="comments-list">
                    
                    {comments.slice().reverse().map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="user">Username</div>
                            <div className="likes">
                                <button type="button">Like</button>
                                <button type="button">Dislike</button>
                            </div>
                            <div className="post-comment">
                            {comment.comment}
                            </div>
                            <div className="reply-comment">
                                <button 
                                    type="button"
                                    className='reply-btn'
                                    >Reply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
        
        </>
    );
}

export default Thread;
