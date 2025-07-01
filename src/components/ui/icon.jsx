import icons from '@/lib/icons.jsx';

const Icon = ({ icon, size = 24, ...props }) => {
  const IconComponent = icons[icon];

  if (!IconComponent) {
    console.warn(`⚠️ Icon "${icon}" not found.`);
    return null;
  }

  return <IconComponent size={size} {...props} />;
};

export default Icon;
