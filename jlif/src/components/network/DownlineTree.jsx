// src/components/network/DownlineTree.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const renderTree = (node, nodes) => (
  <ul>
    <li>
      {node.referral_code} (Level {node.level})
      {node.children.length > 0 && (
        <ul>
          {node.children.map(child => renderTree(nodes[child], nodes))}
        </ul>
      )}
    </li>
  </ul>
);

export const DownlineTree = () => {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    api.get("downline/").then(res => setTree(res.data)).catch(console.error);
  }, []);

  if (!tree) return <p>Loading downline...</p>;

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Downline Tree</h2>
      {renderTree({ referral_code: tree.root, level: 0, children: tree.nodes[tree.root].children }, tree.nodes)}
    </div>
  );
};
