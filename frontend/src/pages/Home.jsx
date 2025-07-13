import React, { useEffect, useState } from "react";
import {
  getQueues,
  createQueue,
  addToken,
  assignToken,
  cancelToken,
  deleteQueue,
} from "../services/api";
import TokenList from "../components/TokenList";
import { Link } from "react-router-dom";

const Home = () => {
  const [queues, setQueues] = useState([]);
  const [queueName, setQueueName] = useState("");
  const [personName, setPersonName] = useState("");
  const [selectedQueueId, setSelectedQueueId] = useState("");

  const fetchQueues = async () => {
    try {
      const res = await getQueues();
      setQueues(res.data);
    } catch (err) {
      console.error("Error fetching queues", err);
    }
  };

  const handleCreateQueue = async () => {
    if (!queueName) return;
    await createQueue({ name: queueName });
    setQueueName("");
    fetchQueues();
  };

  const handleAddToken = async () => {
    if (!personName || !selectedQueueId) return;
    await addToken({ personName, queueId: selectedQueueId });
    setPersonName("");
    fetchQueues();
  };

  const handleAssign = async (tokenId) => {
    await assignToken(tokenId);
    fetchQueues();
  };

  const handleCancel = async (tokenId) => {
    await cancelToken(tokenId);
    fetchQueues();
  };

  const handleDeleteQueue = async (queueId) => {
    if (window.confirm("Are you sure you want to delete this queue?")) {
      await deleteQueue(queueId);
      fetchQueues();
    }
  };

  const handleMoveUp = (queueIndex, tokenIndex) => {
    const updatedQueues = [...queues];
    const tokens = updatedQueues[queueIndex].tokens;
    if (tokenIndex > 0) {
      [tokens[tokenIndex - 1], tokens[tokenIndex]] = [tokens[tokenIndex], tokens[tokenIndex - 1]];
      setQueues(updatedQueues);
    }
  };

  const handleMoveDown = (queueIndex, tokenIndex) => {
    const updatedQueues = [...queues];
    const tokens = updatedQueues[queueIndex].tokens;
    if (tokenIndex < tokens.length - 1) {
      [tokens[tokenIndex], tokens[tokenIndex + 1]] = [tokens[tokenIndex + 1], tokens[tokenIndex]];
      setQueues(updatedQueues);
    }
  };

  const handleAssignTopToken = async (queue) => {
    if (queue.tokens.length > 0) {
      const topTokenId = queue.tokens[0]._id;
      await assignToken(topTokenId);
      fetchQueues();
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Queues</h2>
      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        <input
          value={queueName}
          onChange={(e) => setQueueName(e.target.value)}
          placeholder="Queue Name"
          style={inputStyle}
        />
        <button onClick={handleCreateQueue} style={buttonStyle}>
          Create Queue
        </button>
      </div>

      <h3 style={{ color: "#007bff" }}>Add Token</h3>
      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        <select
          value={selectedQueueId}
          onChange={(e) => setSelectedQueueId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Queue</option>
          {queues.map((q) => (
            <option key={q._id} value={q._id}>
              {q.name}
            </option>
          ))}
        </select>
        <input
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Person Name"
          style={inputStyle}
        />
        <button onClick={handleAddToken} style={buttonStyle}>
          Add Token
        </button>
      </div>

      <h3 style={{ color: "#007bff" }}>Queue List</h3>
      {queues.map((q, queueIndex) => (
        <div
          key={q._id}
          style={{
            border: "1px solid #ddd",
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ marginTop: 0 }}>{q.name}</h4>
          <div style={{ marginBottom: "10px" }}>
            <button onClick={() => handleDeleteQueue(q._id)} style={dangerButtonStyle}>
              Delete Queue
            </button>{" "}
            <button onClick={() => handleAssignTopToken(q)} style={buttonStyle}>
              Assign Top Token
            </button>{" "}
            <Link to={`/queue/${q._id}`}>
              <button style={buttonStyle}>View Details</button>
            </Link>
          </div>
          <TokenList
            tokens={q.tokens}
            onAssign={handleAssign}
            onCancel={handleCancel}
            onMoveUp={(tokenIndex) => handleMoveUp(queueIndex, tokenIndex)}
            onMoveDown={(tokenIndex) => handleMoveDown(queueIndex, tokenIndex)}
          />
        </div>
      ))}
    </div>
  );
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  flex: "1",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const dangerButtonStyle = {
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Home;
