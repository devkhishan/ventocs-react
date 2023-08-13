import React, { useState } from 'react';

function Thread() {
    const [post, setPost] = useState('');

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
                <ul id="comments-list" className="comments-list"></ul>
            </section>
        </>
    );
}

export default Thread;
