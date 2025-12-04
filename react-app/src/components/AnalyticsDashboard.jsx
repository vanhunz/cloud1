import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter
} from 'recharts';
import './AnalyticsDashboard.css';

/**
 * Component hiển thị các biểu đồ phân tích chi tiết
 */
function AnalyticsDashboard({ resources }) {
  if (!resources || resources.length === 0) {
    return null;
  }

  // === DỮ LIỆU PHÂN LOẠI ===
  const classificationCounts = {};
  resources.forEach(r => {
    const c = r.classification || 'Chưa phân loại';
    classificationCounts[c] = (classificationCounts[c] || 0) + 1;
  });

  const classificationData = Object.entries(classificationCounts).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / resources.length) * 100).toFixed(1)
  }));

  // === DỮ LIỆU RESOURCE THEO LOẠI ===
  const envCounts = {};
  resources.forEach(r => {
    const env = r.tags?.env || 'unknown';
    envCounts[env] = (envCounts[env] || 0) + 1;
  });

  const envData = Object.entries(envCounts).map(([env, count]) => ({
    name: env.charAt(0).toUpperCase() + env.slice(1),
    count,
    resources: resources.filter(r => r.tags?.env === env)
  }));

  // === DỮ LIỆU CPU & MEMORY ===
  const resourceStats = resources.map((r, idx) => ({
    id: r.id,
    name: r.name,
    cpu: r.cpu || 0,
    mem: r.mem || 0,
    classification: r.classification || 'Chưa phân loại',
    ratio: (r.mem / r.cpu).toFixed(2)
  }));

  const cpuData = resources.map((r, idx) => ({
    name: r.name.substring(0, 10),
    value: r.cpu || 0
  }));

  const memData = resources.map((r, idx) => ({
    name: r.name.substring(0, 10),
    value: r.mem || 0
  }));

  // === TÍNH TOÁN TỔNG HỢP ===
  const totalCPU = resources.reduce((sum, r) => sum + (r.cpu || 0), 0);
  const totalMem = resources.reduce((sum, r) => sum + (r.mem || 0), 0);
  const avgCPU = (totalCPU / resources.length).toFixed(2);
  const avgMem = (totalMem / resources.length).toFixed(2);
  const maxCPU = Math.max(...resources.map(r => r.cpu || 0));
  const maxMem = Math.max(...resources.map(r => r.mem || 0));

  const COLORS = ['#FF6B6B', '#FF8E72', '#FFD93D', '#6BCB77', '#4D96FF', '#9D84B7'];

  return (
    <div className="analytics-dashboard">
      <h2>📊 PHÂN TÍCH CHI TIẾT DỮ LIỆU</h2>

      {/* === KPI CARDS === */}
      <div className="kpi-section">
        <h3>📈 Chỉ số quan trọng (KPI)</h3>
        <div className="kpi-grid">
          <div className="kpi-card primary">
            <div className="kpi-icon">🔢</div>
            <div className="kpi-label">Tổng Tài Nguyên</div>
            <div className="kpi-value">{resources.length}</div>
          </div>

          <div className="kpi-card cpu">
            <div className="kpi-icon">⚙️</div>
            <div className="kpi-label">Tổng CPU</div>
            <div className="kpi-value">{totalCPU}</div>
            <div className="kpi-detail">TB: {avgCPU} | Max: {maxCPU}</div>
          </div>

          <div className="kpi-card memory">
            <div className="kpi-icon">💾</div>
            <div className="kpi-label">Tổng Memory</div>
            <div className="kpi-value">{totalMem} GB</div>
            <div className="kpi-detail">TB: {avgMem} | Max: {maxMem}</div>
          </div>

          <div className="kpi-card classified">
            <div className="kpi-icon">✅</div>
            <div className="kpi-label">Đã Phân Loại</div>
            <div className="kpi-value">{resources.filter(r => r.classification && r.classification !== 'Not Classified').length}</div>
            <div className="kpi-detail">{((resources.filter(r => r.classification && r.classification !== 'Not Classified').length / resources.length) * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* === BIỂU ĐỒ PHÂN LOẠI === */}
      <div className="charts-grid">
        <div className="chart-container pie-chart">
          <h4>🎯 Phân Bố Mức Độ Quan Trọng</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {classificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} resources`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend-custom">
            {classificationData.map((item, idx) => (
              <div key={idx} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="legend-text">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* === BIỂU ĐỒ MÔI TRƯỜNG === */}
        <div className="chart-container bar-chart">
          <h4>🌍 Phân Bố Theo Môi Trường</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={envData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === BIỂU ĐỒ CPU & MEMORY === */}
      <div className="charts-grid">
        <div className="chart-container">
          <h4>⚙️ Phân Bố CPU (vCPU)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cpuData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>💾 Phân Bố Memory (GB)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6BCB77" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === BẢNG CHI TIẾT === */}
      <div className="details-section">
        <h3>📋 Chi Tiết Từng Tài Nguyên</h3>
        <div className="table-wrapper">
          <table className="details-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Phân Loại</th>
                <th>Tỷ Lệ M/C</th>
              </tr>
            </thead>
            <tbody>
              {resourceStats.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td><strong>{r.name}</strong></td>
                  <td className="cpu-col">{r.cpu} vCPU</td>
                  <td className="mem-col">{r.mem} GB</td>
                  <td>
                    <span className={`badge badge-${getClassColor(r.classification)}`}>
                      {r.classification}
                    </span>
                  </td>
                  <td className="ratio-col">{r.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* === THỐNG KÊ SÂU === */}
      <div className="deep-stats-section">
        <h3>🔍 Phân Tích Sâu</h3>
        <div className="stats-boxes">
          <div className="stat-box">
            <h4>💪 Resource Nặng Nhất</h4>
            <div className="stat-content">
              {(() => {
                const heaviest = resources.reduce((max, r) => 
                  (r.cpu || 0) + (r.mem || 0) > (max.cpu || 0) + (max.mem || 0) ? r : max
                );
                return (
                  <>
                    <p><strong>{heaviest.name}</strong></p>
                    <p>CPU: {heaviest.cpu} | Memory: {heaviest.mem}GB</p>
                    <p className="classification">{heaviest.classification}</p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="stat-box">
            <h4>⚡ Resource Nhẹ Nhất</h4>
            <div className="stat-content">
              {(() => {
                const lightest = resources.reduce((min, r) => 
                  (r.cpu || 0) + (r.mem || 0) < (min.cpu || 0) + (min.mem || 0) ? r : min
                );
                return (
                  <>
                    <p><strong>{lightest.name}</strong></p>
                    <p>CPU: {lightest.cpu} | Memory: {lightest.mem}GB</p>
                    <p className="classification">{lightest.classification}</p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="stat-box">
            <h4>🎯 Môi Trường Chính</h4>
            <div className="stat-content">
              {(() => {
                const mainEnv = Object.entries(envCounts).reduce((a, b) => 
                  a[1] > b[1] ? a : b
                );
                return (
                  <>
                    <p><strong>{mainEnv[0].toUpperCase()}</strong></p>
                    <p>Số lượng: {mainEnv[1]} resources</p>
                    <p className="percentage">{((mainEnv[1] / resources.length) * 100).toFixed(1)}%</p>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="stat-box">
            <h4>🔴 Mức Độ Quan Trọng Cao</h4>
            <div className="stat-content">
              {(() => {
                const critical = resources.filter(r => 
                  r.classification && (r.classification.includes('CRITICAL') || r.classification.includes('HIGH'))
                );
                return (
                  <>
                    <p><strong>{critical.length}</strong> resources</p>
                    <p>Cần theo dõi sặc sặt</p>
                    <p className="percentage">{((critical.length / resources.length) * 100).toFixed(1)}%</p>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function để lấy màu badge
function getClassColor(classification) {
  if (!classification || classification.includes('Low')) return 'green';
  if (classification.includes('Medium')) return 'yellow';
  if (classification.includes('High')) return 'orange';
  if (classification.includes('Critical')) return 'red';
  return 'gray';
}

export default AnalyticsDashboard;
