import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQueues,
  deleteToken,
  updateTokenStatus,
} from "../services/api";

const QueueDetail = () => {
  const { id } = useParams();
  const [queue, setQueue] = useState(null);

  const fetchQueue = async () => {
    try {
      const res = await getQueues();
      const found = res.data.find((q) => q._id === id);
      setQueue(found);
    } catch (err) {
      console.error("Error fetching queue", err);
    }
  };

  const handleDeleteToken = async (tokenId) => {
    if (window.confirm("Delete this token?")) {
      await deleteToken(tokenId);
      fetchQueue();
    }
  };

  const handleStatusChange = async (tokenId, newStatus) => {
    await updateTokenStatus(tokenId, newStatus);
    fetchQueue();
  };

  
  const handleAssignTopToken = async () => {
    if (queue.tokens.length > 0) {
      const topTokenId = queue.tokens[0]._id;
      await updateTokenStatus(topTokenId, "assigned");
      fetchQueue();
    }
  };

  
  const moveTokenUp = (index) => {
    if (index === 0) return;
    const newTokens = [...queue.tokens];
    [newTokens[index - 1], newTokens[index]] = [newTokens[index], newTokens[index - 1]];
    setQueue({ ...queue, tokens: newTokens });
  };

  
  const moveTokenDown = (index) => {
    if (index === queue.tokens.length - 1) return;
    const newTokens = [...queue.tokens];
    [newTokens[index], newTokens[index + 1]] = [newTokens[index + 1], newTokens[index]];
    setQueue({ ...queue, tokens: newTokens });
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  if (!queue) return <div>Loading...</div>;

  return (
    <div>
      <h2>Queue: {queue.name}</h2>
      <button onClick={handleAssignTopToken}>Assign Top Token</button>
      <h3>Tokens</h3>
      {queue.tokens.length === 0 ? (
        <p>No tokens in this queue.</p>
      ) : (
        queue.tokens.map((token, index) => (
          <div
            key={token._id}
            style={{
              border: "1px solid #ccc",
              margin: "8px",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            <p><strong>Person:</strong> {token.personName}</p>
            <p><strong>Status:</strong> {token.status}</p>

            <select
              value={token.status}
              onChange={(e) => handleStatusChange(token._id, e.target.value)}
            >
              <option value="waiting">Waiting</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <button onClick={() => handleDeleteToken(token._id)}>
              Delete Token
            </button>

            <button onClick={() => moveTokenUp(index)} disabled={index === 0}>
              Move Up
            </button>
            <button onClick={() => moveTokenDown(index)} disabled={index === queue.tokens.length - 1}>
              Move Down
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default QueueDetail;
