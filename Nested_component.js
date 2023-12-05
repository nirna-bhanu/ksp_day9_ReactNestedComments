import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Comment = ({ id, author, content, replies }) => {
  const [replyText, setReplyText] = useState('');
  const [nestedReplies, setNestedReplies] = useState(replies || []);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event, parentId) => {
    event.preventDefault();
    if (replyText.trim() !== '') {
      const newReply = {
        id: `${parentId}-${nestedReplies.length + 1}`,
        author: 'User',
        content: replyText,
        replies: [],
      };

      setNestedReplies((prevReplies) => [...prevReplies, newReply]);
      setReplyText('');
    }
  };

  return (
    <div className='text-center mt-5'>
      <h1>Nested Comment List</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <strong>{author}:</strong> {content}
      </div>
      <form onSubmit={(event) => handleReplySubmit(event, id)} className="d-flex" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <input
          className='form-control form-control-sm mr-2' 
          type="text"
          placeholder="Reply..."
          value={replyText}
          onChange={handleReplyChange}
        />
        <button className='btn btn-primary' type="submit">Reply</button>
      </form>
      <div style={{ marginLeft: '20px' }}>
        {nestedReplies.map((reply, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <strong>{reply.author}:</strong> {reply.content}
            <form onSubmit={(event) => handleReplySubmit(event, reply.id)} className="d-flex">
              <input
                className='form-control form-control-sm mr-2' 
                type="text"
                placeholder={`Reply to ${reply.author}...`}
                value={replyText}
                onChange={handleReplyChange}
              />
              <button className='btn btn-primary' type="submit">Reply</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

const NestedCommentList = () => {
  const initialComments = [
    {
      id: '1',
      author: 'Comment',
      content: 'This is the first comment!',
      replies: [],
    },
  ];

  return (
    <div>
      {initialComments.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
};

export default NestedCommentList;

