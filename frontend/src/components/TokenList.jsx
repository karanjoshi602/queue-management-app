import React from "react";

const TokenList = ({ tokens, onAssign, onCancel, onMoveUp, onMoveDown }) => {
  return (
    <div>
      {tokens.map((token, index) => (
        <div
          key={token._id}
          style={{
            border: "1px solid #ddd",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ margin: "5px 0" }}>
            <strong>Person:</strong> {token.personName}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Status:</strong> {token.status}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            <button onClick={() => onAssign(token._id)} style={buttonStyle}>
              Assign
            </button>
            <button onClick={() => onCancel(token._id)} style={dangerButtonStyle}>
              Cancel
            </button>
            <button
              onClick={() => onMoveUp(index)}
              disabled={index === 0}
              style={buttonStyle}
            >
              Move Up
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={index === tokens.length - 1}
              style={buttonStyle}
            >
              Move Down
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const dangerButtonStyle = {
  backgroundColor: "#ff4d4f",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default TokenList;
