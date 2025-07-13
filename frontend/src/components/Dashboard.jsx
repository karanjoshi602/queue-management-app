import React, { useEffect, useState } from "react";
import { getQueues } from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQueues: 0,
    totalTokens: 0,
    statusCounts: {
      waiting: 0,
      assigned: 0,
      completed: 0,
      cancelled: 0,
    },
  });

  const fetchStats = async () => {
    try {
      const res = await getQueues();
      const queues = res.data;

      let totalTokens = 0;
      let statusCounts = {
        waiting: 0,
        assigned: 0,
        completed: 0,
        cancelled: 0,
      };

      queues.forEach((queue) => {
        totalTokens += queue.tokens.length;
        queue.tokens.forEach((token) => {
          if (statusCounts[token.status] !== undefined) {
            statusCounts[token.status]++;
          }
        });
      });

      setStats({
        totalQueues: queues.length,
        totalTokens,
        statusCounts,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#28a745" }}>Dashboard Analytics</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <p>
          <strong>Total Queues:</strong> {stats.totalQueues}
        </p>
        <p>
          <strong>Total Tokens:</strong> {stats.totalTokens}
        </p>
        <h3 style={{ marginTop: "20px", color: "#007bff" }}>Token Status Breakdown</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li> Waiting: {stats.statusCounts.waiting}</li>
          <li> Assigned: {stats.statusCounts.assigned}</li>
          <li> Completed: {stats.statusCounts.completed}</li>
          <li> Cancelled: {stats.statusCounts.cancelled}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
