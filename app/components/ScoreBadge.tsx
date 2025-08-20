interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green text-green-600';
    badgeText = 'Fuerte';
  } else if (score > 49) {
    badgeColor = 'bg-badge-red text-yellow-600';
    badgeText = 'Buen comienzo';
  } else {
    badgeColor = 'bg-badge-red text-red';
    badgeText = 'Necesita mejorar';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;