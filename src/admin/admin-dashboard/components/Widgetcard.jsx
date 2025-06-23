const WidgetCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4 border border-gray-200">
      <div className={`p-6 rounded-full ${color} bg-opacity-10`}>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <div>
        <h4 className="text-gray-500 text-1xl font-bold">{title}</h4>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default WidgetCard;
