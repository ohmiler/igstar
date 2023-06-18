import React, { useState, useEffect } from 'react'
import { collection, addDoc, doc, serverTimestamp, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useUserAuth } from '../context/AuthContext'

function Comment({ postId }) {

    const [comment, setComment] = useState("");
    const [postComments, setPostComments] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const { user } = useUserAuth();

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const docRef = doc(db, "posts", postId);
        const colRef = collection(docRef, "comments");
        addDoc(colRef, {
            comment: comment,
            username: user.displayName,
            timestamp: serverTimestamp()
        })
        setComment("");
    }

    useEffect(() => {
        const docRef = doc(db, "posts", postId);
        onSnapshot(collection(docRef, "comments"), (querySnapshot) => {
            const newPostComments = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setPostComments(newPostComments);
        })
    }, [])

    console.log(comment);
    console.log("Post comments ", postComments)

  return (
    <>
        <div>
            {postComments.length > 0 ? <span style={ showMore ? { display: 'none' } : { display: 'block' }} onClick={() => setShowMore(!showMore)}>View all {postComments.length} comments</span> : ""}
            {showMore ? <>
                {postComments?.map(data => (
                <p style={{ margin: '0' }}><strong>{data.username}</strong> {data.comment}</p>
            ))}
            <span onClick={() => setShowMore(!showMore)}>Show less</span>
            </> : ""}
            
        </div>
        <form onSubmit={handleSubmit}>
            <input type="text" value={comment} onChange={handleComment} className='border-0' placeholder='Add a comment...' />
        </form>
    </>
  )
}

export default Comment