import React, { useState, useEffect } from "react";

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
  author: string;
}

const ForumPage: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>(() => {
    // Load discussions from localStorage on first render
    const savedDiscussions = localStorage.getItem("discussions");
    return savedDiscussions ? JSON.parse(savedDiscussions) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Save discussions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  const handlePostDiscussion = () => {
    if (title && content && author) {
      const newDiscussion: Discussion = {
        id: Date.now(),
        title,
        content,
        author,
        comments: [],
      };
      setDiscussions([newDiscussion, ...discussions]);
      setTitle("");
      setContent("");
      setAuthor("");
      setShowForm(false);
    }
  };

  const handleDeleteDiscussion = (id: number) => {
    setDiscussions(discussions.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-4xl p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Welcome to Community Forum!</h1>

      <div className="w-full">
        {discussions.length === 0 ? (
          <p className="text-base text-gray-500">No discussions yet. Start one now!</p>
        ) : (
          discussions.map((discussion) => (
            <div key={discussion.id} className="border p-4 rounded-md mb-4 text-base">
              <h3 className="font-bold text-lg">{discussion.title}</h3>
              <p className="text-gray-700 text-base">{discussion.content}</p>
              <p className="text-sm text-gray-500 mt-1">Started by: <b>{discussion.author}</b></p>
              
              <button
                onClick={() => handleDeleteDiscussion(discussion.id)}
                className="text-red-500 text-sm mt-2"
              >
                Delete Discussion
              </button>

              <Comments discussion={discussion} setDiscussions={setDiscussions} />
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-md text-base"
      >
        Start a Discussion
      </button>

      {showForm && (
        <div className="fixed bottom-16 right-8 bg-white shadow-md p-4 rounded-md w-96">
          <h2 className="font-semibold mb-2 text-base">Start a Discussion</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-base"
          />
          <input
            type="text"
            placeholder="Discussion Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-base"
          />
          <textarea
            placeholder="Discussion Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-base"
          />
          <button
            onClick={handlePostDiscussion}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-base"
          >
            Post Discussion
          </button>
        </div>
      )}
    </div>
  );
};

const Comments: React.FC<{ discussion: Discussion; setDiscussions: React.Dispatch<React.SetStateAction<Discussion[]>> }> = ({ discussion, setDiscussions }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  const handlePostComment = () => {
    if (commentText && commentAuthor) {
      const newComment: Comment = {
        id: Date.now(),
        text: commentText,
        author: commentAuthor,
      };

      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((d) =>
          d.id === discussion.id ? { ...d, comments: [...d.comments, newComment] } : d
        )
      );

      setCommentText("");
      setCommentAuthor("");
      setShowCommentForm(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setDiscussions((prevDiscussions) =>
      prevDiscussions.map((d) =>
        d.id === discussion.id
          ? { ...d, comments: d.comments.filter((comment) => comment.id !== commentId) }
          : d
      )
    );
  };

  return (
    <div className="mt-4 text-base">
      <h4 className="font-semibold text-sm">Comments:</h4>
      {discussion.comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        discussion.comments.map((comment) => (
          <div key={comment.id} className="text-sm mt-1 flex justify-between items-center">
            <p>
              <b>{comment.author}</b>: {comment.text}
            </p>
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="text-red-500 text-sm ml-2"
            >
              Delete
            </button>
          </div>
        ))
      )}

      {!showCommentForm && (
        <button
          onClick={() => setShowCommentForm(true)}
          className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm mt-2"
        >
          Reply
        </button>
      )}

      {showCommentForm && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Your Name"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-sm"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full p-2 border rounded mb-2 text-sm"
          />
          <button
            onClick={handlePostComment}
            className="bg-gray-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
