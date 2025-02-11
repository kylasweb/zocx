import React, { useEffect, useRef, useState } from 'react';
import { Eye, Users, TrendingUp, DollarSign } from 'lucide-react';
import { TreeNode } from '../../types/network';

interface NetworkVisualizationProps {
  data: TreeNode[];
  onNodeClick: (nodeId: string) => void;
  onNodeHover: (nodeId: string | null, e?: React.MouseEvent) => void;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  data,
  onNodeClick,
  onNodeHover,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const nodeRadius = 30;
  const levelHeight = 100;
  const nodeSpacing = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(scale, scale);

    const drawNode = (node: TreeNode, x: number, y: number) => {
      // Draw connection lines first
      if (node.leftLeg) {
        const leftChild = data.find(n => n.id === node.leftLeg);
        if (leftChild) {
          const childX = x - Math.pow(2, 3 - node.level) * nodeSpacing;
          const childY = y + levelHeight;
          
          ctx.beginPath();
          ctx.moveTo(x, y + nodeRadius);
          ctx.lineTo(childX, childY - nodeRadius);
          ctx.strokeStyle = '#6366F1';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      if (node.rightLeg) {
        const rightChild = data.find(n => n.id === node.rightLeg);
        if (rightChild) {
          const childX = x + Math.pow(2, 3 - node.level) * nodeSpacing;
          const childY = y + levelHeight;
          
          ctx.beginPath();
          ctx.moveTo(x, y + nodeRadius);
          ctx.lineTo(childX, childY - nodeRadius);
          ctx.strokeStyle = '#6366F1';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      
      // Node gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, nodeRadius);
      gradient.addColorStop(0, node.id === hoveredNode ? '#4F46E5' : '#6366F1');
      gradient.addColorStop(1, node.id === hoveredNode ? '#4338CA' : '#4F46E5');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Node glow effect
      if (node.id === hoveredNode) {
        ctx.shadowColor = '#4F46E5';
        ctx.shadowBlur = 15;
      }
      
      ctx.strokeStyle = '#312E81';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw user info
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(node.fullName.split(' ')[0], x, y - 5);
      ctx.font = '10px Inter';
      ctx.fillText(`PV: ${node.personalVolume}`, x, y + 10);
      
      // Draw rank indicator
      const rankColor = node.status === 'active' ? '#10B981' : '#EF4444';
      ctx.fillStyle = rankColor;
      ctx.beginPath();
      ctx.arc(x + nodeRadius - 5, y - nodeRadius + 5, 5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTree = (node: TreeNode | null, x: number, y: number) => {
      if (!node) return;

      drawNode(node, x, y);

      if (node.leftLeg) {
        const leftChild = data.find(n => n.id === node.leftLeg);
        if (leftChild) {
          const childX = x - Math.pow(2, 3 - node.level) * nodeSpacing;
          const childY = y + levelHeight;
          drawTree(leftChild, childX, childY);
        }
      }

      if (node.rightLeg) {
        const rightChild = data.find(n => n.id === node.rightLeg);
        if (rightChild) {
          const childX = x + Math.pow(2, 3 - node.level) * nodeSpacing;
          const childY = y + levelHeight;
          drawTree(rightChild, childX, childY);
        }
      }
    };

    // Clear canvas and draw tree
    ctx.clearRect(-pan.x / scale, -pan.y / scale, canvas.width / scale, canvas.height / scale);
    const root = data.find(n => !n.sponsorId);
    if (root) {
      drawTree(root, canvas.width / (2 * scale), 50);
    }

    ctx.restore();
  }, [data, hoveredNode, scale, pan]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else {
      // Hit detection
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / scale;
      const y = (e.clientY - rect.top - pan.y) / scale;

      const hitNode = data.find(node => {
        const nodeX = canvas.width / (2 * scale);
        const nodeY = 50 + (node.level - 1) * levelHeight;
        const dx = x - nodeX;
        const dy = y - nodeY;
        return Math.sqrt(dx * dx + dy * dy) <= nodeRadius;
      });

      setHoveredNode(hitNode?.id || null);
      onNodeHover(hitNode?.id || null, e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(s => Math.min(Math.max(s * delta, 0.5), 2));
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 space-x-2 z-10">
        <button
          onClick={() => setScale(s => Math.min(s * 1.1, 2))}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          +
        </button>
        <button
          onClick={() => setScale(s => Math.max(s * 0.9, 0.5))}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          -
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPan({ x: 0, y: 0 });
          }}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={() => hoveredNode && onNodeClick(hoveredNode)}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default NetworkVisualization;