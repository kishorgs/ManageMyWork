interface CapacityBarProps {
  capacity: number;
}

const CapacityBar: React.FC<CapacityBarProps> = ({ capacity }) => {
  const available = 100 - capacity;
  return (
    <div className="w-full h-4 bg-gray-200 rounded">
      <div
        className="h-full bg-blue-500 rounded"
        style={{ width: `${capacity}%` }}
      />
    </div>
  );
};

export default CapacityBar;