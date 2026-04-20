interface Props {
  total: number;
  watched: number;
  planned: number;
}

export function StatsBar({ total, watched, planned }: Props) {
  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Всего</span>
      </div>
      <div className="stat">
        <span className="stat-number">{watched}</span>
        <span className="stat-label">Просмотрено</span>
      </div>
      <div className="stat">
        <span className="stat-number">{planned}</span>
        <span className="stat-label">В планах</span>
      </div>
    </div>
  );
}
