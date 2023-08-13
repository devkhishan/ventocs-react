function Thread() {

    function mongoConnector(){
        
    }
    return (
        <>
        <section className="thread">
            <div className="comments-container">
            
                <textarea id="comment-input" placeholder="Write your comment here..."></textarea>
                <button id="submit-btn" onClick={mongoConnector}>Submit Comment</button>
          
            
            </div>
            <ul id="comments-list" className="comments-list"></ul>
        </section>
        </>
    )
}

export default Thread